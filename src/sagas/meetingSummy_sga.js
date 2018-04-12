import { call, put, select, takeEvery, takeLatest, compose,fork } from 'redux-saga/effects';
import {
   MEETINGSUMMY_INIT_IPDETAIL,MEETINGSUMMY_INIT_IPDETAIL_UPDATE,
   MEETINFSUMMARY_RETRIEVE_QUESTIONNAIRE_SUMMARY,
   MEETINFSUMMARY_RETRIEVE_QUESTIONNAIRE_SUMMARY_UPDATE,
   MEETINFSUMMARY_RETRIEVE_FNA_DATA,MEETINFSUMMARY_RETRIEVE_FNA_DATA_UPDATE,
   MEETINFSUMMARY_GOAL_SUMMARY_LIST,MEETINFSUMMARY_GOAL_SUMMARY_LIST_UPDATE,
   MEETINFSUMMARY_RETRIEVE_GOAL_DETAIL,MEETINFSUMMARY_RETRIEVE_GOAL_DETAIL_UPDATE
} from '../FinancialPlanning/meetingSummary/actions/meetingSummy_act';
import {UPDATE_ERROR_INFO,CLEAN_ALL_ERROR_INFO,UPDATE_MESSAGE_BOX} from 'common/actions/nav';
//import {api} from "../services/landing";
import {
    UPDATE_SESSION
} from '../common/actions/session'
import {callMessage} from "../services/baseService";
import {api} from "../services/landing";
import fpsService from '../services/FPS/fpsService'
import fpsConverter from '../services/FPS/fpsConverter';
import fnaConverter from '../services/FPS/fna/fnaConverter'
import {inputValidate,outPutValidate,outputValidateWithError} from '../services/commonService/validate';
import qasConverter from '../services/QAS/qasConverter';
import qasService from '../services/QAS/qasService'
import {sendMessageWithTimeout} from "./common_sga";


function* initInvolvedPartyDetails(params) {
     console.log("meeting summary initInvolvedPartyDetail sga:",params);
    let request,requestConverter,response,customerInfo,ipDetailRequest,result,
        assetsParams,assetsRequest,assetsRequestConverter,assetsResponse,depositeConstentCode;
    ipDetailRequest = params.ipDetailRequest;
    let tempState=yield select();
    let sessionInfo=tempState.session;

    request=inputValidate(ipDetailRequest);
    console.log("meeting summary ipDetailinputValidate request:",request);
    requestConverter=fpsConverter.retrieveInvolvedPartyDetailsIndividualConvertRequest(request);
    console.log("meeting summary ipDetailinputValidate requestConverter:",requestConverter);
    response=yield call (fpsService.process,requestConverter);
    // result=outPutValidate(response);
    console.log("meeting summary ipDetailinputValidate  :",response);
    customerInfo=fpsConverter.retrieveInvolvedPartyDetailsIndividualConvertResponse(response);
     console.log("meeting summary ipDetailinputValidate customerInfo :",customerInfo);

    assetsParams=params.assetsParams;
    assetsParams.sessionInfo=sessionInfo;

    console.log("assetsRequest:",assetsParams);
    assetsRequest=inputValidate(assetsParams);
    assetsRequestConverter=fnaConverter.retrieveFinancialSituationReferenceRecordAssetsRequest(assetsRequest);
	console.log("meeting summary ipDetailinputValidate  assetsRequestConverter:",assetsRequestConverter);
    assetsResponse=yield call (fpsService.process,assetsRequestConverter);
	console.log("meeting summary ipDetailinputValidate  assetsResponse:",assetsResponse);
    // assetsResult=outPutValidate(assetsResponse);
	// console.log("assetsResult",assetsResult);
    depositeConstentCode=fpsConverter.retrieveFinancialSituationReferenceRecordAssetsConvertResponse(assetsResponse);
    yield put({
        type: MEETINGSUMMY_INIT_IPDETAIL_UPDATE,
        customerInfo,depositeConstentCode
    });
}

function* getRiskFromretrieveQuestionnaireSummary(params){
      console.log("params get the history",params);
      let historyRecords=[];
      let sessionInfo = params.rtqHistoricalParams.sessionInfo;
      let requestParams={
          pageMessageType:'MEETINGSUMMARY',
          sessionInfo:sessionInfo
      }
      let requestConverter=qasConverter.retrieveQuestionnaireSummaryConvertRequest(requestParams);
      let response=yield call (qasService.process,requestConverter);
     // result=outPutValidate(response);
      historyRecords=qasConverter.retrieveQuestionnaireSummaryConvertResponseAll(response,requestParams.pageMessageType);
      console.log("retrieve rtq response",response);

      yield put({ 
        type:MEETINFSUMMARY_RETRIEVE_QUESTIONNAIRE_SUMMARY_UPDATE,
        historyRecords
      });
    }

