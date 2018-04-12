import { call, put, select, takeEvery, takeLatest, compose, fork } from 'redux-saga/effects';
import {
    DASHBOARD_INIT, DASHBOARD_UPDATE_FNA, DASHBOARD_UPDATE_KE, DASHBOARD_UPDATE_RTQ, DASHBOARD_UPDATE_FNA_DATA, DASHBOARD_UPDATE_FNA_DATA_UPDATE,
    DASHBOARD_INIT_FNA_DATA, DASHBOARD_INIT_IPDETAIL, DASHBOARD_INIT_IPDETAIL_UPDATE, DASHBOARD_INIT_FHCSUMMARY, DASHBOARD_UPDATE_FHCSUMMARY_DATE,
    DASHBOARD_INIT_ASSETSMIX, DASHBOARD_INIT_ASSETSMIX_UPDATE,DASHBOARD_UPDATE_FHCSUMMARY_RECORED_STATE
} from '../FinancialPlanning/landing/actions/landing_act';
import { UPDATE_ERROR_INFO, CLEAN_ALL_ERROR_INFO, UPDATE_MESSAGE_BOX } from 'common/actions/nav';
//import {api} from "../services/landing";
import {
    UPDATE_SESSION
} from '../common/actions/session'
import { callMessage } from "../services/baseService";
import keConfig from "../config/keConfig";
import { api } from "../services/landing";
import fpsService from '../services/FPS/fpsService'
import fpsConverter from '../services/FPS/fpsConverter';
import { inputValidate, outPutValidate, outPutValidateForRestService, outputValidateWithError } from '../services/commonService/validate';
import qasService from '../services/QAS/qasService'
import qasConverter from '../services/QAS/qasConverter';
import fnaConverter from '../services/FPS/fna/fnaConverter'
import { sendMessageWithTimeout } from "./common_sga";
function* initDashboardData(request) {
    console.log('initDashboardData excute in Saga');
    let tempState = yield select();
    console.log("tempState", tempState);
    let rtqResult, requestConverter, response, result, keResult;
    let keParams = {
        customers: [],
        detailSearchCriteria: { searchFunctionCode: "L" },
        questionnaireKey: {},
        searchCriteria: [{
            key: "QUES_TYPE_CDE",
            value: "SOLE"
        }],
        messageId: 'retrieveQuestionnaireResponseDetail',
        questionnaireTypeCode: "KE",
    };
    request = inputValidate(keParams);
    console.log("testSessionInfo", tempState.session);
    request["sessionInfo"] = tempState.session;
    requestConverter = qasConverter.retrieveQuestionnaireResponseDetailConvertRequest(request);
    response = yield call(sendMessageWithTimeout, qasService.process, requestConverter);
    // result=outPutValidate(response);
    if (response.isTimeout) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList: response.errorList
        });
        return;
    }
    response = outputValidateWithError(response);

    if (response.errorList.length > 0) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList: response.errorList
        });
    } else {
        keResult = qasConverter.retrieveQuestionnaireResponseDetailConvertResponse_KE(response.responseBody);
        console.log("retrieve KE KERequest", keResult);
        if (keResult === undefined) {
            keResult = {
                keQuestionaire: {},
                keResult: [],
                lastDateTime: null
            }
        }
        yield put({
            type: DASHBOARD_UPDATE_KE,
            keQuestionaire: keResult.keQuestionaire,
            keResult: keResult.keResult,
            lastDateTime: keResult.lastDateTime
        });
    }

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
    };
    console.log("in initFlowDataToMessage RTQ", rtqParams);
    request = inputValidate(rtqParams);
    request["sessionInfo"] = tempState.session;
    requestConverter = qasConverter.retrieveQuestionnaireResponseDetailConvertRequest(request);
    response = yield call(sendMessageWithTimeout,qasService.process, requestConverter);
    if (response.isTimeout) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : response.errorList
        });
        return;
    }
    response = outputValidateWithError(response);
	
    if (response.errorList.length > 0) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : response.errorList
        });
    }else{
         // result=outPutValidate(response);
    rtqResult = qasConverter.retrieveQuestionnaireResponseDetailConvertResponse_RTQ(response.responseBody);
    console.log("retrieve rtq rtqRequest", requestConverter);
    console.log("retrieve rtq response", response);
    console.log("retrieve rtq result", rtqResult);


    tempState.session.riskLevel = rtqResult.riskLevel
    yield put({
        type: UPDATE_SESSION,
        tempState
    })

    yield put({
        type: DASHBOARD_UPDATE_RTQ,
        rtqResult
    });
    console.log("riskLevel----landing-----------" + rtqResult.riskLevel);
    if (rtqResult.riskLevel == "") {
        console.log("riskLevel----landing-----------");
        // yield put({
        //     type:UPDATE_ERROR_INFO,
        //     errors:{
        //         warningList:[{
        //             errorCode:"FPSW0001",
        //              title:"FPSW0001_Title"
        //         }]
        //     }
        // });
    }
    }
   

}

