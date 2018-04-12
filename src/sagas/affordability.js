import { call, put, select, takeEvery, takeLatest, compose,fork } from 'redux-saga/effects';
import { AFFORDABILITY_INIT,AFFORDABILITY_INIT_DONE} from '../FinancialPlanning/affordability/actions/affordability_act.js';
import {api} from "../services/landing";
import {callMessage} from "../services/baseService";
import fnaConverter from '../services/FPS/fna/fnaConverter';
import fpsService from '../services/FPS/fpsService';
//import {inputValidate,outPutValidate} from '../services/commonService/validate';
import qasService from '../services/QAS/qasService';
import {UPDATE_ERROR_INFO,CLEAN_ALL_ERROR_INFO,COMMON_RESPONSE_VALIDATE} from '../common/actions/nav';
import reviewInvestmentImpl from '../services/FPS/goalSolution/reviewInvestment/impl/ReviewInvestmentImpl';

import qasConverter_affordability_300 from '../services/QAS/qasConverter_affordability/qasConverter_affordability_300/qasConverter_affordability_300'
function* initAffordabilityData(params){
      console.log("params get aff",params);
      let sessionInfo = params.affordParams.sessionInfo
      params = params.affordParams.rpqTextParams;
      let affResult;
      let request = {params,sessionInfo};
      console.log("request for getiting rtq record",request) 
      let requestConverter=qasConverter_affordability_300.retrieveQuestionnaireConvertRequest_affordability(request);
      let response=yield call (qasService.process,requestConverter);
        // result=outPutValidate(response);
      console.log("response",response);
      affResult=qasConverter_affordability_300.retrieveQuestionnaireConvertResponse_affordability(response);
      console.log("affResult",affResult);

      

      debugger;
      let SessionInfo={
            channelId:"OHB",
            customerId:"IA777777",
            countryISOCode:"HK",
            employeeUserId:"WD01",
            groupMemberCode:"HBAP",
            userId:"43382921",
            localeCode:"en_US",
            sourceSystemRolePlayerCode:"CDM",
            goalJourney:{
                goalId:1487,
                planId:50050
            }
        }


      //call retrieve FNA
      let requestParams={
        sessionInfo:{}
      };
      let tempState=yield select();
      //requestParams.sessionInfo=tempState.session;
      requestParams.sessionInfo=SessionInfo;
      requestParams.messageId='retrieveFinancialSituationData';
      let requestCo = fnaConverter.retrieveFinancialSituationDataConvertRequest(requestParams);
	    let responseCo = yield call (fpsService.process,requestCo);
      console.log("affordability FNA request=",JSON.stringify(requestCo));
      console.log("affordability FNA response=",JSON.stringify(responseCo));
        // yield put ({
        //     type:COMMON_RESPONSE_VALIDATE,
        //     response:responseCo
        // })

      //call reviewInvestment
      let reviewInvestmentRequestParam={sessionInfo:{},invokePoint:""};
      reviewInvestmentRequestParam.sessionInfo=SessionInfo;
      reviewInvestmentRequestParam.invokePoint="meetingSummary";
      let reviewInvestmentRequest=reviewInvestmentImpl.buildReviewInvestmentImplRequest(reviewInvestmentRequestParam);
      console.log("reviewInvestmentRequest request,",JSON.stringify(reviewInvestmentRequest));
      let reviewInvestmentResponse = yield call (fpsService.process,reviewInvestmentRequest);
      console.log("reviewInvestmentResponse response,",JSON.stringify(reviewInvestmentResponse));
      
      //let result =qasConverter_affordability_300.parseFNAandReviewInvestment_affordability(responseCo,reviewInvestmentResponse);
    
        //let fnaResponse=fnaConverter.retrieveFinancialSituationDataConvertResponse(responseCo);

      yield put({ 
        type: AFFORDABILITY_INIT_DONE,
        affResult
      });
        
    }

    
    export default function* (){
        yield [
            takeEvery(AFFORDABILITY_INIT,initAffordabilityData)
        ]
    }



