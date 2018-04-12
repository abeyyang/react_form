import { call, put, select, takeEvery, takeLatest, compose,fork,take } from 'redux-saga/effects';
import {callMessage} from "../services/baseService";
import {INV_RETRIEVE_GOAL_SOLUTION_DETAIL,
    GET_GOAL_SOLUTION_DETAIL,RECORD_SOLUTION_DETAIL,
    RECORD_FINALISE_GOAL_DETAIL,
    RECORD_FINALISE_GOAL_DETAIL_SUCCESS,
    IAJ_GOALSUMMARY_RECORD_GOAL_SUCCESS,
    IAJ_GOALSUMMARY_RETRIEVE_ASSETSMIX_HOLDING_SUCCESS,
    IAJ_GOALSUMMARY_REVIEW_INVESTMENT_SUCCESS,
    RETRIEVE_GOAL_SUMMARY_ASSETS_HOLDING_SUCCESS,
    IAJ_GOALSUMMARY_REVIEW_INVESTMENT} from '../FinancialPlanning/Inv/goalSummary/actions/goalSummary_act';
import {UPDATE_ERROR_INFO,CLEAN_ALL_ERROR_INFO} from '../common/actions/nav';
import goalSolutionConverter from '../services/FPS/goalSolution/goalSolutionConverter';
import fpsService from '../services/FPS/fpsService';
import {inputValidate,outPutValidate} from '../services/commonService/validate';
import ObjectHelper from '../common/lib/ObjectHelper';
import buildReviewInvestmentRequest from '../services/FPS/goalSolution/reviewInvestment/builder/ReviewInvestmentRequestBuilderforProductSummary';
import reviewInvestmentResponseBuilder from '../services/FPS/goalSolution/reviewInvestment/builder/reviewInvestmentResponseBuilder'

function* retrieveGoalSolutionDetailToInv(params){
    yield put({ 
        type: CLEAN_ALL_ERROR_INFO
    });
    console.log('inv saga retrieveGoalSolutionDetail...',params);
    let requestParams=params.requestParams;
    let tempState=yield select();
    console.log("empState.session.goalJourney",tempState.session)
    requestParams.goalKey = tempState.session.goalJourney;
    // requestParams.goalKey = {
    //     planId:30050,
    //     goalId:1052
    // }
    requestParams.sessionInfo = tempState.session;
    requestParams.pageMessageType='invGoalSummary';
    requestParams.messageId = requestParams.messageId;
    let requestConverter=goalSolutionConverter.retrieveGoalSolutionDetailConvertRequest(requestParams);
    console.log("requestConverter",JSON.stringify(requestConverter.request));
    let response= yield call (fpsService.process,requestConverter);
    let responseConverter=goalSolutionConverter.retrieveGoalSolutionDetailConvertResponse(response,requestParams.pageMessageType);
    let goalSolutionDetail=responseConverter;
    console.log('retrieveGoalSolutionDetail....',goalSolutionDetail);
    yield put({ 
        type: GET_GOAL_SOLUTION_DETAIL,
        goalSolutionDetail
    });
    
    yield* retrieveAssetsholding();
}
function* retrieveAssetsholding (){
    let assetsMixParams = { 
		filterCriteria :{
                    staffId: "29000101",
                    customerNumber: "Q8360330"
                        },
        messageId:'assetConcentrationCalculationGetHolding'
    };
     let requestHolding=inputValidate(assetsMixParams);
    let responseHolding=yield call (fpsService.process,requestHolding);
    console.log("retrieve holidng ",responseHolding);
    yield put({ 
        type: RETRIEVE_GOAL_SUMMARY_ASSETS_HOLDING_SUCCESS,
        responseHolding
    });
}

function* recordGoalSolutionDetail(params){
    console.log("recordGoalSolutionDetail....params",params.params);
     yield put({ 
        type: CLEAN_ALL_ERROR_INFO
    });
    let tempState = yield select();
    let requestParams = params.params;
    requestParams.sessionInfo = tempState.session;
    requestParams.messageId = "recordGoalSolutionDetail";
    let requestConverter = goalSolutionConverter.recordGoalSolutionDetailConvertRequestForGS(requestParams);
    console.log("requestConverter",JSON.stringify(requestConverter));
    let response = yield call (fpsService.process,requestConverter);
    console.log('recordGoalSolutionDetail....',JSON.stringify(response));
    // if(!ObjectHelper.isNullOrEmpty(response)&&response.responseDetails.responseCode == '0')
    yield put({ 
        type: IAJ_GOALSUMMARY_RECORD_GOAL_SUCCESS,
        successFlag:requestParams.subserviceId
    });
}
function* reviewInvestment(){
    console.log("start reviewInvestment")
    let tempState=yield select();
    let request= buildReviewInvestmentRequest.buildRequestImpl({sessionInfo:tempState.session});
    console.log("request reviewInvestment",JSON.stringify(request));
    let response= yield call (fpsService.process,request);
    console.log("reviewInvestment response",response);
    let validationDetails = reviewInvestmentResponseBuilder.convertResponseImpl(response);
    yield put({ 
        type: IAJ_GOALSUMMARY_REVIEW_INVESTMENT_SUCCESS,
        validationDetails:validationDetails
    });
}
export default function* (){
    yield [
        takeLatest(INV_RETRIEVE_GOAL_SOLUTION_DETAIL,retrieveGoalSolutionDetailToInv),
        takeLatest(RECORD_SOLUTION_DETAIL,recordGoalSolutionDetail),
        takeLatest(RECORD_FINALISE_GOAL_DETAIL,recordGoalSolutionDetail),
    ]
     while(true){
            const saveallocSuccess= yield take(IAJ_GOALSUMMARY_RECORD_GOAL_SUCCESS);
            console.log("record goal solution detial success");
            if(!ObjectHelper.isNullOrEmpty(saveallocSuccess)){
                yield call(reviewInvestment);
            }
    }
}