function* dashboardUpdateFNAData(params) {
    yield put({
        type: CLEAN_ALL_ERROR_INFO
    });
    console.log('dashboardUpdateFNAData excute...');
    let fnaResult = {};
    if (request.inputAmount == 1) {
        fnaResult = { ...fnaResult, totalMonthlyIncome: 10000 }
    } else if (request.inputAmount == 2) {
        fnaResult = { ...fnaResult, totalMonthlyIncome: 20000 }
    } else {
        fnaResult = { ...fnaResult, totalMonthlyIncome: 5000 }
    }

    yield put({
        type: DASHBOARD_UPDATE_FNA_DATA_UPDATE,
        fnaResult
    });
}

function* dashboardInitFNAData(params) {
    yield put({
        type: CLEAN_ALL_ERROR_INFO
    });
    console.log('dashboardInitFNAData start...');
    let fnaResult, request, requestConverter, response, result;
    let fnaParams = params.fnaParams;

    let tempState = yield select();
    let sessionInfo = tempState.session;
    fnaParams.sessionInfo = sessionInfo
    // request=inputValidate(fnaParams); 
    // requestConverter=fpsConverter.retrieveFinancialSituationDataConvertRequest(request);
    // response=yield call (fpsService.process,requestConverter);
    // result=outPutValidate(response);
    // fnaResult=fpsConverter.retrieveFinancialSituationDataConvertResponse(result);


    request = inputValidate(fnaParams);

    requestConverter = fnaConverter.retrieveFinancialSituationDataConvertRequest(request);
    response = yield call(sendMessageWithTimeout, fpsService.process, requestConverter);
    response = outputValidateWithError(response);
    if (response.isTimeout) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList: response.errorList
        });
        return;
    }
    if (response.errorList.length > 0) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList: response.errorList
        });
    } else {
        fnaResult = fnaConverter.retrieveFinancialSituationDataConvertResponse(response.responseBody);
    }

    console.log("FNA fnaResult", fnaResult);
    yield put({
        type: DASHBOARD_UPDATE_FNA_DATA_UPDATE,
        fnaResult
    });
}

