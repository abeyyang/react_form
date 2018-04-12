import { call, put, select, takeEvery, takeLatest, compose,fork,take } from 'redux-saga/effects';
import {
    RETRIEVE_GOAL_SOLUTIO_DETAIL_SIJ_PS,RENDER_SIJ_PS,RENDER_SIJ_PS_SUCESS,
    RETRIEVE_GOAL_SOLUTIO_DETAIL_SIJ_PS_SUCCESS,ADD_OR_DELETE_INS_PRODUCT,
    ADD_OR_DELETE_DISCUSSED_INS_PRODUCT,REVIEW_INS_PRODUCT,
    ADD_OR_DELETE_INS_PRODUCT_SUCCESS,ADD_OR_DELETE_DISCUSSED_INS_PRODUCT_SUCCESS,
    REVIEW_INS_PRODUCT_SUCCESS
} from '../FinancialPlanning/SIJ/productSelection/actions/sij_ps_act';
import {UPDATE_ERROR_INFO,CLEAN_ALL_ERROR_INFO,COMMON_RESPONSE_VALIDATE,UPDATE_MESSAGE_BOX} from '../common/actions/nav';

import{ COMMON_REQUEST_BUILDER } from '../common/actions/requestBuilder';
import {callMessage} from "../services/baseService";
import {inputValidate,outPutValidate,outputValidateWithError} from '../services/commonService/validate';
import fpsService from '../services/FPS/fpsService';
import goalSolutionConverter from '../services/FPS/goalSolution/goalSolutionConverter';
import sessionInfoService from '../services/sessionInfoService';
import modalCreationService from '../services/commonService/ModalCreationService';
import piqQuestAndAnsResponseBuilder from '../services/FPS/productSearch/builder/PiqQuestAndAnsResponseBuilder';
import insuranceJourneyProductSearchParamBuilder from '../services/FPS/productSearch/builder/InsuranceJourneyProductSearchParamBuilder';
import selectedProductResponseBuilder from '../services/FPS/productSearch/builder/SelectedProductsResponseBuilder';
import discussedProductResponseBuilder from '../services/FPS/productSearch/builder/DiscussedProductsResponseBuilder';
import addDisscussedProductImpl from  '../services/FPS/productSearch/impl/AddDiscussedProductImpl';
import buildrecordGoalSolutionDetailForPS from '../services/FPS/productSearch/builder/recordGoalSolutionDetailForPSBuilder';
import {sendMessageWithTimeout} from "./common_sga";