function* meetingSummaryRetrieveFNAData(params){
    console.log('meetingSummaryRetrieveFNAData start...');
    let fnaResult,request,requestConverter,response,result;
    let fnaParams=params.fnaParams;

    let tempState=yield select();
    let sessionInfo=tempState.session;
    fnaParams.sessionInfo=sessionInfo
    // request=inputValidate(fnaParams); 
    // requestConverter=fpsConverter.retrieveFinancialSituationDataConvertRequest(request);
    // response=yield call (fpsService.process,requestConverter);
    // result=outPutValidate(response);
    // fnaResult=fpsConverter.retrieveFinancialSituationDataConvertResponse(result);


    request=inputValidate(fnaParams); 

    requestConverter=fnaConverter.retrieveFinancialSituationDataConvertRequest(request);
    response=yield call (sendMessageWithTimeout,fpsService.process,requestConverter);
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
         // result=outPutValidate(response);
        fnaResult=fnaConverter.retrieveFinancialSituationDataConvertResponse(response.responseBody);
        console.log("FNA fnaResultXXX",fnaResult);
        yield put({ 
            type: MEETINFSUMMARY_RETRIEVE_FNA_DATA_UPDATE,
            fnaResult
        });
    }
    
   
}
    
function* retrieveGoalSummaryLists(goalListMessageRequest){
    console.log("meeting summary retrieveGoalSummaryLists sag start requestParms",goalListMessageRequest);
    let session=  getSession(yield select());
   console.log("meeting summary retrieveGoalSummaryLists sag start requestParms session",session);
    let request,requestConverter,response,result,meetingSummaryRetrieveGoalSummarylist=[];
    let goalListParams = {
        messageId : "retrieveGoalSummaryList",
        request:goalListMessageRequest.params,
        session:session
        };
    request=inputValidate(goalListParams); 
    requestConverter=fpsConverter.retrieveGoalSummaryListConvertRequest(request);
    response=yield call (fpsService.process,requestConverter);
    // result=outPutValidate(response);
    console.log("meeting summary retrieveGoalSummaryLists sag  response ",response);
    meetingSummaryRetrieveGoalSummarylist=fpsConverter.retrieveGoalSummaryListConvertResponse(response);
    console.log("meeting summary retrieveGoalSummaryLists sag  response end convertResponseResule",meetingSummaryRetrieveGoalSummarylist);
    yield put({ 
        type: MEETINFSUMMARY_GOAL_SUMMARY_LIST_UPDATE,
        meetingSummaryRetrieveGoalSummarylist
    });
 }

 function* retrieveGoalSolutionDetail(goalDetaliMessageRequest){
    let request,requestConverter,response,result,meetingSummaryretrieveGoalDetails={};
    console.log("meeting summary retrieveGoalSolutionDetail sag start requestParms",goalDetaliMessageRequest);
    let session=  getSession(yield select());
    let goalDetailtParams = {
         messageId : "retrieveGoalSolutionDetail",
         request:goalDetaliMessageRequest.params,
         session:session
    };
    request=inputValidate(goalDetailtParams); 
    requestConverter=fpsConverter.retrieveGoalDetailConvertRequest(request);
    response=yield call (fpsService.process,requestConverter);
    // result=outPutValidate(response);
    console.log("meeting summary retrieveGoalSolutionDetail sag  response Parms",response);
    meetingSummaryretrieveGoalDetails=fpsConverter.retrieveGoalDetailConvertResponse(response);
     console.log("meeting summary retrieveGoalSolutionDetail sag  response end convertResponseResule",meetingSummaryretrieveGoalDetails);
    yield put({ 
        type: MEETINFSUMMARY_RETRIEVE_GOAL_DETAIL_UPDATE,
        meetingSummaryretrieveGoalDetails
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
        takeEvery(MEETINGSUMMY_INIT_IPDETAIL,initInvolvedPartyDetails),
        takeEvery(MEETINFSUMMARY_RETRIEVE_QUESTIONNAIRE_SUMMARY,getRiskFromretrieveQuestionnaireSummary),
        takeEvery(MEETINFSUMMARY_RETRIEVE_FNA_DATA,meetingSummaryRetrieveFNAData),
        takeEvery(MEETINFSUMMARY_GOAL_SUMMARY_LIST,retrieveGoalSummaryLists),
        takeEvery(MEETINFSUMMARY_RETRIEVE_GOAL_DETAIL,retrieveGoalSolutionDetail)
      
    ]
}