function* initInvolvedPartyDetail(params) {
    let request, requestConverter, response, customerInfo, ipDetailRequest, result,
        assetsParams, assetsRequest, assetsRequestConverter, assetsResponse, depositeConstentCode;
    ipDetailRequest = params.ipDetailRequest;
    let tempState = yield select();

    request = inputValidate(ipDetailRequest);
    //console.log("ipDetailinputValidate:",request);
    requestConverter = fpsConverter.retrieveInvolvedPartyDetailsIndividualConvertRequest(request);
    //console.log("requestConverter:",requestConverter);
    //response=yield call (fpsService.process,requestConverter);
    response = yield call(sendMessageWithTimeout, fpsService.process, requestConverter);
    if (response.isTimeout) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList: response.errorList
        });
        return;
    }
    //result=outPutValidate(response);
    //customerInfo=fpsConverter.retrieveInvolvedPartyDetailsIndividualConvertResponse(response);
    response = outputValidateWithError(response);
    if (response.errorList.length > 0) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList: response.errorList
        });
        return;
    } else {
        customerInfo = fpsConverter.retrieveInvolvedPartyDetailsIndividualConvertResponse(response.responseBody);
    }

    assetsParams = params.assetsParams;

    //console.log("assetsRequest:",assetsParams);
    assetsRequest = inputValidate(assetsParams);
    assetsRequestConverter = fnaConverter.retrieveFinancialSituationReferenceRecordAssetsRequest(assetsRequest);
    //console.log("assetsRequestConverter",assetsRequestConverter);
    //assetsResponse=yield call (fpsService.process,assetsRequestConverter);
    assetsResponse = yield call(sendMessageWithTimeout, fpsService.process, assetsRequestConverter);
    console.log("assetsResponse:", assetsResponse);
    if (assetsResponse.isTimeout) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList: assetsResponse.errorList
        });
        return;
    }
    assetsResponse = outputValidateWithError(assetsResponse);
    // console.log("assetsResult",assetsResult);
    /*    yield put ({
                type:'REST_RESPONSE_VALIDATE',
                response:assetsResponse.responseBody
    
        });
        if(!assetsErrorFlag){
            depositeConstentCode=fpsConverter.retrieveFinancialSituationReferenceRecordAssetsConvertResponse(assetsResponse);
            yield put({
                type: DASHBOARD_INIT_IPDETAIL_UPDATE,
                customerInfo,depositeConstentCode
            });
        }*/
    if (assetsResponse.errorList.length > 0) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList: assetsResponse.errorList
        });
    } else {
        depositeConstentCode = fpsConverter.retrieveFinancialSituationReferenceRecordAssetsConvertResponse(assetsResponse.responseBody);
        yield put({
            type: DASHBOARD_INIT_IPDETAIL_UPDATE,
            customerInfo, depositeConstentCode
        });
    }


}


function* initFhcSummaryDetail() {
    yield put({
        type: CLEAN_ALL_ERROR_INFO
    });
    console.log("FHC saga initFhcSummaryDetail begin.");
    let financialFHcObj;
    let tempState = yield select();
    let sessionInfo = tempState.session;
    let params = {
        messageId: 'enquireFhcSummary',
        sessionInfo

    };
    let haveFHCRecord = false;
    // params.sessionInfo = sessionInfo;
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
    } else {
       
        let result = fpsConverter.enquireFhcSummaryConvertResponse(beResponse.responseBody);
        console.log("enquireFhcSummary result", result);
        if (result.finHealthCheckSummaryListDto.length > 0) {
            haveFHCRecord = true;
            financialFHcObj = result.finHealthCheckSummaryListDto[0];
            console.log("FHC saga receiveRecordDetial financialFHcObj", financialFHcObj);
            let requestParams = {
                messageId: 'retrieveFhcDetail',
                financialCheckDate: financialFHcObj.financialHcDate,
                sessionInfo
            };
            let validatedFhcDetialParams = inputValidate(requestParams);
            let fhcDetialRequest = fpsConverter.retrieveFhcDetailConvertRequest(validatedFhcDetialParams);
            let fhcDetialResponse = yield call(sendMessageWithTimeout, fpsService.process, fhcDetialRequest);

            if (fhcDetialResponse.isTimeout) {
                yield put({
                    type: UPDATE_MESSAGE_BOX,
                    errorList: fhcDetialResponse.errorList
                });
                return;
            }
            fhcDetialResponse = outputValidateWithError(fhcDetialResponse);
            if (fhcDetialResponse.errorList.length > 0) {
                yield put({
                    type: UPDATE_MESSAGE_BOX,
                    errorList: fhcDetialResponse.errorList
                });
            } else {
                // let validatefhcDetialResponse=outPutValidate(fhcDetialResponse);
                let finalFhcDetialResult = fpsConverter.retrieveFhcDetailConvertResponse(fhcDetialResponse.responseBody);
                if (finalFhcDetialResult.overlayData != null) {
                    finalFhcDetialResult.overlayData.financialHcDate = financialFHcObj.financialHcDate;
                    finalFhcDetialResult.overlayData.staffId = financialFHcObj.staffId;
                    finalFhcDetialResult.overlayData.staffName = financialFHcObj.staffName;
                    finalFhcDetialResult.overlayData.showCopyAsTemplateFlag = financialFHcObj.showCopyAsTemplateFlag;
                }
                console.log("retrieveFhcDetail finalFhcDetialResult", finalFhcDetialResult);
                yield put({
                    type: DASHBOARD_UPDATE_FHCSUMMARY_DATE,
                    overlayData: finalFhcDetialResult.overlayData,
                    financialFHcObj: financialFHcObj,
                    haveFHCRecord:haveFHCRecord
                });
                console.log("FHC saga initFhcSummaryDetail end");
            }
        }else{
            
            yield put({
                type: DASHBOARD_UPDATE_FHCSUMMARY_RECORED_STATE,
                haveFHCRecord:haveFHCRecord
            });
        }


    }



}

