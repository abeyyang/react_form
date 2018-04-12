import { call, put, select, takeEvery, takeLatest, compose,fork, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
    GOALSIMULATOR_RETRIEVE_PLANNING_YOUR_RETIREMENT,
	GOALSIMULATOR_RETRIEVE_PLANNING_YOUR_RETIREMENT_DONE,
	GOALSIMULATOR_CALCULATE_PLANNING_YOUR_RETIREMENT,
	GOALSIMULATOR_CALCULATE_PLANNING_YOUR_RETIREMENT_DONE,
	GOALSIMULATOR_RECORD_PLANNING_YOUR_RETIREMENT,
	GOALSIMULATOR_RECORD_PLANNING_YOUR_RETIREMENT_DONE,
	GOALSIMULATOR_RETRIEVE_PLANNING_YOUR_CHILDREN_FUTURE,
	GOALSIMULATOR_RETRIEVE_PLANNING_YOUR_CHILDREN_FUTURE_DONE,
	GOALSIMULATOR_CALCULATE_PLANNING_YOUR_CHILDREN_FUTURE,
	GOALSIMULATOR_CALCULATE_PLANNING_YOUR_CHILDREN_FUTURE_DONE,
	GOALSIMULATOR_RECORD_PLANNING_YOUR_CHILDREN_FUTURE,
	GOALSIMULATOR_RECORD_PLANNING_YOUR_CHILDREN_FUTURE_DONE,
	GOALSIMULATOR_RETRIEVE_GROWING_YOUR_WEALTH,
	GOALSIMULATOR_RETRIEVE_GROWING_YOUR_WEALTH_DONE,
	GOALSIMULATOR_CALCULATE_GROWING_YOUR_WEALTH,
	GOALSIMULATOR_CALCULATE_GROWING_YOUR_WEALTH_DONE,
	GOALSIMULATOR_RECORD_GROWING_YOUR_WEALTH,
	GOALSIMULATOR_RECORD_GROWING_YOUR_WEALTH_DONE,
	GOALSIMULATOR_RETRIEVE_PROTECTION_PLANNING,
	GOALSIMULATOR_RETRIEVE_PROTECTION_PLANNING_DONE,
	GOALSIMULATOR_CALCULATE_PROTECTION_PLANNING,
	GOALSIMULATOR_CALCULATE_PROTECTION_PLANNING_DONE,
	GOALSIMULATOR_RECORD_PROTECTION_PLANNING,
	GOALSIMULATOR_RECORD_PROTECTION_PLANNING_DONE,
	GOALSIMULATOR_CALCULATE_RISK_CAPACITY,
	GOALSIMULATOR_CALCULATE_RISK_CAPACITY_DONE,
    GOALSIMULATOR_INIT_DATA,
    GOALSIMULATOR_INIT_DATA_DONE
} from '../FinancialPlanning/goalSimulator/actions/goalSimulator_act';

import {CLEAN_ALL_ERROR_INFO, UPDATE_MESSAGE_BOX} from "../common/actions/nav";
import qasService from '../services/QAS/qasService';
import qasConverter from '../services/QAS/qasConverter';
import {inputValidate,outPutValidate,outputValidateWithError} from '../services/commonService/validate';
import fpsConverter from '../services/FPS/fpsConverter';
import fpsService from '../services/FPS/fpsService';
import {sendMessageWithTimeout, sendMessageWithParallel} from "./common_sga";

function* retrievePlanningYourRetirement(){
    console.log("retrieve Planning Your Retirement begin.");
    let params = {
                messageId:'retrievePlanningYourRetirement'
        };

    let validatedParams=inputValidate(params);
    let beRequest=fpsConverter.retrievePlanningYourRetirementConvertRequest(validatedParams);
    let beResponse=yield call (fpsService.process,beRequest);
    // let response=outPutValidate(beResponse);
    let result=fpsConverter.retrievePlanningYourRetirementConvertResponse(beResponse);

    console.log("retrievePlanningYourRetirement result",result);
    yield put({ 
        type: GOALSIMULATOR_RETRIEVE_PLANNING_YOUR_RETIREMENT_DONE,
        testResult: result.testResult
    });

    console.log("retrieve Planning Your Retirement end");
}

