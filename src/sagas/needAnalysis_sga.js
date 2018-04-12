import { call, put, select, takeEvery, takeLatest, compose,fork,take } from 'redux-saga/effects';
import {
    UPDATE_GOAL_SOLUTION_DETAIL,RETRIEVE_GOAL_SOLUTION_DETAIL,NEED_ANALYSIS_SAVE,RECORD_BASE_GOAL_SUCCESS,LOADING_NEED_ANALYSIS_PAGE,
    CALCULATE_PROTECTION_NEED_ANALYSIS,UPDATE_TOTALPRONEEDAMOUNT,NEED_PAGE_SAVE_PROGRESS,NEED_ANLYSIS_ERROR_HANDER
} from '../FinancialPlanning/SIJ/needAnalysis/actions/needAnalysisPanel_act';
import {UPDATE_ERROR_INFO,CLEAN_ALL_ERROR_INFO,COMMON_RESPONSE_VALIDATE,UPDATE_MESSAGE_BOX} from '../common/actions/nav';
import {
    UPDATE_SESSION
} from '../common/actions/session'

import {callMessage} from "../services/baseService";

import fpsService from '../services/FPS/fpsService';
import goalSolutionConverter from '../services/FPS/goalSolution/goalSolutionConverter';
import calculateProtectionPlanProcessor from '../services/FPS/globalSimulator/calculateProtection/impl/calculateProtectionPlanProcessor';
import fnaConverter from '../services/FPS/fna/fnaConverter';
import ObjectHelper from '../common/lib/ObjectHelper';
import {inputValidate,outPutValidate,outputValidateWithError} from '../services/commonService/validate';
import recordInsuranceQuoteImpl from '../services/FPS/productInfo/impl/recordInsuranceQuoteImpl';
import recordQuteIdImpl from '../services/FPS/productInfo/impl/recordQuteIdImpl';
import {sendMessageWithTimeout} from "./common_sga";

function* loadingNeedAnalysisPage(params){ 
     
    /**test*/
    // recordInsuranceQuoteImpl.buildRecordInsuranceQuoteRequest(params);
    //   recordQuteIdImpl.buildRecordQuteIdRequest(params)

    console.log('saga loadingNeedAnalysisPage...',params);
       yield put({ 
        type: CLEAN_ALL_ERROR_INFO
       });
    let requestConverter,responseConverter,response,requestParams;
    requestParams=params.params;
    // sessionInfo=requestParams.sessionInfo;
    let tempState=yield select();
    let sessionInfo=tempState.session;
    requestParams.sessionInfo=sessionInfo
    let riskLevel=sessionInfo.riskLevel;
    requestParams.riskLevel=riskLevel
    let goalInfo=sessionInfo.goalJourney;
    // goalInfo={
    //         planId:'1',
    //         goalId:'2'
    // }
    if(!ObjectHelper.isNullOrEmpty(goalInfo) && !ObjectHelper.isNullOrEmpty(goalInfo.goalId)){
        debugger;
        let goalKey={
           planId: goalInfo.planId,
           goalId: goalInfo.goalId
        }
        requestParams.goalKey=goalKey;
        requestParams.messageId='retrieveGoalSolutionDetail';
        requestParams.retrieveGoalSolutionDetailFlag=true;
        requestParams.riskLevel=riskLevel
        yield put({ 
        type: RETRIEVE_GOAL_SOLUTION_DETAIL,
        requestParams
        });
    }else{
        debugger;
        requestParams.messageId='retrieveFinancialSituationData';
        let requestCo = fnaConverter.retrieveFinancialSituationDataConvertRequest(requestParams);
	    let responseCo = yield call (sendMessageWithTimeout,fpsService.process,requestCo);
        if (responseCo.isTimeout) {
            yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList : responseCo.errorList
            });
            return;
        }
        // let errorFlag = outPutValidate(response);
        responseCo = outputValidateWithError(responseCo);
        

        if (responseCo.errorList.length > 0) {
            yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList : responseCo.errorList
            });
        }else {
            responseCo.responseBody.messageId='retrieveFinancialSituationData';
            // yield put ({
            //     type:COMMON_RESPONSE_VALIDATE,
            //     response:responseCo.responsBoby
            // })
            
            let fnaResponse=fnaConverter.retrieveFinancialSituationDataConvertResponse(responseCo.responseBody);
            requestParams.currencyCode=ObjectHelper.isNullOrEmpty(fnaResponse[0])?'':fnaResponse[0].currencyCode
            requestParams.messageId='retrieveGoalSolutionDetail';
            requestParams.retrieveGoalSolutionDetailFlag=false;
            yield put({ 
                type: RETRIEVE_GOAL_SOLUTION_DETAIL,
                requestParams
            });
        }
        
        
    }
}

