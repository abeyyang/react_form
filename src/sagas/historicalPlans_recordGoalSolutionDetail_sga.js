import { call, put, select, takeEvery, takeLatest, compose,fork } from 'redux-saga/effects';
import {
    RECORD_GOAL_DETAIL,HISTORICALPLANS_UPDATE_RECORD_GOAL_DETAIL
} from '../FinancialPlanning/landing/actions/recentPirority_act';
import {inputValidate,outPutValidate} from '../services/commonService/validate';
import fpsService from '../services/FPS/fpsService'
import fpsConverter from '../services/FPS/fpsConverter';
import goalSolution from '../services/FPS/goalSolution/recordGoalSolutionDetailConverter';

function* recordGoalSolutionDetails(recordGoalDetaliMessageRequest){
   let request,requestConverter,response,result,recordGoalDetailsResponseView;
   console.log("recordGoalSolutionDetails sag start requestParms",recordGoalDetaliMessageRequest);
   let goalDetailtParams = {
         messageId : "recordGoalSolutionDetail",
         request:recordGoalDetaliMessageRequest.requestAction,
    };
    request=inputValidate(goalDetailtParams); 
    requestConverter=goalSolution.recordGoalDetailRequestConvert(request);
    response=yield call (fpsService.process,requestConverter);
    // result=outPutValidate(response);
    console.log("recordGoalSolutionDetails sag  response Parms",response);
    recordGoalDetailsResponseView=goalSolution.recordGoalDetailResponseConvert(response);
    console.log("recordGoalSolutionDetails sag  response end convertResponseResule",recordGoalDetailsResponseView);
    yield put({ 
        type: HISTORICALPLANS_UPDATE_RECORD_GOAL_DETAIL,
        recordGoalDetailsResponseView
    });
 }
export default function*(){
    yield [
        takeEvery(RECORD_GOAL_DETAIL,recordGoalSolutionDetails)
    ]
}