function* initAssetsMix(params) {
    yield put({
        type: CLEAN_ALL_ERROR_INFO
    });

    let assetsMixRequest,assetsMixRequestConverter,customerInfo,assetsMixResult,
        invHoldingsRequest,invHoldingsRequestConverter,invHoldingsResult;
    let tempState=yield select();
    let sessionInfo=tempState.session;
    console.log("initAssetsMix-----sessionInfo",sessionInfo);
    let assetsMixParams = { 
		filterCriteria :{
                    staffId: "29000101",
                    customerNumber: "Q8360330"
                        },
        messageId:'assetConcentrationCalculationGetHolding'
    };

    assetsMixRequest=inputValidate(assetsMixParams);
    assetsMixRequestConverter=fpsConverter.retrieveAssetConcentrationCalculationGetHoldingConvertRequest(assetsMixRequest);
    //let assetsMixResponse=yield call (sendMessageWithTimeout,fpsService.process,assetsMixRequestConverter);
    
    let invHoldingsParams = {
        filterCriteria :{
            staffId: "29000101",
            customerNumber: "Q8360330"
                        },
        messageId:'assetConcentrationCalculationGetHolding'
    };
    invHoldingsRequest = inputValidate(invHoldingsParams);
    invHoldingsRequestConverter = fpsConverter.retrieveFinancialSituationReferenceRecordServiceAssetsConvertRequest(invHoldingsRequest);
    //let invHoldingsResponse = yield call(sendMessageWithTimeout,fpsService.process,invHoldingsRequestConverter);

    let [assetsMixResponse, invHoldingsResponse]= yield [
        call(sendMessageWithTimeout,fpsService.process, assetsMixRequestConverter),
        call(sendMessageWithTimeout,fpsService.process, invHoldingsRequestConverter)
    ];

    if (assetsMixResponse.isTimeout) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : response.errorList
        });
        return;
    }

    assetsMixResponse = outputValidateWithError(assetsMixResponse);

    if (assetsMixResponse.errorList.length > 0) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList: assetsMixResponse.errorList
        });
    } else {
        assetsMixResult=fpsConverter.retrieveAssetConcentrationCalculationGetHoldingConvertResponse(assetsMixResponse.responseBody);
        console.log("initAssetsMix-----------assetsMixResult",assetsMixResult);
    }


    if (invHoldingsResponse.isTimeout) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : invHoldingsResponse.errorList
        });
        return;
    }

    invHoldingsResponse = outputValidateWithError(invHoldingsResponse);
    
    if (invHoldingsResponse.errorList.length > 0) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList: invHoldingsResponse.errorList
        });
    } else {
        invHoldingsResult = fpsConverter.retrieveFinancialSituationReferenceRecordServiceAssetsConvertResponse(invHoldingsResponse.responseBody);
        console.log("initAssetsMix-----------invHoldingsResult",invHoldingsResult);
    }

    yield put({
        type: DASHBOARD_INIT_ASSETSMIX_UPDATE,
        assetsMixResult,
        invHoldingsResult
    });
}


const fetchCurrentTopic = (dispatch, state) => {

};

export default function* () {
    yield [
        takeEvery(DASHBOARD_INIT, initDashboardData),
        takeEvery(DASHBOARD_UPDATE_FNA_DATA, dashboardUpdateFNAData),
        takeEvery(DASHBOARD_INIT_FNA_DATA, dashboardInitFNAData),
        takeEvery(DASHBOARD_INIT_IPDETAIL, initInvolvedPartyDetail),
        takeEvery(DASHBOARD_INIT_FHCSUMMARY, initFhcSummaryDetail),
        takeEvery(DASHBOARD_INIT_ASSETSMIX, initAssetsMix)
    ]
}