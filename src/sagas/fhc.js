import { call, put, select, takeEvery, takeLatest, compose, fork, all } from 'redux-saga/effects';
import {
    FHC_PAGE_INIT, FHC_UPDATE, FHC_CHANGE_TAB_DONE, FHC_COPY_AS_TEMPLATE,
    FHC_UPDATE_CREATE_FORM, FHC_RECEIVE_RECORD_DETIAL, FHC_GET_RECORD_DETIAL,
    FHC_INIT_VIEW_RECORD_TAB, FHC_INIT_VIEW_RECORD_TAB_DONE, FHC_SAVE_PRIORITY_CHANGES, FHC_CALCULATE,
    FHC_INIT_CREATE_TAB, FHC_SAVE_AND_CONTINUE


} from '../FinancialPlanning/FHC/actions/fhc_act';

import { callMessage } from "../services/baseService";
import qasService from '../services/QAS/qasService'
import qasConverter from '../services/QAS/qasConverter';
import { inputValidate, outPutValidate, outputValidateWithError } from '../services/commonService/validate';
import fpsConverter from '../services/FPS/fpsConverter';
import fpsService from '../services/FPS/fpsService'
import fhcConfig from "../config/fhcConfig";
import { CLEAN_ALL_ERROR_INFO, UPDATE_MESSAGE_BOX } from '../common/actions/nav';
import serviceName from '../services/FPS/fpsConstants';
import { sendMessageWithTimeout,sendMessageWithParallel } from "./common_sga";

function* fhcInitCreateData(params) {
    yield put({
        type: CLEAN_ALL_ERROR_INFO
    });

    console.log("FHC saga fhcInitCreateData begin", params);
    let currentState = yield select();
    let sessionInfo = currentState.session;
    let customerInfo = currentState.landing.customerInfo;
    // call retrieveQuestionnaireResponseDetail to get customer riskLevel. begin
    let riskLevel = '0';
    let rtqParams = {
        customers: [],
        detailSearchCriteria: { searchFunctionCode: "L" },
        questionnaireKey: {},
        searchCriteria: [{
            key: "QUES_TYPE_CDE",
            value: "SOLE"
        }],
        messageId: 'retrieveQuestionnaireResponseDetail',
        questionnaireTypeCode: "RTQ",
        sessionInfo
    };
    let request = inputValidate(rtqParams);
    let requestConverter = qasConverter.retrieveQuestionnaireResponseDetailConvertRequest(request);
    let response = yield call(sendMessageWithTimeout, qasService.process, requestConverter);
    if (response.isTimeout) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList: response.errorList
        });
    }
    else{
        response = outputValidateWithError(response);
        if (response.errorList.length > 0) {
            yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList: response.errorList
            });
        } else {
            let rtqResult = qasConverter.retrieveQuestionnaireResponseDetailConvertResponse_FHC(response.responseBody);
            if (null != rtqResult.riskLevel) {
                riskLevel = rtqResult.riskLevel;
            }
        }
    }
    // call retrieveQuestionnaireResponseDetail to get customer riskLevel. end

    // call retrieveLife400InsuranceDetail to get insurance amount. begin
    let lifeInsCoverAmt = 0;
    let life400Params = {
        messageId: 'retrieveLife400InsuranceDetail',
        sessionInfo,
        customerInfo
    };
    let validatedLife400Params = inputValidate(life400Params);
    let life400Request = fpsConverter.retrieveLife400InsuranceDetailConvertRequest(validatedLife400Params);
    let life400Response = yield call(sendMessageWithTimeout, fpsService.process, life400Request);

    if (life400Response.isTimeout) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList: life400Response.errorList
        });
    }
    else{
        life400Response = outputValidateWithError(life400Response);
        if (life400Response.errorList.length > 0) {
            yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList: life400Response.errorList
            });
        } else {
            let life400Result = fpsConverter.retrieveLife400InsuranceDetailConvertResponse(life400Response.responseBody);
            console.log("retrieveLife400InsuranceDetail result", life400Result);
            lifeInsCoverAmt = life400Result.totalSumInsured;
        }
    }
    // call retrieveLife400InsuranceDetail to get insurance amount. end

    let targetRetireAge = 65;
    // caculate postRetireYear and hopeLiveYear begin.
    let hopeLiveYear = customerInfo.genderCode == 'M' ? fhcConfig.maleAvgMortalityAge : fhcConfig.femaleAvgMortalityAge;
    let postRetireYear = hopeLiveYear - targetRetireAge;
    // caculate postRetireYear and hopeLiveYear end.


    // caculate protection yearToSupport begin.
    let age = (new Date()).getFullYear() - (new Date(customerInfo.birthDate)).getFullYear();
    let protectionYearToSupport = targetRetireAge - age;
    // caculate protection yearToSupport end.

    yield put({
        type: FHC_UPDATE_CREATE_FORM,
        formData: {
            result: {
                expanded: false,
                lifeCoverageRemainAmt: 1,
                criticalIllnessRemainAmt: 1,
                retirementRemainAmt: 1,
                educationRemainAmt: 1,

                lifeCoveragePriority: 1,
                criticalIllnessPriority: 1,
                retirementPriority: 1,
                educationPriority: 1,
                propertyPriority: 1,
                legacyPriority: 1,
                healthPriority: 1,
                growYourWealthPriority: 1
            },
            /* init create form */
            aboutMe: {
                riskLevel: riskLevel,
                maxRiskLevel: riskLevel,
                hasChildUnder18: false,
                childrenNo: 1, // default value for number of children when has children.
                expanded: true
            },
            education: {
                yearInSchool: 4,
                annualExp: 0,
                yearTillEnterSchool: 0,
                expanded: true
            },
            retirement: {
                targetRetireAge,
                hasLegacyPlan: 'N',
                postRetireYear,
                hopeLiveYear,
                expanded: true
            },
            protection: {
                yearToSupport: protectionYearToSupport > 0 ? protectionYearToSupport : 0,
                lifeInsCoverAmt: lifeInsCoverAmt,
                lifeInsCmpnyBnftAmt: 0,
                expanded: true
            },
            criticalIllness: {
                yearToSupport: 2,
                supportAmt: customerInfo.genderCode == 'M' ? fhcConfig.maleCriticalIllnessSupportAmt : fhcConfig.femaleCriticalIllnessSupportAmt,
                expanded: true
            },
            growYourWealth: {
                hasShortTermInvest: 'N',
                hasOverseaProperty: 'N',
                expanded: true
            }
        }
    });
    console.log("FHC saga fhcInitCreateData end");
}

