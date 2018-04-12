
import sessionInfoService from '../../sessionInfoService'
import ObjectHelper from '../../../common/lib/ObjectHelper';
import goalSolutionUtil from './goalSolutionUtil';
import goalSolutionDetailUtil from './goalSolutionDetailUtil'
import {commonConfig} from '../../config/fna/commonConfig';
import {productSearchConstants} from '../../config/goalSolution/productSearchConstants';
import {prodSearchUtils} from '../../commonService/prodSearchUtils';

  let mjFormBean={
            goalKey:{

            }
        }
const goalSolutionConverter={
     /**
      * goalsolution Converter
      */
    retrieveGoalSummaryListConvertRequest:(params)=>{
        
    },
     retrieveGoalSummaryListConvertResponse:(response)=>{
         
        return retrieveGoalSummarylistReaponseConvert;
    },
     /**
      *  goalWebService Converter
      */
     recordBaseGoalConvertRequestfromJourney:(params)=>{
        let request = {

        };
        let requestData=params.requestData;
        // requestData={
        //     riskLevelNumber:"4",
		//     riskToleranceLevel:"4",
        //     needTypeCode:'',
        //     goalTypeCode:'',
        //     goalName:''
        // }
        let sessionInfo=params.sessionInfo;
        console.log("sessionInfo",sessionInfo);
        request={
                customers: [{
                    countryISOCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    sourceSystemRolePlayerCode: sessionInfo.sourceSystemRolePlayerCode,
                    rolePlayerIdentificationNumber: sessionInfo.customerId
                }]
        };
        var baseGoal = {};
		baseGoal=goalSolutionUtil._buildBaseGoal(requestData);
        request.baseGoal=baseGoal;
        request.localeCode={
                localeCode: sessionInfo.localeCode
        }
        request={
            request,
            messageId:params.messageId
        }
        console.log("baseGoalrequest..",request);
        return request;
    },
     recordBaseGoalConvertResponseToJourney:(response)=>{
        var recordCustomerGeneralGoalResp = response;
         mjFormBean=goalSolutionUtil._handleResponse(recordCustomerGeneralGoalResp);

        console.log("covert mjFormBean..",mjFormBean);
        return mjFormBean;
    },

     /**
      *  involvedPartyMgmtService Converter
      */
    retrieveInvolvedPartyDetailsIndividualConvertRequestfromJourney:(params)=>{
        let request = {

        };
        let sessionInfo=sessionInfoService.getSessionInfo();
        let RetrieveIPDetails=goalSolutionUtil._buildIPDetail(sessionInfo.custmerId);
        request=RetrieveIPDetails;
        request={
            request,
            messageId:params.messageId
         }
        console.log("request",request);
        return request;
    },
    retrieveInvolvedPartyDetailsIndividualConvertResponseToJourney:(response)=>{
        console.log("covert retrieveInvolvedPartyDetailsIndividualConvertResponse",response);
        return response;
    }, 
    retrieveProductSearchResultConvertRequestfromJourney:(params)=>{
        // productSelectionData={
        //      goalKey:{ 
        //              goalId:"",
        //              planId:""
        //      },
        //      selectedTab:'TAB_UT',
        //      filterFormBean:{ },
        //      searchFormBean:{ },
        //      goalDetailFormBean:{}
        // }
     
        let request = {

        };
        let RetrieveProductSearchResultRequest={
                customers:[],
                goalKey:{},
                localeCode:{},
                productSearchCriteria:[],
                requestModes:[],
                paginationDetail:{}
        }
         let sessionInfo=sessionInfoService.getSessionInfo();
        request={
                customers: [{
                    countryISOCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    sourceSystemRolePlayerCode: sessionInfo.sourceSystemRolePlayerCode,
                    rolePlayerIdentificationNumber: sessionInfo.customerId
                }]
        };
        let productSelectionData=params.productSelectionData;
      
        console.log("sessionInfo",sessionInfo);
        productSelectionData.localeCode=sessionInfo.localeCode;
        // RetrieveProductSearchResultRequest.customers=request.customers;
        RetrieveProductSearchResultRequest=goalSolutionUtil.buildRetrieveProductSearchResultRequest(productSelectionData);
        request=RetrieveProductSearchResultRequest;
        request.customers=[{
                    countryISOCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    sourceSystemRolePlayerCode: sessionInfo.sourceSystemRolePlayerCode,
                    rolePlayerIdentificationNumber: sessionInfo.customerId
                }];
        request.localeCode={
            localeCode:sessionInfo.localeCode
        }
        request={
            request,
            messageId:params.messageId
         }
        console.log("request",request);
        return request;
    },

    retrieveProductSearchResultConvertRequestForSIJJourney:(params)=>{
        let request = {

        };
        let RetrieveProductSearchResultRequest={
                customers:[],
                goalKey:{
                    goalSequenceNumber:"",
                    arrangementIdentifierFinancialPlanning:""
                },
                localeCode:{},
                productSearchCriteria:[],
                requestModes:[],
                paginationDetail:{}
        }
        let sessionInfo=params.sessionInfo;
        let productSelectionData={
              goalKey:{
                    goalSequenceNumber:"",
                    arrangementIdentifierFinancialPlanning:""
                },
             selectedTab:'',
             messageId : '',
             filterFormBean:{ },
             searchFormBean:{ },
             goalDetailFormBean:{},
             sessionInfo:{}
        }
        productSelectionData=params;
        //productSelectionData=sessionInfoService.getSessionInfo_();
        console.log("sessionInfo",sessionInfo);
        productSelectionData.localeCode=sessionInfo.localeCode;
        // RetrieveProductSearchResultRequest.customers=request.customers;
        RetrieveProductSearchResultRequest=goalSolutionUtil.buildRetrieveProductSearchResultRequest(productSelectionData);
        request=RetrieveProductSearchResultRequest;
        request.customers=[{
                    countryISOCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    sourceSystemRolePlayerCode: sessionInfo.sourceSystemRolePlayerCode,
                    rolePlayerIdentificationNumber: sessionInfo.customerId
                }];
        request.localeCode={
            localeCode:sessionInfo.localeCode
        }
        request={
            request,
            messageId:params.messageId
         }
        console.log("request",request);
        return request;
    },

    /**
      * goalsolution  deleteGoalInformation request convert
      */
    deleteGoalInformationRequestConvert:(params)=>{
        console.log("goalsolution deleteGoalInformation request convert start ",params); 
        let customerId;
        if(params.session && params.session.customerId){
         customerId =params.session.customerId
        }else{
            customerId='HKHBAP506035781'
        }
        let request = {
            customers: [{
    		countryISOCode: "HK",
    		groupMemberCode: "HBAP",
    		sourceSystemRolePlayerCode: "CDM",
   // 	    rolePlayerIdentificationNumber: params.session.customerId,
            rolePlayerIdentificationNumber: customerId,
    		customerAttribute: [{
    			attributeKey: "",
    			attributeValue: ""
    		  }]
        	}],
           goalKey: {
                arrangementIdentifierFinancialPlanning : params.request.goalKey.arrangementIdentifierFinancialPlanning,
                goalSequenceNumber: params.request.goalKey.goalSequenceNumber
            },
            goalMaintenance: {
                        maintenanceCode : "DELETE"
             }
          }
        let deleteGoalInformationRequestConvertRequestConvert = {
                    messageId : params.messageId,
                    request:request,
            }
        console.log("goalsolution deleteGoalInformation request convert end",deleteGoalInformationRequestConvertRequestConvert);
        return deleteGoalInformationRequestConvertRequestConvert;
    },
    deleteGoalInformationResponseConvert:(response)=>{
        let deleteGoalInformationResponseView ={};
        console.log("goalsolution deleteGoalInformation response convert start ",response);  

        //convert
       
        console.log("goalsolution deleteGoalInformation response convert start ",deleteGoalInformationResponseView);  
        return deleteGoalInformationResponseView;
    },
retrieveProductSearchResultConvertResponseToInvestmentJourney:(respData,productSelectionData)=>{
        //PopulateProductSearchResultProcessor
         //PopulateProductSearchResultProcessor
        console.log("step2 :  convert from response start for SIJ",respData);
        
         if (respData) {
				const productSearchResult = respData.productSearchResult;
				if(productSearchResult){
            		let products = productSearchResult.product;
            		let searchResultProducts = [];
            		if(products && products.length >0){
            			for(let i=0; i<products.length; i++ ){
            				let product = products[i];
            				if(product){
                                let tempProduct = {};
                               //add productId by productKey.
                               let  tempProductKey;
                               let  tempProductId;
            					if(product.productKey){
                                    if(!ObjectHelper.isNullOrEmpty(product.productKey)){
                                        let productKeyList = product.productKey;
                                        for(let i=0;i<productKeyList.length;i++){
                                             tempProductKey = productKeyList[i];
                                            if ("M" == tempProductKey.productCodeAlternativeClassCode) {
                                                tempProduct.productKey = tempProductKey;
                                                tempProductId=tempProductKey.productTradableCode+"_"+tempProductKey.productTypeCode+"_"+tempProductKey.productAlternativeNumber+"_"+tempProductKey.productCodeAlternativeClassCode;
                                                tempProduct.productId=tempProductId;
                                                break;
                                            }

                                        }
                                    }
            					}
                             	tempProduct.selected = product.selected;
            				    tempProduct.selected = false;
            					tempProduct.discussed = product.discussed;
            					let productAttributeList = product.productAttribute;
            					if(productAttributeList && productAttributeList.length > 0){
            						for(let j=0; j<productAttributeList.length; j++ ){
            							let productAttribute = productAttributeList[j];
            							if(productAttribute && productAttribute.attributeName == "prodName"){
            								tempProduct.productName = productAttribute.attributeValue;
            							}
            							
            							if(productAttribute && productAttribute.attributeName == "prodTypCde"){
            								tempProduct.productTypeCode = productAttribute.attributeValue;
            							}
            							
            							if(productAttribute && productAttribute.attributeName == "riskLvlCde"){
            								tempProduct.riskLevelCode = productAttribute.attributeValue;
            							}
            							if(productAttribute && productAttribute.attributeName == "ccyProdCde"){
            								tempProduct.currencyProductCode = productAttribute.attributeValue;
            							}
            							
            							if(productAttribute && productAttribute.attributeName == "prodAltPrimNum"){
            								tempProduct.productCode = productAttribute.attributeValue;
            							}
            							
            							if(productAttribute && productAttribute.attributeName == "prodSubtpCde"){
            								tempProduct.productSubtypeCode = productAttribute.attributeValue;
            							}
            							
            							// commercialization period start date
            							if(productAttribute && productAttribute.attributeName == "commPrdStDt"){
            								tempProduct.commPrdStDt = productAttribute.attributeValue;
            							}
            							
            							// commercialization period end date
            							if(productAttribute && productAttribute.attributeName == "commPrdEndDt"){
            								tempProduct.commPrdEndDt = productAttribute.attributeValue;
            							}
            							
            							if(productAttribute && productAttribute.attributeName == "termRemainDayCnt"){
            								let remainingTenor = productAttribute.attributeValue;
            								if(remainingTenor){
            									let timeToMaturity = {};
            									let dayCounts = number.parse(remainingTenor);
            									if(dayCounts){
            										if(dayCounts >= 365){
            											timeToMaturity.years = Math.floor(dayCounts/365);
            										}
            										if(dayCounts >= 30){
            											timeToMaturity.months = Math.floor(dayCounts%365/30);
            										}
            										timeToMaturity.days = (dayCounts % 365) % 30;
            									}
            									tempProduct.timeToMaturity = timeToMaturity;
            								}
            							}
            						}
            					}
            					tempProduct.investProductFeatureList = product.investProductFeature;
            					
                                productAttributeList = product.productAttribute;
            					if(productAttributeList && productAttributeList.length > 0){
            						for(let j=0; j<productAttributeList.length; j++ ){
            							let prodAttribute = productAttributeList[j];
            							if(prodAttribute && prodAttribute.attributeName == "prcEffDt"){
            								tempProduct.priceDate = prodAttribute.attributeValue;
            							}
            						}
            					}

            					/**
            					 * EligibilityResult
            					 */
            					let eligibilityResultList = product.eligibilityResult;
            					if(eligibilityResultList && eligibilityResultList.length > 0){
            						let eligibilityData = [];
            						let suitabilityData = [];
            						
            						for (let eIdx=0; eIdx < eligibilityResultList.length; eIdx++) {
            							let respElig = product.eligibilityResult[eIdx];
            							
            							let eligibilityResult = {};
            							
            							eligibilityResult.eligibilityIndicator = respElig.eligibilityIndicator;
            							eligibilityResult.eligibilityOverrideIndicator = respElig.eligibilityOverrideIndicator;
            							eligibilityResult.eligibilityRuleCode = respElig.eligibilityRuleCode;
            							eligibilityResult.eligibilityTypeCode = respElig.eligibilityTypeCode;
            							eligibilityResult.reasonCode = respElig.reasonCode;
            							
            							//populate eligibility and suitability
                                        if(eligibilityResult.eligibilityIndicator == "U" || eligibilityResult.eligibilityIndicator == "N"){
            								if (eligibilityResult.eligibilityTypeCode == "CUSTELIG") {
            									eligibilityData.push(eligibilityResult);
            	    							
            								} else if (eligibilityResult.eligibilityTypeCode == "PRODSUIT") {
            									suitabilityData.push(eligibilityResult);
            	    							
            								} else {
            									eligibilityData.push(eligibilityResult);
            	    							
            								}
            							}
            						}
            						tempProduct.eligibilityList = eligibilityData;
            						tempProduct.suitabilityList = suitabilityData;
            					}
                                tempProduct.eligibilityResult = product.eligibilityResult;
            					tempProduct.productDocument = product.productDocument;
                                tempProduct.eligibleWrapper = product.eligibleWrapper;
            				    //searchResultProducts.push({productKey:tempProduct.productId,product:tempProduct});

            					if(searchResultProducts.length == 0){
                                    searchResultProducts.push({productKey:tempProductId,product:tempProduct});
                                }else{
                                    let addInd=true;
                                    for(let i=0;i<searchResultProducts.length;i++){
                                            let tempProduct = searchResultProducts[i];
                                        if(tempProduct.productId ==tempProductId){
                                            addInd=false;
                                            break;
                                        }

                                    }
                                    if(addInd){
                                       searchResultProducts.push({productKey:tempProductId,product:tempProduct});
                                     }
                                }
                            }
            			}
            		}
                     console.log("convert from response end for SIJ",searchResultProducts);
            		return searchResultProducts;
				}
                
			}

    },
    retrieveProductSearchResultConvertResponseToSIJJourney:(respData,data)=>{
        console.log("step2 :  convert from response start for SIJ",respData);
        if (respData) {
				const productSearchResult = respData.productSearchResult;
				if(productSearchResult){
            		let products = productSearchResult.product,searchResultProducts=[],searchResultProductsForTable=[];
                    let searchProducts = {
                       searchResultProducts: [],
                       searchResultProductsForTable:[]
                    };
            		if(products && products.length >0){
            			for(let i=0; i<products.length; i++ ){
            				let product = products[i];
                            if(product){
                                
                               let tempProduct = {};
                               let tempProductId={
                                   countryProductTradableCode:null,
                                   productAlternativeNumber:null,
                                   productCodeAlternativeClassificationCode:null,
                                   productTypeCode:null,
                                   currencyProductCode:null
                               }
                               //add productId by productKey.
                               if(product.productKey){
                                    if(!ObjectHelper.isNullOrEmpty(product.productKey)){
                                        let productIdList = product.productKey;
                                        for(let i=0;i<productIdList.length;i++){
                                            if ("M" == productIdList[i].productCodeAlternativeClassCode) {
                                               
                                                tempProductId.countryProductTradableCode =productIdList[i].productTradableCode;
                                                tempProductId.productAlternativeNumber =productIdList[i].productAlternativeNumber;
                                                tempProductId.productCodeAlternativeClassificationCode =productIdList[i].productCodeAlternativeClassCode;
                                                tempProductId.productTypeCode =productIdList[i].productTypeCode;
                                                tempProductId.currencyProductCode =productIdList[i].currencyProductCode;
                                                
                                                tempProduct.productId=tempProductId;
                                                break;
                                            }

                                        }
                                    }
            					}
                            
                             	let productAttributeList = product.productAttribute;
            					if(productAttributeList && productAttributeList.length > 0){
            						for(let j=0; j<productAttributeList.length; j++ ){
            							let productAttribute = productAttributeList[j];
            							if(productAttribute && productAttribute.attributeName == "prodName"){
            								tempProduct.productName = productAttribute.attributeValue;
            							}
            							
            							if(productAttribute && productAttribute.attributeName == "prodTypCde"){
            								tempProduct.productTypeCode = productAttribute.attributeValue;
            							}
            							
            							if(productAttribute && productAttribute.attributeName == "riskLvlCde"){
            								tempProduct.riskLevelCode = productAttribute.attributeValue;
            							}
            							if(productAttribute && productAttribute.attributeName == "ccyProdCde"){
            								tempProduct.currencyProductCode = productAttribute.attributeValue;
            							}
            							
            							if(productAttribute && productAttribute.attributeName == "prodAltPrimNum"){
            								tempProduct.productCode = productAttribute.attributeValue;
            							}
            							
            							if(productAttribute && productAttribute.attributeName == "prodSubtpCde"){
            								tempProduct.productSubtypeCode = productAttribute.attributeValue;
            							}
            						}
            					}
            				    /**
            					 * EligibilityResult
            					 */
            					let eligibilityResultList = product.eligibilityResult;
            					if(eligibilityResultList && eligibilityResultList.length > 0){
            						let eligibilityData = [];
            						let suitabilityData = [];
            						
            						for (let eIdx=0; eIdx < eligibilityResultList.length; eIdx++) {
            							let respElig = product.eligibilityResult[eIdx];
            							
            							let eligibilityResult = {};
            							
            							eligibilityResult.eligibilityIndicator = respElig.eligibilityIndicator;
            							eligibilityResult.eligibilityOverrideIndicator = respElig.eligibilityOverrideIndicator;
            							eligibilityResult.eligibilityRuleCode = respElig.eligibilityRuleCode;
            							eligibilityResult.eligibilityTypeCode = respElig.eligibilityTypeCode;
            							eligibilityResult.reasonCode = respElig.reasonCode;
            							
            							//populate eligibility and suitability
                                        if(eligibilityResult.eligibilityIndicator == "U" || eligibilityResult.eligibilityIndicator == "N"){
            								if (eligibilityResult.eligibilityTypeCode == "CUSTELIG") {
            									eligibilityData.push(eligibilityResult);
            	    							
            								} else if (eligibilityResult.eligibilityTypeCode == "PRODSUIT") {
            									suitabilityData.push(eligibilityResult);
            	    							
            								} else {
            									eligibilityData.push(eligibilityResult);
            	    							
            								}
            							}
            						}
            						tempProduct.eligibilityList = eligibilityData;
            						tempProduct.suitabilityList = suitabilityData;
            					}
                                tempProduct.eligibilityResult = product.eligibilityResult;
            					tempProduct.productDocument = product.productDocument;
                                tempProduct.eligibleWrapper = product.eligibleWrapper;
                                tempProduct.additionalInformation = product.additionalInformation;
                                tempProduct.fromAllocatedHoldingIndicator = product.fromAllocatedHoldingIndicator;
            				    //searchResultProducts.push({productKey:tempProduct.productId,product:tempProduct});
                                let whetherDiscussedCurrentProduct=false, selectedProdutNum=0 , reviewMyProductsFormBeanData =data;
                                if(reviewMyProductsFormBeanData){
                                    //discussed product indicator
                                    let discussedProductMap = reviewMyProductsFormBeanData.discussedProductMap;
                                     whetherDiscussedCurrentProduct=prodSearchUtils._judageMapHasProductId(discussedProductMap,tempProduct.productId);
                                     if(!whetherDiscussedCurrentProduct){
                                        let prediscussedProductMap = reviewMyProductsFormBeanData.preDiscussedProductMap;
                                        whetherDiscussedCurrentProduct=prodSearchUtils._judageMapHasProductId(prediscussedProductMap,tempProduct.productId);
                                    }
                                    //selected product
                                    let selectedProductList =reviewMyProductsFormBeanData.productList;
                                     if(!ObjectHelper.isNullOrEmpty(selectedProductList)){
                                       selectedProductList.map(function(product,index){
                                           if(product){
                                            let selectedProductIds =  product.productId;
                                              
                                            if(selectedProductIds&& selectedProductIds.productTypeCode ==tempProduct.productId.productTypeCode
                                             
                                             && (selectedProductIds.productCodeAlternativeClassificationCode =="M")
                                             
                                             && selectedProductIds.productAlternativeNumber ==tempProduct.productId.productAlternativeNumber
                                              && selectedProductIds.countryProductTradableCode ==tempProduct.productId.countryProductTradableCode){
                                                  selectedProdutNum=selectedProdutNum+1;

                                             }
                                            }
                                        });
                                    } 

                                }
            					if(searchResultProducts.length == 0){
                                    searchResultProducts.push({productId:tempProduct.productId,product:tempProduct});
                                    searchResultProductsForTable.push([{value:tempProduct.productName,productCode:tempProduct.productCode},{value:tempProduct.productSubtypeCode},{value:tempProduct.riskLevelCode},{vlaue:tempProduct.currencyProductCode},{vlaue:"product1",discussed:whetherDiscussedCurrentProduct,productId:tempProduct.productId},{vlaue:"product selected",productId:tempProduct.productId,selected:selectedProdutNum,discussed:whetherDiscussedCurrentProduct,suibility:{}}]);
                                 }else{
                                    let addInd=true;
                                    for(let i=0;i<searchResultProducts.length;i++){
                                            let tempProduct = searchResultProducts[i];
                                        if(tempProduct[tempProduct.productId]){
                                            addInd=false;
                                            break;
                                        }
                                    
                                    }
                                    if(addInd){
                                        searchResultProducts.push({productId:tempProduct.productId,product:tempProduct});
                                        searchResultProductsForTable.push([{value:tempProduct.productName,productCode:tempProduct.productCode},{value:tempProduct.productSubtypeCode},{value:tempProduct.riskLevelCode},{vlaue:tempProduct.currencyProductCode},{vlaue:"product1",discussed:whetherDiscussedCurrentProduct,productId:tempProduct.productId},{vlaue:"product selected",productId:tempProduct.productId,selected:selectedProdutNum,discussed:whetherDiscussedCurrentProduct,suibility:{}}]);
                                     }
                                }

                            }
            			}
            		}
                    searchProducts.searchResultProducts=searchResultProducts;
                    searchProducts.searchResultProductsForTable=searchResultProductsForTable;
                    console.log("convert from response end for SIJ",searchProducts);
                    console.log("convert from response end for SIJ,product information for table show",JSON.stringify(searchResultProductsForTable));
            		return searchProducts;
				}
                
			}
    },
    retrieveProductCountRequest:()=>{

    },
    retrieveProductCountResponse:()=>{

    }, 
    retrieveGoalSolutionDetailConvertRequest:(params)=>{
         // pageMessageType sij /productSearch /meetingSummary / recentPlan
         /*request:{
            subserviceId:[],
            customers:[],
            goalKey:{},
            localeCode:{},
            requestInvestorIndicator:[],
            validation:[],
            requestComment:[],
            cacheIndicator:'',
            coreReserveArea:[],
            localFieldsArea:[]
        }*/
        let goalSolutionDetailData={
            goalKey:{ 
                     goalId:"", 
                     planId:""  
             },
        }
        goalSolutionDetailData.goalKey=params.goalKey;
        goalSolutionDetailData.pageMessageType=params.pageMessageType;
        let request = {

        };
        let sessionInfo=params.sessionInfo
        console.log("sessionInfo...",params.sessionInfo);
        request={
                customers: [{
                    countryISOCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    sourceSystemRolePlayerCode: sessionInfo.sourceSystemRolePlayerCode,
                    rolePlayerIdentificationNumber: sessionInfo.customerId
                }]
        };
        request.localeCode={
            localeCode:sessionInfo.localeCode
        }
        let retrieveGoalSolutionDetailRequest={};
        retrieveGoalSolutionDetailRequest=goalSolutionDetailUtil.constructRequest(goalSolutionDetailData);
        retrieveGoalSolutionDetailRequest.customers=request.customers
        retrieveGoalSolutionDetailRequest.localeCode=request.localeCode;
         request=retrieveGoalSolutionDetailRequest
         request={
            request,
            messageId:params.messageId
         }
        console.log("retrieveGoalSolutionDetailConvertRequest....",request);
        return request;
    },
    retrieveGoalSolutionDetailConvertResponse:(response,pageMessageType)=>{
              // pageMessageType sij /productSearch /meetingSummary / recentPlan/invGoalSummary
              let result={}
            switch (pageMessageType) {
                case 'sij':
                   result=goalSolutionConverter.retrieveGoalSolutionDetailConvertResponseToSIJ(response);
                    break;
                case 'productSearch':
                    
                    break;
                case 'meetingSummary':
                    
                    break;
                case 'invGoalSummary':
                    result=goalSolutionConverter.retrieveGoalSolutionDetailConvertResponseforGS(response);
                    break;    
                case 'recentPlan':
                    result=goalSolutionConverter.retrieveGoalDetailConvertResponsetoRecentPlan(response);
                    break;        
                default:
                    break;
            }
            return result
    }, 
    retrieveGoalSolutionDetailConvertResponseforGS:(response)=>{
        console.log("retrieveGoalSolutionDetailConvertResponse",response);
        // let alternativeProductList = [];
        let goalSolutionDetail = {};
        let alternativeProductList = [];
        let productCardList = [];
        let insProductCardList = [];
        if(!ObjectHelper.isNullOrlengthZore(response.productList)){
            response.productList.map((data,index) => {
                let productInfoList = [];
                let productCodeNameObj = {};
                productCodeNameObj.rowIndex = index;
                productCodeNameObj.productName = data.productName;
                data.productId.map((pData,pIndex) => {
                   if(Object.is(pData.productCodeAlternativeClassificationCode,"M"))
                   productCodeNameObj.productAlternativeNumber =  pData.productAlternativeNumber;
                })
                //put into productCode productName
                productInfoList.push(productCodeNameObj);
                 //put into  suitabilityCheck
                productInfoList.push({"suitabilityCheck":""});
                //put intp risk riskLevelCode
                productInfoList.push({"riskLevelCode":data.riskLevelCode});
                //put intp risk currencyCode
                productInfoList.push({"currencyProductCode":data.currencyProductCode});
                //put into currencyCode
                productInfoList.push({"currencyCurrentInvestmentAmountCode":data.currencyCurrentInvestmentAmountCode});
                //put into initial amount
                productInfoList.push({"investmentInitialAmount":data.investmentInitialAmount,"investmentInitialMinimumAmount":data.investmentInitialMinimumAmount,"rowIndex":index,"columnIndex":5});
                //put into monthly amount
                productInfoList.push({"investmentMonthlyAmount":data.investmentMonthlyAmount,"rowIndex":index,"columnIndex":6});
                productCardList.push(productInfoList);
            });
            goalSolutionDetail =  Object.assign({},{productList:response.productList},{productCardList:productCardList});
            console.log("goalSolutionDetail.productCardList",goalSolutionDetail);
            insProductCardList = goalSolutionConverter.convertInsProductCardListforGS(response.productList);
            goalSolutionDetail.insProductCardList = insProductCardList;
        }
        
        if(!ObjectHelper.isNullOrlengthZore(response.alternativeProduct)){
            response.alternativeProduct.map((attributeObj,index) => {
                let alternativeProductAttributeList=[];
                attributeObj.alternativeProductAttribute.map((attribute,pIndex) => {
                    switch(attribute.alternativeProductAttributeCode){
                        case "PRD_TYPE":
                            attribute.columnIndex= 0;
                            break;
                        case "PRD_NAME":
                            attribute.columnIndex= 1;
                            break;
                        case "RISK":
                            attribute.columnIndex= 2;
                            break;
                        case "CURRENCY":
                            attribute.columnIndex= 3;
                            break;
                        case "PRD_SUBTYP":
                            attribute.columnIndex= 4;
                            break;
                        default:
                            break;
                    }
                     attribute.rowIndex = index;
                    if(attribute.alternativeProductAttributeCode !="CURRENCY" && attribute.alternativeProductAttributeCode !="PRD_SUBTYP")
                    alternativeProductAttributeList[attribute.columnIndex] = attribute;
                });
                alternativeProductList.push(alternativeProductAttributeList);
                 console.log("arr",alternativeProductAttributeList);
                // alternativeProductAttributeList.splice(0,alternativeProductAttributeList.length);
            })
            goalSolutionDetail.alternativeProductList = alternativeProductList;
        }
        goalSolutionDetail.resParams = response;
        // goalSolutionDetail.financialGoal = response.goalSummary[0].financialGoal;
        return goalSolutionDetail;
    },

    convertInsProductCardListforGS:(productCardList)=>{
        let insProductCardList = [];
        if(!ObjectHelper.isNullOrlengthZore(productCardList)){
            productCardList.map((data,index) => {
                let productInfoList = [];
                let productCodeNameObj = {};
                productCodeNameObj.rowIndex = index;
                productCodeNameObj.productName = data.productName;
                data.productId.map((pData,pIndex) => {
                   if(Object.is(pData.productCodeAlternativeClassificationCode,"M"))
                   productCodeNameObj.productAlternativeNumber =  pData.productAlternativeNumber;
                   productCodeNameObj
                })
                productInfoList.push(productCodeNameObj);
                productInfoList.push({"productType":""});
                productInfoList.push({"suitabilityCheck":""});
                productInfoList.push({"riskLevelCode":data.riskLevelCode});
                productInfoList.push({"Suminsured":"N/A"});
                productInfoList.push({"Premium":"N/A"});
                productInfoList.push({"Frequency":"N/A"});
                productInfoList.push({"Budgetfrequency ":"N/A"});
                productInfoList.push({"Budgetcurrency":"N/A"});
                productInfoList.push({"Budgetpremium":"N/A"});
                insProductCardList.push(productInfoList);
            });
        }
        return insProductCardList;
    },

    retrieveGoalDetailConvertResponsetoRecentPlan:(response)=>{
          console.log("retrieveGoalDetailConvertResponseXXXXXX1");
          let retrieveGoalDetailsView;
          let goalDetailContentButtonIndicate;
         /**
         * isShow(edit deleted resume button)
         */
        if(response.goalSummary  && response.goalSummary.length>0 &&  response.goalSummary[0].financialGoal && response.goalSummary[0].financialGoal.goalTypeCode !=undefined &&
           response.status.length>0 && response.status[0].financialGoalProcessStatusCode !=undefined){
           let currentGoalType = response.goalSummary[0].financialGoal.goalTypeCode;
           let currentGoalProcessStatus = response.status[0].financialGoalProcessStatusCode;
           goalDetailContentButtonIndicate = fpsConverter.checkGoalDetailButtonWhetherShow(currentGoalType,currentGoalProcessStatus);
         }
        /**
         * EDUC(Education Planning)
         */
          if(response.goalSummary  && response.goalSummary.length>0 &&  response.goalSummary[0].financialGoal && response.goalSummary[0].financialGoal.goalTypeCode=='EDUC'
           && response.goalSummary[0].riskProfile.length>0 && response.goalSummary[0].fundingDetails.length>0 && response.goalSummary[0].calculationResultDetail.length>0){
            //get from response fundingDetails
             let fundAmount= response.goalSummary[0].fundingDetails[0].fundAmount;
             let fundCurrencyCode= response.goalSummary[0].fundingDetails[0].fundCurrencyCode;
             let fundMonthlyAmount= response.goalSummary[0].fundingDetails[0].fundMonthlyAmount;
             let fundMonthlyCurrencyCode= response.goalSummary[0].fundingDetails[0].fundMonthlyCurrencyCode;
             //get calculationResultDetail
             let fundContributeCurrencyCode= response.goalSummary[0].calculationResultDetail[0].fundContributeCurrencyCode;
             let fundContributeTotalAmount= response.goalSummary[0].calculationResultDetail[0].fundContributeTotalAmount;
            //get from riskProfile
             let riskCapacityLevelNumber = response.goalSummary[0].riskProfile[0].riskCapacityLevelNumber;
             let riskMatchContent = goalRiskMatch[riskCapacityLevelNumber];
            //  retrieveGoalDetailsView={
            //         'fundingDetails':{
            //                      'fundAmount':fundAmount,
            //                      'fundCurrencyCode':fundCurrencyCode,
            //                      'fundMonthlyAmount':fundMonthlyAmount,
            //                      'fundMonthlyCurrencyCode':fundMonthlyCurrencyCode
            //                     },
            //         'calculationResultDetail':{
            //                     'fundContributeCurrencyCode':fundContributeCurrencyCode,
            //                     'fundContributeTotalAmount':fundContributeTotalAmount
            //         }   

             retrieveGoalDetailsView ={
               'OverviewDetailString': "Education comments in 1 years' time and you will need <Strong> "+fundContributeCurrencyCode +"  "+ fundContributeTotalAmount+"</Strong>. You can invest a lump sum of <Strong>"+fundCurrencyCode+"  "+fundAmount+" </Strong> and invest <Strong>"+fundMonthlyCurrencyCode+"  "+fundMonthlyAmount+" </Strong> every month",
               'riskProfile' :{
                        'riskCapacityLevelNumber':riskCapacityLevelNumber,
                         'riskMatchContent':riskMatchContent
                },
                'goalDetailContentButtonIndicate' :goalDetailContentButtonIndicate    
            }
         }
        /**
         * GROW_WLTH(Growing my/our wealth)
         */
         if(response.goalSummary  && response.goalSummary.length>0 &&  response.goalSummary[0].financialGoal && response.goalSummary[0].financialGoal.goalTypeCode=='GROW_WLTH'
           && response.goalSummary[0].riskProfile.length>0 && response.goalSummary[0].fundingDetails.length>0){   
             //get from response fundingDetails
             let fundAmount= response.goalSummary[0].fundingDetails[0].fundAmount;
             let fundCurrencyCode= response.goalSummary[0].fundingDetails[0].fundCurrencyCode;
             let fundMonthlyAmount= response.goalSummary[0].fundingDetails[0].fundMonthlyAmount;
             let fundMonthlyCurrencyCode= response.goalSummary[0].fundingDetails[0].fundMonthlyCurrencyCode;
             //get from response financialGoal
             let goalTargetAmount = response.goalSummary[0].financialGoal.goalTargetAmount;
             let goalTargetCurrencyCode = response.goalSummary[0].financialGoal.goalTargetCurrencyCode;
             let goalMonthCount = response.goalSummary[0].financialGoal.goalMonthCount;
            //get from riskProfile
             let riskCapacityLevelNumber = response.goalSummary[0].riskProfile[0].riskCapacityLevelNumber;
             let riskMatchContent = goalRiskMatch[riskCapacityLevelNumber];
             retrieveGoalDetailsView ={
               'OverviewDetailString': "You wish to grow an initial investment amount <Strong>"+fundCurrencyCode+"   "+fundAmount+"</Strong> and monthly investment of <Strong>"+fundMonthlyCurrencyCode+"   "+fundMonthlyAmount+" </Strong> over the next "+goalMonthCount+" years to a target of<Strong> "+goalTargetCurrencyCode+" "+goalTargetAmount+"</Strong>.",
               'riskProfile' :{
                        'riskCapacityLevelNumber':riskCapacityLevelNumber,
                         'riskMatchContent':riskMatchContent
                },
                 'goalDetailContentButtonIndicate' :goalDetailContentButtonIndicate    
             }
           }
          /**
           * LIFE_PROTC(Protecting my family)
           */
           if(response.goalSummary  && response.goalSummary.length>0 &&  response.goalSummary[0].financialGoal && response.goalSummary[0].financialGoal.goalTypeCode=='LIFE_PROTC'
            && response.goalSummary[0].riskProfile.length>0 && response.goalSummary[0].calculationResultDetail.length>0){
             //get from response calculationResultDetail
             let fundContributeTotalAmount= response.goalSummary[0].calculationResultDetail[0].fundContributeTotalAmount;
             let fundContributeCurrencyCode= response.goalSummary[0].calculationResultDetail[0].fundContributeCurrencyCode;
             let wealthProjectedTotalAmount= response.goalSummary[0].calculationResultDetail[0].wealthProjectedTotalAmount;
             let wealthProjectedCurrencyCode= response.goalSummary[0].calculationResultDetail[0].wealthProjectedCurrencyCode;
             let returnShortfallAmount= Math.abs(response.goalSummary[0].calculationResultDetail[0].returnShortfallAmount);
             let returnShortfallCurrencyCode= response.goalSummary[0].calculationResultDetail[0].returnShortfallCurrencyCode;
            //get from riskProfile
             let riskCapacityLevelNumber = response.goalSummary[0].riskProfile[0].riskCapacityLevelNumber;
             let riskMatchContent = goalRiskMatch[riskCapacityLevelNumber];
             retrieveGoalDetailsView ={
               'OverviewDetailString': "In the event of death, your family will need <Strong>"+fundContributeCurrencyCode+" "+fundContributeTotalAmount+" </Strong>. Based on your current arrangement, your family will have <Strong>"+wealthProjectedCurrencyCode+"   "+wealthProjectedTotalAmount+"</Strong>. Your protection need is <Strong> "+returnShortfallCurrencyCode+"   "+returnShortfallAmount+".</Strong>",
               'riskProfile' :{
                        'riskCapacityLevelNumber':riskCapacityLevelNumber,
                         'riskMatchContent':riskMatchContent
                },
                 'goalDetailContentButtonIndicate' :goalDetailContentButtonIndicate    
              }
           }
         /**
           * RTIRE(Planning for retirement)
           */
          if(response.goalSummary  && response.goalSummary.length>0 &&  response.goalSummary[0].financialGoal && response.goalSummary[0].financialGoal.goalTypeCode=='RTIRE'
           && response.goalSummary[0].riskProfile.length>0 && response.goalSummary[0].fundingDetails.length>0 && response.goalSummary[0].calculationResultDetail.length>0){   
             //get from response calculationResultDetail
             let fundContributeTotalAmount= response.goalSummary[0].calculationResultDetail[0].fundContributeTotalAmount;
             let fundContributeCurrencyCode= response.goalSummary[0].calculationResultDetail[0].fundContributeCurrencyCode;
             //get from response fundingDetails
             let fundAmount= response.goalSummary[0].fundingDetails[0].fundAmount;
             let fundCurrencyCode= response.goalSummary[0].fundingDetails[0].fundCurrencyCode;
             let fundMonthlyAmount= response.goalSummary[0].fundingDetails[0].fundMonthlyAmount;
             let fundMonthlyCurrencyCode= response.goalSummary[0].fundingDetails[0].fundMonthlyCurrencyCode;
            //get from response additionalInformation
             let curreAge,invstYear;
             if(response.goalSummary[0].additionalInformation.length>0){
                for(let i=0; i<response.goalSummary[0].additionalInformation.length;i++){
                    if(response.goalSummary[0].additionalInformation[i].additionalCode=='CURRE_AGE'){
                     curreAge= response.goalSummary[0].additionalInformation[i].additionalValue
                    }
                    if(response.goalSummary[0].additionalInformation[i].additionalCode=='INVST_YEAR'){
                     invstYear= response.goalSummary[0].additionalInformation[i].additionalValue
                     }
                 }
             }
            //get from riskProfile
             let riskCapacityLevelNumber = response.goalSummary[0].riskProfile[0].riskCapacityLevelNumber;
             let riskMatchContent = goalRiskMatch[riskCapacityLevelNumber];
             retrieveGoalDetailsView ={
               'OverviewDetailString': "You are now "+curreAge+"years old, wish to retire in "+invstYear+" years' time and will need<Strong>"+fundContributeCurrencyCode+"   "+fundContributeTotalAmount+"</Strong>. You can invest a lump sum of<Strong>"+fundCurrencyCode+"   "+fundAmount+" </Strong>  and invest <Strong>"+fundMonthlyCurrencyCode+"   "+fundMonthlyAmount+" </Strong>every month.",
               'riskProfile' :{
                        'riskCapacityLevelNumber':riskCapacityLevelNumber,
                         'riskMatchContent':riskMatchContent
                },
                 'goalDetailContentButtonIndicate' :goalDetailContentButtonIndicate     
              }
           }
          /**
           * POST_RTIRE(Living in retirement)
           */
          if(response.goalSummary  && response.goalSummary.length>0 &&  response.goalSummary[0].financialGoal && response.goalSummary[0].financialGoal.goalTypeCode=='POST_RTIRE'
           && response.goalSummary[0].riskProfile.length>0){   
            //get from response additionalAmount
            let monthlyOutgoings,monthlyOutgoingsCurrencyCode,monthlyIncome,monthlyIncomeCurrencyCode;
            if(response.goalSummary[0].additionalAmount.length>0){
                for(let i=0;i<response.goalSummary[0].additionalAmount.length;i++){
                    if(response.goalSummary[0].additionalAmount[i].amountCode == 'MO_SPND'){
                       monthlyOutgoings =response.goalSummary[0].additionalAmount[i].financialAmount;
                       monthlyOutgoingsCurrencyCode = response.goalSummary[0].additionalAmount[i].financialCurrencyCode;
                    }
                     if(response.goalSummary[0].additionalAmount[i].amountCode == 'MO_INCM'){
                       monthlyIncome =response.goalSummary[0].additionalAmount[i].financialAmount;
                       monthlyIncomeCurrencyCode = response.goalSummary[0].additionalAmount[i].financialCurrencyCode;
                    }
                }
            }
            //get from response additionalInformation
             let incmCovSpndUtl,savNInvsUntl;
             if(response.goalSummary[0].additionalInformation.length>0){
                for(let i=0; i<response.goalSummary[0].additionalInformation.length;i++){
                    if(response.goalSummary[0].additionalInformation[i].additionalCode=='INCM_COV_SPND_UTL'){
                     incmCovSpndUtl= response.goalSummary[0].additionalInformation[i].additionalValue
                    }
                    if(response.goalSummary[0].additionalInformation[i].additionalCode=='SAV_N_INVS_UNTL'){
                     savNInvsUntl= response.goalSummary[0].additionalInformation[i].additionalValue
                     }
                 }
             }
            //get from riskProfile
             let riskCapacityLevelNumber = response.goalSummary[0].riskProfile[0].riskCapacityLevelNumber;
             let riskMatchContent = goalRiskMatch[riskCapacityLevelNumber];
             retrieveGoalDetailsView ={
               'OverviewDetailString': "Your monthly outgoings are <Strong>"+monthlyOutgoingsCurrencyCode+"   "+monthlyOutgoings+"</Strong> and you draw a monthly income of <Strong>"+monthlyIncomeCurrencyCode+"    "+monthlyIncome+"</Strong> each month. You can cover your spending until you are "+incmCovSpndUtl+" years old and your savings and investments can last until you are "+savNInvsUntl+" years old.",
               'riskProfile' :{
                        'riskCapacityLevelNumber':riskCapacityLevelNumber,
                         'riskMatchContent':riskMatchContent
                },
                 'goalDetailContentButtonIndicate' :goalDetailContentButtonIndicate     
              }
           }

          /**
           * SP_PROD_NEED(Investment Journey)
           */
          if(response.goalSummary  && response.goalSummary.length>0 &&  response.goalSummary[0].financialGoal && response.goalSummary[0].financialGoal.goalTypeCode=='SP_PROD_NEED'
           && response.goalSummary[0].riskProfile.length>0){  
            //get from riskProfile
             let riskCapacityLevelNumber = response.goalSummary[0].riskProfile[0].riskCapacityLevelNumber;
             let riskMatchContent = goalRiskMatch[riskCapacityLevelNumber]; 
             //match goal process status Code
             let goalStfinancialGoalProcessStatusCodeatus   =response.status[0].financialGoalProcessStatusCode;
             let objgoalStatusMatch = goalStatusMatch[goalStfinancialGoalProcessStatusCodeatus];
             let goalOverViewContent = objgoalStatusMatch.goalOverViewContent;
             retrieveGoalDetailsView ={
               'OverviewDetailString':"   "+goalOverViewContent+"   ",
               'riskProfile' :{
                        'riskCapacityLevelNumber':riskCapacityLevelNumber,
                         'riskMatchContent':riskMatchContent
                },
                 'goalDetailContentButtonIndicate' :goalDetailContentButtonIndicate    
              }
           }
          /**
           * INS_JOURNEY(Insurance Journey)
           */
          if(response.goalSummary  && response.goalSummary.length>0 &&  response.goalSummary[0].financialGoal && response.goalSummary[0].financialGoal.goalTypeCode=='INS_JOURNEY'
           && response.goalSummary[0].riskProfile.length>0){  
            //get from riskProfile
             let riskCapacityLevelNumber = response.goalSummary[0].riskProfile[0].riskCapacityLevelNumber;
             let riskMatchContent = goalRiskMatch[riskCapacityLevelNumber]; 
             //match goal process status Code
             let goalStfinancialGoalProcessStatusCodeatus   =response.status[0].financialGoalProcessStatusCode;
             let objgoalStatusMatch = goalStatusMatch[goalStfinancialGoalProcessStatusCodeatus];
             let goalOverViewContent = objgoalStatusMatch.goalOverViewContent;
             retrieveGoalDetailsView ={
               'OverviewDetailString':"   "+goalOverViewContent+"   ",
               'riskProfile' :{
                        'riskCapacityLevelNumber':riskCapacityLevelNumber,
                         'riskMatchContent':riskMatchContent
                },
                'goalDetailContentButtonIndicate' :goalDetailContentButtonIndicate    
              }
           }
        console.log("retrieveGoalDetailsView",retrieveGoalDetailsView);
        return retrieveGoalDetailsView;
    },
    retrieveGoalSolutionDetailConvertRequestfromSIJ:(params)=>{
        /*request:{
            subserviceId:[],
            customers:[],
            goalKey:{},
            localeCode:{},
            requestInvestorIndicator:[],
            validation:[],
            requestComment:[],
            cacheIndicator:'',
            coreReserveArea:[],
            localFieldsArea:[]
        }*/
        let goalSolutionDetailData={
            goalKey:{ 
                     goalId:"", 
                     planId:""  
             },
        }
        goalSolutionDetailData.goalKey=params.goalKey;
        let request = {

        };
        let sessionInfo=params.sessionInfo
        console.log("sessionInfo...",params.sessionInfo);
        request={
                customers: [{
                    countryISOCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    sourceSystemRolePlayerCode: sessionInfo.sourceSystemRolePlayerCode,
                    rolePlayerIdentificationNumber: sessionInfo.customerId
                }]
        };
        request.localeCode={
            localeCode:sessionInfo.localeCode
        }
        let retrieveGoalSolutionDetailRequest={};
        retrieveGoalSolutionDetailRequest=goalSolutionDetailUtil.constructRequest(goalSolutionDetailData);
        retrieveGoalSolutionDetailRequest.customers=request.customers
        retrieveGoalSolutionDetailRequest.localeCode=request.localeCode;
         request=retrieveGoalSolutionDetailRequest
         request={
            request,
            messageId:params.messageId
         }
        console.log("retrieveGoalSolutionDetailConvertRequest....",request);
        return request;

    },
    retrieveGoalSolutionDetailConvertResponseToSIJ:(response)=>{  
        console.log("retrieveGoalSolutionDetailConvertResponseToSIJ....",response);
        let goalSolutionDetail={};
        let purposeBuyingProductQuestions=[];
        let piqQuestAndAnsQuestions={};
        let buyQuestionFlag=false;
        let needEvaluationList={
            supportFamilyAmount:{
                currencyInsuranceNeedCode:"HKD",
                insuranceNeedAmount:'',
                insuranceNeedOtherText:null,
                insuranceNeedTypeCode:null
            },
            reserveExpenseAmount:{
                currencyInsuranceNeedCode:"HKD",
                insuranceNeedAmount:'',
                insuranceNeedOtherText:null,
                insuranceNeedTypeCode:null
            },
            estatePlanAmount:{
                currencyInsuranceNeedCode:"HKD",
                insuranceNeedAmount:'',
                insuranceNeedOtherText:null,
                insuranceNeedTypeCode:null
            },
            otherAmount:{
                currencyInsuranceNeedCode:"HKD",
                insuranceNeedAmount:'',
                insuranceNeedOtherText:null,
                insuranceNeedTypeCode:null
            },
            ProGapAmount:{
                currencyInsuranceNeedCode:"HKD",
                insuranceNeedAmount:'',
                insuranceNeedOtherText:null,
                insuranceNeedTypeCode:null
            },
            totalGap :{
                currencyInsuranceNeedCode:"HKD",
                insuranceNeedAmount:'',
                insuranceNeedOtherText:null,
                insuranceNeedTypeCode:null
            },
            totalProNeedAmount:{
                currencyInsuranceNeedCode:"HKD",
                insuranceNeedAmount:'',
                insuranceNeedOtherText:null,
                insuranceNeedTypeCode:null
            },
            mortAndDebetsAmount:{
                currencyInsuranceNeedCode:"HKD",
                insuranceNeedAmount:'',
                insuranceNeedOtherText:null,
                insuranceNeedTypeCode:null
            },
            monIncomeAmount:{
                currencyInsuranceNeedCode:"HKD",
                insuranceNeedAmount:'',
                insuranceNeedOtherText:null,
                insuranceNeedTypeCode:null
            } ,
            provideYear:{
                currencyInsuranceNeedCode:"HKD",
                insuranceNeedAmount:'',
                insuranceNeedOtherText:null,
                insuranceNeedTypeCode:null
            },
            lumpSumAmount:{
                currencyInsuranceNeedCode:"HKD",
                insuranceNeedAmount:'',
                insuranceNeedOtherText:null,
                insuranceNeedTypeCode:null
            }, 
            monReplaceAmount:{
                currencyInsuranceNeedCode:"HKD",
                insuranceNeedAmount:'',
                insuranceNeedOtherText:null,
                insuranceNeedTypeCode:null
            },
        };
        let retireAge={nameCode:null,
            value:null};
        let aipiIndicators={};
        let financialGoal ={};
        let riskProfile={};
        let PurposeBuyingProduct={};
        if(!ObjectHelper.isNullOrEmpty(response.purposeBuyingProduct)){
            PurposeBuyingProduct=goalSolutionDetailUtil.buildPurposeBuyingProduct(response.purposeBuyingProduct);
            buyQuestionFlag=PurposeBuyingProduct.buyQuestionFlag;
            purposeBuyingProductQuestions=PurposeBuyingProduct.purposeBuyingProductQuestions;
            console.log('purposeBuyingProductQuestions...',purposeBuyingProductQuestions);
        }
        if(!ObjectHelper.isNullOrEmpty(response.piqQuestAndAnsDetails)){
            piqQuestAndAnsQuestions=goalSolutionDetailUtil.buildpiqQuestAndAnsDetails(response.piqQuestAndAnsDetails);
            console.log('piqQuestAndAnsQuestions...',piqQuestAndAnsQuestions);
        }
        if(!ObjectHelper.isNullOrEmpty(response.needEvaluation)){
            needEvaluationList=goalSolutionDetailUtil.buildneedEvaluation(response.needEvaluation);
            console.log('needEvaluationList...',needEvaluationList);
        }else{
            needEvaluationList.currencyCode='HKD';
        }
        if(!ObjectHelper.isNullOrEmpty(response.goalSummary)){
                let goalSummary=response.goalSummary;
              if(!ObjectHelper.isNullOrEmpty(goalSummary.goalLocalFields)){
                    let goalLocalFields=goalSummary.goalLocalFields;
                    retireAge=goalSolutionDetailUtil.buildRetireAge(goalLocalFields);
            }
        }
         if(!ObjectHelper.isNullOrEmpty(response.goalSummary)){
                let goalSummary=response.goalSummary;
              if(!ObjectHelper.isNullOrEmpty(goalSummary[0].financialGoal)){

                     financialGoal=goalSummary[0].financialGoal;
                    
            }
        }
        if(!ObjectHelper.isNullOrEmpty(response.goalSummary)){
              let goalSummary = response.goalSummary;
              if(!ObjectHelper.isNullOrEmpty(goalSummary[0].riskProfile[0])){
                  riskProfile = goalSummary[0].riskProfile[0];
              }
        }
         console.log('retireAge...',retireAge);
        if(!ObjectHelper.isNullOrEmpty(response.investorIndicator)){
            let investorIndicators=response.investorIndicator;
            for (let indicatorsIndex = 0; indicatorsIndex < investorIndicators.length; indicatorsIndex++) {
                 let investorIndicator = investorIndicators[indicatorsIndex];
                  if(investorIndicator.indicatorKey === "AIPI"){
                        aipiIndicators.indicatorKey=investorIndicator.indicatorKey;
                        aipiIndicators.indicatorValue=investorIndicator.indicatorValue;
                    }
            }
           
        }
        //
        console.log('purposeBuyingProductQuestions...',purposeBuyingProductQuestions);
        
        if(ObjectHelper.isNullOrlengthZore(purposeBuyingProductQuestions)){
           purposeBuyingProductQuestions=goalSolutionDetailUtil.defaultPurposeBuyingProduct();
           buyQuestionFlag=false;
        }
        if(piqQuestAndAnsQuestions.insinvperdQuestions==undefined){
            piqQuestAndAnsQuestions.insinvperdQuestions=goalSolutionDetailUtil.defaultInsinvperdQuestions();
        }
        if(piqQuestAndAnsQuestions.invperiodQuestions==undefined){
            piqQuestAndAnsQuestions.invperiodQuestions=goalSolutionDetailUtil.defaultInvperiodQuestions();
        }
        if(piqQuestAndAnsQuestions.preQuestions==undefined){
           piqQuestAndAnsQuestions.preQuestions=goalSolutionDetailUtil.defaultPreQuestions();
        }

        if(ObjectHelper.isNullOrEmpty(piqQuestAndAnsQuestions.saveQuestions)){
            piqQuestAndAnsQuestions.saveQuestions=goalSolutionDetailUtil.defaultSaveQuestions();
        }
        if(ObjectHelper.isNullOrEmpty(piqQuestAndAnsQuestions.timeFramQuestions)){
            piqQuestAndAnsQuestions.timeFramQuestions=goalSolutionDetailUtil.defaultTimeFramQuestions();
        }
        goalSolutionDetail.purposeBuyingProductQuestions=purposeBuyingProductQuestions;
        goalSolutionDetail.piqQuestAndAnsQuestions=piqQuestAndAnsQuestions;
        goalSolutionDetail.needEvaluationList=needEvaluationList;
        goalSolutionDetail.retireAge=retireAge;
        goalSolutionDetail.aipiIndicators=aipiIndicators;
        goalSolutionDetail.riskProfile=riskProfile;
        goalSolutionDetail.financialGoal=financialGoal;
        console.log('goalSolutionDetail...',goalSolutionDetail);
        goalSolutionDetail.buyQuestionFlag=buyQuestionFlag
        return goalSolutionDetail;
     },
     
   
    recordGoalSolutionDetailRequestConverter:(requestParams) =>{
         let recordGoalSolutionDetailRequest = {};
        // conver(recordGoalSolutionDetailRequest,requestParams.actualPortfolioAllocation);
        // requestParams.actualPortfolioAllocation = [];
         
    },
    recordGoalSolutionDetailConvertRequestForGS:(requestParams)=>{
        console.log("requestParams",requestParams);
        //subserviceId SAVNDEVA SAVBUYPURP SAVRTQ SAVLCLFLD EXPINSQR SAVPIQ
        //SAVINVIND investorIndicator
        let request = {};
        let sessionInfo=requestParams.sessionInfo;
        let customers=[{
                countryISOCode: sessionInfo.countryISOCode,
                groupMemberCode: sessionInfo.groupMemberCode,
                sourceSystemRolePlayerCode: sessionInfo.sourceSystemRolePlayerCode,
                rolePlayerIdentificationNumber: sessionInfo.customerId
                }]
       let goalKey={ 
            "arrangementIdentifierFinancialPlanning": sessionInfo.goalJourney.planId,
		    "goalSequenceNumber": sessionInfo.goalJourney.goalId
            //      "arrangementIdentifierFinancialPlanning": 33,
		    //    "goalSequenceNumber": 33
        }
     
       request.subserviceId = [{
		        functionOutputCode: requestParams.subserviceId
	        }];
       request.customers = customers;
       request.goalKey = goalKey;
       request.leadId = {
		        leadSourceSystemNumber: ""
	        };
      request.productList = requestParams.productList;
      if(requestParams.subserviceId == 'SAVCOMPLET'){
        request.alternativeProduct = requestParams.alternativeProduct;
        request.productTable = requestParams.productTable;
        request.exisitingHolding = requestParams.exisitingHolding;
        request.notes = requestParams.notes;
        request.commentAction = requestParams.commentAction;
        request.comment = requestParams.comment;
        request.suitability = requestParams.suitability;
        request.declaration = requestParams.declaration;
        request.investorIndicator = requestParams.investorIndicator;
        request.affordability = requestParams.affordability;
        request.affordabilityValidation = requestParams.affordabilityValidation;
        request.assetConcentration = requestParams.requestParams;
        request.assetConcentrationValidation = requestParams.assetConcentrationValidation;
        }
      request={
            request,
            messageId:requestParams.messageId
         }
        console.log('request json',JSON.stringify(request));
        return request
    },
    recordGoalSolutionDetailConvertRequestFromSIJ:(requestParams)=>{
        let request={

        }
        //subserviceId SAVNDEVA SAVBUYPURP SAVRTQ SAVLCLFLD EXPINSQR SAVPIQ
        //SAVINVIND investorIndicator
        let sessionInfo=requestParams.sessionInfo;
        let baseGoal=requestParams.baseGoal;
         console.log('request baseGoal',JSON.stringify(baseGoal));
        let customers=[{
                    countryISOCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    sourceSystemRolePlayerCode: sessionInfo.sourceSystemRolePlayerCode,
                    rolePlayerIdentificationNumber: sessionInfo.customerId
                }]
        request=goalSolutionDetailUtil.constructSaveGoalSolutionDetailRequest(requestParams);
        request.customers=customers;
        request.leadId={
            	"leadSourceSystemNumber": ""
        }
        request.goalKey={ 
            arrangementIdentifierFinancialPlanning: baseGoal.planId,
            goalSequenceNumber: baseGoal.goalId
        }
        request={
            request,
            messageId:requestParams.messageId
         }
        console.log('request json',JSON.stringify(request));
        return request
    },
    recordGoalSolutionDetailConvertResponseToSIJ:(response)=>{
        let responseConverter={

        }

        return response
    },
    
    
}

export default goalSolutionConverter;