function* calculatePlanningYourRetirement(){
    console.log("calculate Planning Your Retirement begin.");
    yield put({
        type: CLEAN_ALL_ERROR_INFO
    });
    let currentState = yield select();
    let fieldsDetail = currentState.goalSimulator.fieldsDetail;
    let fhcDetail = currentState.goalSimulator.fhcDetail;
    console.log("calculate Planning Your Retirement", fieldsDetail);
    let retirementDetails = {
        targetRetireAge : fhcDetail.retireAge,
        postRetireYear : fhcDetail.liveUntil - fhcDetail.retireAge,
        monthlyExpAmt : fhcDetail.monthlyExpenses,
        savingForRetireAmt : fhcDetail.currentSaving,
        fundAmount : fieldsDetail.lumpSumAmount,
        fundMonthlyAmount : fieldsDetail.monthlyInvestedAmount
    };
    let aboutMeDetails = {
        riskLevel : fieldsDetail.riskLevelSelected,
        currentAge : fhcDetail.currentAge
    };
    let sessionInfo = currentState.session;
    console.log("calculate Planning Your Retirement session from state", sessionInfo);
    sessionInfo = {
        "businessLine":"PFS",
        "lineOfBusinessCode" : "PFS",
        "channelId":"OHB",
        "countryCode":"HK",
        "employeeUserId":"IA77777",
        "groupMember":"HBAP",
        "hubUserId":"WD01",
        "hubWorkstationId":"WD01"
    }
    let calculationData = {
        retirement : retirementDetails,
        aboutMe : aboutMeDetails,
        sessionInfo : sessionInfo
    }
    console.log("calculate Planning Your Retirement calculation data", sessionInfo);

    let params = {
        messageId:"calculateRetirement2"
    };

    let validatedParams=inputValidate(params);
    console.log("calculatePlanningYourRetirement", validatedParams);
    let beRequest=fpsConverter.calculateRetirementRequest(validatedParams, calculationData, "retirement");
    console.log("calculatePlanningYourRetirement converted", beRequest);

    let messageResponse=yield call (sendMessageWithTimeout, fpsService.process,beRequest);
    console.log("calculate planning your retirement", messageResponse);
    if (messageResponse.isTimeout) {   // already timeout, no need to handle the HTTP response or main body
        console.log("calculate planning your retirement");
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : messageResponse.errorList
        });
   } else {
        messageResponse = outputValidateWithError(messageResponse);
        if (messageResponse.errorList.length > 0) {
            yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList : messageResponse.errorList
            });
        } else {
            let result=fpsConverter.calculatePlanningYourRetirementConvertResponse(messageResponse.responseBody);
            let calculateResult = {};
            let returnTargetAmount = 0;
            let returnCompletedAmount = 0;
            if(null != result && null != result.calculateResult && result.calculateResult.length > 0){
                for (let i = 0; i < result.calculateResult.length; i++) {
                    if ('R' === result.calculateResult[i].simulateSegmentIndicator) {
                        calculateResult = result.calculateResult[i];
                        if (calculateResult.calculateFinancialResult) {
                            returnTargetAmount = getFinancialResult(calculateResult.calculateFinancialResult, "targetAmount");
                            returnCompletedAmount = getFinancialResult(calculateResult.calculateFinancialResult, "achievedAmt");
                        }
                        break;
                    }
                }
            }

            console.log("calculatePlanningYourRetirement calculateResult", calculateResult);
            yield put({
                type: GOALSIMULATOR_CALCULATE_PLANNING_YOUR_RETIREMENT_DONE,
                calculateResult: calculateResult,
                returnTargetAmount: returnTargetAmount,
                returnCompletedAmount: returnCompletedAmount
            });
        }
     }
     console.log("calculate Planning Your Retirement end");
}

