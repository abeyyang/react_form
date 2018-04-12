import React from 'react';
import apiConfig from '../../config/apiConfig';
import {callMessage, callMessageWithError} from "../baseService";
import fpsConverter from './fpsConverter';
import serviceName from './fpsConstants';
import {inputValidate,outPutValidate} from '../commonService/validate';

import retrieveFinancialSituationDataResponse from './static/retrieveFinancialSituationDataResponse';
import recordFinancialSituationDataRequest from './static/recordFinancialSituationDataRequest';
import recordFinancialSituationDataResponse from './static/recordFinancialSituationDataResponse';
import retrieveInvolvedPartyDetailsIndividualResponse  from './static/retrieveInvolvedPartyDetailsIndividualResponse';
import recordBaseGoalResponse from './static/recordBaseGoalResponse';
import retrieveGoalSummaryListResponse from './static/retrieveGoalSummaryListResponse';
import retrieveGoalSolutionDetailResponse from './static/retrieveGoalSolutionDetailResponse';
import retrieveProductSearchResultResponse from './static/retrieveProductSearchResultResponse';

import retrieveFinancialSituationReferenceRecordAssetsDataResponse from './static/retrieveFinancialSituationReferenceRecordAssetsDataResponse';
import retrieveFinancialSituationReferenceRecordExpensesDataResponse from './static/retrieveFinancialSituationReferenceRecordExpensesDataResponse';
import retrieveFinancialSituationReferenceRecordIncomeDataResponse from './static/retrieveFinancialSituationReferenceRecordIncomeDataResponse';
import retrieveFinancialSituationReferenceRecordLiabilitiesDataResponse from './static/retrieveFinancialSituationReferenceRecordLiabilitiesDataResponse';
import updateFhcResultResponse from './static/updateFhcResultResponse';
import calculateProtectionResponse from './static/calculateProtectionResponse';
import enquireFhcSummaryResponse from './static/enquireFhcSummaryResponse';
import retrieveFhcDetailResponse from './static/retrieveFhcDetailResponse';
import retrieveLife400InsuranceDetailResponse from './static/retrieveLife400InsuranceDetailResponse';

import retrieveByCurrencyRequest from './static/retrieveByCurrencyRequest';
import retrieveByCurrencyResponse from './static/retrieveByCurrencyResponse';

import calculateEducationResponse from './static/calculateEducationResponse';
import retrieveOrderPlacementResponse from './static/retrieveOrderPlacementResponse';
import calculateRetirementResponse from './static/calculateRetirementResponse';
import calculateLifeCoverageResponse from './static/calculateLifeCoverageResponse';
import calculateCriticalIllnessResponse from './static/calculateCriticalIllnessResponse';
import calculatePlanningYourRetirementResponse from './static/calculatePlanningYourRetirementResponse';
import calculateGrowingYourWealthResponse from './static/calculateGrowingYourWealthResponse';
import reviewInvestmentsResponse from './static/reviewInvestmentsResponse';
import assetConcentrationCalculationGetHoldingResponse from './static/assetConcentrationCalculationGetHoldingResponse';
import fpsDownloadControlDataResponse from './static/fpsDownloadControlDataResponse';
import financialSituationReferenceRecordServiceAssetsResponse from './static/financialSituationReferenceRecordServiceAssetsResponse';