function* fhcInitViewRecordsData() {
    yield put({
        type: CLEAN_ALL_ERROR_INFO
    });

    console.log("FHC saga fhcInitViewRecordsData begin.");
    let currentState = yield select();
    let sessionInfo = currentState.session;
    let params = {
        messageId: 'enquireFhcSummary',
        sessionInfo
    };
    let validatedParams = inputValidate(params);
    let beRequest = fpsConverter.enquireFhcSummaryConvertRequest(validatedParams);
    let beResponse = yield call(sendMessageWithTimeout, fpsService.process, beRequest);
    if (beResponse.isTimeout) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList: beResponse.errorList
        });
        return;
    }
    beResponse = outputValidateWithError(beResponse);

    if (beResponse.errorList.length > 0) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList: beResponse.errorList
        });
    }
    let result = fpsConverter.enquireFhcSummaryConvertResponse(beResponse.responseBody);
    console.log("enquireFhcSummary result", result);
    yield put({
        type: FHC_INIT_VIEW_RECORD_TAB_DONE,
        finHealthCheckSummaryList: result.finHealthCheckSummaryListDto
    });
    console.log("FHC saga fhcInitViewRecordsData end");
}

function* changeTabDone() {
    console.log("FHC saga changeTabDone");
}

function* retrieveQuestionnaireResponseDetail() {
    console.log("FHC retrieveQuestionnaireResponseDetail begin");
    let riskLevel = '0';
    let currentState=yield select();
    let sessionInfo=currentState.session;
    let rtqParams = { 
        customers:[],
		detailSearchCriteria:{searchFunctionCode:"L"},
		questionnaireKey:{},
		searchCriteria:[{
		    key:"QUES_TYPE_CDE",
		    value:"SOLE"
	    }],
        messageId:'retrieveQuestionnaireResponseDetail',
        questionnaireTypeCode:"RTQ",
        sessionInfo
    };
    let request=inputValidate(rtqParams); 
    let rtpRequest=qasConverter.retrieveQuestionnaireResponseDetailConvertRequest(request);

    let response = yield call(sendMessageWithTimeout, qasService.process, rtpRequest);
    console.log("retrieveQuestionnaireResponseDetail response", response);
    if (response.isTimeout) {   // already timeout, no need to handle the HTTP response or main body
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : response.errorList
        });
   } else {
        response = outputValidateWithError(response);
        if (response.errorList.length > 0) {
            yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList: response.errorList
            });
        } else {
            let rtqResult = qasConverter.retrieveQuestionnaireResponseDetailConvertResponse_FHC(response.responseBody);
            if (null != rtqResult.riskLevel) {
                riskLevel = rtqResult.riskLevel;
            }
        }
     }
    console.log("FHC retrieveQuestionnaireResponseDetail end",riskLevel);
    return riskLevel;
}