function* recordPlanningYourRetirement(){
    console.log("record Planning Your Retirement begin.");
    yield put({
        type: CLEAN_ALL_ERROR_INFO
    });
    let currentState = yield select();
    let sessionInfo = currentState.session;
    console.log("record Planning Your Retirement session from state", sessionInfo);
    sessionInfo = {
        "businessLine":"PFS",
        "lineOfBusinessCode" : "PFS",
        "channelId":"OHB",
        "countryCode":"HK",
        "employeeUserId":"IA77777",
        "groupMember":"HBAP",
        "hubUserId":"WD01",
        "hubWorkstationId":"WD01"
    }
    console.log("Record Planning Your Retirement session", sessionInfo);
    let params = {
        messageId:"recordPlanningYourRetirement"
    };

    let validatedParams=inputValidate(params);
    let beRequest=fpsConverter.recordPlanningYourRetirementConvertRequest(validatedParams);
    let messageResponse=yield call (sendMessageWithTimeout, fpsService.process, beRequest);
    if (messageResponse.isTimeout) {   // already timeout, no need to handle the HTTP response or main body
        console.log("record planning your retirement");
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : messageResponse.errorList
        });
    } else {
        messageResponse = outputValidateWithError(messageResponse);
        if (messageResponse.errorList.length > 0) {
            yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList : messageResponse.errorList
            });
        } else {
            let result=fpsConverter.recordPlanningYourRetirementConvertResponse(messageResponse.responseBody);
            
            console.log("recordPlanningYourRetirement result", result);
            yield put({
                type: GOALSIMULATOR_RECORD_PLANNING_YOUR_RETIREMENT_DONE,
                testResult: result
            });
        }
    }
    console.log("record Planning Your Retirement end");
}

function* calculateGrowingYourWealth(){
    console.log("calculate growing your wealth begin.");
    let params = {
            messageId:'calculateGrowingYourWealth'
    };

    let currentState = yield select();
    let calculationData = {};

    let fieldsDetail = currentState.goalSimulator.fieldsDetail;
    console.log("Calculate GYW fieldsDetail", fieldsDetail);
    calculationData.fieldsDetail = fieldsDetail;

    let sessionInfo=currentState.session;
    console.log("Calculate GYW sessionInfo", sessionInfo);
    calculationData.sessionInfo=sessionInfo;

    let validatedParams=inputValidate(params);
    let beRequest=fpsConverter.calculateGrowingYourWealthConvertRequest(validatedParams, calculationData);
    let beResponse=yield call (fpsService.process,beRequest);
    // let response=outPutValidate(beResponse);
    let result=fpsConverter.calculateGrowingYourWealthConvertResponse(beResponse);

    let calculateResult = {};
    if(null != result && null != result.calculateResult && result.calculateResult.length > 0){
        for (let i = 0; i < result.calculateResult.length; i++) {
            if ('R' === result.calculateResult[i].simulateSegmentIndicator) {
                calculateResult = result.calculateResult[i];
                break;
            }
        }
    }

    console.log("calculateGrowingYourWealth calculateResult", calculateResult);
    yield put({ 
        type: GOALSIMULATOR_CALCULATE_GROWING_YOUR_WEALTH_DONE,
        calculateResult: calculateResult
    });

    console.log("calculate growing your wealth end");
}

function* calculateRiskCapacityAll() {
    console.log("calculate risk capacity all");
    yield put({
        type: CLEAN_ALL_ERROR_INFO
    });
    //yield put({
    //    type: SHOW_LOADING_ICON
    //})
    const beRequest = {
        messageId:'calculateRiskCapacity',
        sessionInfo: null, 
        calculateRiskCapacity: {}
    };
    const beCall1 = {"func" : calculateRiskCapacity, "parm" : []};
    const beCall2 = {"func" : delay, "parm" : [5000]};
    const beCall3 = {"func" : fpsService.process, "parm" : [beRequest]};
    
    let [beResponse1, beResponse2, beResponse3] = yield call(sendMessageWithParallel, beCall1, beCall2, beCall3);
    //beResponse1 = outputValidateWithError(beResponse1);
    
    /*if (beResponse1.errorList.length > 0) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : beResponse1.errorList
        });
    }*/
    if (beResponse2.errorList && beResponse2.errorList.length > 0) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : beResponse2.errorList
        });
    }
    if (beResponse3.errorList.length > 0) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : beResponse3.errorList
        });
    }
    //yield put({
    //    type: GOALSIMULATOR_CALCULATE_RISK_CAPACITY_DONE,
    //    riskResult: "3"
    //});
    //yield put({
    //    type: HIDE_LOADING_ICON
    //})
    console.log("calculate risk capacity all end");
}

