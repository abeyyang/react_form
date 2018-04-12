import { call, put, select, takeEvery, takeLatest, compose,fork } from 'redux-saga/effects';
import {callMessage} from "../services/baseService";
import {RETRIEVE_GOAL_SOLUTIO_DETAIL_PRODSUMM,RETRIEVE_GOAL_SOLUTIO_DETAIL_PRODSUMM_SUCCESS,REVIEWINVESTMENT_PRODSUMM,RECORD_GOAL_SOLUTIO_DETAIL_PRODSUMM} from '../FinancialPlanning/productSummary/actions/productSummary_act';
import {UPDATE_ERROR_INFO,CLEAN_ALL_ERROR_INFO} from '../common/actions/nav';
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
    //sessionInfo=sessionInfoService.getSessionInfo_();
    //requestParams.goalKey = request.request.goalKey;
    requestParams.goalKey = sessionInfo.goalJourney;
    requestParams.sessionInfo = sessionInfo;
    requestParams.pageMessageType='invGoalSummary';
    requestParams.messageId = request.request.messageId;
    //requestParams.pageMessageType='insGoalSummary';
    let goalSolutionDetail={};
    requestConverter=goalSolutionConverter.retrieveGoalSolutionDetailConvertRequest(requestParams);
    console.log("requestConverter",requestConverter);
    response= yield call (fpsService.process,requestConverter);
    responseConverter=goalSolutionConverter.retrieveGoalSolutionDetailConvertResponse(response,requestParams.pageMessageType);
    goalSolutionDetail=responseConverter;
    yield put({ 
        type: RETRIEVE_GOAL_SOLUTIO_DETAIL_PRODSUMM_SUCCESS,
        goalSolutionDetail
    });
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
    let goalSolutionDetail={

    }
    requestParams.goalKey = tempState.session.goalKey;
    requestConverter=goalSolutionConverter.recordGoalSolutionDetailConvertRequestForGS(requestParams);
    console.log("requestConverter",requestConverter);
    response= yield call (fpsService.process,requestConverter);

    // responseConverter=goalSolutionConverter.retrieveGoalSolutionDetailConvertResponse(response,requestParams.pageMessageType);
    // goalSolutionDetail=responseConverter;
    // goalSolutionDetail.currencyCode=requestParams.currencyCode;

    console.log('recordGoalSolutionDetail....',responseConverter);
    yield put({ 
        type: RECORD_GOAL_SOLUTIO_DETAIL_PRODSUMM,
        goalSolutionDetail
    });

}

// function* reviewInvestmentforProdSumm(params){
//     yield put({ 
//         type: CLEAN_ALL_ERROR_INFO
//     });
//     debugger;
//     let requestConverter={},responseConverter={},response={},sessionInfo={};
//     let tempState=yield select();
//     //let requestParams=params.requestParams;
//     //sessionInfo=tempState.session;
//     let requestParams={};
//     requestParams.goalKey=params.request.goalKey;
//     sessionInfo=sessionInfoService.getSessionInfo_();
//     requestParams.sessionInfo=sessionInfo;
//     requestParams.pageMessageType='invGoalSummary';
//     //requestParams.pageMessageType='insGoalSummary';
//     requestParams.messageId=params.request.messageId;
//     requestConverter=goalSolutionConverter.reviewInvestmentsConvertRequest(requestParams);
//     console.log("requestConverter",requestConverter);
//     response= yield call (fpsService.process,requestConverter);
//     responseConverter=goalSolutionConverter.reviewInvestmentsConvertResponse(response,requestParams.pageMessageType);
//     goalSolutionDetail=responseConverter;
//     goalSolutionDetail.currencyCode=requestParams.currencyCode;
//     yield put({ 
//         type: RETRIEVE_GOAL_SOLUTIO_DETAIL_PRODSUMM_SUCCESS,
//         goalSolutionDetail
//     });
// }


export default function* (){
    yield [
        takeEvery(RETRIEVE_GOAL_SOLUTIO_DETAIL_PRODSUMM,retrieveGoalSolutionDetail),
        takeEvery(RECORD_GOAL_SOLUTIO_DETAIL_PRODSUMM,recordGoalSolutionDetail)
    ]
}