function* retrieveFHCDetailForCopyAsTemplate(param) {
    console.log("FHC retrieveFHCDetailForCopyAsTemplate begin",param);
    let result;
    let currentState=yield select();
    let sessionInfo=currentState.session;
    let requestParams = {
                messageId:'retrieveFhcDetail',
                financialCheckDate:param.record.financialHcDate,
                sessionInfo
        };
    let validatedParams=inputValidate(requestParams);
    let beRequest=fpsConverter.retrieveFhcDetailConvertRequest(validatedParams);

    let response = yield call(sendMessageWithTimeout, fpsService.process, beRequest);
    console.log("retrieveFHCDetailForCopyAsTemplate response", response);
    if (response.isTimeout) {   // already timeout, no need to handle the HTTP response or main body
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : response.errorList
        });
   } else {
        response = outputValidateWithError(response);
        if (response.errorList.length > 0) {
            yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList: response.errorList
            });
        } else {
            result=fpsConverter.retrieveCopyAsTemplateCovertResponse(response);
        }
     }
    console.log("FHC retrieveFHCDetailForCopyAsTemplate end",result);
    return result;
}

function* retrieveOneRecordData(param) {
    console.log("FHC saga retrieveOneRecordData start",param);
    const beCall1 = {"func" : retrieveQuestionnaireResponseDetail, "parm" : []};
    const beCall2 = {"func" : retrieveFHCDetailForCopyAsTemplate, "parm" : [param]};

    let [maxRiskLevel, result] = yield call(sendMessageWithParallel, beCall1, beCall2);
    if(null!=result){
        let formData = result.formData;
        formData.aboutMe.maxRiskLevel = maxRiskLevel;
        if(Number(formData.aboutMe.riskLevel)>Number(formData.aboutMe.maxRiskLevel)){
            formData.aboutMe.riskLevel = formData.aboutMe.maxRiskLevel;
        }
        console.log("FHC saga retrieveOneRecordData end",result);
        yield put({
            type: FHC_UPDATE_CREATE_FORM,
            formData
        });
    }
}

function* receiveRecordDetial(params) {
    console.log("FHC saga receiveRecordDetial params", params);
    let currentState = yield select();
    let sessionInfo = currentState.session;
    let requestParams = {
        messageId: 'retrieveFhcDetail',
        financialCheckDate: params.record.financialHcDate,
        sessionInfo
    };

    let validatedParams = inputValidate(requestParams);
    let beRequest = fpsConverter.retrieveFhcDetailConvertRequest(validatedParams);
    let beResponse = yield call(sendMessageWithTimeout, fpsService.process, beRequest);
    if (beResponse.isTimeout) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList: beResponse.errorList
        });
        return;
    }
    beResponse = outputValidateWithError(beResponse);

    if (beResponse.errorList.length > 0) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList: beResponse.errorList
        });
    } else {
        // let response=outPutValidate(beResponse);
        let result = fpsConverter.retrieveFhcDetailConvertResponse(beResponse.responseBody);
        if (result.overlayData != null) {
            result.overlayData.financialHcDate = params.record.financialHcDate;
            result.overlayData.staffId = params.record.staffId;
            result.overlayData.staffName = params.record.staffName;
            result.overlayData.showCopyAsTemplateFlag = params.record.showCopyAsTemplateFlag;

        }
        console.log("retrieveFhcDetail result", result.overlayData);

        yield put({
            type: FHC_GET_RECORD_DETIAL,
            overlayData: result.overlayData
        });
    }

}