function* calculateRiskCapacity() {
    console.log("calculate risk capacity");
    yield put({
        type: CLEAN_ALL_ERROR_INFO
    });
    let currentState = yield select();
    let sessionInfo = currentState.session;

    console.log("calculate risk capacity session", sessionInfo);
    const params = {
        messageId:"calculateRiskCapacity",
        sessionInfo: null, 
        riskLevel : currentState.goalSimulator.fieldsDetail.riskLevelSelected,
        yearOfInvestment : currentState.goalSimulator.fieldsDetail.yearOfInvestment,
        goalType : "growYourWealth"
    };
    let beRequest=fpsConverter.calculateRiskConvertRequest(params);
    console.log("calculate risk capacity request after convert", beRequest);
    let messageResponse = yield call(sendMessageWithTimeout, fpsService.process, beRequest);
    console.log("calculate risk capacity", messageResponse);
    if (messageResponse.isTimeout) {   // already timeout, no need to handle the HTTP response or main body
        console.log("calculate risk capacity timeout");
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : messageResponse.errorList
        });
   } else {
        messageResponse = outputValidateWithError(messageResponse);
        // we can handle customized error handing here, before sending to UPDATE_MESSAGE_BOX
        // e.g. remove any OBS0000 error code, change errorLevel to 4 if SFP0001 is encountered, etc
        if (messageResponse.errorList.length > 0) {
            yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList : messageResponse.errorList
            });
        } else {
            const beResponse = messageResponse.responseBody;
           
            yield put({
                type: GOALSIMULATOR_CALCULATE_RISK_CAPACITY_DONE,
                riskResult: beResponse.calculatedRiskCapacity.riskCapacityLevelNumber
            });
        }
        let infoObj={
            errorLevel:"0",
            errorParmList: [],
            errorMessage: "This is a confirmation message",
            errorCode: "CONFIRM"
        }
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : [infoObj]
        });
     }
    console.log("calculate risk capacity end", messageResponse);
    return messageResponse;
}

function* initData() {
    console.log("init data start");

	let fhcDetail = {
		retireAge : 60,
		liveUntil : 81,
		monthlyExpenses : 6000,
		currentSaving : 6000,
		currentAge : 28,
		initialTargetAmount : 80800,
		initialCompletedAmount : 30003
	};

    yield put({
        type : GOALSIMULATOR_INIT_DATA_DONE,
        fhcDetail : fhcDetail
    })
    console.log("init data end");
}

function* getFinancialResult(financialResult, key) {
    if (!financialResult) {
        return 0;
    }
    for (let i=0; i<financialResult.length; ++i) {
        if (financialResult[i] && financialResult[i] == key) {
            return parseInt(financialResult[i].value);
        }
    }
    return 0;
}

export default function*(){
    yield [
        takeEvery(GOALSIMULATOR_RETRIEVE_PLANNING_YOUR_RETIREMENT, retrievePlanningYourRetirement),
        takeEvery(GOALSIMULATOR_CALCULATE_PLANNING_YOUR_RETIREMENT, calculatePlanningYourRetirement),
        takeEvery(GOALSIMULATOR_RECORD_PLANNING_YOUR_RETIREMENT, recordPlanningYourRetirement),
        takeEvery(GOALSIMULATOR_CALCULATE_GROWING_YOUR_WEALTH, calculateGrowingYourWealth),
        takeEvery(GOALSIMULATOR_CALCULATE_RISK_CAPACITY, calculateRiskCapacity),
        takeEvery(GOALSIMULATOR_INIT_DATA, initData)
    ]
}

