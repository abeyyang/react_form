import { call, put, select, takeEvery, takeLatest, compose,fork,take} from 'redux-saga/effects';
import {INV_PRODUCT_SEARCH,INV_REVIEW_PRODUCTS,INV_PRODUCT_SEARCH_UPDATE_LAYOUT,
    INV_PRODUCT_SEARCH_UPDATE_PRODUCT_RESULT,RECORD_BASE_IAJ_SUCCESS,INV_PRODUCT_SEARCH_RENDER_PAGE,INV_PRODUCT_SEARCH_UPDATE_PRODUCT_RESULT_FOR_BOND} from '../FinancialPlanning/Inv/investmentProductSelection/actions/investmentProductSelection_act'
import {callMessage} from "../services/baseService";
import searchResult from "../services/FPS/static/retrieveProductSearchResult"
import {IajProductResultBuilder} from '../services/FPS/productSearch/builder/IajProductResultBuilder';
import IajProductSearchResultRequestBuilder from '../services/FPS/productSearch/builder/IajRetrieveProductSearchResultRequestBuilder';
import goalSolutionConverter from '../services/FPS/goalSolution/goalSolutionConverter';
import fnaConverter from '../services/FPS/fna/fnaConverter';
import ObjectHelper from '../common/lib/ObjectHelper';
import fpsService from '../services/FPS/fpsService';
import {
    UPDATE_SESSION
} from '../common/actions/session'
import criteriaConstant from 'services/FPS/productSearch/constant/criteriaConstant';


    //collection product criterias to search product
    function* investmentJourneyProductSearch(params){
        let tempState=yield select();
        let sessionInfo=tempState.session;
        let requestCriterias = params.requestAction.requestCriterias;
        let productTypeCode = requestCriterias['PROD_TYPE_CDE'];//product Type Code list
        let productTypeCodeUT = [];
        let productTypeCodeOthers = [];
        if(productTypeCode.length > 0){
            productTypeCode.filter(function(item){
                if('UT' == item.value){
                    productTypeCodeUT.push(item);
                }else{
                    productTypeCodeOthers.push(item);
                }
            });
        }else{
            criteriaConstant.productType.filter(function(criteriasConstantItem){
                if('UT' == criteriasConstantItem.value){
                    productTypeCodeUT.push(criteriasConstantItem);
                } else{
                    productTypeCodeOthers.push(criteriasConstantItem);
                }
            });
        }
        let paramsForUT = Object.assign({},params);
        let paramsForBond = Object.assign({},params);
        if(productTypeCodeUT.length > 0){
            paramsForUT.requestAction.requestCriterias['PROD_TYPE_CDE'] = productTypeCodeUT;
            let productSearchResultRequest =  IajProductSearchResultRequestBuilder.buildRetrieveProductSearchResultRequest(paramsForUT);
            let response= yield call (fpsService.process,productSearchResultRequest);
            let productSearchResult = IajProductResultBuilder.searchProductResult(response);
            yield put({
                type:INV_PRODUCT_SEARCH_UPDATE_PRODUCT_RESULT,
                renderPageTargetUrl:'',
                productSearchResult:productSearchResult,
                productData:productSearchResult.productData
            });
        }
        
        if(productTypeCodeOthers.length > 0){
            paramsForBond.requestAction.requestCriterias['PROD_TYPE_CDE'] = productTypeCodeOthers;
            let productSearchResultRequestForBond =  IajProductSearchResultRequestBuilder.buildRetrieveProductSearchResultRequest(paramsForBond);
            let responseForBond= yield call (fpsService.process,productSearchResultRequestForBond);
            let productSearchResultForBond = IajProductResultBuilder.searchProductResult(responseForBond);
            yield put({
                type:INV_PRODUCT_SEARCH_UPDATE_PRODUCT_RESULT_FOR_BOND,
                renderPageTargetUrl:'',
                productSearchResultForBond:productSearchResultForBond,
                productDataForBond:productSearchResultForBond.productData
            });
        }

    }

    //save or update goal information and record products to goal
    function* investmentJourneyReviewProducts(params){
        console.log("review",params);
        let tempState=yield select();
        let sessionInfo=tempState.session;
        console.log("session",sessionInfo);
        let recordBaseGoalParams ={};
        let baseGoal = {};
        let requestData={
            riskLevelNumber:"4",
		    riskToleranceLevel:"4",
            needTypeCode:'GNRC',
            goalTypeCode:'SP_PROD_NEED',
            goalName:'Wealth Accumulation'
        }
        recordBaseGoalParams.requestData=requestData;
        recordBaseGoalParams.sessionInfo=sessionInfo;
        recordBaseGoalParams.messageId='recordBaseGoal'
        let recordBaseGoalResponse=goalSolutionConverter.recordBaseGoalConvertRequestfromJourney(recordBaseGoalParams);
        let responseBaseGoal= yield call (fpsService.process,recordBaseGoalResponse);
        let responseBaseGoalConverter=goalSolutionConverter.recordBaseGoalConvertResponseToJourney(responseBaseGoal);
        baseGoal=responseBaseGoalConverter.goalKey;
        console.log('recordBaseGoal in product search',baseGoal)

        let selectedProducts = params.selectedProducts;
        let selectedProductList = [];
        for(let i = 0;i< selectedProducts.length;i++){
            let selectProduct = {productId:[]};
            let productId = {};
            productId['productAlternativeNumber'] = selectedProducts[i].productKey.productAlternativeNumber;
            productId['productCodeAlternativeClassificationCode'] = selectedProducts[i].productKey.productCodeAlternativeClassCode;
            productId['countryProductTradableCode'] = selectedProducts[i].productKey.productTradableCode;
            productId['productTypeCode'] = selectedProducts[i].productKey.productTypeCode;
            selectProduct.productId.push(productId);
            selectProduct['productSubtypeCode'] = selectedProducts[i].attribute.prodSubtpCde;
            selectedProductList.push(selectProduct);
        }
        let discussedProducts = params.discussedProducts;
        let discussedProductList = [];
        for(let i = 0;i<discussedProducts.length;i++){
            let discussProduct = {productId:[]};
            let discussedProductId = {};
            discussedProductId['productAlternativeNumber'] = discussedProducts[i].productKey.productAlternativeNumber;
            discussedProductId['productCodeAlternativeClassificationCode'] = discussedProducts[i].productKey.productCodeAlternativeClassCode;
            discussedProductId['countryProductTradableCode'] = discussedProducts[i].productKey.productTradableCode;
            discussedProductId['productTypeCode'] = discussedProducts[i].productKey.productTypeCode;
            discussProduct.productId.push(discussedProductId);
            discussedProductList.push(discussProduct);
        }
        let request = {
            request : {
                        "customers": [
                            {
                                "countryISOCode": sessionInfo.customerCountryCode,
                                "groupMemberCode": sessionInfo.customerGroupMember,
                                "sourceSystemRolePlayerCode": sessionInfo.customerType,
                                "rolePlayerIdentificationNumber": sessionInfo.customerID
                            }
                        ],
                        "goalKey": {
                            "arrangementIdentifierFinancialPlanning": baseGoal.planId,
                            "goalSequenceNumber": baseGoal.goalId
                        },
                        "subserviceId": [
                            {
                                "functionOutputCode": "SAVPIQ"
                            },
                            {
                                "functionOutputCode": "SAVSELPRD"
                            }
                        ],
                        "piqQuestAndAnsDetails": [
                            {
                                "investmentPreferenceCode": "5_TO_10",
                                "investmentPreferenceText": null,
                                "investmentPreferenceTypeCode": "INVPERIOD"
                            },
                            {
                                "investmentPreferenceCode": "N_CARE",
                                "investmentPreferenceText": null,
                                "investmentPreferenceTypeCode": "CAPPROQUES"
                            },
                            {
                                "investmentPreferenceCode": "N_CARE",
                                "investmentPreferenceText": null,
                                "investmentPreferenceTypeCode": "LIQQUES"
                            }
                        ],
                        "alternativeProduct": discussedProductList,
                        "productList": selectedProductList
                    },
            messageId:'recordGoalSolutionDetail'
        }
        let response= yield call(fpsService.process,request);
        console.log('recordGoalSolutionDetail response',response);
        
        tempState.session['goalJourney']={
            planId: baseGoal.planId, 
            goalId: baseGoal.goalId
        };
        yield put({
            type: UPDATE_SESSION,
            session:tempState.session
        });
        let layoutRequest = {
            productSearch:"none",
            shortCriteria:"none",
            seachCriteria:"block",
            renderPageTargetUrl:"/group-sfp-war/main/en-gb/invProdSummary"
        }
        yield put({type:INV_PRODUCT_SEARCH_UPDATE_LAYOUT,
            request:layoutRequest});
    }

    function* initInvestmentJourneyProductSearchPage(){
        let tempState=yield select();
        let sessionInfo=tempState.session;
    }
    
    export default function* (){
        yield [
            takeEvery(INV_PRODUCT_SEARCH,investmentJourneyProductSearch),
            takeEvery(INV_REVIEW_PRODUCTS,investmentJourneyReviewProducts)
        ]
    }