function* savePriorityChanges(params) {
    yield put({
        type: CLEAN_ALL_ERROR_INFO
    });

    console.log("FHC saga savePriorityChanges params", params);

    let tempState = yield select();
    let sessionInfo = tempState.session;
    // params.sessionInfo=sessionInfo;
    console.log("savePriorityChanges sessionInfo", sessionInfo);

    let requestParams = {
        messageId: 'updateFhcResult',
        priorityChangesObject: params.priorityChangesObject
    };


    let validatedParams = inputValidate(requestParams);
    validatedParams.sessionInfo = sessionInfo;
    let beRequest = fpsConverter.updateFhcResultConvertRequest(validatedParams);
    console.log("savePriorityChanges beRequest", JSON.stringify(beRequest));
    let beResponse = yield call(sendMessageWithTimeout, fpsService.process, beRequest);
    if (beResponse.isTimeout) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList: beResponse.errorList
        });
        return;
    }
    beResponse = outputValidateWithError(beResponse);

    if (beResponse.errorList.length > 0) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList: beResponse.errorList
        });
    }
    // let response = outPutValidate(beResponse);

    console.log("savePriorityChanges beResponse", beResponse);


    //  yield put({ 
    //     type: FHC_GET_RECORD_DETIAL,
    //     overlayData:result.overlayData

    // });
}

function* calculateEducationCall() {
    console.log("FHC calculateEducationCall begin");
    let result;
    let currentState=yield select();
    let formData = currentState.fhc.formData;
    let calculationData = formData;
    let sessionInfo = currentState.session;
    calculationData.sessionInfo = sessionInfo;
    let calculateEducationParams = { messageId: "calculateEducation" };
    if (fhcConfig.calculationServiceProtocol === "WS") {
        calculateEducationParams = { messageId: "calculateEducation2" };
    }
    let calculateEducationRequest = inputValidate(calculateEducationParams);
    console.log("calculateEducationRequest", calculateEducationRequest);
    let convertedCalculateEducationRequest = fpsConverter.calculateEducationRequest(calculateEducationRequest, calculationData, "education");
    console.log("convertedCalculateEducationRequest", convertedCalculateEducationRequest);
    let response = yield call(sendMessageWithTimeout, fpsService.process, convertedCalculateEducationRequest);
    console.log("calculateEducationCall response", response);
    if (response.isTimeout) {   // already timeout, no need to handle the HTTP response or main body
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : response.errorList
        });
   } else {
        response = outputValidateWithError(response);
        if (response.errorList.length > 0) {
            yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList: response.errorList
            });
        } else {
            result = response.responseBody;
        }
     }
    console.log("FHC calculateEducationCall end",result);
    return result;
}

function* calculateRetirementCall() {
    console.log("FHC calculateRetirementCall begin");
    let result;
    let currentState=yield select();
    let formData = currentState.fhc.formData;
    let calculationData = formData;
    let sessionInfo = currentState.session;
    calculationData.sessionInfo = sessionInfo;
    let calculateRetirementParams = { messageId: "calculateRetirement" };
    if (fhcConfig.calculationServiceProtocol === "WS") {
        calculateRetirementParams = { messageId: "calculateRetirement2" };
    }
    let calculateRetirementRequest = inputValidate(calculateRetirementParams);
    console.log("calculateRetirementRequest", calculateRetirementRequest);
    let convertedCalculateRetirementRequest = fpsConverter.calculateRetirementRequest(calculateRetirementRequest, calculationData, "retirement");
    console.log("convertedCalculateRetirementRequest", convertedCalculateRetirementRequest);
    let response = yield call(sendMessageWithTimeout, fpsService.process, convertedCalculateRetirementRequest);
    console.log("calculateRetirementCall response", response);
    if (response.isTimeout) {   // already timeout, no need to handle the HTTP response or main body
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : response.errorList
        });
   } else {
        response = outputValidateWithError(response);
        if (response.errorList.length > 0) {
            yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList: response.errorList
            });
        } else {
            result = response.responseBody;
        }
     }
    console.log("FHC calculateRetirementCall end",result);
    return result;
}

