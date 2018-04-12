import { call, put, select, takeEvery, takeLatest, compose,fork } from 'redux-saga/effects';
import {
    RETRIEVE_GOAL_LIST,HISTORICALPLANS_UPDATE_GOAL_LIST
} from '../FinancialPlanning/landing/actions/recentPirority_act';
import {callMessage} from "../services/baseService";
import {inputValidate,outPutValidate} from '../services/commonService/validate';
import fpsService from '../services/FPS/fpsService'
import fpsConverter from '../services/FPS/fpsConverter';

function* retrieveGoalSummaryLists(goalListMessageRequest){
    console.log("retrieveGoalSummaryLists sag start requestParms",goalListMessageRequest);
    let session=  getSession(yield select());
   console.log("retrieveGoalSummaryLists sag start requestParms session",session);
    let request,requestConverter,response,result,retrieveGoalSummarylist=[];
    let goalListParams = {
        messageId : "retrieveGoalSummaryList",
        request:goalListMessageRequest.requestAction,
        session:session
      //         baseInfo:Info,
      //          jsonData:""
            };
    request=inputValidate(goalListParams); 
    requestConverter=fpsConverter.retrieveGoalSummaryListConvertRequest(request);
    response=yield call (fpsService.process,requestConverter);
  //  result=outPutValidate(response);
    console.log("retrieveGoalSummaryLists sag  response Parms",response);
    retrieveGoalSummarylist=fpsConverter.retrieveGoalSummaryListConvertResponse(response);
    console.log("retrieveGoalSummaryLists sag  response end convertResponseResule",retrieveGoalSummarylist);
/*
         let goalListResponse= yield call(callMessage,goalListParams);
         console.log("goalListResponse  end  AAAA20170901");
         console.log(goalListResponse);
         console.log("goalListResponse end  AAAA20170901");
        let  firstGoal;
        let  firstGoalName;
        let  financialGoalProcessStatusCode;
        if(goalListResponse.goalSummary!==undefined ){
            firstGoal = goalListResponse.goalSummary[0];
            if(firstGoal !==undefined ){
                firstGoalName = firstGoal.goalDescription;
                financialGoalProcessStatusCode = firstGoal.financialGoalProcessStatusCode;    
     }
    }
    const retrieveGoalSummarylist = {
        firstGoalNameView : firstGoalName,
        processStatusCodeView : financialGoalProcessStatusCode,
        lastModifiedView: "11/11/2017"
    };

    */
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
    yield [
        takeEvery(RETRIEVE_GOAL_LIST,retrieveGoalSummaryLists)
    ]
}