function* retrieveGoalSolutionDetail(params){
    debugger;
    console.log('saga retrieveGoalSolutionDetail...',params);
    let requestConverter={},responseConverter={},response={responseBody:{}},sessionInfo={};
    // sessionInfo=requestParams.sessionInfo;
    // pageMessageType sij /productSearch /meetingSummary / recentPlan /invGoalSummary
    let requestParams=params.requestParams;
    requestParams.pageMessageType='sij'
    let goalSolutionDetail={

    }
    if(requestParams.retrieveGoalSolutionDetailFlag){
          //requestConverter=goalSolutionConverter.retrieveGoalSolutionDetailConvertRequestfromSIJ(requestParams);
          requestConverter=goalSolutionConverter.retrieveGoalSolutionDetailConvertRequest(requestParams)
          
          response= yield call (sendMessageWithTimeout,fpsService.process,requestConverter);
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
        }


    }
    //responseConverter=goalSolutionConverter.retrieveGoalSolutionDetailConvertResponseToSIJ(response);
    responseConverter=goalSolutionConverter.retrieveGoalSolutionDetailConvertResponse(response.responseBody,requestParams.pageMessageType);
    goalSolutionDetail=responseConverter;
    goalSolutionDetail.currencyCode=requestParams.currencyCode;
    goalSolutionDetail.riskLevel=requestParams.riskLevel;
    goalSolutionDetail.riskLevelClass="riskLevel"+requestParams.riskLevel; 
    console.log('retrieveGoalSolutionDetail....',goalSolutionDetail)
    yield put({ 
        type: UPDATE_GOAL_SOLUTION_DETAIL,
        goalSolutionDetail
    });
}

function* needAnalysisPageSave(saveParams){
    console.log('saga needAnalysisPageSave...',saveParams);
    
    let recordBaseGoalResponse,recordBaseGoalParams={},responseBaseGoal,responseBaseGoalConverter,goalSolutionDetailParams,successParams;
    let tempState=yield select();
    let sessionInfo=tempState.session;
    let riskLevel=sessionInfo.riskLevel;
    let baseGoal={};
    goalSolutionDetailParams=saveParams.saveParams
    // let goalInfo=sessionInfo.goalInfo;
    if(ObjectHelper.isNullOrEmpty(sessionInfo.goalJourney)){
        let requestData={
               riskLevelNumber:riskLevel,
               riskToleranceLevel:riskLevel,
               calculatedRiskCapacityLevelNumber:riskLevel,
               needTypeCode:'GNRC',
               goalTypeCode:'INS_JOURNEY',
               goalName:goalSolutionDetailParams.goalName
        }  
        recordBaseGoalParams.requestData=requestData;
        recordBaseGoalParams.sessionInfo=sessionInfo;
        recordBaseGoalParams.messageId='recordBaseGoal';
        recordBaseGoalResponse=goalSolutionConverter.recordBaseGoalConvertRequestfromJourney(recordBaseGoalParams);
        responseBaseGoal= yield call (sendMessageWithTimeout,fpsService.process,recordBaseGoalResponse);
        //  yield put ({
        //     type:COMMON_RESPONSE_VALIDATE,
        //     response:responseBaseGoal.responseBody
        // })
        if (responseBaseGoal.isTimeout) {
            yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList : responseBaseGoal.errorList
            });
            return;
        }
        // let errorFlag = outPutValidate(response);
        responseBaseGoal = outputValidateWithError(responseBaseGoal);
        if (responseBaseGoal.errorList.length > 0) {
            yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList : responseBaseGoal.errorList
            });
        }else {
                responseBaseGoalConverter=goalSolutionConverter.recordBaseGoalConvertResponseToJourney(responseBaseGoal.responseBody);
                successParams={
                    goalSolutionDetailParams:goalSolutionDetailParams,
                    baseGoal:responseBaseGoalConverter.goalKey,
                    sessionInfo:sessionInfo
                }
                baseGoal=responseBaseGoalConverter.goalKey;
                yield put({type:RECORD_BASE_GOAL_SUCCESS,successParams});

        }

      
    }else{
         baseGoal=sessionInfo.goalJourney;
            successParams={
            goalSolutionDetailParams:goalSolutionDetailParams,
            baseGoal:sessionInfo.goalJourney,
            sessionInfo:sessionInfo
        }
        yield put({type:RECORD_BASE_GOAL_SUCCESS,successParams});
    }

    
}