function* calculateLifeCoverageCall() {
    console.log("FHC calculateLifeCoverageCall begin");
    let result;
    let currentState=yield select();
    let formData = currentState.fhc.formData;
    let calculationData = formData;
    let sessionInfo = currentState.session;
    calculationData.sessionInfo = sessionInfo;
    let calculateLifeCoverageParams = { messageId: "calculateLifeCoverage" };
    if (fhcConfig.calculationServiceProtocol === "WS") {
        calculateLifeCoverageParams = { messageId: "calculateLifeCoverage2" };
    }
    let calculateLifeCoverageRequest = inputValidate(calculateLifeCoverageParams);
    console.log("calculateLifeCoverageRequest", calculateLifeCoverageRequest);
    let convertedCalculateLifeCoverageRequest = fpsConverter.calculateLifeCoverageRequest(calculateLifeCoverageRequest, calculationData, "lifeCoverage");
    console.log("convertedCalculateLifeCoverageRequest", convertedCalculateLifeCoverageRequest);
    let response = yield call(sendMessageWithTimeout, fpsService.process, convertedCalculateLifeCoverageRequest);
    console.log("calculateLifeCoverageCall response", response);
    if (response.isTimeout) {   // already timeout, no need to handle the HTTP response or main body
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : response.errorList
        });
   } else {
        response = outputValidateWithError(response);
        if (response.errorList.length > 0) {
            yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList: response.errorList
            });
        } else {
            result = response.responseBody;
        }
     }
    console.log("FHC calculateLifeCoverageCall end",result);
    return result;
}

function* calculateCriticalIllnessCall() {
    console.log("FHC calculateCriticalIllnessCall begin");
    let result;
    let currentState=yield select();
    let formData = currentState.fhc.formData;
    let calculationData = formData;
    let sessionInfo = currentState.session;
    calculationData.sessionInfo = sessionInfo;
    let calculateCriticalIllnessParams = { messageId: "calculateCriticalIllness" };
    if (fhcConfig.calculationServiceProtocol === "WS") {
        calculateCriticalIllnessParams = { messageId: "calculateCriticalIllness2" };
    }
    let calculateCriticalIllnessRequest = inputValidate(calculateCriticalIllnessParams);
    console.log("calculateCriticalIllnessRequest", calculateCriticalIllnessRequest);
    let convertedCalculateCriticalIllnessRequest = fpsConverter.calculateCriticalIllnessRequest(calculateCriticalIllnessRequest, calculationData, "criticalIllness");
    console.log("convertedCalculateCriticalIllnessRequest", convertedCalculateCriticalIllnessRequest);
    let response = yield call(sendMessageWithTimeout, fpsService.process, convertedCalculateCriticalIllnessRequest);
    console.log("calculateCriticalIllnessCall response", response);
    if (response.isTimeout) {   // already timeout, no need to handle the HTTP response or main body
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : response.errorList
        });
   } else {
        response = outputValidateWithError(response);
        if (response.errorList.length > 0) {
            yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList: response.errorList
            });
        } else {
            result = response.responseBody;
        }
     }
    console.log("FHC calculateCriticalIllnessCall end",result);
    return result;
}

