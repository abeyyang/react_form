import { call, put, select, takeEvery, takeLatest, compose,fork,take } from 'redux-saga/effects';
import {
    DELETE_GOAL_INFORMATION,HISTORICALPLANS_UPDATE_DELETE_GOAL_INFORMATION,
    RETRIEVE_GOAL_LIST,HISTORICALPLANS_UPDATE_GOAL_LIST
} from '../FinancialPlanning/landing/actions/recentPirority_act';
import {inputValidate,outPutValidate} from '../services/commonService/validate';
import fpsService from '../services/FPS/fpsService'
import fpsConverter from '../services/FPS/fpsConverter';
import goalSolution from '../services/FPS/goalSolution/goalSolutionConverter';

function* deleteGoalInformation(deleteGoalInformationMessageRequest){
   let request,requestConverter,response,result,deleteGoalInformationResponseView;
   console.log("deleteGoalInformation sag start requestParms",deleteGoalInformationMessageRequest);
   let session=  getSession(yield select());
   let goalDeleteParams = {
         messageId : "deleteGoalInformation",
         request:deleteGoalInformationMessageRequest.requestAction,
         session:session
    };
    request=inputValidate(goalDeleteParams); 
    requestConverter=goalSolution.deleteGoalInformationRequestConvert(request);
    response=yield call (fpsService.process,requestConverter);
    // result=outPutValidate(response);
    console.log("deleteGoalInformation sag  response Parms",response);
    deleteGoalInformationResponseView=goalSolution.deleteGoalInformationResponseConvert(response);
   // yield takeEvery(RETRIEVE_GOAL_LIST,retrieveGoalSummaryLists)
    console.log("deleteGoalInformation sag  response end convertResponseResule",deleteGoalInformationResponseView);
    yield put({ 
        type: HISTORICALPLANS_UPDATE_DELETE_GOAL_INFORMATION,
        deleteGoalInformationResponseView
    });
    
 }
 function* retrieveGoalSummaryLists(){
    console.log("retrieveGoalSummaryLists sag start requestParms");
    let request,requestConverter,response,result,retrieveGoalSummarylist=[];
    let session=  getSession(yield select());
    let goalListParams = {
        messageId : "retrieveGoalSummaryList",
         request : {
            customers: [],
        	filteringCriteria: [{
    		filteringKey: "PLANTYPE",
    		filteringValue: "S",
    		operation: "AND",
    		sequence: "0"
         	}],
    	   localeCode: {
    		localeCode: "en_US"
         	}
          },
         session:session
       };
    request=inputValidate(goalListParams); 
    requestConverter=fpsConverter.retrieveGoalSummaryListConvertRequest(request);
    response=yield call (fpsService.process,requestConverter);
    // result=outPutValidate(response);
    console.log("retrieveGoalSummaryLists sag  response Parms",response);
    retrieveGoalSummarylist=fpsConverter.retrieveGoalSummaryListConvertResponse(response);
    console.log("retrieveGoalSummaryLists sag  response end convertResponseResule",retrieveGoalSummarylist);
    yield put({ 
        type: HISTORICALPLANS_UPDATE_GOAL_LIST,
        retrieveGoalSummarylist
    });
 }

 const getSession=(appState)=>{
    console.log("get session getSession(), in saga start.....",appState);

    if(appState != undefined && appState.session !=undefined){
       return appState.session;
    }
} 
export default function*(){
    
    yield takeEvery(DELETE_GOAL_INFORMATION,deleteGoalInformation)

    while(true){
         yield take(HISTORICALPLANS_UPDATE_DELETE_GOAL_INFORMATION);
         yield fork(retrieveGoalSummaryLists);
    }     
    // yield takeEvery(RETRIEVE_GOAL_LIST,retrieveGoalSummaryLists)

    // while(true){
    //      yield take(DELETE_GOAL_INFORMATION);
    //      yield call(deleteGoalInformation,action);
    //      yield take(RETRIEVE_GOAL_LIST);
    //      yield call(retrieveGoalSummaryLists);

    // }
}


