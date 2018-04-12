import { call, put, select, takeEvery, takeLatest, compose,fork } from 'redux-saga/effects';
import {
    RISKPROFILE_GET_REPORT_DONE,RISKPROFILE_GET_REPORT,RISKPROFILE_GET_HISTORICAL_REOCRDS,RISKPROFILE_GET_HISTORICAL_REOCRDS_DONE
} from '../FinancialPlanning/riskProfileQuestionnaire/actions/riskProfileQuestionnaireHistroicalRecords_act';
import {api} from "../services/landing";
import {callMessage} from "../services/baseService";
import {inputValidate,outPutValidate} from '../services/commonService/validate';
import qasService from '../services/QAS/qasService'
import qasConverter from '../services/QAS/qasConverter';

function* getHistoricalRecords(params){
      console.log("params get the history",params);
      let historyRecords=[];
      let sessionInfo = params.rtqHistoricalParams.sessionInfo;
      let requestParams={
          pageMessageType:'RISKPROFILE',
          sessionInfo:sessionInfo
      }
      let requestConverter=qasConverter.retrieveQuestionnaireSummaryConvertRequest(requestParams);
      let response=yield call (qasService.process,requestConverter);
      response =response.responseBody
     // result=outPutValidate(response);
      historyRecords=qasConverter.retrieveQuestionnaireSummaryConvertResponseAll(response,requestParams.pageMessageType);
      console.log("retrieve rtq response",response);

      yield put({ 
        type: RISKPROFILE_GET_HISTORICAL_REOCRDS_DONE,
        historyRecords
      });

        const fetchCurrentTopic = (dispatch, state) => {
    
        }; 
        
    }

    function* getReport(params){
        console.log("get report in saga",params)
        let resultReport = "BO GE";
        yield put({ 
            type: RISKPROFILE_GET_REPORT_DONE,
            resultReport
        });
         console.log("history print in saga", params);
        let sessionInfo = params.reqParams.sessionInfo;
        let qId = params.reqParams.index;
        let printResquestIndex = {sessionInfo,name:"history",qId}
        let printResquest = qasConverter.retrieveQuestionnaireHistoryReportConvertRequest(printResquestIndex);
        debugger
        let printResponse=yield call (qasService.process,printResquest);
        printResponse =printResponse.responseBody;
        if(printResponse !== undefined){
                qasConverter.showReport(printResponse);
        }

    }
    
    export default function* (){
        yield [
            takeEvery(RISKPROFILE_GET_HISTORICAL_REOCRDS,getHistoricalRecords),
            takeEvery(RISKPROFILE_GET_REPORT,getReport)
        ]
    }