function* fhcCalculate() {
    console.log("start FHC calculate....");
    yield put({
        type: CLEAN_ALL_ERROR_INFO
    });

    let currentState = yield select();
    let formData = currentState.fhc.formData;
    let currentYear = (new Date()).getFullYear();
    let customerInfo = currentState.landing.customerInfo;
    let currentAge = currentYear-(new Date(customerInfo.birthDate)).getFullYear();
    formData.aboutMe.currentAge = currentAge;
    console.log("FHC calculate formData", formData);
    let sessionInfo = currentState.session;
    console.log("fhcCalculate.sessionInfo", sessionInfo);

    const educationCall = {"func" : calculateEducationCall, "parm" : []};
    const retirementCall = {"func" : calculateRetirementCall, "parm" : []};
    const lifeCoverageCall = {"func" : calculateLifeCoverageCall, "parm" : []};
    const criticalIllnessCall = {"func" : calculateCriticalIllnessCall, "parm" : []};

    const [educationResponse, retirementResponse, lifeCoverageResponse, criticalIllnessResponse] = 
        yield call(sendMessageWithParallel, educationCall, retirementCall, lifeCoverageCall,criticalIllnessCall);

    console.log("educationResponse", educationResponse);
    console.log("retirementResponse", retirementResponse);
    console.log("lifeCoverageResponse", lifeCoverageResponse);
    console.log("criticalIllnessResponse", criticalIllnessResponse);

    let getValueByKey = (response, key) => {
        let calculateResult = response.calculateResult;
        if (typeof calculateResult != "undefined" && calculateResult != null && calculateResult.length > 0) {
            let calculateResult0 = calculateResult[0];
            let calculateFinancialResult = calculateResult0.calculateFinancialResult;
            if (typeof calculateFinancialResult != "undefined" && calculateFinancialResult != null && calculateFinancialResult.length > 0) {
                let result = calculateFinancialResult.filter(p => p.key == key);
                if (result.length > 0) {
                    return result[0].value;
                }
            }
        }
        return null;
    };

    let getColor = (referenceAmt, achievedAmt) => {
        let color = '';
        if (referenceAmt != null && referenceAmt != 0) {
            let achievedPercent = achievedAmt / referenceAmt;
            color = achievedPercent >= 0.7 ? '#269792' : achievedPercent >= 0.35 ? '#E9A115' : '#E54D58';
        } else {
            color = 'E54D58';
        }
        return color;
    }

    let targetAmount, shortfall;
    let protectionResult;
    let result = formData.result;

    //   switch (calculationType) {
    //     case  "education":
    //let convertedResponse = fpsConverter.calculateEducationResponse(response);
    if (educationResponse != null) {
        targetAmount = getValueByKey(educationResponse, "targetAmount") || 0;
        shortfall = getValueByKey(educationResponse, "surplusShortfall") || 0;
        result.educationRemainAmt = shortfall < 0 ? -shortfall : 0;
        result.educationAchievedAmt = getValueByKey(educationResponse, "midReturn") || 0;
        result.education = (shortfall < 0 ? -shortfall : 0);
        result.educationTargetAmt = targetAmount;
        result.educationColor = getColor(targetAmount, result.educationAchievedAmt);
        result.educationCurrency = fhcConfig.currencyCodeForInputField;
        result.educationRemainYear = formData.education.yearTillEnterSchool;
        //break;
    }
    // case "retirement":
    if (retirementResponse != null) {
        targetAmount = getValueByKey(retirementResponse, "targetAmount") || 0;
        shortfall = getValueByKey(retirementResponse, "surplusShortfall") || 0;
        result.retirement = (shortfall < 0 ? -shortfall : 0);
        result.retirementTargetAmt = targetAmount;
        result.retirementRemainAmt = shortfall < 0 ? -shortfall : 0;
        result.retirementAchievedAmt = getValueByKey(retirementResponse, "midReturn") || 0;
        result.retirementColor = getColor(targetAmount, result.retirementAchievedAmt);
        result.retirementRemainYear = formData.retirement.targetRetireAge - formData.aboutMe.currentAge;
        result.retirementCurrency = fhcConfig.currencyCodeForInputField;
        //break;
    }
    // case "lifeCoverage":
    if (lifeCoverageResponse) {
        protectionResult = lifeCoverageResponse.protectionResult[0];
        targetAmount = protectionResult.youNeed;
        shortfall = protectionResult.shortfall;
        result.lifeCoverage = (shortfall < 0 ? -shortfall : 0);
        result.lifeCoverageAchievedAmt = protectionResult.youHave;
        result.lifeCoverageRemainAmt = shortfall < 0 ? -shortfall : 0;
        result.lifeCoverageTargetAmt = targetAmount;
        result.lifeCoverageColor = getColor(targetAmount, result.lifeCoverageAchievedAmt);
        result.lifeCoverageRemainYear = formData.criticalIllness.yearToSupport; //TODO: TBC
        result.lifeCoverageCurrency = fhcConfig.currencyCodeForInputField;
        //  break;
    }
    if (criticalIllnessResponse != null) {
        //  case "criticalIllness": 
        protectionResult = criticalIllnessResponse.protectionResult[0];
        targetAmount = protectionResult.youNeed;
        shortfall = protectionResult.shortfall;
        result.criticalIllness = (shortfall < 0 ? -shortfall : 0);
        result.criticalIllnessAchievedAmt = protectionResult.youHave;
        result.criticalIllnessRemainAmt = shortfall < 0 ? -shortfall : 0;
        result.criticalIllnessTargetAmt = targetAmount;
        result.criticalIllnessColor = getColor(targetAmount, result.criticalIllnessAchievedAmt);
        result.criticalIllnessRemainYear = formData.criticalIllness.yearToSupport;
        result.criticalIllnessCurrency = fhcConfig.currencyCodeForInputField;
        //  break;
    }
    //  }
    // });

    result.totalCoverageGapCcy = fhcConfig.currencyCodeForInputField;
    result.totalCoverageGapAmt = result.lifeCoverage + result.criticalIllness;
    result.totalSavingGapCcy = fhcConfig.currencyCodeForInputField;
    result.totalSavingGapAmt = result.education + result.retirement;
    result.expanded = true;
    formData.alreadyCalculated = true;

    console.log("end FHC calculate....");
    yield put({
        type: FHC_UPDATE_CREATE_FORM,
        formData
    });

    let validatedsaveFhcResultParams = inputValidate({ messageId: 'updateFhcResult', formData, sessionInfo });
    let saveFhcResultBeRequest = fpsConverter.saveFhcResultConvertRequest(validatedsaveFhcResultParams, 'CALCULATEACTION');
    yield call(fpsService.process, saveFhcResultBeRequest);
    console.log("finish to call CALCULATEACTION to save FHC ....");
}