const fpsService={

    process:(params) =>{
            console.log('start fpsService',params);
            if(params==undefined){
                console.log("params is undefined");
                return null;
            }
            let result,dummyResult,dummyFlag,request;
            let messageId=params.messageId;
            let sessionInfo=params.sessionInfo || getSessionInfo();
            let localcode=sessionInfo.countryCode+sessionInfo.groupMember;
            dummyFlag=apiConfig[localcode].USE_DUMMY_DATA;

            console.log('start fpsService messageId',messageId); 
            switch (messageId) {
                /** 
                 * fna service
                */
                case serviceName.RETRIEVEFINANCIALSITUATIONDATA:
                        result=fpsService.retrieveFinancialSituationData(params,dummyFlag);
                        console.log(' response',result);

                    break;
                case serviceName.UPDATEFHCRESULT:
                        result=fpsService.updateFhcResult(params,dummyFlag);
                        console.log(' updateFhcResult',result);
                    break;
                case serviceName.RETRIEVEFINANCIALSITUATIONREFERENCERECORDASSETS:
                        result=fpsService.retrieveFinancialSituationReferenceRecordAssets(params,dummyFlag);
                    break;
                case serviceName.RETRIEVEFINANCIALSITUATIONREFERENCERECORDEXPENSES:
                        console.log("RETRIEVEFINANCIALSITUATIONREFERENCERECORDEXPENSES");
                        result=fpsService.retrieveFinancialSituationReferenceRecordExpenses(params,dummyFlag);
                    break;
                case serviceName.RETRIEVEFINANCIALSITUATIONREFERENCERECORDINCOME:
                        result=fpsService.retrieveFinancialSituationReferenceRecordIncome(params,dummyFlag);
                    break;
                case serviceName.RETRIEVEFINANCIALSITUATIONREFERENCERECORDLIABILITIES:
                        result=fpsService.retrieveFinancialSituationReferenceRecordLiabilities(params,dummyFlag);
                    break;

                case serviceName.RECORDFINANCIALSITUATIONDATA:
                        result=fpsService.recordFinancialSituationData(params,dummyFlag);
                    break;
                /**
                 * goalsolution service
                 * 
                 */
                case serviceName.RETRIEVEGOALSUMMARYLIST:
                        result=fpsService.retrieveGoalSummaryList(params,dummyFlag);
                    break;
                case serviceName.RETRIEVEPRODUCTSEARCHRESULT:
                        result=fpsService.retrieveProductSearchResult(params,dummyFlag); 
                     break;
                case serviceName.RETRIEVEPRODUCTCOUNT:
                        result=fpsService.retrieveProductCount(params,dummyFlag); 
                     break;      
                case serviceName.RETRIEVEGOALSOLUTIONDETAIL:
                        result=fpsService.retrieveGoalSolutionDetail(params,dummyFlag); 
                     break;
                case serviceName.RECORDGOALSOLUTIONDETAIL:
                        result=fpsService.recordGoalSolutionDetail(params,dummyFlag); 
                     break;
                case serviceName.DELETEGOALINFORMATION:
                        result=fpsService.deleteGoalInformation(params,dummyFlag); 
                     break;
                case serviceName.REVIEWINVESTMENTS:
                        result=fpsService.reviewInvestments(params,dummyFlag); 
                     break;  
                 /**
                 * globalSimulatorService
                 * 
                 */  
                  case serviceName.CALCULATEPROTECTIONPLANNING:
                        result=fpsService.calculateProtectionPlanning(params,dummyFlag); 
                   break;
                  case serviceName.RECORDPROTECTIONPLANNING:
                        result=fpsService.recordProtectionPlanning(params,dummyFlag); 
                   break;
                   case serviceName.RETRIEVEPROTECTIONPLANNING:
                        result=fpsService.retrieveProtectionPlanning(params,dummyFlag); 
                   break; 
                    case serviceName.CALCULATEPLANNINGYOURRETIREMENT:
                        result=fpsService.calculatePlanningYourRetirement(params,dummyFlag); 
                   break;
                  case serviceName.RETRIEVEPLANNINGYOURRETIREMENT:
                        result=fpsService.retrievePlanningYourRetirement(params,dummyFlag); 
                   break;
                   case serviceName.RECORDPLANNINGYOURRETIREMENT:
                        result=fpsService.recordPlanningYourRetirement(params,dummyFlag); 
                   break; 
                    case serviceName.CALCULATERETIRMENTBENEFITS:
                        result=fpsService.calculateRetirementBenefits(params,dummyFlag); 
                   break; 
                   case serviceName.CALCULATEGROWINGYOURWEALTH:
                        result=fpsService.calculateGrowingYourWealth(params,dummyFlag); 
                   break; 
                   case serviceName.CALCULATERISKCAPACITY:
                        result=fpsService.calculateRiskCapacity(params,dummyFlag);
                   break;

                 /**
                 * goalWebService
                 * 
                 */    
                case serviceName.RECORDBASEGOAL:
                        result=fpsService.recordBaseGoal(params,dummyFlag);
                    break;            
               /**
                 * involvedPartyMgmtService service
                 * 
                 */    
                case serviceName.RETRIEVEINVOLVEDPARTYDETAILSINDIVIDUAL:
                        result=fpsService.retrieveInvolvedPartyDetailsIndividual(params,dummyFlag);
                    break;
                /**
                 * enquireFhcSummary service
                 */
                case serviceName.ENQUIREFHCSUMMARY:
                        result=fpsService.enquireFhcSummary(params,dummyFlag);
                    break;
                /**
                 * retrieveFhcDetail service
                 */
                case serviceName.RETRIEVEFHCDETAIL:
                        result=fpsService.retrieveFhcDetail(params,dummyFlag);
                    break;
                /**
                 * Life400InsuranceDetail service
                 */
                case serviceName.RETRIEVELIFE400INSURANCEDETAIL:
                        result=fpsService.retrieveLife400InsuranceDetail(params,dummyFlag);
                    break;
                /**
                 * retrieveByCurrency service
                 */
                case serviceName.RETRIEVEBYCURRENCY:
                        result=fpsService.retrieveByCurrency(params,dummyFlag);
                    break;
                case serviceName.CALCULATEEDUCTION:
                case serviceName.CALCULATEEDUCTION2:
                     result=fpsService.calculateEducation(params, dummyFlag);
                     break;
                case serviceName.CALCULATERETIREMENT:
                case serviceName.CALCULATERETIREMENT2:
                     result=fpsService.calculateRetirement(params, dummyFlag);
                     break;
                case serviceName.CALCULATELIFECOVERAGE:
                case serviceName.CALCULATELIFECOVERAGE2:
                     result=fpsService.calculateLifeCoverage(params, dummyFlag);
                     break;
                case serviceName.CALCULATECRITICALILLNESS:
                case serviceName.CALCULATECRITICALILLNESS2:
                     result=fpsService.calculateCriticalIllness(params, dummyFlag);
                     break;
                /**
	            *  retrieveOrderPlacement service
	            * 
	            */    
                case serviceName.RETRIEVEORDERPLACEMENT:
                    result=fpsService.retrieveOrderPlacement(params,dummyFlag);
                    break;
                case serviceName.ASSETCONCENTRATIONCALCULATIONGETHOLDING:
                     result=fpsService.assetConcentrationCalculationGetHolding(params, dummyFlag);
                     break;
                case serviceName.FINANCIALSITUATIONREFERENCERECORDSERVICEASSETS:
                     result=fpsService.financialSituationReferenceRecordServiceAssets(params, dummyFlag);
                     break;
                case serviceName.FPSDOWNLOADCONTROLDATA:
                     result=fpsService.fpsDownloadControlData(params, dummyFlag);
                     break;
                default:
                     break;
                }
                return result
    },
     /** 
      * fna service
     */
    retrieveFinancialSituationData:(request,dummyFlag)=>{
        let response;
        if(dummyFlag){
            response = {
                isTimeout : false,
                errorList : [],
                responseBody:retrieveFinancialSituationDataResponse
            };
        }else{
            response=callMessageWithError(request);
        }
       return response;
    },

    updateFhcResult:(request,dummyFlag)=>{
        let response;
        if(dummyFlag){
            response=updateFhcResultResponse;
        }else{
            response=callMessageWithError(request);
        }
       return response;
    },

    retrieveFinancialSituationReferenceRecordAssets:(request,dummyFlag)=>{
        let response;
        if(dummyFlag){
            response = {
                isTimeout : false,
                errorList : [],
                responseBody : retrieveFinancialSituationReferenceRecordAssetsDataResponse
            };
            console.log("retrieveFinancialSituationReferenceRecordAssetsDataResponse 22",retrieveFinancialSituationReferenceRecordAssetsDataResponse);
        }else{
            
            response=callMessageWithError(request);
        }
       return response;
    },
    retrieveFinancialSituationReferenceRecordExpenses:(request,dummyFlag)=>{
        let response;
        if(dummyFlag){
            response=retrieveFinancialSituationReferenceRecordExpensesDataResponse;
            console.log("retrieveFinancialSituationReferenceRecordExpensesDataResponse",retrieveFinancialSituationReferenceRecordExpensesDataResponse);
        }else{
            response=callMessageWithError(request);
        }
       return response;
    },
    retrieveFinancialSituationReferenceRecordIncome:(request,dummyFlag)=>{
        let response;
        if(dummyFlag){
            response = retrieveFinancialSituationReferenceRecordIncomeDataResponse;
            console.log("retrieveFinancialSituationReferenceRecordIncomeDataResponse",retrieveFinancialSituationReferenceRecordIncomeDataResponse);
        }else{
            response=callMessageWithError(request);
        }
       return response;
    },
    retrieveFinancialSituationReferenceRecordLiabilities:(request,dummyFlag)=>{
        let response;
        if(dummyFlag){
            response=retrieveFinancialSituationReferenceRecordLiabilitiesDataResponse;
            console.log("retrieveFinancialSituationReferenceRecordLiabilitiesDataResponse",retrieveFinancialSituationReferenceRecordLiabilitiesDataResponse);
        }else{
            response=callMessageWithError(request);
        }
       return response;
    },

    recordFinancialSituationData:(request,dummyFlag)=>{
        let response;
        if(dummyFlag){
            response=recordFinancialSituationDataResponse;
        }else{
            response=callMessage(request);
        }

       return response;
    },
     /**
      * goalsolution service
      */
    retrieveGoalSummaryList:(request,dummyFlag)=>{
        let response;
         if(dummyFlag){
            response=retrieveGoalSummaryListResponse;
        }else{
            response=callMessage(request);
        }
          return response;
    },
    /**
      * goalsolution service
      */
    reviewInvestments:(request,dummyFlag)=>{
        let response;
         if(dummyFlag){
            response=reviewInvestmentsResponse;
        }else{
            response=callMessage(request);
        }
          return response;
    },
    retrieveGoalSolutionDetail:(request,dummyFlag)=>{
        let response;
         if(dummyFlag){
             response = {
                isTimeout : false,
                errorList : [],
                responseBody:retrieveGoalSolutionDetailResponse
            };
        }else{
            response=callMessage(request);
        }
          return response;
    },
    recordBaseGoal:(request,dummyFlag)=>{
        let response;
        if(dummyFlag){
             response = {
                isTimeout : false,
                errorList : [],
                responseBody:recordBaseGoalResponse
            };
        }else{
            response=callMessage(request);
        }
        console.log('recordBaseGoal',response)
        return response;
    },
    retrieveInvolvedPartyDetailsIndividual:(request,dummyFlag)=>{
        let response;
        if(dummyFlag){
            response = {
                isTimeout : false,
                errorList : [],
                responseBody : retrieveInvolvedPartyDetailsIndividualResponse
            };
        }else{
            response=callMessageWithError(request);
        }
        console.log('retrieveInvolvedPartyDetailsIndividual',response)
        return response;
    },
    enquireFhcSummary:(request,dummyFlag)=>{
        let response;
        if(dummyFlag){
            response=enquireFhcSummaryResponse;
        }else{
            response=callMessageWithError(request);
        }
        console.log('enquireFhcSummary',response)
        return response;
    },
    retrieveFhcDetail:(request,dummyFlag)=>{
        let response;
        if(dummyFlag){
            response=retrieveFhcDetailResponse;
        }else{
            response=callMessageWithError(request);
        }
        console.log('retrieveFhcDetail',response)
        return response;
    },
    retrieveLife400InsuranceDetail:(request,dummyFlag)=>{
        let response;
        if(dummyFlag){
            response=retrieveLife400InsuranceDetailResponse;
        }else{
            response=callMessageWithError(request);
        }
        console.log('retrieveLife400InsuranceDetail',response)
        return response;
    },
    retrieveProductSearchResult:(request,dummyFlag)=>{
         let response;
         if(dummyFlag){
            response=retrieveProductSearchResultResponse;
        }else{
            response=callMessage(request);
        }
          return response;
    },
    retrieveProductCount:(request,dummyFlag)=>{
         let response;
         if(dummyFlag){
            response=retrieveGoalSummaryListResponse;
        }else{
            response=callMessage(request);
        }
          return response;
    },
    retrieveGoalSolutionDetail:(request,dummyFlag)=>{
         let response;
         if(dummyFlag){
             response = {
                isTimeout : false,
                errorList : [],
               responseBody:retrieveGoalSolutionDetailResponse
            };
        }else{
            response=callMessage(request);
        }
          return response;
    },
    recordGoalSolutionDetail:(request,dummyFlag)=>{
         let response;
         if(dummyFlag){
            response='';
        }else{
            response=callMessage(request);
        }
          return response;
    },
     deleteGoalInformation:(request,dummyFlag)=>{
         let response;
         if(dummyFlag){
            response='';
        }else{
            response=callMessage(request);
        }
          return response;
    },
    retrieveByCurrency:(request,dummyFlag)=>{
        let response;
        if(dummyFlag){
            response=retrieveByCurrencyResponse;
            console.log("retrieveByCurrencyResponse",retrieveByCurrencyResponse);
        }else{
            response=callMessage(request);
            console.log("remote retrieveByCurrencyResponse",response);
        }
       return response;
    },     
      calculateProtectionPlanning:(request,dummyFlag)=>{
         let response;
         if(dummyFlag){
            response=calculateProtectionResponse;
            console.log("calculateProtectionResponse",calculateProtectionResponse);
        }else{
            response=callMessage(request);
        }
          return response;
     },
    recordProtectionPlanning:(request,dummyFlag)=>{
         let response;
         if(dummyFlag){
            response='';
        }else{
            response=callMessage(request);
        }
          return response;
     },
      retrieveProtectionPlanning:(request,dummyFlag)=>{
         let response;
         if(dummyFlag){
            response='';
        }else{
            response=callMessage(request);
        }
          return response;
     },
      calculatePlanningYourRetirement:(request,dummyFlag)=>{
         let response;
         if(dummyFlag){
            response=calculatePlanningYourRetirementResponse;
        }else{
            response=callMessage(request);
        }
          return response;
     },
      retrievePlanningYourRetirement:(request,dummyFlag)=>{
         let response;
         if(dummyFlag){
            response=calculatePlanningYourRetirementResponse;
        }else{
            response=callMessage(request);
        }
          return response;
     },
      recordPlanningYourRetirement:(request,dummyFlag)=>{
         let response;
         if(dummyFlag){
            response=calculatePlanningYourRetirementResponse;
        }else{
            response=callMessage(request);
        }
          return response;
     },
      calculateRetirementBenefits:(request,dummyFlag)=>{
         let response;
         if(dummyFlag){
            response='';
        }else{
            response=callMessage(request);
        }
          return response;
     },
     calculateEducation:(request, dummyFlag)=>{
         let response;
         if(dummyFlag){ 
             response=calculateEducationResponse;
         }else{
             response=callMessageWithError(request);
         }
        /// response.messageId=serviceName.CALCULATEEDUCTION;
         // response.calculationType=request.calculationType;
         return response;
     },
     calculateRetirement:(request, dummyFlag)=>{
        let response;
        if(dummyFlag){ 
            response={
                isTimeout : false,
                errorList : [],
                responseBody : calculatePlanningYourRetirementResponse
            }
        }else{
            response=callMessageWithError(request);
        }
        //response.messageId=serviceName.CALCULATERETIREMENT;
        //response.calculationType=request.calculationType;
        return response;
    },
    calculateLifeCoverage:(request, dummyFlag)=>{
        let response;
        if(dummyFlag){ 
            response=calculateLifeCoverageResponse;
        }else{
            response=callMessageWithError(request);
        }
        //response.messageId=serviceName.CALCULATELIFECOVERAGE;
        // response.calculationType=request.calculationType;
        return response;
    },
    calculateCriticalIllness:(request, dummyFlag)=>{
        let response;
        if(dummyFlag){ 
            response=calculateCriticalIllnessResponse;
        }else{
            response=callMessageWithError(request);
        }
       // response.messageId=serviceName.CALCULATECRITICALILLNESS;
       // response.calculationType=request.calculationType;
        return response;
    },
      calculateGrowingYourWealth:(request,dummyFlag)=>{
         let response;
         if(dummyFlag){
            response=calculateGrowingYourWealthResponse;
        }else{
            response=callMessageWithError(request);
        }
        return response;
     },

    calculateRiskCapacity:(request,dummyFlag)=>{
        let response;
        console.log("CALCULATERISKCAPACITY service is called", dummyFlag);
        if(dummyFlag){
            response={
                isTimeout : false,
                errorList : [],
                responseBody : {"calculatedRiskCapacity" : "2"}
            }
        }else{
            response=callMessageWithError(request);
        }
        console.log("CALCULATERISKCAPACITY service ended", response);
        return response;
    },

    retrieveOrderPlacement:(request,dummyFlag)=>{
        let response;
        if(dummyFlag){
            response=retrieveOrderPlacementResponse;
        }else{
            response=callMessage(request);
        }
        return response;
    },
     //assetConcentrationCalculationGetHolding
     assetConcentrationCalculationGetHolding:(request,dummyFlag)=>{
         let response;
         if(dummyFlag){
             response = {
                isTimeout : false,
                errorList : [],
                responseBody : assetConcentrationCalculationGetHoldingResponse
            };
        }else{
            response=callMessageWithError(request);
        }
          return response;
     },
     financialSituationReferenceRecordServiceAssets:(request,dummyFlag)=>{
        let response;
        if(dummyFlag){
            response = {
                isTimeout : false,
                errorList : [],
                responseBody : financialSituationReferenceRecordServiceAssetsResponse
            };
        }else{
            response=callMessageWithError(request);
        }
        return response;
     },
     fpsDownloadControlData:(request, dummyFlag)=>{
         let response;
         if(dummyFlag){ 
             response=fpsDownloadControlDataResponse;
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
export default fpsService;