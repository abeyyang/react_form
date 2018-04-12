import { call, put, select, takeEvery, takeLatest, compose,fork } from 'redux-saga/effects';
import {callMessage} from "../services/baseService";
import {SIJ_GS_RETRIEVE_GOAL_SOLUTIO_DETAIL,SIJ_GS_RETRIEVE_GOAL_SOLUTIO_DETAIL_SUCCESS,
        SIJ_GS_REVIEWINVESTMENT,SIJ_GS_REVIEWINVESTMENT_SUCCESS,
        SIJ_GS_RECORD_GOAL_SOLUTIO_DETAIL,SIJ_GS_RECORD_GOAL_SOLUTIO_DETAIL_SUCCESS,
        SIJ_GS_UPDATE_FORM_DATA,SIJ_GS_UPDATE_FORM_DATA_SUCCESS} from '../FinancialPlanning/SIJ/productSummary/actions/sij_gs_act';
import {UPDATE_ERROR_INFO,CLEAN_ALL_ERROR_INFO,COMMON_RESPONSE_VALIDATE,UPDATE_MESSAGE_BOX} from '../common/actions/nav';
import {inputValidate,outPutValidate,outputValidateWithError} from '../services/commonService/validate';
import buildRetrieveGoalSolutionDetailRequest from '../services/FPS/goalSolution/retrieveGoalSolutionDetail/builder/RetrieveGoalSolutionDetailRequestBuilderforProductSummary';
import buildRetrieveGoalSolutionDetailResponse from '../services/FPS/goalSolution/retrieveGoalSolutionDetail/builder/RetrieveGoalSolutionDetailResponseBuilderforProductSummary';
import buildReviewInvestmentRequest from '../services/FPS/goalSolution/reviewInvestment/builder/ReviewInvestmentRequestBuilderforProductSummary';
import buildRecordGoalSolutionDetailRequest from '../services/FPS/goalSolution/recordGoalSolutionDetail/builder/RecordGoalSolutionDetailRequestBuilderforProductSummary';
import goalSolutionConverter from '../services/FPS/goalSolution/goalSolutionConverter';
import fpsService from '../services/FPS/fpsService';
import sessionInfoService from '../services/sessionInfoService';

function* retrieveGoalSolutionDetail(request){
    yield put({ 
        type: CLEAN_ALL_ERROR_INFO
    });
    debugger;
    let requestConverter={},responseConverter={},response={},requestParams={};
    let tempState=yield select();
    let sessionInfo=tempState.session;
    
    // sessionInfo=sessionInfoService.getSessionInfo_();
    // sessionInfo.goalJourney.goalKey = {
    //     planId:30050,
    //     goalId:1090
    // };

    requestParams.sessionInfo = sessionInfo;
    requestParams.pageMessageType='GoalSummary';
    requestParams.messageId = 'retrieveGoalSolutionDetail';
    let goalSolutionDetail = {};
    let goalSolutionDetailData = {};
    requestConverter = buildRetrieveGoalSolutionDetailRequest.buildRequestImpl(requestParams);
    console.log("requestConverter",requestConverter);
    response= yield call (fpsService.process,requestConverter);
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
        }else {
            responseConverter=buildRetrieveGoalSolutionDetailResponse.buildResponseImpl(response);
            goalSolutionDetailData=responseConverter;
            goalSolutionDetail = {
                goalSolutionDetailData : responseConverter
            };
            yield put({ 
                type: SIJ_GS_RETRIEVE_GOAL_SOLUTIO_DETAIL_SUCCESS,
                goalSolutionDetailData
            });
    }
}

function* recordGoalSolutionDetail(params){

    console.log("recordGoalSolutionDetail....",params.params);
     yield put({ 
        type: CLEAN_ALL_ERROR_INFO
    });
    let requestConverter={},responseConverter={},response={};
    let requestParams=params.request;
    let tempState=yield select();
    requestParams.sessionInfo=tempState.session;


    // sessionInfo=sessionInfoService.getSessionInfo_();
    // sessionInfo.goalJourney.goalKey = {
    //     planId:30050,
    //     goalId:1090
    // };
    // requestParams.sessionInfo = sessionInfo;


    requestParams.pageMessageType='GoalSummary';
    requestParams.goalSolutionDetailData = tempState.sijGS.goalSolutionDetailData;
    requestParams.customerDeclaration = tempState.sijGS.customerDeclaration;
    requestConverter=buildRecordGoalSolutionDetailRequest.buildRequestImpl(requestParams);
    console.log("requestConverter",requestConverter);
    response= yield call (fpsService.process,requestConverter);
    console.log('recordGoalSolutionDetail....',responseConverter);
    yield put({ 
        type: SIJ_GS_RECORD_GOAL_SOLUTIO_DETAIL,
        response
    });

}

function* reviewInvestments(params){
    yield put({ 
        type: CLEAN_ALL_ERROR_INFO
    });
    debugger;
    let requestConverter={},responseConverter={},response={},sessionInfo={};
    let tempState=yield select();
    let requestParams={};
    requestParams.sessionInfo=tempState.session;
    // sessionInfo=sessionInfoService.getSessionInfo_();
    // sessionInfo.goalJourney.goalKey = {
    //     planId:30050,
    //     goalId:1090
    // };
    // requestParams.sessionInfo = sessionInfo;
    requestParams.pageMessageType='GoalSummary';
    requestParams.messageId=params.request.messageId;
    requestConverter=buildReviewInvestmentRequest.buildRequestImpl(requestParams);
    console.log("requestConverter",requestConverter);
    response= yield call (fpsService.process,requestConverter);
    responseConverter=goalSolutionConverter.reviewInvestmentsConvertResponse(response,requestParams.pageMessageType);
    goalSolutionDetail=responseConverter;
    goalSolutionDetail.currencyCode=requestParams.currencyCode;
    yield put({ 
        type: SIJ_GS_REVIEWINVESTMENT_SUCCESS,
        goalSolutionDetail
    });
}

function* updateFormData(params){
    let value = {};
    yield put({ 
        type: SIJ_GS_UPDATE_FORM_DATA_SUCCESS,
        value
    });
}

export default function* (){
    yield [
        takeEvery(SIJ_GS_RETRIEVE_GOAL_SOLUTIO_DETAIL,retrieveGoalSolutionDetail),
        takeEvery(SIJ_GS_REVIEWINVESTMENT,reviewInvestments),
        takeEvery(SIJ_GS_RECORD_GOAL_SOLUTIO_DETAIL,recordGoalSolutionDetail),
        takeEvery(SIJ_GS_UPDATE_FORM_DATA,updateFormData)
    ]
}