function* fhcSaveAndContinue() {
    yield put({
        type: CLEAN_ALL_ERROR_INFO
    });

    console.log("FHC saga fhcSaveAndContinue begin");
    let currentState = yield select();
    let sessionInfo = currentState.session;
    let formData = currentState.fhc.formData;
    let requestParams = {
        messageId: 'updateFhcResult',
        formData,
        sessionInfo
    };
    let validatedParams = inputValidate(requestParams);
    let beRequest = fpsConverter.saveFhcResultConvertRequest(validatedParams, 'SAVEACTION');
    let beResponse = yield call(sendMessageWithTimeout, fpsService.process, beRequest);
    if (beResponse.isTimeout) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList: beResponse.errorList
        });
        return;
    }
    beResponse = outputValidateWithError(beResponse);

    if (beResponse.errorList.length > 0) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList: beResponse.errorList
        });
    } else {
        // let response=outPutValidate(beResponse);
        let result = fpsConverter.saveFhcResultConvertResponse(beResponse.responseBody);
        console.log("fhcSaveAndContinue result", result);

        yield put({
            type: FHC_UPDATE_CREATE_FORM,
            formData: formData
        });
        console.log("FHC saga fhcSaveAndContinue end");
    }
}

export default function* () {
    yield [
        takeEvery(FHC_INIT_CREATE_TAB, fhcInitCreateData),
        takeEvery(FHC_INIT_VIEW_RECORD_TAB, fhcInitViewRecordsData),
        takeEvery(FHC_CHANGE_TAB_DONE, changeTabDone),
        takeEvery(FHC_COPY_AS_TEMPLATE, retrieveOneRecordData),
        takeEvery(FHC_RECEIVE_RECORD_DETIAL, receiveRecordDetial),
        takeEvery(FHC_SAVE_PRIORITY_CHANGES, savePriorityChanges),
        takeEvery(FHC_CALCULATE, fhcCalculate),
        takeEvery(FHC_SAVE_AND_CONTINUE, fhcSaveAndContinue)


    ]
}