//recordGoalSolutionDetail
function* needAnalysisPageSave_saveGoalSolutionDetail(successParams){
    let request,requestParams,response,responseConverter;
    requestParams=successParams.successParams;
    requestParams.messageId='recordGoalSolutionDetail'
    request=goalSolutionConverter.recordGoalSolutionDetailConvertRequestFromSIJ(requestParams);
    response= yield call (sendMessageWithTimeout,fpsService.process,request);
    //  yield put ({
    //         type:COMMON_RESPONSE_VALIDATE,
    //         response:response
    //     })
    if (response.isTimeout) {
            yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList : response.errorList
            });
            return;
        }
        // let errorFlag = outPutValidate(response);
        response = outputValidateWithError(response);
        if (response.errorList.length > 0) {
            yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList : response.errorList
            });
        }else {
            responseConverter=goalSolutionConverter.recordGoalSolutionDetailConvertResponseToSIJ(response.responseBody);
            console.log('saga needAnalysisPageSave_saveGoalSolutionDetail responseConverter...',responseConverter);
            let tempState=yield select();
            let goalJourney=requestParams.baseGoal;
            tempState.session.goalJourney={
                    planId: goalJourney.planId, 
                    goalId: goalJourney.goalId
            }
            console.log('saga needAnalysisPageSave tempState...',tempState);
            let goProductSearchFlag=false;
            goProductSearchFlag=true;
            yield put({
                type: UPDATE_SESSION,
                tempState
            })
            yield put({
                type: NEED_PAGE_SAVE_PROGRESS,
                goProductSearchFlag
            })


        }


   
}
function* calculateProtection(lifeParams){
    debugger;
    console.log('calculateProtection sage....',lifeParams)
    let request={},response={},requestCo={},totalProNeedAmount=new Number;
    let requestParams={};
    requestParams=lifeParams.lifeParams;
    let tempState=yield select();
    let sessionInfo=tempState.session;
    requestParams.sessionInfo=sessionInfo
    let goalKey=sessionInfo.goalJourney;
    requestParams.goalKey=goalKey;
    requestParams.messageId='calculateProtectionPlanning'
    requestCo=calculateProtectionPlanProcessor.coverterRequest(requestParams);
    response= yield call (sendMessageWithTimeout,fpsService.process,requestCo);    
    //  yield put ({
    //         type:COMMON_RESPONSE_VALIDATE,
    //         response:response.responseBody
    //     })

    if (response.isTimeout) {
            yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList : response.errorList
            });
            return;
        }
        // let errorFlag = outPutValidate(response);
        response = outputValidateWithError(response);
        if (response.errorList.length > 0) {
            yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList : response.errorList
            });
        }else {
            totalProNeedAmount=calculateProtectionPlanProcessor.coverterResponse(response.responseBody);
            yield put({
                type: UPDATE_TOTALPRONEEDAMOUNT,
                totalProNeedAmount
            })

        }

   
}
export  function* loadingNeedAnalysis(){ 
    yield [ 
        takeEvery(LOADING_NEED_ANALYSIS_PAGE,loadingNeedAnalysisPage),
    ] 
     while(true){
            const requestParams= yield take(RETRIEVE_GOAL_SOLUTION_DETAIL);
            if(!ObjectHelper.isNullOrEmpty(requestParams)){
                 yield call(retrieveGoalSolutionDetail,requestParams);
            }
          }
}

export  function* saveNeedAnalysis(){
    yield [ 
        takeEvery(NEED_ANALYSIS_SAVE,needAnalysisPageSave)
    ] 
     while(true){
            const successParams= yield take(RECORD_BASE_GOAL_SUCCESS);
            if(!ObjectHelper.isNullOrEmpty(successParams)){
                yield call(needAnalysisPageSave_saveGoalSolutionDetail,successParams);
            }
          }
}

export  function* calculateProtectionNeedAnalysis(){
    yield [ 
        takeEvery(CALCULATE_PROTECTION_NEED_ANALYSIS,calculateProtection)
    ] 
}