function* retrieveGoalSolutionDetailforSIJPS(request){
    debugger;
     yield put({ type:'CLEAN_ALL_ERROR_INFO'});
    console.log("step1:start retrieve goal solution saga in ps...",request);
    let tempState=yield select();
    let requestConverter,responseConverter,response,requestParams=request,goalKey,goalSolutionDetail={};
    requestParams.request.goalKey= tempState.session.goalJourney;
    requestParams.request.pageMessageType="productSearch";
    requestParams.request["sessionInfo"]=tempState.session;
    //requestConverter=goalSolutionConverter.retrieveGoalSolutionDetailConvertRequestfromSIJ(requestParams.request);
    requestConverter=goalSolutionConverter.retrieveGoalSolutionDetailConvertRequest(requestParams.request);
    console.log("retrieveGoalsolutiondetail.....",JSON.stringify(requestConverter));
    response= yield call (sendMessageWithTimeout,fpsService.process,requestConverter);
    if (response.isTimeout) {
            yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList : response.errorList
            });
            return;
    }
    response = outputValidateWithError(response);

    if(response.errorList.length > 0){
        yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList : response.errorList
            });

    }else{
        responseConverter = goalSolutionConverter.retrieveGoalSolutionDetailConvertResponseToSIJ(response.responseBody);
        //will not call the response converter , and pass the goal detail directly to next saga.
        goalSolutionDetail = {
            goalSolutioinDetailresponse:response.responseBody,
            goalDetailAfterConvert:responseConverter
        };
        goalSolutionDetail.sessionInfo=tempState.session;
        console.log("step1:end retrieve goal solution saga in ps,retrievegoalsolutiondetail...",JSON.stringify(response));
        console.log("step1:end retrieve goal solution saga in ps...",request);
        yield put({type:RETRIEVE_GOAL_SOLUTIO_DETAIL_SIJ_PS_SUCCESS,goalSolutionDetail});
    }
    
    
   }

 function* retrieveProductSearchResultforSIJPS(result){
     debugger;
    console.log("step2:start retrieve product search in sij ps saga...",result);
    let filterFormBean = modalCreationService.getFilterFormModal();
    let searchFormBean =  modalCreationService.getSearchFormModal();
    let productSelectionData = modalCreationService.getProductSearchData();
    //builder for insurance joureny to get solve the piq and sij special  request param ,and set the value to filterformbean and searchformbean
    piqQuestAndAnsResponseBuilder.buildPiqQuestAndAnsResponseBuilder(result.goalSolutionDetail.goalSolutioinDetailresponse,filterFormBean,searchFormBean);
    insuranceJourneyProductSearchParamBuilder.buildInsuranceJourenyProductSearchParamBuilder(result.goalSolutionDetail.goalSolutioinDetailresponse,filterFormBean,searchFormBean);
    console.log("filter form bean",filterFormBean);
    console.log("search form bean",searchFormBean);
    productSelectionData={
             goalKey:result.goalSolutionDetail.sessionInfo.goalJourney,
             selectedTab:'TAB_INS',
             messageId : 'retrieveProductSearchResult',
             filterFormBean:filterFormBean,
             searchFormBean:searchFormBean,
             goalDetailFormBean:{},
             sessionInfo:result.goalSolutionDetail.sessionInfo
    }
    let requestConverter={},response,responseConverter;
    requestConverter= goalSolutionConverter.retrieveProductSearchResultConvertRequestForSIJJourney(productSelectionData);
    console.log("step2:request after convert:",JSON.stringify(requestConverter));
    response= yield call (sendMessageWithTimeout,fpsService.process,requestConverter);
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
            //response =RetrieveProductSearchResult;
            debugger;
            let reviewMyProductsFormBean = modalCreationService.getReviewMyProductsFormModal();
            //parse current goal selected product to reviewMyproductformbean
            selectedProductResponseBuilder.buildSelectedProductsResponseBuilder(result.goalSolutionDetail.goalSolutioinDetailresponse,reviewMyProductsFormBean);
            discussedProductResponseBuilder.buildDiscussedProductsResponseBuilder(result.goalSolutionDetail.goalSolutioinDetailresponse,reviewMyProductsFormBean);
            responseConverter=goalSolutionConverter.retrieveProductSearchResultConvertResponseToSIJJourney(response.responseBody,reviewMyProductsFormBean);
            
        // responseConverter=goalSolutionConverter.retrieveProductSearchResultConvertResponseToInvestmentJourney(response,selectedProductlist);
            if(!responseConverter){
                responseConverter=[];
            }
            let productSearchResult={
                retrieveProductSearchInsuranceListData:responseConverter,
                productSearchResponse:response.responseBody,
                reviewMyProductsFormBean:reviewMyProductsFormBean
            };
            let goalSolutionDetail=result.goalSolutionDetail.goalDetailAfterConvert;
            console.log("step2:end retrieve product search in sij ps saga...",productSearchResult);
            yield put ({type:RENDER_SIJ_PS_SUCESS,productSearchResult,goalSolutionDetail});

        }
   
 }
 
 function* addOrDeleteInsProductInSaga(data){
     debugger;
     let currentState =yield select(),searchResultProducts,responseConverter,productSearchResult;
     if(currentState){
        let reviewMyProductsFormBean= currentState.sijPS.productSearchResult.reviewMyProductsFormBean;
        let productSearchResponse = currentState.sijPS.productSearchResult.productSearchResponse;
        let searchResultProducts= currentState.sijPS.productSearchResult.retrieveProductSearchInsuranceListData.searchResultProducts;
        addDisscussedProductImpl.addDisscussedProductImpl(data.request,reviewMyProductsFormBean,searchResultProducts);
        responseConverter=goalSolutionConverter.retrieveProductSearchResultConvertResponseToSIJJourney(productSearchResponse,reviewMyProductsFormBean);
        
        let productSearchResult={
                retrieveProductSearchInsuranceListData:{
                    searchResultProducts:responseConverter.searchResultProducts,
                    searchResultProductsForTable:responseConverter.searchResultProductsForTable
                },
                reviewMyProductsFormBean:reviewMyProductsFormBean,
                productSearchResponse:productSearchResponse
            };
        console.log("addOrDeleteInsProduct",productSearchResult);
        yield put ({type:ADD_OR_DELETE_INS_PRODUCT_SUCCESS,productSearchResult});

      }
     
    

 } 
  function* addOrDeleteDisscusedInsProductInSaga(data){
      debugger;
    console.log("addOrDeleteDisscusedInsProduct in saga",data);
     let currentState =yield select(),searchResultProducts,responseConverter,productSearchResult;
     if(currentState){
        let reviewMyProductsFormBean= currentState.sijPS.productSearchResult.reviewMyProductsFormBean;
        let searchResultProducts= currentState.sijPS.productSearchResult.retrieveProductSearchInsuranceListData.searchResultProducts;
        let productSearchResponse = currentState.sijPS.productSearchResult.productSearchResponse;
        addDisscussedProductImpl.saveDiscussedProductFacade(data,reviewMyProductsFormBean,searchResultProducts);
        responseConverter=goalSolutionConverter.retrieveProductSearchResultConvertResponseToSIJJourney(productSearchResponse,reviewMyProductsFormBean);
        let productSearchResult={
                retrieveProductSearchInsuranceListData:{
                    searchResultProducts:responseConverter.searchResultProducts,
                    searchResultProductsForTable:responseConverter.searchResultProductsForTable
                },
                reviewMyProductsFormBean:reviewMyProductsFormBean,
                productSearchResponse:productSearchResponse
            };
        yield put ({type:ADD_OR_DELETE_INS_PRODUCT_SUCCESS,productSearchResult});

      }


 } 
  function* reviewInsProductInSaga(data){
    console.log("record goal solution detail with product start...");
    //call record goalsolutionDetail
    debugger;
    let currentState =yield select(),request,requestParams={},response,responseConverter;
    let goProductSummaryFlag=false;
     if(currentState){
        
        let reviewMyProductsFormBean= currentState.sijPS.productSearchResult.reviewMyProductsFormBean;
        requestParams.messageId='recordGoalSolutionDetail';
        requestParams.sessionInfo= currentState.session;
        //requestParams.sessionInfo= sessionInfoService.getSessionInfo_();
        request=buildrecordGoalSolutionDetailForPS.buildRecordGoalSolutionDetailForPS(requestParams,reviewMyProductsFormBean);
        console.log("start to call record goal solution detail in sij ps saga...");
        response= yield call (sendMessageWithTimeout,fpsService.process,request);
        if (response.isTimeout) {
            yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList : response.errorList
            });
            return;
        }

        response = outputValidateWithError(response);

        if (response.errorList.length > 0) {
            yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList : response.errorList
            });
        }else {
                goProductSummaryFlag=true;
                yield put({
                    type: REVIEW_INS_PRODUCT_SUCCESS,
                    goProductSummaryFlag
                })

        }
       


    }
    
  


 } 

export  function* loadingINSPS(){
       
        yield [
              takeEvery(RENDER_SIJ_PS,retrieveGoalSolutionDetailforSIJPS)
          ]
          while(true){
            const result= yield take(RETRIEVE_GOAL_SOLUTIO_DETAIL_SIJ_PS_SUCCESS);
            yield call(retrieveProductSearchResultforSIJPS,result);

          }
}

export  function* addOrDeleteInsProduct(){
       
        yield [
              takeEvery(ADD_OR_DELETE_INS_PRODUCT,addOrDeleteInsProductInSaga)
          ]
           
         
}

export  function* addOrDeleteDiscussedInsProduct(){
       
        yield [
              takeEvery(ADD_OR_DELETE_DISCUSSED_INS_PRODUCT,addOrDeleteDisscusedInsProductInSaga)
          ]
        
}

export  function* reviewInsProduct(){
       
        yield [
              takeEvery(REVIEW_INS_PRODUCT,reviewInsProductInSaga)
          ]
        
}
