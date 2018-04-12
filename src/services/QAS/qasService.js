import React from 'react';
import apiConfig from '../../config/apiConfig';
import {callMessage,callMessageWithError} from "../baseService";
import qasConverter from './qasConverter';
import serviceName from './qasConstants';
import {inputValidate,outPutValidate} from '../commonService/validate';
import affResult from './static/retrieveQuestionnaireResponseDetailRequest_AF';
//import saveKeResult from './static/retrieveQuestionnaireResponseDetailRequest_AF';
import keResult from './static/retrieveQuestionnaireResponseDetailRequest_KE';
import rtqResult from './static/retrieveQuestionnaireResponseDetailRequest_RTQ';
import rtqTextResult from './static/retrieveQuestionnarieResponse_RTQ';
import calResult from './static/calculateQuestionnaireRankingResponse_RTQ';
import mainResult_RTQ from './static/maintainQuestionnaireResponse_RTQ';
import mainResult_KE from './static/maintainQuestionnaireResponseDetailResponse_KE';
import historyRecords from './static/riskProfileQuestionnaireHistroicalRecords_response';
const qasService={
    
    process:(params) =>{
         console.log('start fpsService',params);
            let result,dummyResult,dummyFlag,request;
            let messageId=params.messageId;
            let sessionInfo=getSessionInfo();
            let localcode=sessionInfo.countryCode+sessionInfo.groupMember;
            dummyFlag=apiConfig[localcode].USE_DUMMY_DATA;    
            switch (messageId) {
                /** 
                 * qas service
                */
                case serviceName.RETRIEVEQUESTIONNAIRERESPONSEDETAIL:
                        result=qasService.retrieveQuestionnaireResponseDetail(params,dummyFlag);
                        console.log(' response',result);
                    break;
                case serviceName.RETRIEVEQUESTIONNAIRESUMMARY:
                        result=qasService.retrieveQuestionnaireSummary(params,dummyFlag);
                    break;
                case serviceName.MAINTAINQUESTIONNAIRERESPONSEDETAIL:
                        result=qasService.maintainQuestionnaireResponseDetail(params,dummyFlag);
                    break;
                case serviceName.RETRIEVEQUESTIONNAIRE:
                        result=qasService.retrieveQuestionnaire(params,dummyFlag);
                    break;    
                case serviceName.DOWNLOADQASCONTROLDATA:
                        result=qasService.downloadQASControlData(params,dummyFlag);
                    break;
                case serviceName.RETRIEVEQUESTIONNAIREREPORT:
                        result=qasService.retrieveQuestionnaireReport(params,dummyFlag);
                    break;            
                case serviceName.CALCULATEQUESTIONNAIRERANKING:
                        result=qasService.calculateQuestionnaireRanking(params,dummyFlag);
                    break; 
                 case serviceName.RETRIEVEQUESTIONNAIREHISTORYREPORT:
                        result=qasService.retrieveQuestionnaireHistoryReport(params,dummyFlag);
                    break;         
                default:
                    break;
            }
            return result
    },
    retrieveQuestionnaireResponseDetail:(request,dummyFlag)=>{
        let response;
        console.log("in QAS service and retrieveQuestionnaireResponseDetail");
        console.log("dummy method is " + dummyFlag);
        if(dummyFlag){
            if(request.questionnaireTypeCode == 'RTQ'){
                response=rtqResult;
            }else if(request.questionnaireTypeCode == 'KE'){
               response=keResult
            }
        }else{
            response=callMessageWithError(request);
        }
        return response;
    },
    retrieveQuestionnaireSummary:(request,dummyFlag)=>{
        let response;
        console.log("shoot",dummyFlag)
        if(dummyFlag){
            response=historyRecords;
        }else{
            response=callMessageWithError(request);
        }
        return response;
    },
    maintainQuestionnaireResponseDetail:(request,dummyFlag)=>{
        let response;
        if(dummyFlag){
            if(request.jsonData !== undefined){
               response=mainResult_KE;
            }else{
               response=mainResult_RTQ;
            }
        }else{
            response=callMessageWithError(request);
        }
        console.log("response in S", response)
        return response;
    },
    retrieveQuestionnaire:(request,dummyFlag)=>{
        let response;
        console.log("request in ser",request)
        if(dummyFlag){
            if(request.questionnaireTypeCode == 'RTQ'){
                response=rtqTextResult;
            }
            else if(request.questionnaireTypeCode == 'FPCUSTDCLR'){
                response =affResult;
            }
        }else{
            response=callMessageWithError(request);
        }
        
        return response;
    },
    downloadQASControlData:(request,dummyFlag)=>{
           let response;
        response=callMessage(request);
        return response;
    },
    retrieveQuestionnaireReport:(request,dummyFlag)=>{
           let response;
        response=callMessage(request);
        return response;
    },
    calculateQuestionnaireRanking:(request,dummyFlag)=>{
        let response;
        if(dummyFlag){
            response=calResult;
        }else{
            response=callMessage(request);
        }
        return response;
    },
    retrieveQuestionnaireHistoryReport:(request,dummyFlag)=>{
        let response;
        if(dummyFlag){
            response=calResult;
        }else{
            response=callMessage(request);
        }
        return response;
    }
    

    
}
export const getSessionInfo = () =>{
   let sessionInfo={
                "businessLine":"PFS",
                "channelId":"OHB",
                "countryCode":"HK",
                "employeeUserId":"43367026",
                "groupMember":"HBAP",
                "hubUserId":"WD01",
                "hubWorkstationId":"WD01"
    }
    return sessionInfo;
}
export default  qasService;