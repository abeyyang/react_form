import { call, put, select, takeEvery, takeLatest, compose,fork } from 'redux-saga/effects';
import {
    DEMO_FLOW,DEMO_RESULT_UPDATE
} from '../FinancialPlanning/flowApi/actions/flowDemo_act';

import {callMessage} from "../services/baseService";

import fpsService from '../services/FPS/fpsService'
import fpsConverter from '../services/FPS/fpsConverter';
import goalSolutionConverter from '../services/FPS/goalSolution/goalSolutionConverter'
import {inputValidate,outPutValidate} from '../services/commonService/validate';
function* initFlowDataToMessage(params){
     console.log('dashboardInitFNAData start...');
    let recordBaseGoal,request,requestConverter,response,result,responseConverter,requestIPDConverter,requestIPDresponse
    ,responseIPDConverter,requestProductConverter,requestProductresponse,responseProductConverter;
    
    let recordBaseGoalParams={
        requestData:{
            riskLevelNumber:"4",
		    riskToleranceLevel:"4",
            // goalDescription:"horsen_text_goal"
        },
        messageId:'recordBaseGoal'
    }
	
    let retrieveInvolvedPartyDetailsIndividualParams={
     
        messageId:'retrieveInvolvedPartyDetailsIndividual'
    }

    
    console.log('start flowDemo');
    requestConverter=goalSolutionConverter.recordBaseGoalConvertRequestfromInvestmentJourney(recordBaseGoalParams);
    response=yield call (fpsService.process,requestConverter);
    responseConverter=goalSolutionConverter.recordBaseGoalConvertResponseToInvestmentJourney(response);

      console.log('responseConverter....',responseConverter);
     requestIPDConverter=goalSolutionConverter.retrieveInvolvedPartyDetailsIndividualConvertRequestfromInvestmentJourney(retrieveInvolvedPartyDetailsIndividualParams);
     requestIPDresponse=yield call (fpsService.process,requestIPDConverter);
     responseIPDConverter=goalSolutionConverter.retrieveInvolvedPartyDetailsIndividualConvertResponseToInvestmentJourney(requestIPDresponse);
      console.log('responseIPDConverter....',responseIPDConverter);
    let retrieveProductSearchResultParams={
      productSelectionData:{
             goalKey:{ 
                     goalId:responseConverter.goalSequenceNumber,
                     planId:responseConverter.arrangementIdentifierFinancialPlanning
             },
             selectedTab:'TAB_UT',
            //  filterFormBean:{ },
            //  searchFormBean:{ },
            //  goalDetailFormBean:{}
        },
        messageId:'retrieveProductSearchResult'
    }
    
   requestProductConverter=goalSolutionConverter.retrieveProductSearchResultConvertRequestfromInvestmentJourney(retrieveProductSearchResultParams);
   requestProductresponse=yield call (fpsService.process,requestProductConverter);
   responseProductConverter=goalSolutionConverter.retrieveProductSearchResultConvertResponseToInvestmentJourney(requestProductresponse);


    yield put({ 
        type: DEMO_RESULT_UPDATE,
        recordBaseGoal
    });
}

export default function*(){
    yield [
        takeEvery(DEMO_FLOW,initFlowDataToMessage)
    ]
}