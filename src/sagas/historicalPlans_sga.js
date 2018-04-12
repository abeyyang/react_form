import { call, put, select, takeEvery, takeLatest, compose,fork } from 'redux-saga/effects';
import {
    RETRIEVE_GOAL_DETAIL,HISTORICALPLANS_UPDATE_GOAL_DETAIL
} from '../FinancialPlanning/landing/actions/recentPirority_act';
import {inputValidate,outPutValidate} from '../services/commonService/validate';
import fpsService from '../services/FPS/fpsService'
import fpsConverter from '../services/FPS/fpsConverter';

function* retrieveGoalSolutionDetail(goalDetaliMessageRequest){
    let request,requestConverter,response,result,retrieveGoalDetailsView;
    console.log("retrieveGoalSolutionDetail sag start requestParms",goalDetaliMessageRequest);
    let session=  getSession(yield select());
    let goalDetailtParams = {
         messageId : "retrieveGoalSolutionDetail",
         request:goalDetaliMessageRequest.requestAction,
         session:session
    };
    request=inputValidate(goalDetailtParams); 
    requestConverter=fpsConverter.retrieveGoalDetailConvertRequest(request);
    response=yield call (fpsService.process,requestConverter);
    // result=outPutValidate(response);
    console.log("retrieveGoalSolutionDetail sag  response Parms",response);
    retrieveGoalDetailsView=fpsConverter.retrieveGoalDetailConvertResponse(response);
     console.log("retrieveGoalSolutionDetail sag  response end convertResponseResule",retrieveGoalDetailsView);
    yield put({ 
        type: HISTORICALPLANS_UPDATE_GOAL_DETAIL,
        retrieveGoalDetailsView
    });
 }

  const getSession=(appState)=>{
    console.log("get session getSession(), in saga start.....",appState);

    if(appState != undefined && appState.session !=undefined){
       return appState.session;
    }
  }
export default function*(){
    yield [
        takeEvery(RETRIEVE_GOAL_DETAIL,retrieveGoalSolutionDetail)
    ]
}