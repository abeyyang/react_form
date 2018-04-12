
import sessionInfoService from '../sessionInfoService'
import ObjectHelper from '../../common/lib/ObjectHelper';
import {goalTypeMatch} from '../../config/goalTypeMatch';
import {goalStatusMatch} from '../../config/goalStatusMatch';
import {goalRiskMatch} from '../../config/goalRiskMatch';
import {customerInfo} from '../../config/customerInfo';
import fhcUtil from './fhc/fhcUtil';
import fhcConfig from "../../config/fhcConfig";
import goalSimulatorConfig from "../../config/goalSimulatorConfig";
const fpsConverter={
       /** 
      * fna Converter
     */
    retrieveFinancialSituationDataConvertRequest:(params) =>{
        let request = {

        };
        let sessionInfo=sessionInfoService.getSessionInfo();
        console.log("sessionInfo",sessionInfo);
        let requestComments=params.requestComment;
        let requestInvestorIndicators=params.requestInvestorIndicator;  
        request={
                customers: [{
                    countryISOCode: sessionInfo.countryCode,
                    groupMemberCode: sessionInfo.groupMember,
                    sourceSystemRolePlayerCode: "CDM",
                    rolePlayerIdentificationNumber: sessionInfo.custmerId
                }],
                requestComment:requestComments,
                requestInvestorIndicator:requestInvestorIndicators
        };
        request={
            request,
            messageId:params.messageId
        }
        console.log("request",request);
        return request;
    },
    retrieveFinancialSituationDataConvertResponse:(response) =>{
        let income,expense,assets,investment,liability,MoSavings,NetWorth,currencyCode,countryISOCode,comment,emergencyFund,dependant,commentAction,investorIndicator;
        let incomeList=new Array(),expenseList=new Array(),assetsList=new Array(),investmentList=new Array(),liabilityList=new Array();
        let lastModified; 
        let errorCodes;
        let numberOfDependents;
        console.log("convert FNA Response",response)
        if(response.financialSituationData!==undefined ){
            let  financialSituationDatas=response.financialSituationData;
            // isArray(obj)financialSituationDetail
            let  financialSituationData=financialSituationDatas[0];
            currencyCode=financialSituationData.currencyCode;
            countryISOCode=financialSituationData.countryISOCode;
            comment=financialSituationData.comment;
            emergencyFund=financialSituationData.emergencyFund;
            dependant=financialSituationData.dependant;
            commentAction=financialSituationData.commentAction;
            investorIndicator=financialSituationData.investorIndicator; 

           console.log("convert financialSituationData",financialSituationData)
                if(financialSituationData.financialSituationDetail!==undefined){
                    let financialSituationDetails=financialSituationData.financialSituationDetail;
                    let financialSituationDetail=financialSituationDetails[0];
                    numberOfDependents=financialSituationDetail.numberOfDependents;
                    console.log("convert financialSituationDetail",numberOfDependents)
                    if(financialSituationDetail.income!==undefined){
                        // income=financialSituationDetail.income
                        var listIndex=0;
                        for (var index = 0; index < financialSituationDetail.income.length; index++) {
                             var detailIncome = financialSituationDetail.income[index];
                                if(detailIncome.incomeTypeCode==='TOTAL_INC'){
                                    income={
                                         currencyCode: detailIncome.currencyIncomeCode,
                                         amount: detailIncome.incomeAmount,
                                         typeCode:detailIncome.incomeTypeCode
                                    }
                                }else{
                                   incomeList[listIndex]=detailIncome;
                                   listIndex++;
                                }
                        }
                    }else{
                        //todo error code
                    }
                    if(financialSituationDetail.expense!==undefined){
                         var listIndex=0;
                         for (var index = 0; index < financialSituationDetail.expense.length; index++) {
                            var detailExpense = financialSituationDetail.expense[index];
                                if(detailExpense.expenseTypeCode==='TOTAL_EXP'){
                                      expense={
                                        currencyCode: detailExpense.expenseCurrencyCode,
                                        amount:  detailExpense.expenseAmount,
                                        typeCode:detailExpense.expenseTypeCode
                                     }
                                }else{
                                   expenseList[listIndex]=detailExpense;
                                   listIndex++;
                                }
                        }

                    }else{
                        //todo error code
                        // errorCodes={errorCodes:"401"};
                         errorCodes={errorCodes:{value :"401"}};
                        return errorCodes;
                    }
                     if(financialSituationDetail.assets!==undefined){
                         var listIndex=0;
                         for (var index = 0; index < financialSituationDetail.assets.length; index++) {
                            var detailAssets = financialSituationDetail.assets[index];
                                if(detailAssets.assetTypeCode==='TOTAL_AST'){
                                      assets={
                                            currencyCode: detailAssets.assetCurrencyCode,
                                            amount:  detailAssets.assetAmount,
                                            typeCode:detailAssets.assetTypeCode
                                        }
                                }else{
                                   assetsList[listIndex]=detailAssets;
                                   listIndex++;
                                }
                        }



                    }else{
                        //todo error code
                    }
                    if(financialSituationDetail.investment!==undefined){
                        var listIndex=0;
                         for (var index = 0; index < financialSituationDetail.investment.length; index++) {
                            var detailInvestment = financialSituationDetail.investment[index];
                                if(detailInvestment.investmentTypeCode==='TOTAL_INVST'){
                                     investment={
                                            currencyCode: detailInvestment.investmentAmount,
                                            amount:  detailInvestment.investmentAmount,
                                            typeCode:detailInvestment.investmentTypeCode
                                        }
                                }else{
                                    investmentList[listIndex]=detailInvestment;
                                    listIndex++;
                                }
                        }

                    }else{
                        //todo error code
                    }
                    if(financialSituationDetail.liability!==undefined){
                        var listIndex=0;
                         for (var index = 0; index < financialSituationDetail.liability.length; index++) {
                            var detailLiability = financialSituationDetail.liability[index];
                                if(detailLiability.liabilityTypeCode==='TOTAL_LIA'){
                                     liability={
                                        currencyCode: detailLiability.liabilityCurrencyCode,
                                        amount:  detailLiability.liabilityAmount,
                                        typeCode:detailLiability.liabilityTypeCode
                                    }
                                }else{
                                    liabilityList[listIndex]=detailLiability;
                                    listIndex++;
                                }
                        }

                    }else{
                        //todo error code
                    }
                    if (financialSituationDetail.reviewDateTime!==undefined){
                        lastModified=financialSituationDetail.reviewDateTime
                    }
                }else{
                    //todo error code
                    //  errorCodes={errorCodes:"402"};
                      errorCodes={errorCodes:{value :"402"}};
                        return errorCodes;
                }

                if(income!==undefined && expense!==undefined){
                     let amount=income.amount-expense.amount;
                    MoSavings={
                         currencyCode: income.currencyCode,
                         amount: amount,
                         typeCode:""
                    }
                }    
                if(assets!==undefined && liability!==undefined){
                    let amount=assets.amount-liability.amount;
                     NetWorth={
                         currencyCode: assets.currencyCode,  
                         amount: amount,
                         typeCode:""
                     }
                }
        }else{
            //todo error code
            //   errorCodes={errorCodes:"403"};
              errorCodes={errorCodes:{value :"403"}};
                        return errorCodes;
        }



        const fnaResult = {
            income: income,
            expense:expense,
            assets:assets,
            investment: investment,
            liability:liability,
            lastModified:lastModified,
            MoSavings:MoSavings,
            NetWorth:NetWorth,
            incomeList:incomeList,
            expenseList: expenseList,
            assetsList :assetsList,
            investmentList :investmentList,
            liabilityList: liabilityList,
            numberOfDependents:numberOfDependents,
            currencyCode,
            countryISOCode,
            comment,
            emergencyFund,
            dependant,
            commentAction,
            investorIndicator
        };
        return fnaResult
    },
    recordFinancialSituationDataConvertRequest:(params) =>{
        let request = {

        };
        let sessionInfo=sessionInfoService.getSessionInfo();
        console.log("sessionInfo",sessionInfo);
        console.log("request:", params);
        console.log("assets",params.request.assets);
        request={
                customers: [{
                    countryISOCode: sessionInfo.countryCode,
                    groupMemberCode: sessionInfo.groupMember,
                    sourceSystemRolePlayerCode: "CDM",
                    rolePlayerIdentificationNumber: sessionInfo.custmerId
                }],
                financialSituationData:[{
                    groupMemberCode:sessionInfo.groupMember,
                    rolePlayerIdentificationNumber:sessionInfo.custmerId,
                    countryISOCode:sessionInfo.countryCode,
                    currencyCode :'HKD',
                    commentAction:params.request.commentAction,
                    emergencyFund:params.request.emergencyFund,
                    investorIndicator:params.request.investorIndicator,
                    comment:params.request.comment,
                    financialSituationDetail:[{
                        additionalSituation:params.request.additionalSituation,
                        assets:params.request.assets,
                        expense:params.request.expense,
                        income:params.request.income,
                        investment:params.request.investment,
                        liability:params.request.liability,
                        reviewDateTime:'2017-07-28T10:11:13.786Z'
                    }]
                }]
               
        };
        request={
            request,
            messageId:params.request.messageId
        }
        console.log("request",request);
        return request;
    },
    recordFinancialSituationDataConvertResponse:(response) =>{
        console.log("covert response",response);
        return response;
    },



     /**
      * goalsolution Converter retrieveGoalSummaryList
      */
        retrieveGoalSummaryListConvertRequest:(params)=>{
      let customerId,filteringCriteria=[];
       if(params.session && params.session.customerId){
          customerId =params.session.customerId
       }else{
             customerId='IF200106'
       }
      if(params && params.request && params.request.filteringCriteria && params.request.filteringCriteria.length>0){
         for(let i=0; i<params.request.filteringCriteria.length;i++){
                let filteringCriteriaContent ={
                    filteringKey: params.request.filteringCriteria[i].filteringKey,
     	            filteringValue: params.request.filteringCriteria[i].filteringValue,
     	            operation: params.request.filteringCriteria[i].operation,
    		        sequence: params.request.filteringCriteria[i].sequence
                }
               filteringCriteria.push(filteringCriteriaContent); 
           }
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
        	filteringCriteria: filteringCriteria,
    	    localeCode: {
    		localeCode: params.request.localeCode.localeCode
         	}
        }
        let retrieveGoalSummarylistRequestConvert = {
                    messageId : params.messageId,
                    request:request,
            }
        console.log("retrieveGoalSummarylistRequestConvert",retrieveGoalSummarylistRequestConvert);
        return retrieveGoalSummarylistRequestConvert;
    },
        retrieveGoalSummaryListConvertResponse:(response)=>{
            let   retrieveGoalSummarylistReaponseConvert=[];
            if(response.goalSummary && response.goalSummary.length>0){
                for(let i=0 ; i<response.goalSummary.length; i++){
                let lastModified =response.goalSummary[i].recordUpdateDateTime;
                //match goal type
                let goalTypeCode =response.goalSummary[i].goalTypeCode;
                let objGoalTypeMatch=goalTypeMatch[goalTypeCode];
                let goalImg=objGoalTypeMatch.imgKey;
                let goalContext= objGoalTypeMatch.context;
                //match goal process status Code
                let goalStfinancialGoalProcessStatusCodeatus   =response.goalSummary[i].financialGoalProcessStatusCode;
                let objgoalStatusMatch = goalStatusMatch[goalStfinancialGoalProcessStatusCodeatus];
                let goalStatusImg = objgoalStatusMatch.statusImg;
                let goalStatusContent = objgoalStatusMatch.statusContent;
                //get goal key 
                let  arrangementIdentifierFinancialPlanning =response.goalSummary[i].goalKey.arrangementIdentifierFinancialPlanning;
                let  goalSequenceNumber =response.goalSummary[i].goalKey.goalSequenceNumber;
                //get goal name
                let goalDescription = response.goalSummary[i].goalDescription;
                let goal={ 
                            'goalType':goalTypeCode,
                            'isShow' :false,
                            'goalDetailOverlayisShow':false,
                            'goalDescription':goalDescription, 
                            'lastModified':lastModified,
                            'goalKey':{
                                'arrangementIdentifierFinancialPlanning':arrangementIdentifierFinancialPlanning,
                                'goalSequenceNumber':goalSequenceNumber
                             },
                            'goalTypeMatch':{
                                'goalImg':goalImg,
                                'goalContext':goalContext
                             },
                            'goalStfinancialGoalProcessStatusCodeatusMatch':{
                                'goalStatusImg':goalStatusImg,
                                'goalStatusContent':goalStatusContent
                            }
                        };
                    retrieveGoalSummarylistReaponseConvert.push(goal);
                }
            }
        /*    if(response.goalSummary!==undefined ){
                firstGoal = response.goalSummary[0];
                if(firstGoal !==undefined ){
                firstGoalName = firstGoal.goalDescription;
                lastModified = firstGoal.recordUpdateDateTime;
                financialGoalProcessStatusCode = firstGoal.financialGoalProcessStatusCode;    
                }
            }

            const retrieveGoalSummarylistReaponseConvert = {
            firstGoalNameView : firstGoalName,
            processStatusCodeView : financialGoalProcessStatusCode,
            lastModifiedView: lastModified,
        };
        */
        // const retrieveGoalSummarylistReaponseConvert = {
        //     converGoalView : converGoal,
        // }
        console.log("retrieveGoalSummarylistReaponseConvert",retrieveGoalSummarylistReaponseConvert);
        return retrieveGoalSummarylistReaponseConvert;
    },
    /**
      * goalsolution Converter retrieveGoalDetail
      */
   retrieveGoalDetailConvertRequest:(params)=>{
        let customerId,subserviceId=[];
        if(params.session && params.session.customerId){
         customerId =params.session.customerId
        }else{
            customerId='IF200106'
        }
        if(params && params.request && params.request.subserviceId && params.request.subserviceId.length>0){
         for(let i=0; i<params.request.subserviceId.length;i++){
                let subserviceIdContent ={
                    functionOutputCode: params.request.subserviceId[i].functionOutputCode,
                }
               subserviceId.push(subserviceIdContent); 
           }
       }
        let request = {
            customers: [{
    		countryISOCode: "HK",
    		groupMemberCode: "HBAP",
    		sourceSystemRolePlayerCode: "CDM",
   // 	    rolePlayerIdentificationNumber: params.session.customerId,
            rolePlayerIdentificationNumber:customerId,
    		customerAttribute: [{
    			attributeKey: "",
    			attributeValue: ""
    		  }]
        	}],
        	  goalKey: {
                arrangementIdentifierFinancialPlanning : params.request.goalKey.arrangementIdentifierFinancialPlanning,
                goalSequenceNumber: params.request.goalKey.goalSequenceNumber
            },
            subserviceId: subserviceId,
            requestInvestorIndicator : [{
                    indicatorKey: "INV"
                }, {
                    indicatorKey : "AIPI"
                }
            ],
              localeCode : {
                localeCode : "en_US"
            }
        }
        let retrieveGoalDetailConvertRequestConvert = {
                    messageId : params.messageId,
                    request:request,
        }
        console.log("retrieveGoalDetailConvertRequestConvert",retrieveGoalDetailConvertRequestConvert);
        return retrieveGoalDetailConvertRequestConvert;
    },
checkGoalDetailButtonWhetherShow(currentGoalType,currentGoalProcessStatus){
     console.log("checkGoalDetailButtonWhetherShow",currentGoalType,currentGoalProcessStatus);
    let goalDetailContentButtonIndicate ={
     'isEditButton':true,
     'isResumeButton':true,
     'isDeletedButton':true
    },isEditButton,isResumeButton,isDeletedButton;
     if(currentGoalProcessStatus =='S_AB'){
              isEditButton=false;
              isResumeButton=false;
              isDeletedButton=false;
              goalDetailContentButtonIndicate ={
                  'isEditButton':isEditButton,
                  'isResumeButton':isResumeButton,
                  'isDeletedButton':isDeletedButton
              }
     }
     if(currentGoalType =='SP_PROD_NEED'){
          if(currentGoalProcessStatus =='S_W_CP'){
              isEditButton=true;
              isResumeButton=true;
              isDeletedButton=true;
              goalDetailContentButtonIndicate ={
                  'isEditButton':isEditButton,
                  'isResumeButton':isResumeButton,
                  'isDeletedButton':isDeletedButton
              }
            if(currentGoalProcessStatus =='S_AB'){
              isEditButton=false;
              isResumeButton=false;
              isDeletedButton=false;
              goalDetailContentButtonIndicate ={
                  'isEditButton':isEditButton,
                  'isResumeButton':isResumeButton,
                  'isDeletedButton':isDeletedButton
              }
           }
       }
    }
    if(currentGoalType =='INS_JOURNEY'){
          if(currentGoalProcessStatus =='S_W_CP'){
              isEditButton=true;
              isResumeButton=true;
              isDeletedButton=true;
              goalDetailContentButtonIndicate ={
                  'isEditButton':isEditButton,
                  'isResumeButton':isResumeButton,
                  'isDeletedButton':isDeletedButton
              }
            if(currentGoalProcessStatus =='S_AB'){
              isEditButton=false;
              isResumeButton=false;
              isDeletedButton=false;
              goalDetailContentButtonIndicate ={
                  'isEditButton':isEditButton,
                  'isResumeButton':isResumeButton,
                  'isDeletedButton':isDeletedButton
              }
           }
       }
    }
        
 return goalDetailContentButtonIndicate;
},
 retrieveGoalDetailConvertResponse:(response)=>{
          let retrieveGoalDetailsView;
          let goalDetailContentButtonIndicate;
          let invProductList=[],insProductList=[];
         /**
         * isShow(edit deleted resume button)
         */
        if(response.goalSummary  && response.goalSummary.length>0 &&  response.goalSummary[0].financialGoal && response.goalSummary[0].financialGoal.goalTypeCode !=undefined &&
           response.status.length>0 && response.status[0].financialGoalProcessStatusCode !=undefined){
           let currentGoalType = response.goalSummary[0].financialGoal.goalTypeCode;
           let currentGoalProcessStatus = response.status[0].financialGoalProcessStatusCode;
           goalDetailContentButtonIndicate = fpsConverter.checkGoalDetailButtonWhetherShow(currentGoalType,currentGoalProcessStatus);
         }
         if(!ObjectHelper.isNullOrlengthZore(response.productTable)){
                response.productTable.map((data,index) => {
                    if(!ObjectHelper.isNullOrlengthZore(data.productId)){
                         data.productId.map((pData,pIndex) => {
                            if(Object.is(pData.productCodeAlternativeClassificationCode,"M")){
                                if(pData.productTypeCode !=="INS"){
                                   //put into productCode productName
                                let productInfoList = [];
                                productInfoList.push({"productName":data.productInfo.productName});
                                //put into  suitabilityCheck
                                // productInfoList.push({"suitabilityCheck":""});
                                //put intp risk riskLevelCode
                                productInfoList.push({"riskLevelCode":data.productInfo.riskLevelCode});
                                //put intp risk currencyCode
                                productInfoList.push({"currencyProductCode":data.productInfo.currencyProductCode?data.productInfo.currencyProductCode:"N/A"});
                                //put into currencyCode
                                // productInfoList.push({"currencyCurrentInvestmentAmountCode":data.productInfo.currencyCurrentInvestmentAmountCode});
                                //put into initial amount
                                productInfoList.push({"investmentInitialAmount":data.productInfo.investmentInitialAmount});
                                // ,"investmentInitialMinimumAmount":data.investmentInitialMinimumAmount,"rowIndex":index,"columnIndex":5});
                                //put into monthly amount
                                productInfoList.push({"investmentMonthlyAmount":data.productInfo.investmentMonthlyAmount});
                                invProductList.push(productInfoList);
                                }else{
                                 let productInfoList = [];
                               //put into productCode productName
                                productInfoList.push({"productName":data.productInfo.productName});
                                //put into  suitabilityCheck
                                // productInfoList.push({"suitabilityCheck":""});
                                //put intp risk riskLevelCode
                                productInfoList.push({"riskLevelCode":data.productInfo.riskLevelCode});
                                //put intp risk currencyCode
                                // productInfoList.push({"currencyProductCode":data.productInfo.currencyProductCode?data.productInfo.currencyProductCode:"N/A"});
                                //put into currencyCode
                                // productInfoList.push({"currencyCurrentInvestmentAmountCode":data.productInfo.currencyCurrentInvestmentAmountCode});
                                //put into initial amount
                                productInfoList.push({"investmentInitialAmount":data.productInfo.investmentInitialAmount});
                                // ,"investmentInitialMinimumAmount":data.investmentInitialMinimumAmount,"rowIndex":index,"columnIndex":5});
                                //put into monthly amount
                                productInfoList.push({"investmentMonthlyAmount":data.productInfo.investmentMonthlyAmount});
                                insProductList.push(productInfoList);
                                }
                            }
                       })
                    }
                });
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
             let invDiscussedProductList=[]; 
             let riskCapacityLevelNumber = response.goalSummary[0].riskProfile[0].riskCapacityLevelNumber;
             let riskMatchContent = goalRiskMatch[riskCapacityLevelNumber]; 
             //match goal process status Code
             let goalStfinancialGoalProcessStatusCodeatus   =response.status[0].financialGoalProcessStatusCode;
             let objgoalStatusMatch = goalStatusMatch[goalStfinancialGoalProcessStatusCodeatus];
             let goalOverViewContent = objgoalStatusMatch.goalOverViewContent;
             //get table style(Investment products)
             let goalDetailProductTableDesc=goalTypeMatch[response.goalSummary[0].financialGoal.goalTypeCode].goalDetailTableDesc;
             //get discuessed product list for meeting summary goal detail section
           if(!ObjectHelper.isNullOrlengthZore(response.alternativeProduct)){
            response.alternativeProduct.map((attributeObj,index) => {
                let alternativeProductAttributeList=[];
                attributeObj.alternativeProductAttribute.map((attribute,pIndex) => {
                    switch(attribute.alternativeProductAttributeCode){
                       case "PRD_NAME":
                            attribute.columnIndex= 0;
                            break;
                        case "PRD_TYPE":
                            attribute.columnIndex= 1;
                            break;
                        case "RISK":
                            attribute.columnIndex= 2;
                            break;
                        case "CURRENCY":
                            attribute.columnIndex= 3;
                            break;
                        default:
                            break;
                    }
                     attribute.rowIndex = index;
                    alternativeProductAttributeList[attribute.columnIndex] = attribute;
                });
                invDiscussedProductList.push(alternativeProductAttributeList);
                 console.log("arr",alternativeProductAttributeList);
            })}
             retrieveGoalDetailsView ={
               'OverviewDetailString':"   "+goalOverViewContent+"   ",
               'riskProfile' :{
                        'riskCapacityLevelNumber':riskCapacityLevelNumber,
                         'riskMatchContent':riskMatchContent
                },
                 'goalDetailContentButtonIndicate' :goalDetailContentButtonIndicate,
                 'invProductList':invProductList,
                 'insProductList':insProductList,
                 'goalDetailProductTableDesc':goalDetailProductTableDesc,
                 'invDiscussedProductList':invDiscussedProductList 
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
                'goalDetailContentButtonIndicate' :goalDetailContentButtonIndicate,
                'invProductList':invProductList,
                'insProductList':insProductList,  
              }
           }
        console.log("retrieveGoalDetailsView",retrieveGoalDetailsView);
        return retrieveGoalDetailsView;
    },

     /**
      *  goalWebService Converter
      */
     recordBaseGoalConvertRequest:(params)=>{
        let request = {

        };
        let sessionInfo=sessionInfoService.getSessionInfo();
        console.log("sessionInfo",sessionInfo);
        console.log("recordBaseGoalConvertRequest",params);
        let baseGoal=params.baseGoal;
        let goalKey=ObjectHelper.isNullOrEmpty(baseGoal.goalKey) ? {}:baseGoal.goalKey;;
        let simpleFundingDetail=ObjectHelper.isNullOrEmpty(baseGoal.simpleFundingDetail) ? {}:baseGoal.simpleFundingDetail;
        let leadId=params.leadId;
        request={
                customers: [{
                    countryISOCode: sessionInfo.countryCode,
                    groupMemberCode: sessionInfo.groupMember,
                    sourceSystemRolePlayerCode: "CDM",
                    rolePlayerIdentificationNumber: sessionInfo.custmerId
                }],
                baseGoal:{
                    applyInflationIndicator:ObjectHelper.isNullOrEmpty(baseGoal.applyInflationIndicator) ? '':baseGoal.applyInflationIndicator,
                    calculatedRiskCapacityLevelNumber:ObjectHelper.isNullOrEmpty(baseGoal.calculatedRiskCapacityLevelNumber) ? '':baseGoal.calculatedRiskCapacityLevelNumber,
                    currencyCode:ObjectHelper.isNullOrEmpty(baseGoal.currencyCode) ? '':baseGoal.currencyCode,
                    goalDescription:ObjectHelper.isNullOrEmpty(baseGoal.goalDescription) ? '':baseGoal.goalDescription,
                    goalKey:{
                        arrangementIdentifierFinancialPlanning:ObjectHelper.isNullOrEmpty(goalKey.arrangementIdentifierFinancialPlanning) ? '':goalKey.arrangementIdentifierFinancialPlanning,
                        goalSequenceNumber:ObjectHelper.isNullOrEmpty(goalKey.goalSequenceNumber) ? '':goalKey.goalSequenceNumber,
                    },
                    goalTypeCode:ObjectHelper.isNullOrEmpty(baseGoal.goalTypeCode) ? '':baseGoal.goalTypeCode,
                    goalYearCount:ObjectHelper.isNullOrEmpty(baseGoal.goalYearCount) ? '':baseGoal.goalYearCount,
                    needTypeCode:ObjectHelper.isNullOrEmpty(baseGoal.needTypeCode) ? '':baseGoal.needTypeCode,
                    riskLevelNumber:ObjectHelper.isNullOrEmpty(baseGoal.riskLevelNumber) ? '':baseGoal.riskLevelNumber,
                    riskToleranceLevel:ObjectHelper.isNullOrEmpty(baseGoal.riskToleranceLevel) ? '':baseGoal.riskToleranceLevel,
                    simpleFundingDetail:{
                        fundAmount:ObjectHelper.isNullOrEmpty(simpleFundingDetail.fundAmount) ? '':simpleFundingDetail.fundAmount,
                        fundCurrencyCode:ObjectHelper.isNullOrEmpty(simpleFundingDetail.fundCurrencyCode) ? '':simpleFundingDetail.fundCurrencyCode,
                        fundMonthlyAmount:ObjectHelper.isNullOrEmpty(simpleFundingDetail.fundMonthlyAmount) ? '':simpleFundingDetail.fundMonthlyAmount,
                        fundMonthlyCurrencyCode:ObjectHelper.isNullOrEmpty(simpleFundingDetail.fundMonthlyCurrencyCode) ? '':simpleFundingDetail.fundMonthlyCurrencyCode,
                    },
                    simulateSegmentIndicator:ObjectHelper.isNullOrEmpty(baseGoal.simulateSegmentIndicator) ? '':baseGoal.simulateSegmentIndicator,
                    skipRiskProfilingIndicator:ObjectHelper.isNullOrEmpty(baseGoal.skipRiskProfilingIndicator) ? '':baseGoal.skipRiskProfilingIndicator,
                },
                leadId:ObjectHelper.isNullOrEmpty(leadId.leadSourceSystemNumber) ? { }:{
                    leadSourceSystemNumber:leadId.leadSourceSystemNumber
                },
                localeCode: {
		                localeCode: "en_US"
	            }
               
        };
        request={
            request,
            messageId:params.messageId
        }
        console.log("baseGoalrequest",request);
        return request;
    },
     recordBaseGoalConvertResponse:(response)=>{
        console.log("covert recordBaseGoa",response);
        return response;
    },

     /**
      *  involvedPartyMgmtService Converter
      */
    retrieveInvolvedPartyDetailsIndividualConvertRequest:(params)=>{
        let request = {};
        let sessionInfo=sessionInfoService.getSessionInfo();
        let cdmBusinessObjectIdentification=params.cdmBusinessObjectIdentification,
        cdmResponseScope=params.cdmResponseScope,
        cdmResponseScope2=params.cdmResponseScope2,
        cdmResponseScope3=params.cdmResponseScope3,
        cdmResponseScope4=params.cdmResponseScope4,
        cdmResponseScope5=params.cdmResponseScope5,
        cdmResponseScope6=params.cdmResponseScope6,
        cdmResponseScope7=params.cdmResponseScope7,
        cdmResponseScope8=params.cdmResponseScope8,
        cdmResponseScope9=params.cdmResponseScope9,
        cdmResponseScope10=params.cdmResponseScope10,
        cdmResponseScope11=params.cdmResponseScope11,
        coreReserveAreaDetails=params.coreReserveAreaDetails,
        localFieldsAreaDetails=params.localFieldsAreaDetails
        console.log("params",params);    
          request={
           cdmBusinessObjectIdentification: {
                businessObjectType: ObjectHelper.isNullOrEmpty(cdmBusinessObjectIdentification.businessObjectType)?'IP':cdmBusinessObjectIdentification.businessObjectType,
                externalReferenceNumber: ObjectHelper.isNullOrEmpty(cdmBusinessObjectIdentification.externalReferenceNumber)?'':cdmBusinessObjectIdentification.externalReferenceNumber
            },
           cdmResponseScope:  {
                scopeName: ObjectHelper.isNullOrEmpty(cdmResponseScope.scopeName)?'':cdmResponseScope.scopeName,
		        scopeVersion: ObjectHelper.isNullOrEmpty(cdmResponseScope.scopeVersion)?'':cdmResponseScope.scopeVersion
           },
           cdmResponseScope2:  {
                scopeName: ObjectHelper.isNullOrEmpty(cdmResponseScope2.scopeName)?'':cdmResponseScope2.scopeName,
		        scopeVersion: ObjectHelper.isNullOrEmpty(cdmResponseScope2.scopeVersion)?'':cdmResponseScope2.scopeVersion
           },
           cdmResponseScope3:  {
                scopeName: ObjectHelper.isNullOrEmpty(cdmResponseScope3.scopeName)?'':cdmResponseScope3.scopeName,
		        scopeVersion: ObjectHelper.isNullOrEmpty(cdmResponseScope3.scopeVersion)?'':cdmResponseScope3.scopeVersion
           },
           cdmResponseScope4: {
                scopeName: ObjectHelper.isNullOrEmpty(cdmResponseScope4.scopeName)?'':cdmResponseScope4.scopeName,
		        scopeVersion: ObjectHelper.isNullOrEmpty(cdmResponseScope4.scopeVersion)?'':cdmResponseScope4.scopeVersion
           },
           cdmResponseScope5:  {
                scopeName: ObjectHelper.isNullOrEmpty(cdmResponseScope5.scopeName)?'':cdmResponseScope5.scopeName,
		        scopeVersion: ObjectHelper.isNullOrEmpty(cdmResponseScope5.scopeVersion)?'':cdmResponseScope5.scopeVersion
           },
           cdmResponseScope6:  {
                scopeName: ObjectHelper.isNullOrEmpty(cdmResponseScope6.scopeName)?'':cdmResponseScope6.scopeName,
		        scopeVersion: ObjectHelper.isNullOrEmpty(cdmResponseScope6.scopeVersion)?'':cdmResponseScope6.scopeVersion
           },
           cdmResponseScope7: {
                scopeName: ObjectHelper.isNullOrEmpty(cdmResponseScope7.scopeName)?'':cdmResponseScope7.scopeName,
		        scopeVersion: ObjectHelper.isNullOrEmpty(cdmResponseScope7.scopeVersion)?'':cdmResponseScope7.scopeVersion
           },
           cdmResponseScope8: {
                scopeName: ObjectHelper.isNullOrEmpty(cdmResponseScope8.scopeName)?'':cdmResponseScope8.scopeName,
		        scopeVersion: ObjectHelper.isNullOrEmpty(cdmResponseScope8.scopeVersion)?'':cdmResponseScope8.scopeVersion
           },
           cdmResponseScope9:  {
                scopeName: ObjectHelper.isNullOrEmpty(cdmResponseScope9.scopeName)?'':cdmResponseScope9.scopeName,
		        scopeVersion: ObjectHelper.isNullOrEmpty(cdmResponseScope9.scopeVersion)?'':cdmResponseScope9.scopeVersion
           },
           cdmResponseScope10:  {
                scopeName: ObjectHelper.isNullOrEmpty(cdmResponseScope10.scopeName)?'':cdmResponseScope10.scopeName,
		        scopeVersion: ObjectHelper.isNullOrEmpty(cdmResponseScope10.scopeVersion)?'':cdmResponseScope10.scopeVersion
           },
           cdmResponseScope11:  {
                scopeName: ObjectHelper.isNullOrEmpty(cdmResponseScope11.scopeName)?'':cdmResponseScope11.scopeName,
		        scopeVersion: ObjectHelper.isNullOrEmpty(cdmResponseScope11.scopeVersion)?'':cdmResponseScope11.scopeVersion
           },
           coreReserveAreaDetails: ObjectHelper.isNullOrlengthZore(coreReserveAreaDetails)?[{ }]:coreReserveAreaDetails,
           localFieldsAreaDetails: ObjectHelper.isNullOrlengthZore(localFieldsAreaDetails)?[{ }]:localFieldsAreaDetails
        };
        request={
            request,
            messageId:params.messageId
        }
        console.log("retrieveInvolvedPartyDetailsRequest:",request);
        return request;
    },

    retrieveInvolvedPartyDetailsIndividualConvertResponse:(response)=>{
        let individual = response.individual;
        let additionalIndividualDetails = response.additionalIndividualDetails;
        let countryNationalityCode,documentIdentityNumber,maritalStatusCode,employersName,residenceCountryCode,addressLine1Text,
        givenName,lastName,customerForename,occupationCode,employmentStatusCode,educationLevelCode,birthDate,genderCode,
        countryNationalityValue,occupationValue,educationLevelValue,customerIndicator;
        if (!ObjectHelper.isNullOrEmpty(individual) && individual.length > 0 ) {
            if (!ObjectHelper.isNullOrEmpty(individual[0].countryNationalityCode)) {
                countryNationalityCode = individual[0].countryNationalityCode;
                //countryNationalityValue = customerInfo[countryNationalityCode];
            }
             if (!ObjectHelper.isNullOrEmpty(individual[0].maritalStatusCode)) {
                maritalStatusCode = individual[0].maritalStatusCode;
                //countryNationalityValue = customerInfo[countryNationalityCode];
            }
             if (!ObjectHelper.isNullOrEmpty(individual[0].maritalStatusCode)) {
                employersName = individual[0].employersName;
                //countryNationalityValue = customerInfo[countryNationalityCode];
            }
            if (!ObjectHelper.isNullOrEmpty(individual[0].maritalStatusCode)) {
                residenceCountryCode = individual[0].residenceCountryCode;
                //countryNationalityValue = customerInfo[countryNationalityCode];
            }
            if (!ObjectHelper.isNullOrEmpty(individual[0].givenName)) {
                givenName = individual[0].givenName;
            }
            if (!ObjectHelper.isNullOrEmpty(individual[0].lastName)) {
                lastName = individual[0].lastName;
            }
            
            if (!ObjectHelper.isNullOrEmpty(individual[0].occupationCode)) {
                occupationCode = 'occupation_'+individual[0].occupationCode;
                //occupationValue = customerInfo['occupation_'+occupationCode];
            }
            if (ObjectHelper.isNullOrEmpty(occupationCode) && !ObjectHelper.isNullOrEmpty(individual[0].employmentStatusCode)) {
                occupationCode = 'employ_status_'+individual[0].employmentStatusCode;
                //occupationValue = customerInfo['employ_status'+employmentStatusCode];
            }
            birthDate = individual[0].birthDate; // value is like 411004800000
            genderCode = individual[0].genderCode; // value is like 'M' or 'F'
        }
         if (!ObjectHelper.isNullOrEmpty(response) &&!ObjectHelper.isNullOrEmpty(response.address) && response.address.length > 0) {
               if (!ObjectHelper.isNullOrEmpty(response.address[0].addressLine1Text)) {
                addressLine1Text = response.address[0].addressLine1Text;
            }
         }
        if (!ObjectHelper.isNullOrEmpty(response) &&!ObjectHelper.isNullOrEmpty(response.identificationDetails) && response.identificationDetails.length > 0) {
               if (!ObjectHelper.isNullOrEmpty(response.identificationDetails[0].documentIdentityNumber)) {
                documentIdentityNumber = response.identificationDetails[0].documentIdentityNumber;
            }
         }
         if (!ObjectHelper.isNullOrEmpty(response) &&!ObjectHelper.isNullOrEmpty(response.involvedPartyName) && response.involvedPartyName.length > 0) {
               if (!ObjectHelper.isNullOrEmpty(response.involvedPartyName[0].customerForename)) {
                customerForename = response.involvedPartyName[0].customerForename;
            }
         }
        if (!ObjectHelper.isNullOrEmpty(additionalIndividualDetails) && additionalIndividualDetails.length > 0) {
            if (!ObjectHelper.isNullOrEmpty(additionalIndividualDetails[0].educationLevelCode)) {
                educationLevelCode = 'educationLevel_'+additionalIndividualDetails[0].educationLevelCode;
                //educationLevelValue = customerInfo['educationLevel_'+educationLevelCode];
            }
        }
        customerIndicator = {
            'countryNationalityCode':countryNationalityCode,  // match page Nationality
            'maritalStatusCode':maritalStatusCode, //  Martial status
            'documentIdentityNumber':documentIdentityNumber, //match page Passport/ID Number 
            'employersName':employersName,  // match page employer
            'residenceCountryCode':residenceCountryCode,// match page Country of residence
            'addressLine1Text':addressLine1Text, //match page Residential Address 
            'occupationCode':occupationCode,
            'educationLevelCode':educationLevelCode,
            'birthDate':birthDate,
            'genderCode':genderCode,
            'givenName':givenName,  // match page  givenName+ lastName English Name
            'lastName':lastName,
            'customerForename':customerForename // match pagee Chinese Name
        }
        return customerIndicator;
    },


    /**
     * retrieveFinancialSituationReferenceRecordAssetsConvertResponse for dashboard deposit consent
     */
    retrieveFinancialSituationReferenceRecordAssetsConvertResponse:(assetsFinaResult)=>{
        let records = assetsFinaResult.records,
            depositeConstentCode;
        if(records != undefined && records.length > 0) {
            for(var i=0; i<records.length; i++) {
                if(records[i].fieldKey=='HSBC_DEPOSIT_CONSENT_INDICATOR' && records[i].recordValue != '') {
                     depositeConstentCode = records[i].recordValue;
                     //console.log("depositeConstentCode:",depositeConstentCode);
                     return depositeConstentCode;
                }        
            }
	    }
        return depositeConstentCode;
    },
    
    /**
      * enquire Fhc Summary request,
      */
    enquireFhcSummaryConvertRequest:(params)=>{
        console.log("enquireFhcSummaryConvertRequest params",params);
        let sessionInfo=params.sessionInfo;
        console.log("sessionInfo",sessionInfo);

        let enquireFhcSummaryConvertRequest = {
                    customerInfoDto: {
                    countryISOCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    sourceSystemRolePlayerCode: "CDM",
                    rolePlayerIdentificationNumber: sessionInfo.customerId
                },

                paginationRequest:{
                    startDetail: 1
                    /*
protected String endDetail;
protected String pagingDirectionCode;
protected int numberOfRecords;
protected int totalNumberOfRecords;*/
                }
            };
        let request={
            request:enquireFhcSummaryConvertRequest,
            messageId:params.messageId
        }
        console.log("enquireFhcSummaryConvertRequest request",request);
        return request;
    },
    enquireFhcSummaryConvertResponse:(response)=>{
        console.log("covert enquireFhcSummaryConvertResponse",response);
        if(!ObjectHelper.isNullOrlengthZore(response.finHealthCheckSummaryListDto)){
            response.finHealthCheckSummaryListDto[0].showCopyAsTemplateFlag=true;
        }
        return response;
    },
    /**
      * retrieve Fhc Detail request
      */
    retrieveFhcDetailConvertRequest:(params)=>{
        console.log("retrieveFhcDetailConvertRequest params",params);
        let sessionInfo=params.sessionInfo;
        console.log("sessionInfo",sessionInfo);

        let beRequest = {
                    customerInfoDto: {
                    countryISOCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    sourceSystemRolePlayerCode: "CDM",
                    rolePlayerIdentificationNumber: sessionInfo.customerId
                },
                requestInfo:{
                    financialCheckDate:params.financialCheckDate
                }
            };
        let request={
            request:beRequest,
            messageId:params.messageId
        }
        console.log("retrieveFhcDetailConvertRequest request",request);
        return request;
    },


    updateFhcResultConvertRequest:(params)=>{
        console.log("updateFhcResultConvertRequest params",params);
        let sessionInfo=params.sessionInfo;
        console.log("sessionInfo",sessionInfo);
        
        let updatedCalculationDto = fhcUtil._buildRequestCalculationDto(params.priorityChangesObject);

        let beRequest = {
                customerInfoDto: {
                    countryISOCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    sourceSystemRolePlayerCode: sessionInfo.sourceSystemRolePlayerCode,
                    rolePlayerIdentificationNumber: sessionInfo.customerId
                },
                financialInfoDto:{
                    finhckId:params.priorityChangesObject.finhckId
                },
                calculationDto:updatedCalculationDto,
                addtionalInfoDto: {
                    actionSource: "UPDATEACTION"
                },
                sessionInfo: {
                    countryCode: "HK",
                    groupMember: "HBAP",
                    channelId: "OHB",
                    businessOpUnit: "001",
                    businessLine: "PFS",
                    userId: "43580214",
                    employeeUserId: "43382921"
                }

            };

        let request={
            request:beRequest,
            messageId:params.messageId
        }
        console.log("retrieveFhcDetailConvertRequest request",request);
        return request;
    },

    retrieveCopyAsTemplateCovertResponse:(response)=>{
        console.log("covert retrieveCopyAsTemplateCovertResponse",response);
        // Summary begin
        response = response.responseBody;
        let calculationResults = response.calculationDto.calculationResults;
        let result = {};
        if(null!=calculationResults&&calculationResults.length>0){
            let lifeCoverageRemainAmt,criticalIllnessRemainAmt,retirementRemainAmt,educationRemainAmt;
            let coverageToalGapCcyCode,savingToalGapCcyCode;
            for(let i=0;i<calculationResults.length;i++){
                let calculationResult = calculationResults[i];
                let color = '';
                if(null!=calculationResult.referenceAmt&&0!=calculationResult.referenceAmt){
                    let achievedPercent = calculationResult.achievedAmt/calculationResult.referenceAmt;
                    color = achievedPercent>=0.7? '#269792': achievedPercent>=0.35? '#E9A115':'#E54D58'; 
                }
                
                if(calculationResult.calculationTypeCode=='CAL_LIFE_COVERAGE'){
                    result.lifeCoverageAchievedAmt = calculationResult.achievedAmt;
                    lifeCoverageRemainAmt = fhcUtil._updateStillNeedValue(calculationResult.referenceAmt-calculationResult.achievedAmt);
                    result.lifeCoverageRemainAmt = lifeCoverageRemainAmt;
                    result.lifeCoveragePriority = calculationResult.priority;
                    result.lifeCoverage = lifeCoverageRemainAmt;
                    result.lifeCoverageRemainAmt = lifeCoverageRemainAmt;
                    result.lifeCoverageTargetAmt = calculationResult.referenceAmt;
                    result.lifeCoverageColor = color;
                    result.lifeCoverageCurrency = calculationResult.currencyCode;
                }
                else if(calculationResult.calculationTypeCode=='CAL_CRITICAL_ILL'){
                    result.criticalIllnessAchievedAmt = calculationResult.achievedAmt;
                    criticalIllnessRemainAmt = fhcUtil._updateStillNeedValue(calculationResult.referenceAmt-calculationResult.achievedAmt);
                    result.criticalIllnessRemainAmt = criticalIllnessRemainAmt;
                    result.criticalIllnessPriority = calculationResult.priority;
                    result.criticalIllness = criticalIllnessRemainAmt;
                    result.criticalIllnessRemainAmt = criticalIllnessRemainAmt;
                    result.criticalIllnessTargetAmt = calculationResult.referenceAmt;
                    result.criticalIllnessColor = color;
                    result.criticalIllnessCurrency = calculationResult.currencyCode;
                }
                else if(calculationResult.calculationTypeCode=='CAL_RETIREMENT'){
                    result.retirementAchievedAmt = calculationResult.achievedAmt;
                    retirementRemainAmt = fhcUtil._updateStillNeedValue(calculationResult.referenceAmt-calculationResult.achievedAmt);
                    result.retirementRemainAmt = retirementRemainAmt;
                    result.retirementPriority = calculationResult.priority;
                    result.retirement = retirementRemainAmt;
                    result.retirementRemainAmt = retirementRemainAmt;
                    result.retirementTargetAmt = calculationResult.referenceAmt;
                    result.retirementColor = color;
                    result.retirementCurrency = calculationResult.currencyCode;
                }
                else if(calculationResult.calculationTypeCode=='CAL_EDUCATION'){
                    result.educationAchievedAmt = calculationResult.achievedAmt;
                    educationRemainAmt = fhcUtil._updateStillNeedValue(calculationResult.referenceAmt-calculationResult.achievedAmt);
                    result.educationRemainAmt = educationRemainAmt;
                    result.educationPriority = calculationResult.priority;
                    result.education = educationRemainAmt;
                    result.educationRemainAmt = educationRemainAmt;
                    result.educationTargetAmt = calculationResult.referenceAmt;
                    result.educationColor = color;
                    result.educationCurrency = calculationResult.currencyCode;
                }
                else if(calculationResult.calculationTypeCode=='CAL_SHORT_TERM_GO'){
                    result.growYourWealthPriority = calculationResult.priority;
                }
                else if(calculationResult.calculationTypeCode=='CAL_PROPERTY'){
                    result.propertyPriority = calculationResult.priority;
                }
                else if(calculationResult.calculationTypeCode=='CAL_LEGACY'){
                    result.legacyPriority = calculationResult.priority;
                }
                else if(calculationResult.calculationTypeCode=='CAL_GENERAL'){
                    result.healthPriority = calculationResult.priority;
                }
            }
            result.totalCoverageGapAmt = lifeCoverageRemainAmt+criticalIllnessRemainAmt;
            result.totalCoverageGapCcy = result.lifeCoverageCurrency;
            result.totalSavingGapAmt = retirementRemainAmt+educationRemainAmt;
            result.totalSavingGapCcy = result.retirementCurrency;
        }
        result.comments = response.calculationDto.comments;
        // Summary end

        //aboutMe begin
		let aboutMe = {};
		aboutMe.riskLevel = response.financialInfoDto.rpqLevel;
        aboutMe.yearOfChildrenDOB1 = response.financialInfoDto.familyCirCum.yearOfChildrenDOB1;
        aboutMe.yearOfChildrenDOB2 = response.financialInfoDto.familyCirCum.yearOfChildrenDOB2;
        aboutMe.yearOfChildrenDOB3 = response.financialInfoDto.familyCirCum.yearOfChildrenDOB3;
        aboutMe.yearOfChildrenDOB4 = response.financialInfoDto.familyCirCum.yearOfChildrenDOB4;
        aboutMe.yearOfChildrenDOB5 = response.financialInfoDto.familyCirCum.yearOfChildrenDOB5;
        aboutMe.universityCountryCde = response.financialInfoDto.familyCirCum.universityCountryCde;        
        if(null!=aboutMe.yearOfChildrenDOB5&&aboutMe.yearOfChildrenDOB5.length>0){
            aboutMe.childrenNo =  5;
        }else if(null!=aboutMe.yearOfChildrenDOB4&&aboutMe.yearOfChildrenDOB4.length>0){
            aboutMe.childrenNo =  4;
        }else if(null!=aboutMe.yearOfChildrenDOB3&&aboutMe.yearOfChildrenDOB3.length>0){
            aboutMe.childrenNo =  3;
        }else if(null!=aboutMe.yearOfChildrenDOB2&&aboutMe.yearOfChildrenDOB2.length>0){
            aboutMe.childrenNo =  2;
        }else{
            aboutMe.childrenNo =  1;
        }
		if(null!=aboutMe.yearOfChildrenDOB1&&aboutMe.yearOfChildrenDOB1.length>0){
			aboutMe.hasChildUnder18 = true;
		}else{
            aboutMe.hasChildUnder18 = false;
        }

        aboutMe.expanded = true;
        // aboutMe end

        // education begin
        let education = {};
        education.savingForEduAmt = response.financialInfoDto.existingCoverage.savingForEduAmt;
        education.annualExp = response.goalPlanningDto.educationPlan.annualExpAmt;
        education.yearInSchool = response.goalPlanningDto.educationPlan.yearInSchool;
        education.yearTillEnterSchool = response.goalPlanningDto.educationPlan.yearTillEnterSchool;
        education.expanded = true;
        // education end

        // retirement begin
        let retirement = {};
        retirement.targetRetireAge = response.goalPlanningDto.retirementPlan.targeRetireAge;
        retirement.monthlyExpAmt = response.goalPlanningDto.retirementPlan.monthlyExpAmt;
        retirement.savingForRetireAmt = response.financialInfoDto.existingCoverage.savingForRetireAmt;
        retirement.hasLegacyPlan = response.financialInfoDto.hasLegacyPlan;
        retirement.legacyPlanRemark = response.financialInfoDto.hasLegacyPlanDesc;
        retirement.postRetireYear = response.goalPlanningDto.retirementPlan.postRetireYear;
        retirement.hopeLiveYear = retirement.postRetireYear+retirement.targetRetireAge;
        retirement.expanded = true;
        // retirement end

        // protection begin
        let protection = {};
        if(response.financialInfoDto.existingCoverage.lifeInsCmpnyBnftAmt != null && response.financialInfoDto.existingCoverage.lifeInsCmpnyBnftCurrCde != null){
            protection.lifeInsCmpnyBnftAmt = response.financialInfoDto.existingCoverage.lifeInsCmpnyBnftAmt;
        }
        protection.totalLiaOutsAmt = response.goalPlanningDto.protectionPlan.totalLiaOutsAmt;
        protection.supportAmt = response.goalPlanningDto.protectionPlan.supportAmt;
        protection.yearToSupport = response.goalPlanningDto.protectionPlan.yearToSupport;
        protection.lifeInsCoverAmt = response.financialInfoDto.existingCoverage.lifeInsCoverAmt;
        protection.savingAndInvesAmt = response.goalPlanningDto.protectionPlan.savingAndInvesAmt;
        if(response.financialInfoDto.monthlyIncs != null && response.financialInfoDto.monthlyIncs.length>0){
            for(let i = 0;i<response.financialInfoDto.monthlyIncs.length;i++){
                if(response.financialInfoDto.monthlyIncs[i].incomeTypeCode == "TOTAL_INC"){
                    protection.monthlyIncsTotalInc = response.financialInfoDto.monthlyIncs[i].currencyincomeAmt;
                }
            }
        }
        protection.expanded = true;
        // protection end

        // criticalIllness begin
        let criticalIllness = {};
        criticalIllness.illnessCoverAmt = response.financialInfoDto.existingCoverage.illnessCoverAmt;
        criticalIllness.hasInpCoverage = response.financialInfoDto.existingCoverage.hasInpCoverage;
        criticalIllness.hasOutptCoverage = response.financialInfoDto.existingCoverage.hasOutptCoverage;
        criticalIllness.hasTravCoverage = response.financialInfoDto.existingCoverage.hasTravCoverage;
        criticalIllness.yearToSupport = response.goalPlanningDto.criticalIllness.yearToSupport;
        criticalIllness.supportAmt = response.goalPlanningDto.criticalIllness.supportAmt;
        criticalIllness.expanded = true;
        // criticalIllness end

        // growYourWealth begin
        let growYourWealth = {};
        growYourWealth.hasShortTermInvest = response.financialInfoDto.hasShortTermInvest;
        growYourWealth.shortTermInvestDetail = response.calculationDto.shortTermInvestDetail;
        growYourWealth.hasMortgageProperty = response.financialInfoDto.hasMortgageProperty;
        growYourWealth.hasNoMortgageProperty = response.financialInfoDto.hasNoMortgageProperty;
        growYourWealth.hasRentProperty = response.financialInfoDto.hasRentProperty;
        growYourWealth.hasOverseaProperty = response.financialInfoDto.hasOverseaProperty;
        growYourWealth.expanded = true;
        // growYourWealth end
        return {
            formData:
                {result,aboutMe,education,retirement,protection,criticalIllness,growYourWealth}
            };

    },

    retrieveFhcDetailConvertResponse:(response)=>{
        console.log("covert retrieveFhcDetailConvertResponse",response);
        // Summary begin
        let calculationResults = response.calculationDto.calculationResults;
        let result = {};
        if(null!=calculationResults&&calculationResults.length>0){
            let lifeCoverageRemainAmt,criticalIllnessRemainAmt,retirementRemainAmt,educationRemainAmt;
            let coverageToalGapCcyCode,savingToalGapCcyCode;
            for(let i=0;i<calculationResults.length;i++){
                let calculationResult = calculationResults[i];
                let color = '';
                if(null!=calculationResult.referenceAmt&&0!=calculationResult.referenceAmt){
                    let achievedPercent = calculationResult.achievedAmt/calculationResult.referenceAmt;
                    color = achievedPercent>=0.7? '#269792': achievedPercent>=0.35? '#E9A115':'#E54D58'; 
                }
                
                if(calculationResult.calculationTypeCode=='CAL_LIFE_COVERAGE'){
                    result.lifeCoverageAchievedAmt = calculationResult.achievedAmt;
                    lifeCoverageRemainAmt = fhcUtil._updateStillNeedValue(calculationResult.referenceAmt-calculationResult.achievedAmt);
                    result.lifeCoverageRemainAmt = lifeCoverageRemainAmt;
                    result.lifeCoveragePriority = calculationResult.priority;
                    result.lifeCoverageCcyAmtObj = {ccyCode:calculationResult.currencyCode,amt:lifeCoverageRemainAmt};
                    result.lifeCoverageStillNeedCcyAmtObj = {ccyCode:calculationResult.currencyCode,amt:lifeCoverageRemainAmt};
                    result.lifeCoveragePriorityAmtCcyAmtObj = {ccyCode:calculationResult.currencyCode,amt:calculationResult.referenceAmt};
                    result.lifeCoverageColor = color;
                    coverageToalGapCcyCode = calculationResult.currencyCode;
                }
                else if(calculationResult.calculationTypeCode=='CAL_CRITICAL_ILL'){
                    result.criticalIllnessAchievedAmt = calculationResult.achievedAmt;
                    criticalIllnessRemainAmt = fhcUtil._updateStillNeedValue(calculationResult.referenceAmt-calculationResult.achievedAmt);
                    
                    result.criticalIllnessRemainAmt = criticalIllnessRemainAmt;
                    result.criticalIllnessPriority = calculationResult.priority;
                    result.criticalIllnessCcyAmtObj = {ccyCode:calculationResult.currencyCode,amt:criticalIllnessRemainAmt};
                    result.criticalIllnessStillNeedCcyAmtObj = {ccyCode:calculationResult.currencyCode,amt:criticalIllnessRemainAmt};
                    result.criticalIllnessPriorityAmtCcyAmtObj = {ccyCode:calculationResult.currencyCode,amt:calculationResult.referenceAmt};
                    result.criticalIllnessColor = color;
                    coverageToalGapCcyCode = calculationResult.currencyCode;
                }
                else if(calculationResult.calculationTypeCode=='CAL_RETIREMENT'){
                    result.retirementAchievedAmt = calculationResult.achievedAmt;
                    retirementRemainAmt = fhcUtil._updateStillNeedValue(calculationResult.referenceAmt-calculationResult.achievedAmt);
                    result.retirementRemainAmt = retirementRemainAmt;
                    result.retirementPriority = calculationResult.priority;
                    result.retirementCcyAmtObj = {ccyCode:calculationResult.currencyCode,amt:retirementRemainAmt};
                    result.retirementStillNeedCcyAmtObj = {ccyCode:calculationResult.currencyCode,amt:retirementRemainAmt};
                    result.retirementPriorityAmtCcyAmtObj = {ccyCode:calculationResult.currencyCode,amt:calculationResult.referenceAmt};
                    result.retirementColor = color;
                    savingToalGapCcyCode = calculationResult.currencyCode;
                }
                else if(calculationResult.calculationTypeCode=='CAL_EDUCATION'){
                    result.educationAchievedAmt = calculationResult.achievedAmt;
                    educationRemainAmt = fhcUtil._updateStillNeedValue(calculationResult.referenceAmt-calculationResult.achievedAmt);
                    result.educationRemainAmt = educationRemainAmt;
                    result.educationPriority = calculationResult.priority;
                    result.educationCcyAmtObj = {ccyCode:calculationResult.currencyCode,amt:educationRemainAmt};
                    result.educationStillNeedCcyAmtObj = {ccyCode:calculationResult.currencyCode,amt:educationRemainAmt};
                    result.educationPriorityAmtCcyAmtObj = {ccyCode:calculationResult.currencyCode,amt:calculationResult.referenceAmt};
                    result.educationColor = color;
                    savingToalGapCcyCode = calculationResult.currencyCode;
                }
                else if(calculationResult.calculationTypeCode=='CAL_SHORT_TERM_GO'){
                    result.growYourWealthPriority = calculationResult.priority;
                }
                else if(calculationResult.calculationTypeCode=='CAL_PROPERTY'){
                    result.propertyPriority = calculationResult.priority;
                }
                else if(calculationResult.calculationTypeCode=='CAL_LEGACY'){
                    result.legacyPriority = calculationResult.priority;
                }
                else if(calculationResult.calculationTypeCode=='CAL_GENERAL'){
                    result.healthPriority = calculationResult.priority;
                }
            }
            result.coverageToalGapCcyAmtObj = {ccyCode:coverageToalGapCcyCode,amt:(lifeCoverageRemainAmt+criticalIllnessRemainAmt)};
            result.savingToalGapCcyAmtObj = {ccyCode:savingToalGapCcyCode,amt:(retirementRemainAmt+educationRemainAmt)};
        }
        result.comments = response.calculationDto.comments;
        // Summary end
        
        //aboutMe begin
		let aboutMe = {};
        aboutMe.riskLevel = response.financialInfoDto.rpqLevel;
        aboutMe.yearOfChildrenDOB1 = response.financialInfoDto.familyCirCum.yearOfChildrenDOB1;
        aboutMe.yearOfChildrenDOB2 = response.financialInfoDto.familyCirCum.yearOfChildrenDOB2;
        aboutMe.yearOfChildrenDOB3 = response.financialInfoDto.familyCirCum.yearOfChildrenDOB3;
        aboutMe.yearOfChildrenDOB4 = response.financialInfoDto.familyCirCum.yearOfChildrenDOB4;
        aboutMe.yearOfChildrenDOB5 = response.financialInfoDto.familyCirCum.yearOfChildrenDOB5;
        aboutMe.universityCountryCde = response.financialInfoDto.familyCirCum.universityCountryCde;
        // aboutMe end

        // education begin
        let education = {};
        education.savingForEduCcyAmtObj = {ccyCode:response.financialInfoDto.existingCoverage.savingForEduCurrCde,amt:response.financialInfoDto.existingCoverage.savingForEduAmt};
        education.annualExpCcyAmtObj = {ccyCode:response.goalPlanningDto.educationPlan.annualExpCurrCde,amt:response.goalPlanningDto.educationPlan.annualExpAmt};
        education.yearInSchool = response.goalPlanningDto.educationPlan.yearInSchool;
        education.yearTillEnterSchool = response.goalPlanningDto.educationPlan.yearTillEnterSchool;
        // education end

        // retirement begin
        let retirement = {};
        retirement.targetRetireAge = response.goalPlanningDto.retirementPlan.targeRetireAge;
        retirement.monthlyExpCcyAmtObj = {ccyCode:response.goalPlanningDto.retirementPlan.monthlyExpCurrCde,amt:response.goalPlanningDto.retirementPlan.monthlyExpAmt};
        retirement.savingForRetireCcyAmtObj = {ccyCode:response.financialInfoDto.existingCoverage.savingForRetireCurrCde,amt:response.financialInfoDto.existingCoverage.savingForRetireAmt};
        retirement.hasLegacyPlan = response.financialInfoDto.hasLegacyPlan=='Y';
        retirement.hasLegacyPlanDesc = response.financialInfoDto.hasLegacyPlanDesc;
        retirement.postRetireYear = response.goalPlanningDto.retirementPlan.postRetireYear;
        // retirement end

        // protection begin
        let protection = {};
        if(response.financialInfoDto.existingCoverage.lifeInsCmpnyBnftAmt != null && response.financialInfoDto.existingCoverage.lifeInsCmpnyBnftCurrCde != null){
            protection.lifeInsCmpnyBnftCcyAmtObj = {ccyCode:response.financialInfoDto.existingCoverage.lifeInsCmpnyBnftCurrCde,amt:response.financialInfoDto.existingCoverage.lifeInsCmpnyBnftAmt};
        }
        protection.totalLiaOutsCcyAmtObj = {ccyCode:response.goalPlanningDto.protectionPlan.totalLiaOutsCurrCde,amt:response.goalPlanningDto.protectionPlan.totalLiaOutsAmt};
        protection.supportCcyAmtObj = {ccyCode:response.goalPlanningDto.protectionPlan.supportCurrCde,amt:response.goalPlanningDto.protectionPlan.supportAmt};
        protection.yearToSupport = response.goalPlanningDto.protectionPlan.yearToSupport;
        protection.lifeInsCoverCcyAmtObj = {ccyCode:response.financialInfoDto.existingCoverage.lifeInsCoverCurrCde,amt:response.financialInfoDto.existingCoverage.lifeInsCoverAmt};
        protection.savingAndInvesCcyAmtObj = {ccyCode:response.goalPlanningDto.protectionPlan.savingAndInvesCurrCde,amt:response.goalPlanningDto.protectionPlan.savingAndInvesAmt};
        if(response.financialInfoDto.monthlyIncs != null && response.financialInfoDto.monthlyIncs.length>0){
            for(let i = 0;i<response.financialInfoDto.monthlyIncs.length;i++){
                if(response.financialInfoDto.monthlyIncs[i].incomeTypeCode == "TOTAL_INC"){
                    protection.monthlyIncCcyAmtObj = {ccyCode:response.financialInfoDto.monthlyIncs[i].currencyCode,amt:response.financialInfoDto.monthlyIncs[i].currencyincomeAmt};
                }
            }
        }
        // protection end

        // criticalIllness begin
        let criticalIllness = {};
        criticalIllness.illnessCoverCcyAmtObj = {ccyCode:response.financialInfoDto.existingCoverage.illnessCoverCurrCde,amt:response.financialInfoDto.existingCoverage.illnessCoverAmt};
        criticalIllness.hasInpCoverage = response.financialInfoDto.existingCoverage.hasInpCoverage;
        criticalIllness.hasOutptCoverage = response.financialInfoDto.existingCoverage.hasOutptCoverage;
        criticalIllness.hasTravCoverage = response.financialInfoDto.existingCoverage.hasTravCoverage;
        criticalIllness.yearToSupport = response.goalPlanningDto.criticalIllness.yearToSupport;
        criticalIllness.supportCcyAmtObj = {ccyCode:response.goalPlanningDto.criticalIllness.supportCurrCde,amt:response.goalPlanningDto.criticalIllness.supportAmt};
        // criticalIllness end

        // growYourWealth begin
        let growYourWealth = {};
        growYourWealth.hasShortTermInvest = response.financialInfoDto.hasShortTermInvest=='Y';
        growYourWealth.shortTermInvestDetail = response.calculationDto.shortTermInvestDetail;
        growYourWealth.hasMortgageProperty = response.financialInfoDto.hasMortgageProperty;
        growYourWealth.hasNoMortgageProperty = response.financialInfoDto.hasNoMortgageProperty;
        growYourWealth.hasRentProperty = response.financialInfoDto.hasRentProperty;
        growYourWealth.hasOverseaProperty = response.financialInfoDto.hasOverseaProperty=='Y';
        // growYourWealth end
        let finhckId = response.financialInfoDto.finhckId;
        let calculationDto = {};
        calculationDto = response.calculationDto;
        return {
            overlayData:
                {result,aboutMe,education,retirement,protection,criticalIllness,growYourWealth,finhckId,calculationDto}
            };
    },
    /**
      * retrieve fxrate by currency request
    */
    retrieveByCurrencyConvertRequest:(params)=>{
        console.log("retrieveByCurrencyConvertRequest params",params);
        let sessionInfo=sessionInfoService.getSessionInfo();
        console.log("sessionInfo",sessionInfo);

        let beRequest = {              
                    countryCode: sessionInfo.countryCode,
                    groupMember: sessionInfo.groupMember,
                
                fxRateObjList:[{
                    currencyPair:{
                        sourceCurrency: "HKD",
                        targetCurrency: params.request.targetCurrency
                    },
                    fxRateType:"MID"
                }]
            };
        let request={
            request:beRequest,
            messageId:params.request.messageId
        }
        console.log("retrieveFhcDetailConvertRequest request",request);
        return request;
    },
    /**
      * retrieve fxrate by currency response
    */    
    retrieveByCurrencyConvertResponse:(response)=>{
        let fxRateMap=response.fxRateMap;
        let targetCurrency,fxrateValue;

        console.log("fxRateMap:",fxRateMap);
        if(!ObjectHelper.isNullOrEmpty(fxRateMap)){
            console.log("fxRateMap.JSON:",JSON.stringify(fxRateMap) );
            let entry=fxRateMap.entry;
            console.log("entry:",entry);
            if(!ObjectHelper.isNullOrEmpty(entry)){
                if(!ObjectHelper.isNullOrEmpty(entry[0])) {
                     targetCurrency=entry[0].key.targetCurrency;
                     fxrateValue=entry[0].value.rateValue;
                             
                }
            }
        }
        let fxrateDeatil={
             targetCurrency:targetCurrency,
             fxrateValue:fxrateValue
        };
        console.log("ConvertResponse fxrateDeatil:",fxrateDeatil)
        return fxrateDeatil;
    },

    calculateEducationRequest:(params, calculationData, calculationType)=>{
        if(fhcConfig.calculationServiceProtocol==="WS"){
            return fpsConverter.calculateEducationWsRequest(params,calculationData,calculationType);
        }else{
            return fpsConverter.calculateEducationRestRequest(params,calculationData,calculationType);
        }
    },

    calculateEducationRestRequest:(params, calculationData, calculationType)=>{
        console.log("params ", params);
        console.log("calculationData ", calculationData);

        let sessionInfo = calculationData.sessionInfo;
        let aboutMe = calculationData.aboutMe;
        let education = calculationData.education;

        let request = 
        {
            serviceContext: {
                countryCode: sessionInfo.countryISOCode,
                groupMember: sessionInfo.groupMemberCode,
                channelId: sessionInfo.channelId,
                businessLine: sessionInfo.lineOfBusinessCode,
                userId: sessionInfo.customerId,
                consumerId: sessionInfo.consumerId,
                localeCode: sessionInfo.localeCode
            },
            childrenFinancialGoal: [{
                costIndicator: "",
                goalTargetAmount: education.annualExp,
                goalTargetCurrencyCode: fhcConfig.currencyCodeForInputField,
                goalYearCount: education.yearInSchool,
                goalStartDate: (new Date().getFullYear() + parseInt(education.yearTillEnterSchool)).toString(),
                riskLevelNumber: aboutMe.riskLevel,
                riskToleranceLevel: aboutMe.riskLevel,
                skipRiskProfilingIndicator: fhcConfig.education.skipRiskProfilingIndicator,
                calculatedRiskCapacityLevelNumber: aboutMe.riskLevel,
                goalActionCode: fhcConfig.education.goalActionCode,
                goalTypeCode: fhcConfig.education.goalTypeCode,
                holdingAmount: 0,
                holdingCurrencyCode: fhcConfig.currencyCodeForInputField,
                incomeOrLumpSumMode: fhcConfig.education.incomeOrLumpSumMode,
                performanceMarketLevelCode: fhcConfig.education.performanceMarketLevelCode,
                periodicityGoalCode: fhcConfig.education.periodicityGoalCode,
                returnRate: 4,
                returnRateTypeCode: fhcConfig.education.returnRateTypeCode,
                simulateSegmentIndicator: fhcConfig.education.simulateSegmentIndicator,
                spendingRiskLevelNumber: aboutMe.riskLevel,
                fundingDetail: {
                    fundAlreadySetAmount: education.savingForEduAmt,
                    fundAlreadySetCurrencyCode: fhcConfig.currencyCodeForInputField,
                    fundAmount: 0,
                    fundCurrencyCode: fhcConfig.currencyCodeForInputField,
                    fundMonthlyAmount: 0,
                    fundMonthlyCurrencyCode: fhcConfig.currencyCodeForInputField
                },
                goalDescription: fhcConfig.education.goalDescription,
                financialGoalArrangement: {
                    spendingCountry: aboutMe.universityCountryCde,
                    currencyCode: fhcConfig.currencyCodeForInputField,
                    inflationRate: 0,
                    applyInflationIndicator: fhcConfig.education.applyInflationIndicator
                }
            }],
            projectionType: fhcConfig.education.projectionType
        }
        let calculateEducationRequest = {
            messageId : params.messageId,
            request : request,
            calculationType: calculationType,
            jsonData: request
        }
              
        console.log("calculateEducationRequest",calculateEducationRequest);
        return calculateEducationRequest;
    },

    calculateEducationWsRequest:(params, calculationData, calculationType)=>{
        console.log("params ", params);
        console.log("calculationData ", calculationData);

        let sessionInfo = calculationData.sessionInfo;
        let aboutMe = calculationData.aboutMe;
        let education = calculationData.education;

        let request = 
        {
            sessionInfo: {
                businessLine: sessionInfo.lineOfBusinessCode,
                businessOpUnit: "",
                channelId: sessionInfo.channelId,
                consumerId: sessionInfo.consumerId,
                countryCode:  sessionInfo.countryISOCode,
                deviceId: "",
                employeeUserId: sessionInfo.staffId,
                groupMember: sessionInfo.groupMemberCode,
                userId: sessionInfo.staffId,
                hubUserId: "",
                hubWorkstationId: ""
            },
            customers: [
                {
                    countryISOCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    rolePlayerIdentificationNumber: sessionInfo.customerId,
                    sourceSystemRolePlayerCode: sessionInfo.sourceSystemRolePlayerCode
                }
            ],
            localeCode: {
                localeCode: sessionInfo.localeCode
            },
            projectionType: {
                projectionTypeCode: fhcConfig.education.projectionType
            },
            requestDataType: "",

            childrenFinancialGoal: [{
                costIndicator: "",
                goalTargetAmount: education.annualExp,
                goalTargetCurrencyCode: fhcConfig.currencyCodeForInputField,
                goalYearCount: education.yearInSchool,
                goalStartDate: (new Date().getFullYear() + parseInt(education.yearTillEnterSchool)).toString()+"-01-01", //review
                riskLevelNumber: aboutMe.riskLevel,
                riskToleranceLevel: aboutMe.riskLevel,
                skipRiskProfilingIndicator: fhcConfig.education.skipRiskProfilingIndicator,
                calculatedRiskCapacityLevelNumber: aboutMe.riskLevel,
                goalActionCode: fhcConfig.education.goalActionCode,
                goalTypeCode: fhcConfig.education.goalTypeCode,
                holdingAmount: 0,
                holdingCurrencyCode: fhcConfig.currencyCodeForInputField,
                incomeOrLumpSumMode: fhcConfig.education.incomeOrLumpSumMode,
                performanceMarketLevelCode: fhcConfig.education.performanceMarketLevelCode,
                periodicityGoalCode: fhcConfig.education.periodicityGoalCode,
                returnRate: 4,
                returnRateTypeCode: fhcConfig.education.returnRateTypeCode,
                simulateSegmentIndicator: fhcConfig.education.simulateSegmentIndicator,
                spendingRiskLevelNumber: aboutMe.riskLevel,
                fundingDetail: {
                    fundAlreadySetAmount: education.savingForEduAmt,
                    fundAlreadySetCurrencyCode: fhcConfig.currencyCodeForInputField,
                    fundAmount: 0,
                    fundCurrencyCode: fhcConfig.currencyCodeForInputField,
                    fundMonthlyAmount: 0,
                    fundMonthlyCurrencyCode: fhcConfig.currencyCodeForInputField
                },
                goalDescription: fhcConfig.education.goalDescription,
                financialGoalArrangement: {
                    spendingCountry: aboutMe.universityCountryCde,
                    currencyCode: fhcConfig.currencyCodeForInputField,
                    inflationRate: 0,
                    applyInflationIndicator: fhcConfig.education.applyInflationIndicator
                }
            }]
        }
        let calculateEducationRequest = {
            messageId : params.messageId,
            request : request,
            calculationType: calculationType,
            jsonData: request
        }
              
        console.log("calculateEducationRequest",calculateEducationRequest);
        return calculateEducationRequest;
    },

    calculateLifeCoverageRequest:(params, calculationData, calculationType)=>{
        if(fhcConfig.calculationServiceProtocol==="WS"){
            return fpsConverter.calculateLifeCoverageWsRequest(params,calculationData,calculationType);
        }else{
            return fpsConverter.calculateLifeCoverageRestRequest(params,calculationData,calculationType);
        }
    },

    calculateLifeCoverageWsRequest:(params, calculationData, calculationType)=>{
        console.log("params ", params);
        console.log("calculationData ", calculationData);

        let sessionInfo = calculationData.sessionInfo;
        let aboutMe = calculationData.aboutMe;
        let protection = calculationData.protection;
        let criticalIllness = calculationData.criticalIllness;

        let lifeInsCoverAmt = Number(protection.lifeInsCoverAmt) || 0;
        let lifeInsCmpnyBnftAmt =  Number(protection.lifeInsCmpnyBnftAmt) || 0;

        let request = 
        {
            sessionInfo: {
                businessLine: sessionInfo.lineOfBusinessCode,
                businessOpUnit: "",
                channelId: sessionInfo.channelId,
                consumerId: sessionInfo.consumerId,
                countryCode:  sessionInfo.countryISOCode,
                deviceId: "",
                employeeUserId: sessionInfo.staffId,
                groupMember: sessionInfo.groupMemberCode,
                userId: sessionInfo.staffId,
                hubUserId: "",
                hubWorkstationId: ""
            },
            soleCustomerKeys: [
                {
                    countryISOCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    rolePlayerIdentificationNumber: sessionInfo.customerId,
                    sourceSystemRolePlayerCode: sessionInfo.sourceSystemRolePlayerCode
                }
            ],
            localeCode: {
                localeCode: sessionInfo.localeCode
            },
            projectionType: {
                projectionTypeCode: fhcConfig.education.projectionType
            },
            requestDataType: "",

            financialProfile: [{
                amountCode: "OHER_DEBT",
                financialAmount: protection.totalLiaOutsAmt,
                financialCurrencyCode: fhcConfig.currencyCodeForInputField
            },
            {
                amountCode: "INCM_MO_AMT",
                financialAmount: protection.monthlyIncsTotalInc,
                financialCurrencyCode: fhcConfig.currencyCodeForInputField
            },
            {
                amountCode: "SAVNG_AND_INVST",
                financialAmount: protection.savingAndInvesAmt,
                financialCurrencyCode: fhcConfig.currencyCodeForInputField
            }],
            lifeProtectionGoal: {
                adjustedMonthlyExpenseAmount: 0,
                adjustedMonthlyExpenseCurrencyCode: fhcConfig.currencyCodeForInputField,
                adjustedMonthlyIncomeAmount: 0,
                adjustedMonthlyIncomeCurrencyCode: fhcConfig.currencyCodeForInputField,
                calculatedRiskCapacityLevelNumber: aboutMe.riskLevel,
                coveragExistingCITotalAmount: 0,
                coveragExistingCITotalCurrencyCode: fhcConfig.currencyCodeForInputField,
                coverageAge: 0,
                coverageExistingIncomeBenefitsTotalAmount: 0,
                coverageExistingIncomeBenefitsTotalCurrencyCode: fhcConfig.currencyCodeForInputField,
                coverageLifeInsuranceTotalAmount:  lifeInsCoverAmt+lifeInsCmpnyBnftAmt,
                coverageLifeInsuranceTotalCurrencyCode: fhcConfig.currencyCodeForInputField,
                coveragePeriodIndicator: fhcConfig.lifeCoverage.coveragePeriodIndicator,
                currentAge: 0,
                debtRepaymentSimulatePercent: 100,
                financialGoalArrangement: {
                    applyInflationIndicator:  fhcConfig.lifeCoverage.applyInflationIndicator,
                    currencyCode: fhcConfig.currencyCodeForInputField,
                    inflationRate: 0,
                    spendingCountry: ""
                },
                fundInvestmentSavingSimulatePercent: 100,
                goalCostCoverAmount: protection.supportAmt,
                goalCostCoverCurrencyCode: fhcConfig.currencyCodeForInputField,
                goalDescription: fhcConfig.lifeCoverage.goalDescription,
                goalForNeed: "",
                goalTypeCode: fhcConfig.lifeCoverage.goalTypeCode,
                goalYearCount: protection.yearToSupport,
                incomeMonthlyAmount: 0,
                incomeMonthlyCurrencyCode: fhcConfig.currencyCodeForInputField,
                incomeRetainSimulatePercent: 100,
                investmentTimeHorizon: 0,
                mortgagesAndDebtsMonthlyRepaymentAmount: 0,
                mortgagesAndDebtsMonthlyRepaymentCurrencyCode: fhcConfig.currencyCodeForInputField,
                mortgagesAndDebtsOutstandingAmount: 0,
                mortgagesAndDebtsOutstandingCurrencyCode: fhcConfig.currencyCodeForInputField,
                numberOfDependents: aboutMe.childrenNo,
                personalIncomeGrowthRate: 0,
                planForCustomerIndicator: fhcConfig.lifeCoverage.planForCustomerIndicator,
                protectionNeedType: "",
                returnRate: 0,
                returnRateTypeCode: fhcConfig.lifeCoverage.returnRateTypeCode,
                riskLevelNumber: aboutMe.riskLevel,
                riskToleranceLevel: aboutMe.riskLevel,
                savingInvestmentAmount: 0,
                savingInvestmentCurrencyCode: fhcConfig.currencyCodeForInputField,
                simulateSegmentIndicator: fhcConfig.lifeCoverage.simulateSegmentIndicator,
                skipRiskProfilingIndicator: fhcConfig.lifeCoverage.skipRiskProfilingIndicator,
                stateBenefitsMonthlyAmount: 0,
                stateBenefitsMonthlyCurrencyCode: fhcConfig.currencyCodeForInputField,
                stateBenefitsOfCIAmount: 0,
                stateBenefitsOfCICurrencyCode: fhcConfig.currencyCodeForInputField,
                stateBenefitsOfDeadAmount: 0,
                stateBenefitsOfDeadCurrencyCode: fhcConfig.currencyCodeForInputField
            }
        }
        let calculateLifeCoverageRequest = {
            messageId : params.messageId,
            request : request,
            calculationType: calculationType,
            jsonData: request
        }
              
        console.log("calculateLifeCoverageRequest",calculateLifeCoverageRequest);
        return calculateLifeCoverageRequest;
    },

    calculateLifeCoverageRestRequest:(params, calculationData, calculationType)=>{
        console.log("params ", params);
        console.log("calculationData ", calculationData);

        let sessionInfo = calculationData.sessionInfo;
        let aboutMe = calculationData.aboutMe;
        let protection = calculationData.protection;
        let criticalIllness = calculationData.criticalIllness;

        let lifeInsCoverAmt = Number(protection.lifeInsCoverAmt) || 0;
        let lifeInsCmpnyBnftAmt =  Number(protection.lifeInsCmpnyBnftAmt) || 0;

        let request = 
        {
            serviceContext: {
                countryCode: sessionInfo.countryISOCode,
                groupMember: sessionInfo.groupMemberCode,
                channelId: sessionInfo.channelId,
                businessLine: sessionInfo.lineOfBusinessCode,
                userId: sessionInfo.customerId,
                consumerId: sessionInfo.consumerId,
                localeCode: sessionInfo.localeCode
            },
            financialProfile: [{
                amountCode: "OHER_DEBT",
                financialAmount: protection.totalLiaOutsAmt,
                financialCurrencyCode: fhcConfig.currencyCodeForInputField
            },
            {
                amountCode: "INCM_MO_AMT",
                financialAmount: protection.monthlyIncsTotalInc,
                financialCurrencyCode: fhcConfig.currencyCodeForInputField
            },
            {
                amountCode: "SAVNG_AND_INVST",
                financialAmount: protection.savingAndInvesAmt,
                financialCurrencyCode: fhcConfig.currencyCodeForInputField
            }],
            lifeProtectionGoal: {
                adjustedMonthlyExpenseAmount: 0,
                adjustedMonthlyExpenseCurrencyCode: fhcConfig.currencyCodeForInputField,
                adjustedMonthlyIncomeAmount: 0,
                adjustedMonthlyIncomeCurrencyCode: fhcConfig.currencyCodeForInputField,
                calculatedRiskCapacityLevelNumber: aboutMe.riskLevel,
                coveragExistingCITotalAmount: 0,
                coveragExistingCITotalCurrencyCode: fhcConfig.currencyCodeForInputField,
                coverageAge: 0,
                coverageExistingIncomeBenefitsTotalAmount: 0,
                coverageExistingIncomeBenefitsTotalCurrencyCode: fhcConfig.currencyCodeForInputField,
                coverageLifeInsuranceTotalAmount: lifeInsCoverAmt+lifeInsCmpnyBnftAmt,
                coverageLifeInsuranceTotalCurrencyCode: fhcConfig.currencyCodeForInputField,
                coveragePeriodIndicator: fhcConfig.lifeCoverage.coveragePeriodIndicator,
                currentAge: 0,
                debtRepaymentSimulatePercent: 100,
                financialGoalArrangement: {
                    applyInflationIndicator:  fhcConfig.lifeCoverage.applyInflationIndicator,
                    currencyCode: fhcConfig.currencyCodeForInputField,
                    inflationRate: 0,
                    spendingCountry: ""
                },
                fundInvestmentSavingSimulatePercent: 100,
                goalCostCoverAmount: protection.supportAmt,
                goalCostCoverCurrencyCode: fhcConfig.currencyCodeForInputField,
                goalDescription: fhcConfig.lifeCoverage.goalDescription,
                goalForNeed: "",
                goalTypeCode: fhcConfig.lifeCoverage.goalTypeCode,
                goalYearCount: protection.yearToSupport,
                incomeMonthlyAmount: 0,
                incomeMonthlyCurrencyCode: fhcConfig.currencyCodeForInputField,
                incomeRetainSimulatePercent: 100,
                investmentTimeHorizon: 0,
                mortgagesAndDebtsMonthlyRepaymentAmount: 0,
                mortgagesAndDebtsMonthlyRepaymentCurrencyCode: fhcConfig.currencyCodeForInputField,
                mortgagesAndDebtsOutstandingAmount: 0,
                mortgagesAndDebtsOutstandingCurrencyCode: fhcConfig.currencyCodeForInputField,
                numberOfDependents: aboutMe.childrenNo,
                personalIncomeGrowthRate: 0,
                planForCustomerIndicator: fhcConfig.lifeCoverage.planForCustomerIndicator,
                protectionNeedType: "",
                returnRate: 0,
                returnRateTypeCode: fhcConfig.lifeCoverage.returnRateTypeCode,
                riskLevelNumber: aboutMe.riskLevel,
                riskToleranceLevel: aboutMe.riskLevel,
                savingInvestmentAmount: 0,
                savingInvestmentCurrencyCode: fhcConfig.currencyCodeForInputField,
                simulateSegmentIndicator: fhcConfig.lifeCoverage.simulateSegmentIndicator,
                skipRiskProfilingIndicator: fhcConfig.lifeCoverage.skipRiskProfilingIndicator,
                stateBenefitsMonthlyAmount: 0,
                stateBenefitsMonthlyCurrencyCode: fhcConfig.currencyCodeForInputField,
                stateBenefitsOfCIAmount: 0,
                stateBenefitsOfCICurrencyCode: fhcConfig.currencyCodeForInputField,
                stateBenefitsOfDeadAmount: 0,
                stateBenefitsOfDeadCurrencyCode: fhcConfig.currencyCodeForInputField
            },
            projectionType: fhcConfig.lifeCoverage.projectionType
        }
        let calculateLifeCoverageRequest = {
            messageId : params.messageId,
            request : request,
            calculationType: calculationType,
            jsonData: request
        }
              
        console.log("calculateLifeCoverageRequest",calculateLifeCoverageRequest);
        return calculateLifeCoverageRequest;
    },

    calculateCriticalIllnessRequest:(params, calculationData, calculationType)=>{
        if(fhcConfig.calculationServiceProtocol==="WS"){
            return fpsConverter.calculateCriticalIllnessWsRequest(params,calculationData,calculationType);
        }else{
            return fpsConverter.calculateCriticalIllnessRestRequest(params,calculationData,calculationType);
        }
    },

    calculateCriticalIllnessWsRequest:(params, calculationData, calculationType)=>{
        console.log("params ", params);
        console.log("calculationData ", calculationData);

        let sessionInfo = calculationData.sessionInfo;
        let aboutMe = calculationData.aboutMe;
        let protection = calculationData.protection;
        let criticalIllness = calculationData.criticalIllness;

        let lifeInsCoverAmt = Number(protection.lifeInsCoverAmt) || 0;
        let lifeInsCmpnyBnftAmt =  Number(protection.lifeInsCmpnyBnftAmt) || 0;

        let request = 
        {
            sessionInfo: {
                businessLine: sessionInfo.lineOfBusinessCode,
                businessOpUnit: "",
                channelId: sessionInfo.channelId,
                consumerId: sessionInfo.consumerId,
                countryCode:  sessionInfo.countryISOCode,
                deviceId: "",
                employeeUserId: sessionInfo.staffId,
                groupMember: sessionInfo.groupMemberCode,
                userId: sessionInfo.staffId,
                hubUserId: "",
                hubWorkstationId: ""
            },
            soleCustomerKeys: [
                {
                    countryISOCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    rolePlayerIdentificationNumber: sessionInfo.customerId,
                    sourceSystemRolePlayerCode: sessionInfo.sourceSystemRolePlayerCode
                }
            ],
            localeCode: {
                localeCode: sessionInfo.localeCode
            },
            projectionType: {
                projectionTypeCode: fhcConfig.education.projectionType
            },
            requestDataType: "",

            financialProfile: [{
                amountCode: "OHER_DEBT",
                financialAmount: 0,
                financialCurrencyCode: fhcConfig.currencyCodeForInputField
            },
            {
                amountCode: "INCM_MO_AMT",
                financialAmount: protection.monthlyIncsTotalInc,
                financialCurrencyCode: fhcConfig.currencyCodeForInputField
            },
            {
                amountCode: "SAVNG_AND_INVST",
                financialAmount: criticalIllness.illnessCoverAmt,
                financialCurrencyCode: fhcConfig.currencyCodeForInputField
            }],
            lifeProtectionGoal: {
                adjustedMonthlyExpenseAmount: 0,
                adjustedMonthlyExpenseCurrencyCode: fhcConfig.currencyCodeForInputField,
                adjustedMonthlyIncomeAmount: 0,
                adjustedMonthlyIncomeCurrencyCode: fhcConfig.currencyCodeForInputField,
                calculatedRiskCapacityLevelNumber: aboutMe.riskLevel,
                coveragExistingCITotalAmount: 0,
                coveragExistingCITotalCurrencyCode: fhcConfig.currencyCodeForInputField,
                coverageAge: 0,
                coverageExistingIncomeBenefitsTotalAmount: 0,
                coverageExistingIncomeBenefitsTotalCurrencyCode: fhcConfig.currencyCodeForInputField,
                coverageLifeInsuranceTotalAmount: lifeInsCoverAmt+lifeInsCmpnyBnftAmt,
                coverageLifeInsuranceTotalCurrencyCode: fhcConfig.currencyCodeForInputField,
                coveragePeriodIndicator: fhcConfig.criticalIllness.coveragePeriodIndicator,
                currentAge: 0,
                debtRepaymentSimulatePercent: 100,
                financialGoalArrangement: {
                    applyInflationIndicator: fhcConfig.criticalIllness.applyInflationIndicator,
                    currencyCode: fhcConfig.currencyCodeForInputField,
                    inflationRate: 0,
                    spendingCountry: ""
                },
                fundInvestmentSavingSimulatePercent: 100,
                goalCostCoverAmount: criticalIllness.supportAmt,
                goalCostCoverCurrencyCode: fhcConfig.currencyCodeForInputField,
                goalDescription: fhcConfig.criticalIllness.goalDescription,
                goalForNeed: "",
                goalTypeCode: fhcConfig.criticalIllness.goalTypeCode,
                goalYearCount: criticalIllness.yearToSupport,
                incomeMonthlyAmount: 0,
                incomeMonthlyCurrencyCode: fhcConfig.currencyCodeForInputField,
                incomeRetainSimulatePercent: 100,
                investmentTimeHorizon: 0,
                mortgagesAndDebtsMonthlyRepaymentAmount: 0,
                mortgagesAndDebtsMonthlyRepaymentCurrencyCode: fhcConfig.currencyCodeForInputField,
                mortgagesAndDebtsOutstandingAmount: 0,
                mortgagesAndDebtsOutstandingCurrencyCode: fhcConfig.currencyCodeForInputField,
                numberOfDependents: aboutMe.childrenNo,
                personalIncomeGrowthRate: 0,
                planForCustomerIndicator: fhcConfig.criticalIllness.planForCustomerIndicator,
                protectionNeedType: "",
                returnRate: 0,
                returnRateTypeCode: fhcConfig.criticalIllness.returnRateTypeCode,
                riskLevelNumber: aboutMe.riskLevel,
                riskToleranceLevel: aboutMe.riskLevel,
                savingInvestmentAmount: 0,
                savingInvestmentCurrencyCode: fhcConfig.currencyCodeForInputField,
                simulateSegmentIndicator: fhcConfig.criticalIllness.simulateSegmentIndicator,
                skipRiskProfilingIndicator: fhcConfig.criticalIllness.skipRiskProfilingIndicator,
                stateBenefitsMonthlyAmount: 0,
                stateBenefitsMonthlyCurrencyCode: fhcConfig.currencyCodeForInputField,
                stateBenefitsOfCIAmount: 0,
                stateBenefitsOfCICurrencyCode: fhcConfig.currencyCodeForInputField,
                stateBenefitsOfDeadAmount: 0,
                stateBenefitsOfDeadCurrencyCode: fhcConfig.currencyCodeForInputField,
            }
        }
        let calculateCriticalIllnessRequest = {
            messageId : params.messageId,
            request : request,
            calculationType: calculationType,
            jsonData: request
        }
              
        console.log("calculateCriticalIllnessRequest",calculateCriticalIllnessRequest);
        return calculateCriticalIllnessRequest;
    },

    calculateCriticalIllnessRestRequest:(params, calculationData, calculationType)=>{
        console.log("params ", params);
        console.log("calculationData ", calculationData);

        let sessionInfo = calculationData.sessionInfo;
        let aboutMe = calculationData.aboutMe;
        let protection = calculationData.protection;
        let criticalIllness = calculationData.criticalIllness;

        let lifeInsCoverAmt = protection.lifeInsCoverAmt || 0;
        let lifeInsCmpnyBnftAmt =  protection.lifeInsCmpnyBnftAmt || 0;

        let request = 
        {
            serviceContext: {
                countryCode: sessionInfo.countryISOCode,
                groupMember: sessionInfo.groupMemberCode,
                channelId: sessionInfo.channelId,
                businessLine: sessionInfo.lineOfBusinessCode,
                userId: sessionInfo.customerId,
                consumerId: sessionInfo.consumerId,
                localeCode: sessionInfo.localeCode
            },
            financialProfile: [{
                amountCode: "OHER_DEBT",
                financialAmount: 0,
                financialCurrencyCode: fhcConfig.currencyCodeForInputField
            },
            {
                amountCode: "INCM_MO_AMT",
                financialAmount: protection.monthlyIncsTotalInc,
                financialCurrencyCode: fhcConfig.currencyCodeForInputField
            },
            {
                amountCode: "SAVNG_AND_INVST",
                financialAmount: criticalIllness.illnessCoverAmt,
                financialCurrencyCode: fhcConfig.currencyCodeForInputField
            }],
            lifeProtectionGoal: {
                adjustedMonthlyExpenseAmount: 0,
                adjustedMonthlyExpenseCurrencyCode: fhcConfig.currencyCodeForInputField,
                adjustedMonthlyIncomeAmount: 0,
                adjustedMonthlyIncomeCurrencyCode: fhcConfig.currencyCodeForInputField,
                calculatedRiskCapacityLevelNumber: aboutMe.riskLevel,
                coveragExistingCITotalAmount: 0,
                coveragExistingCITotalCurrencyCode: fhcConfig.currencyCodeForInputField,
                coverageAge: 0,
                coverageExistingIncomeBenefitsTotalAmount: 0,
                coverageExistingIncomeBenefitsTotalCurrencyCode: fhcConfig.currencyCodeForInputField,
                coverageLifeInsuranceTotalAmount: lifeInsCoverAmt+lifeInsCmpnyBnftAmt,
                coverageLifeInsuranceTotalCurrencyCode: fhcConfig.currencyCodeForInputField,
                coveragePeriodIndicator: fhcConfig.criticalIllness.coveragePeriodIndicator,
                currentAge: 0,
                debtRepaymentSimulatePercent: 100,
                financialGoalArrangement: {
                    applyInflationIndicator: fhcConfig.criticalIllness.applyInflationIndicator,
                    currencyCode: fhcConfig.currencyCodeForInputField,
                    inflationRate: 0,
                    spendingCountry: ""
                },
                fundInvestmentSavingSimulatePercent: 100,
                goalCostCoverAmount: criticalIllness.supportAmt,
                goalCostCoverCurrencyCode: fhcConfig.currencyCodeForInputField,
                goalDescription: fhcConfig.criticalIllness.goalDescription,
                goalForNeed: "",
                goalTypeCode: fhcConfig.criticalIllness.goalTypeCode,
                goalYearCount: criticalIllness.yearToSupport,
                incomeMonthlyAmount: 0,
                incomeMonthlyCurrencyCode: fhcConfig.currencyCodeForInputField,
                incomeRetainSimulatePercent: 100,
                investmentTimeHorizon: 0,
                mortgagesAndDebtsMonthlyRepaymentAmount: 0,
                mortgagesAndDebtsMonthlyRepaymentCurrencyCode: fhcConfig.currencyCodeForInputField,
                mortgagesAndDebtsOutstandingAmount: 0,
                mortgagesAndDebtsOutstandingCurrencyCode: fhcConfig.currencyCodeForInputField,
                numberOfDependents: aboutMe.childrenNo,
                personalIncomeGrowthRate: 0,
                planForCustomerIndicator: fhcConfig.criticalIllness.planForCustomerIndicator,
                protectionNeedType: "",
                returnRate: 0,
                returnRateTypeCode: fhcConfig.criticalIllness.returnRateTypeCode,
                riskLevelNumber: aboutMe.riskLevel,
                riskToleranceLevel: aboutMe.riskLevel,
                savingInvestmentAmount: 0,
                savingInvestmentCurrencyCode: fhcConfig.currencyCodeForInputField,
                simulateSegmentIndicator: fhcConfig.criticalIllness.simulateSegmentIndicator,
                skipRiskProfilingIndicator: fhcConfig.criticalIllness.skipRiskProfilingIndicator,
                stateBenefitsMonthlyAmount: 0,
                stateBenefitsMonthlyCurrencyCode: fhcConfig.currencyCodeForInputField,
                stateBenefitsOfCIAmount: 0,
                stateBenefitsOfCICurrencyCode: fhcConfig.currencyCodeForInputField,
                stateBenefitsOfDeadAmount: 0,
                stateBenefitsOfDeadCurrencyCode: fhcConfig.currencyCodeForInputField,
            },
            projectionType: fhcConfig.criticalIllness.projectionType
        }
        let calculateCriticalIllnessRequest = {
            messageId : params.messageId,
            request : request,
            calculationType: calculationType,
            jsonData: request
        }
              
        console.log("calculateCriticalIllnessRequest",calculateCriticalIllnessRequest);
        return calculateCriticalIllnessRequest;
    },

    calculateRetirementRequest:(params, calculationData, calculationType)=>{
        if(fhcConfig.calculationServiceProtocol==="WS"){
            return fpsConverter.calculateRetirementWsRequest(params,calculationData,calculationType);
        }else{
            return fpsConverter.calculateRetirementRestRequest(params,calculationData,calculationType);
        }
    },

    calculateRetirementWsRequest :(params, calculationData, calculationType)=>{
        console.log("params ", params);
        console.log("calculationData ", calculationData);

        let sessionInfo = calculationData.sessionInfo;
        let aboutMe = calculationData.aboutMe;
        let retirement = calculationData.retirement;

        let request = 
        {
            sessionInfo: {
                businessLine: sessionInfo.lineOfBusinessCode,
                businessOpUnit: "",
                channelId: sessionInfo.channelId,
                consumerId: sessionInfo.consumerId,
                countryCode:  sessionInfo.countryISOCode,
                deviceId: "",
                employeeUserId: sessionInfo.staffId,
                groupMember: sessionInfo.groupMemberCode,
                userId: sessionInfo.staffId,
                hubUserId: "",
                hubWorkstationId: ""
            },
            customers: [
                {
                    countryISOCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    rolePlayerIdentificationNumber: sessionInfo.customerId,
                    sourceSystemRolePlayerCode: sessionInfo.sourceSystemRolePlayerCode
                }
            ],
            localeCode: {
                localeCode: sessionInfo.localeCode
            },
            projectionType: {
                projectionTypeCode: fhcConfig.education.projectionType
            },
            requestDataType: "",

            retirementGoal: [{
                ageDeathNumber: parseInt(retirement.targetRetireAge)+parseInt(retirement.postRetireYear),
                ageRetirementNumber: retirement.targetRetireAge,
                ageSimulateCurrentNumber: aboutMe.currentAge,
                calculatedRiskCapacityLevelNumber: aboutMe.riskLevel,
                definedBenefitPensionAmount: 0,
                definedContributionPensionAmount: 0,
                definedContributionPensionCurrencyCode: fhcConfig.currencyCodeForInputField,
                goalDescription: fhcConfig.retirement.goalDescription,
                goalTypeCode: fhcConfig.retirement.goalTypeCode,
                holdingAmount: 0,
                holdingCurrencyCode: fhcConfig.currencyCodeForInputField,
                incomeOrLumpSumMode: fhcConfig.retirement.incomeOrLumpSumMode,
                incomePensionAmount: 0,
                incomePensionCurrencyCode: fhcConfig.currencyCodeForInputField,
                incomePostRetirementDesireAmount: retirement.monthlyExpAmt,
                incomePostRetirementDesireCurrencyCode: fhcConfig.currencyCodeForInputField,
                performanceMarketLevelCode: fhcConfig.retirement.performanceMarketLevelCode,
                periodicityIncomePensionCode: fhcConfig.retirement.periodicityIncomePensionCode,
                periodicityPostRetirementIncomeCode: fhcConfig.retirement.periodicityPostRetirementIncomeCode,
                returnRateTypeCode: fhcConfig.retirement.returnRateTypeCode,
                riskLevelNumber: aboutMe.riskLevel,
                riskToleranceLevel: aboutMe.riskLevel,
                simulateSegmentIndicator: fhcConfig.retirement.simulateSegmentIndicator,
                skipRiskProfilingIndicator: fhcConfig.retirement.skipRiskProfilingIndicator,
                spendingRiskLevelNumber: aboutMe.riskLevel,
                stateBenefitAnnualIncomeAmount: 0,
                taxFreeCashIndicator: fhcConfig.retirement.taxFreeCashIndicator,
                viewType: fhcConfig.retirement.viewType,
                retirementExpenseDetail: {
                    lastSalaryAmount: 0,
                    lastSalaryCurrencyCode: fhcConfig.currencyCodeForInputField,
                    lastSalaryPercentage: 0,
                    retirementExpenseSource: fhcConfig.retirement.retirementExpenseSource
                },
                financialGoalArrangement: {
                    applyInflationIndicator: fhcConfig.retirement.applyInflationIndicator,
                    currencyCode: fhcConfig.currencyCodeForInputField,
                    spendingCountry: ""
                },
                fundingDetail: {
                    fundAlreadySetAmount: retirement.savingForRetireAmt,
                    fundAlreadySetCurrencyCode: fhcConfig.currencyCodeForInputField,
                    fundAmount: 0,
                    fundCurrencyCode: fhcConfig.currencyCodeForInputField,
                    fundMonthlyAmount: 0,
                    fundMonthlyCurrencyCode: fhcConfig.currencyCodeForInputField
                }
            }]
        }

        let calculateRetirementRequest = {
            messageId : params.messageId,
            request : request,
            calculationType: calculationType,
            jsonData: request
        }
              
        console.log("calculateRetirementRequest",calculateRetirementRequest);
        return calculateRetirementRequest;
    },

    calculateRetirementRestRequest :(params, calculationData, calculationType)=>{
        console.log("params ", params);
        console.log("calculationData ", calculationData);

        let sessionInfo = calculationData.sessionInfo;
        let aboutMe = calculationData.aboutMe;
        let retirement = calculationData.retirement;

        let request = 
        {
            serviceContext: {
                countryCode: sessionInfo.countryISOCode,
                groupMember: sessionInfo.groupMemberCode,
                channelId: sessionInfo.channelId,
                businessLine: sessionInfo.lineOfBusinessCode,
                userId: sessionInfo.customerId,
                consumerId: sessionInfo.consumerId,
                localeCode: sessionInfo.localeCode
            },
            retirementGoal: [{
                ageDeathNumber: parseInt(retirement.targetRetireAge)+parseInt(retirement.postRetireYear),
                ageRetirementNumber: retirement.targetRetireAge,
                ageSimulateCurrentNumber: aboutMe.currentAge,
                calculatedRiskCapacityLevelNumber: aboutMe.riskLevel,
                definedBenefitPensionAmount: 0,
                definedContributionPensionAmount: 0,
                definedContributionPensionCurrencyCode: fhcConfig.currencyCodeForInputField,
                goalDescription: fhcConfig.retirement.goalDescription,
                goalTypeCode: fhcConfig.retirement.goalTypeCode,
                holdingAmount: 0,
                holdingCurrencyCode: fhcConfig.currencyCodeForInputField,
                incomeOrLumpSumMode: fhcConfig.retirement.incomeOrLumpSumMode,
                incomePensionAmount: 0,
                incomePensionCurrencyCode: fhcConfig.currencyCodeForInputField,
                incomePostRetirementDesireAmount: retirement.monthlyExpAmt,
                incomePostRetirementDesireCurrencyCode: fhcConfig.currencyCodeForInputField,
                performanceMarketLevelCode: fhcConfig.retirement.performanceMarketLevelCode,
                periodicityIncomePensionCode: fhcConfig.retirement.periodicityIncomePensionCode,
                periodicityPostRetirementIncomeCode: fhcConfig.retirement.periodicityPostRetirementIncomeCode,
                returnRateTypeCode: fhcConfig.retirement.returnRateTypeCode,
                riskLevelNumber: aboutMe.riskLevel,
                riskToleranceLevel: aboutMe.riskLevel,
                simulateSegmentIndicator: fhcConfig.retirement.simulateSegmentIndicator,
                skipRiskProfilingIndicator: fhcConfig.retirement.skipRiskProfilingIndicator,
                spendingRiskLevelNumber: aboutMe.riskLevel,
                stateBenefitAnnualIncomeAmount: 0,
                taxFreeCashIndicator: fhcConfig.retirement.taxFreeCashIndicator,
                viewType: fhcConfig.retirement.viewType,
                retirementExpenseDetail: {
                    lastSalaryAmount: 0,
                    lastSalaryCurrencyCode: fhcConfig.currencyCodeForInputField,
                    lastSalaryPercentage: 0,
                    retirementExpenseSource: fhcConfig.retirement.retirementExpenseSource
                },
                financialGoalArrangement: {
                    applyInflationIndicator: fhcConfig.retirement.applyInflationIndicator,
                    currencyCode: fhcConfig.currencyCodeForInputField,
                    spendingCountry: ""
                },
                fundingDetail: {
                    fundAlreadySetAmount: retirement.savingForRetireAmt,
                    fundAlreadySetCurrencyCode: fhcConfig.currencyCodeForInputField,
                    fundAmount: 0,
                    fundCurrencyCode: fhcConfig.currencyCodeForInputField,
                    fundMonthlyAmount: 0,
                    fundMonthlyCurrencyCode: fhcConfig.currencyCodeForInputField
                }
            }],
            projectionType: fhcConfig.retirement.projectionType
        }

        let calculateRetirementRequest = {
            messageId : params.messageId,
            request : request,
            calculationType: calculationType,
            jsonData: request
        }
              
        console.log("calculateRetirementRequest",calculateRetirementRequest);
        return calculateRetirementRequest;
    },

    /**
      * enquire customer Life 400 request,
      */
    retrieveLife400InsuranceDetailConvertRequest:(params)=>{
        console.log("retrieveLife400InsuranceDetailConvertRequest params",params);
        let sessionInfo=params.sessionInfo;
        console.log("sessionInfo",sessionInfo);
        let customerInfo = params.customerInfo;
        console.log("customerInfo",customerInfo);
        let customerId = sessionInfo.customerId;
        let docType = customerId.substring(0, 1);
        let docID = customerId.substring(1);

        let jsonData = { // this request is following WDS BE.
            "paginationRequest": [],
            "sortingCriterias": [],
            "aggregateXRaySegmentFilter": [],
            "functionIndicator": [],
            "holdingSegmentFilter": [],
            "orderStatusFilter": [],
            "portfolioAnalysisFilter": [],
            "segmentFilter": [],
            "watchlistFilter": [],
            "coreReserveArea": [{
                "coreReserveArea": "N"
            }],
            "clientInformation": [{
                "clientType": "P",
                "clientRole": "1L",
                "documentIdentityTypeCode": docType,
                "documentIdentityNumber": docID,
                "lastName": customerInfo.lastName,
                "givenName": customerInfo.givenName,
                "birthDate": customerInfo.birthDate,
                "genderCode": customerInfo.genderCode,
                "customerIdentificationNumber": docID,
                "topTierCustomerCode": "iii"
            }, {
                "clientType": "P",
                "clientRole": "OW",
                "documentIdentityTypeCode": docType,
                "documentIdentityNumber": docID,
                "lastName": customerInfo.lastName,
                "givenName": customerInfo.givenName,
                "birthDate": customerInfo.birthDate,
                "genderCode": customerInfo.genderCode,
                "customerIdentificationNumber": docID,
                "topTierCustomerCode": "iii"
            }],
            "requestCurrency": "HKD",
            "countryAccountCode": "HK",
            "groupMemberAccountCode": "HSBC",
            "productType": "LF"
        };
        jsonData={
            jsonData,
            messageId:params.messageId
        };
        console.log("retrieveLife400InsuranceDetailConvertRequest jsonData",jsonData);
        return jsonData;
    },

    retrieveLife400InsuranceDetailConvertResponse:(response)=>{
        let totalSumInsured = 0;
        let insurancePolicyDetails = response.insurancePolicyDetails;
        if (insurancePolicyDetails != null && insurancePolicyDetails.length > 0) {
	        for (let i = 0; i < insurancePolicyDetails.length; i++) {
                let insurancePolicyDetail = insurancePolicyDetails[i];
	            if("Y"==insurancePolicyDetail.policyOwnerMatchIndicator 
            			&& "Y"==insurancePolicyDetail.inScopePolicyIndicator){
		            if ("Y"==insurancePolicyDetail.lifeInsuredMatchIndicator 
		            		&& insurancePolicyDetail.insuranceCoverageDetails!=null && insurancePolicyDetail.insuranceCoverageDetails.length > 0) {
			            for (let j = 0; j < insurancePolicyDetail.insuranceCoverageDetails.length; j++) {
                            let insuranceCoverageDetail = insurancePolicyDetail.insuranceCoverageDetails[j];
			                if("Y"==insuranceCoverageDetail.inScopeTotalSumInsuredIndicator){
			                	if (insuranceCoverageDetail.coverageAmount != null) {
                                    totalSumInsured = totalSumInsured + insuranceCoverageDetail.coverageAmount;
			                	}
			                }
			            }
		            }	            	
	            }
	        }
        }
        return {totalSumInsured};
    },
    /**
      * retrieve planning your retirement request,
      */
    retrievePlanningYourRetirementConvertRequest:(params)=>{
        console.log("retrievePlanningYourRetirementConvertRequest params",params);
        let sessionInfo=sessionInfoService.getSessionInfo();
        console.log("sessionInfo",sessionInfo);

        let retrievePlanningYourRetirementConvertRequest = {
                    customerInfoDto: {
                    countryISOCode: sessionInfo.countryCode,
                    groupMemberCode: sessionInfo.groupMember,
                    sourceSystemRolePlayerCode: "CDM",
                    rolePlayerIdentificationNumber: 'IZ999999'
                },

                paginationRequest:{
                    startDetail: 1
                }
            };
        let request={
            request:retrievePlanningYourRetirementConvertRequest,
            messageId:params.messageId
        }
        console.log("retrievePlanningYourRetirementConvertRequest request",request);
        return request;
    },
    /**
      * retrieve planning your retirement response,
      */
    retrievePlanningYourRetirementConvertResponse:(response)=>{
        console.log("retrievePlanningYourRetirementConvertResponse response",response);
        
        return response;
    },
    /**
      * calculate planning your retirement request,
      */
    calculatePlanningYourRetirementConvertRequest:(params)=>{
        console.log("calculatePlanningYourRetirementConvertRequest params",params);
        let sessionInfo=sessionInfoService.getSessionInfo();
        console.log("sessionInfo",sessionInfo);

        let calculatePlanningYourRetirementConvertRequest = {
                    customerInfoDto: {
                    countryISOCode: sessionInfo.countryCode,
                    groupMemberCode: sessionInfo.groupMember,
                    sourceSystemRolePlayerCode: "CDM",
                    rolePlayerIdentificationNumber: 'IZ999999'
                },

                paginationRequest:{
                    startDetail: 1
                }
            };
        let request={
            request:calculatePlanningYourRetirementConvertRequest,
            messageId:params.messageId
        }
        console.log("calculatePlanningYourRetirementConvertRequest request",request);
        return request;
    },
    /**
      * calculate planning your retirement response,
      */
    calculatePlanningYourRetirementConvertResponse:(response)=>{
        console.log("calculatePlanningYourRetirementConvertResponse response",response);
        
        return response;
    },
    /**
      * record planning your retirement request,
      */
    recordPlanningYourRetirementConvertRequest:(params)=>{
        console.log("recordPlanningYourRetirementConvertRequest params",params);
        let sessionInfo=sessionInfoService.getSessionInfo();
        console.log("sessionInfo",sessionInfo);

        let recordPlanningYourRetirementConvertRequest = {
                    customerInfoDto: {
                    countryISOCode: sessionInfo.countryCode,
                    groupMemberCode: sessionInfo.groupMember,
                    sourceSystemRolePlayerCode: "CDM",
                    rolePlayerIdentificationNumber: 'IZ999999'
                },

                paginationRequest:{
                    startDetail: 1
                }
            };
        let request={
            request:recordPlanningYourRetirementConvertRequest,
            messageId:params.messageId
        }
        console.log("recordPlanningYourRetirementConvertRequest request",request);
        return request;
    },
    /**
      * record planning your retirement response,
      */
    recordPlanningYourRetirementConvertResponse:(response)=>{
        console.log("recordPlanningYourRetirementConvertResponse response",response);
        
        return response;
    },
    /**
      * calculate growing your wealth request,
      */
    calculateGrowingYourWealthConvertRequest:(params, calculationData)=>{
        console.log("calculateGrowingYourWealthConvertRequest params",params);
        //let sessionInfo=sessionInfoService.getSessionInfo();
        //console.log("sessionInfo",sessionInfo);

        //console.log("params ", params);
        console.log("calculationData ", calculationData);

        let sessionInfo = calculationData.sessionInfo;
        let fieldsDetail = calculationData.fieldsDetail;

        let calculateGrowingYourWealthConvertRequest = {
            sessionInfo: {
                businessLine: sessionInfo.lineOfBusinessCode,
                businessOpUnit: "",
                channelId: sessionInfo.channelId,
                consumerId: sessionInfo.consumerId,
                countryCode:  sessionInfo.countryISOCode,
                deviceId: "",
                employeeUserId: sessionInfo.staffId,
                groupMember: sessionInfo.groupMemberCode,
                userId: sessionInfo.staffId,
                hubUserId: "",
                hubWorkstationId: ""
            },
            customers: [
                {
                    countryISOCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    rolePlayerIdentificationNumber: sessionInfo.customerId,
                    sourceSystemRolePlayerCode: sessionInfo.sourceSystemRolePlayerCode
                }
            ],
            localeCode: {
                localeCode: sessionInfo.localeCode
            },
            projectionType: {
                projectionTypeCode: goalSimulatorConfig.growYourWealth.projectionType
            },
            
            wealthGrowthGoal: [{
                goalTypeCode: goalSimulatorConfig.growYourWealth.goalTypeCode,
                goalDescription: goalSimulatorConfig.growYourWealth.goalDescription,
                simulateSegmentIndicator: goalSimulatorConfig.growYourWealth.simulateSegmentIndicator,
                wealthManagementType: goalSimulatorConfig.growYourWealth.wealthManagementType,
                goalMonthCount: fieldsDetail.yearOfInvestment,
                goalMonthCountOriginal: null,
                goalIncomeMonthCount: null,
                periodicityGoalCode: goalSimulatorConfig.growYourWealth.periodicityGoalCode,
                goalTargetCurrencyCode: goalSimulatorConfig.currencyCodeForInputField,
                goalTargetAmount: fieldsDetail.targetAmount,
                goalMonthlyTargetCurrencyCode: null,
                goalMonthlyTargetAmount: null,
                goalNetTargetCurrencyCode: null,
                goalNetTargetAmount: null,
                goalNetMonthlyTargetCurrencyCode: null,
                goalNetMonthlyTargetAmount: null,
                returnRateTypeCode: goalSimulatorConfig.growYourWealth.returnRateTypeCode,
                returnRate: null,
                holdingCurrencyCode: null,
                holdingAmount: null,
                holdingCacheID: null,
                allocatedMonthlyContribution: null,
                riskToleranceLevel: 5,
                riskLevelNumber: 2,
                spendingRiskLevelNumber: null,
                calculatedRiskCapacityLevelNumber: 4,
                skipRiskProfilingIndicator: goalSimulatorConfig.growYourWealth.skipRiskProfilingIndicator,
                financialGoalArrangement: {
                    applyInflationIndicator: goalSimulatorConfig.growYourWealth.applyInflationIndicator,
                    currencyCode: goalSimulatorConfig.currencyCodeForInputField,
                    spendingCountry: "HK"
                },
                fundingDetail: {
                    fundAmount: fieldsDetail.lumpSumAmount,
                    fundCurrencyCode: goalSimulatorConfig.currencyCodeForInputField,
                    fundMonthlyAmount: fieldsDetail.monthlyInvestedAmount,
                    fundMonthlyCurrencyCode: goalSimulatorConfig.currencyCodeForInputField
                }
            }],
            requestDataType: goalSimulatorConfig.growYourWealth.requestDataType
        }

        let request={
            messageId: params.messageId,
            request: calculateGrowingYourWealthConvertRequest,
            jsonData: calculateGrowingYourWealthConvertRequest
        }

        console.log("calculateGrowingYourWealthConvertRequest request",request);
        return request;
    },
    /**
      * calculate growing your wealth response,
      */
    calculateGrowingYourWealthConvertResponse:(response)=>{
        console.log("calculateGrowingYourWealthConvertResponse response",response);
        
        return response;
    },

    /**
     * build request for save FHC.
     */
    saveFhcResultConvertRequest:(params,actionSource)=>{
        console.log("saveFhcResultConvertRequest params",params);
        let sessionInfo=params.sessionInfo;
        console.log("sessionInfo",sessionInfo);
        let formData = params.formData;
        let {result,aboutMe,education,retirement,protection,criticalIllness,growYourWealth} = formData;

        let beRequest = {
                customerInfoDto: {
                    countryISOCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    sourceSystemRolePlayerCode: sessionInfo.sourceSystemRolePlayerCode,
                    rolePlayerIdentificationNumber: sessionInfo.customerId
                },
                financialInfoDto:{
                    hasRentProperty:growYourWealth.hasRentProperty,
                    hasNoMortgageProperty:growYourWealth.hasNoMortgageProperty,
                    hasMortgageProperty:growYourWealth.hasMortgageProperty,
                    hasOverseaProperty:growYourWealth.hasOverseaProperty,
                    hasLegacyPlan:retirement.hasLegacyPlan,
                    hasLegacyPlanDesc:retirement.legacyPlanRemark,
                    hasShortTermInvest:growYourWealth.hasShortTermInvest,
                    rpqLevel:aboutMe.riskLevel,
                    staffName:sessionInfo.staffName,
                    staffId:sessionInfo.staffId,
                    monthlyIncs:[{
                        incomeTypeCode:'TOTAL_INC',
                        currencyincomeAmt:protection.monthlyIncsTotalInc,
                        currencyCode:fhcConfig.currencyCodeForInputField
                    }],
                    monthlyExps:[], // not exist in UI
                    totalAssetsDtos:[], // not exist in UI
                    toalLiabilities:[], // not exist in UI
                    familyCirCum:{
                        universityCountryCde:aboutMe.universityCountryCde,
                        yearOfChildrenDOB1:(aboutMe.hasChildUnder18&&aboutMe.childrenNo>=1&&undefined!=aboutMe.yearOfChildrenDOB1? String(aboutMe.yearOfChildrenDOB1):undefined),
                        yearOfChildrenDOB2:(aboutMe.hasChildUnder18&&aboutMe.childrenNo>=2&&undefined!=aboutMe.yearOfChildrenDOB2? String(aboutMe.yearOfChildrenDOB2):undefined),
                        yearOfChildrenDOB3:(aboutMe.hasChildUnder18&&aboutMe.childrenNo>=3&&undefined!=aboutMe.yearOfChildrenDOB3? String(aboutMe.yearOfChildrenDOB3):undefined),
                        yearOfChildrenDOB4:(aboutMe.hasChildUnder18&&aboutMe.childrenNo>=4&&undefined!=aboutMe.yearOfChildrenDOB4? String(aboutMe.yearOfChildrenDOB4):undefined),
                        yearOfChildrenDOB5:(aboutMe.hasChildUnder18&&aboutMe.childrenNo>=5&&undefined!=aboutMe.yearOfChildrenDOB5? String(aboutMe.yearOfChildrenDOB5):undefined)
                    },
                    "existingCoverage": {
                        "hasInpCoverage": criticalIllness.hasInpCoverage,
                        "hasOutptCoverage": criticalIllness.hasOutptCoverage,
                        "hasTravCoverage": criticalIllness.hasTravCoverage,
                        "illnessCoverAmt": criticalIllness.illnessCoverAmt,
                        "illnessCoverCurrCde": fhcConfig.currencyCodeForInputField,
                        "lifeInsCoverAmt": protection.lifeInsCoverAmt,                       
                        "lifeInsCoverCurrCde": fhcConfig.currencyCodeForInputField,
                        "lifeInsCmpnyBnftAmt": protection.lifeInsCmpnyBnftAmt,
                        "lifeInsCmpnyBnftCurrCde": fhcConfig.currencyCodeForInputField,
                        /** these 2 fields not found in javabean.
                         *  So, cannot add, else got 500 error with {"responseCode":999,"correlationId":"06e8abcb-befe-46c5-9c0f-ac16cc306452"}
                        "lifeInsCmpnyBnftAmt":protection.lifeInsCmpnyBnftAmt,
                        "lifeInsCmpnyBnftCurrCde":fhcConfig.currencyCodeForInputField, */
                        "retireAge": Number(retirement.targetRetireAge),
                        "savingForEduAmt": education.savingForEduAmt,
                        "savingForEduCurrCde": fhcConfig.currencyCodeForInputField,
                        "savingForRetireAmt": retirement.savingForRetireAmt,
                        "savingForRetireCurrCde": fhcConfig.currencyCodeForInputField
                    },
                    custRpqLevel:aboutMe.maxRiskLevel, // aboutMe.maxRiskLevel, hardcode for test first.
                    // crmsCustInsPolicyType not exist in UI
                    // crmsRecordDate not exist in UI
                    // fhcAdditionalInfo:[] // not exist in UI. but need to set below value in order to save suc.
                    "fhcAdditionalInfo": [{
                        "fhcAdditionalCatetoryCode": null,
                        "fhcAdditionalTypeCode": "FHC_LIAB_OTHLOAN_COMT",
                        "fhcAdditionalTextSize": 20,
                        "fhcAdditionalText": "dGVzdGluZyB0ZXN0aW5n"
                    }]
                },
                "goalPlanningDto": {
                    "criticalIllness": {
                        "supportAmt": criticalIllness.supportAmt,
                        "supportCurrCde": fhcConfig.currencyCodeForInputField,
                        "yearToSupport": Number(criticalIllness.yearToSupport)
                    },
                    "educationPlan": {
                        "annualExpAmt": education.annualExp,
                        "annualExpCurrCde": fhcConfig.currencyCodeForInputField,
                        "yearInSchool": Number(education.yearInSchool),
                        "yearTillEnterSchool": Number(education.yearTillEnterSchool)
                    },
                    "protectionPlan": {
                        "savingAndInvesAmt": protection.savingAndInvesAmt,
                        "savingAndInvesCurrCde": fhcConfig.currencyCodeForInputField,
                        "supportAmt": protection.supportAmt,
                        "supportCurrCde": fhcConfig.currencyCodeForInputField,
                        "totalLiaOutsAmt": protection.totalLiaOutsAmt,
                        "totalLiaOutsCurrCde": fhcConfig.currencyCodeForInputField,
                        "yearToSupport": Number(protection.yearToSupport)
                    },
                    "retirementPlan": {
                        "monthlyExpAmt": retirement.monthlyExpAmt,
                        "monthlyExpCurrCde": fhcConfig.currencyCodeForInputField,
                        "postRetireYear": Number(retirement.postRetireYear),
                        "targeRetireAge": Number(retirement.targetRetireAge)
                    }
                },
                "calculationDto": {
                    "calculationResults": [{
                        "achievedAmt": result.lifeCoverageAchievedAmt,
                        "calculationTypeCode": "CAL_LIFE_COVERAGE",
                        "currencyCode": fhcConfig.currencyCodeForInputField,
                        "priority": (undefined!=result.lifeCoveragePriority? String(result.lifeCoveragePriority):undefined),
                        "referenceAmt": result.lifeCoverageTargetAmt,
                    }, {
                        "achievedAmt": result.criticalIllnessAchievedAmt,
                        "calculationTypeCode": "CAL_CRITICAL_ILL",
                        "currencyCode": fhcConfig.currencyCodeForInputField,
                        "priority": (undefined!=result.criticalIllnessPriority? String(result.criticalIllnessPriority):undefined),
                        "referenceAmt": result.criticalIllnessTargetAmt,
                    }, {
                        "achievedAmt": result.retirementAchievedAmt,
                        "calculationTypeCode": "CAL_RETIREMENT",
                        "currencyCode": fhcConfig.currencyCodeForInputField,
                        "priority": (undefined!=result.retirementPriority? String(result.retirementPriority):undefined),
                        "referenceAmt": result.retirementTargetAmt,
                    }, {
                        "achievedAmt": result.educationAchievedAmt,
                        "calculationTypeCode": "CAL_EDUCATION",
                        "currencyCode": fhcConfig.currencyCodeForInputField,
                        "priority": (undefined!=result.educationPriority? String(result.educationPriority):undefined),
                        "referenceAmt": result.educationTargetAmt,
                    }, {
                        "achievedAmt": 0,
                        "calculationTypeCode": "CAL_GENERAL",
                        "currencyCode": "",
                        "priority": (undefined!=result.healthPriority? String(result.healthPriority):undefined),
                        "referenceAmt": 0
                    }, {
                        "achievedAmt": 0,
                        "calculationTypeCode": "CAL_LEGACY",
                        "currencyCode": "",
                        "priority": (undefined!=result.legacyPriority? String(result.legacyPriority):undefined),
                        "referenceAmt": 0
                    }, {
                        "achievedAmt": 0,
                        "calculationTypeCode": "CAL_PROPERTY",
                        "currencyCode": "",
                        "priority": (undefined!=result.propertyPriority? String(result.propertyPriority):undefined),
                        "referenceAmt": 0
                    }, {
                        "achievedAmt": 0,
                        "calculationTypeCode": "CAL_SHORT_TERM_GO",
                        "currencyCode": "",
                        "priority": (undefined!=result.growYourWealthPriority? String(result.growYourWealthPriority):undefined),
                        "referenceAmt": 0
                    }],
                    "comments": result.comments,
                    "shortTermInvestDetail": growYourWealth.shortTermInvestDetail
                },
                addtionalInfoDto: {
                    actionSource:actionSource
                },
                sessionInfo: {
                    countryCode: sessionInfo.countryISOCode,
                    groupMember: sessionInfo.groupMemberCode,
                    channelId: sessionInfo.channelId,
                    businessOpUnit: "001",
                    businessLine: sessionInfo.lineOfBusinessCode,
                    userId: sessionInfo.customerId,
                    employeeUserId: sessionInfo.staffId
                }

            };

        let request={
            request:beRequest,
            messageId:params.messageId
        }
        console.log("saveFhcResultConvertRequest request",request);
        return request;
    },
    /**
      * calculate Risk capacity converter
      */
   calculateRiskConvertRequest:(params)=>{
        console.log("calculate risk capacity ", params);

        let sessionInfo = (params.sessionInfo) ? params.sessionInfo : sessionInfoService.getSessionInfo();
        let goalType = params.goalType;
        let needTypeCode = "";
        let goalTypeCode = "";
        let criteria = [];
        switch (goalType) {
            case "growYourWealth" :
                needTypeCode = "GRO_WEAL";
                goalTypeCode = "GROW_WLTH";
                criteria = [{timeHorizonCalculationFactor : "GLTIMEHO", timeHorizonCalculationValue : params.yearOfInvestment}];
                break;
            case "retirement" :
                needTypeCode = "PLAN_RET";
                goalTypeCode = "RTIRE";
                criteria = [{timeHorizonCalculationFactor : "RETAGE", timeHorizonCalculationValue : 0},
                            {timeHorizonCalculationFactor : "CURAGE", timeHorizonCalculationValue : 0}];
                break;
            case "education" :
                needTypeCode = "CHLD_FUT";
                goalTypeCode = "EDUC";
                criteria = [{timeHorizonCalculationFactor : "GLTIMEHO", timeHorizonCalculationValue : params.yearOfInvestment}];
                break;
            default : 
                break;
        }
        let request = 
        {
            sessionInfo: {
                businessLine: sessionInfo.lineOfBusinessCode,
                businessOpUnit: "",
                channelId: sessionInfo.channelId,
                consumerId: sessionInfo.consumerId,
                countryCode:  sessionInfo.countryISOCode,
                deviceId: "",
                employeeUserId: sessionInfo.staffId,
                groupMember: sessionInfo.groupMemberCode,
                userId: sessionInfo.staffId,
                hubUserId: "",
                hubWorkstationId: ""
            },
            calculateRiskCapacity: {
                needTypeCode : needTypeCode,
                goalTypeCode : goalTypeCode,
                calculateRiskCapacityCriteria : {
                    riskCustomerToleranceLevelNumber : params.riskLevel
                },
                calculateTimeHorizonCriteria : criteria
            }
        }        
        let calculateRiskConvertRequest = {
            messageId : params.messageId,
            request:request
        }
        console.log("calculateRiskConvertRequest",calculateRiskConvertRequest);
        return calculateRiskConvertRequest;
    },
    /**
     * populate save FHC response.
     */
    saveFhcResultConvertResponse:(response)=>{
        console.log("saveFhcResultConvertResponse response",response);
        return response;
    },



    /**
     * retrieveOrderShoppingCartConvertRequest
     */
    retrieveOrderShoppingCartConvertRequest:(params)=>{
        let jsonData = {
            "financialPlanningReportId":[{
                "arrangementIdentifierFinancialPlanning":170128,
                "reportSequenceNumber":59801
            }],
            "customer":[{
                "countryISOCode":"HK",
                "groupMemberCode":"HBAP",
                "sourceSystemRolePlayerCode":"CDM",
                "rolePlayerIdentificationNumber":"IF200106",
                "customerAttribute":[{
                    "attributeKey":"",
                    "attributeValue":""
                }]
            }],
            "filterCriteria":[{
                "filterKey":"ACTION_CODE",
                "filterValue":"RPT"
            }],
            "localeCode":{
                "localeCode":"en_US"
            }
        };
        jsonData = {
            request:jsonData,
            messageId:params.messageId
        };
        return jsonData;
    },

    /**
     * retrieveOrderShoppingCartConvertResponse
     */
    retrieveOrderShoppingCartConvertResponse:(response)=>{
        let orderList = response.archiveReportAckInfo[0];
        let buyOrderList = orderList.buyOrderList;
        let insuranceOrderList = orderList.insuranceOrderList;
        let rebalanceOrderList = orderList.rebalanceOrderList;
        let regularSavingOrderList = orderList.regularSavingOrderList;
        let sellOrderList = orderList.sellOrderList;
        let orderPlacementList = [];
        let utConsolidateSet;
        let utProdList = [];
        let otherInvProdList = [];
        let insProdList = [];
        let utLump;
        let utRegularBuy;
        let otherLump;
        let otherRegular;
        let goalSequenceNumberSet;

        let consolidateList = [];

        for(var product of buyOrderList) {
            consolidateList.push(product);
        }
        for(var product of regularSavingOrderList) {
            consolidateList.push(product);
        }
        for(var product of insuranceOrderList) {
            consolidateList.push(product);
        }
        //console.log("consolidateList...",consolidateList);
        let utSumProdList = [];
        let utRegularProdList =[];
        let prod;
        for(var product of consolidateList) {
            for(var attribute of product.attributeList) {
                if(attribute.attributeName=='productType'&&attribute.attributeValue=='UT'&&
                    product.buyLumSumAmount!= undefined) {
                    prod = {};
                    prod.product = product;
                    prod.lumpsum = product.buyLumSumAmount;
                    for(var productId of product.productId) {
                        if (productId.productCodeAlternativeClassificationCode == 'M') {
                            prod.prodCode = productId.productAlternativeNumber;
                        }
                    }
                    for(var attribute of product.attributeList) {
                        if (attribute.attributeName == 'riskLevel') {
                            prod.riskLevel = attribute.attributeValue;
                        }
                    }
                    utSumProdList.push(prod);
                }
                if(attribute.attributeName=='productType'&&attribute.attributeValue=='UT'&&
                    product.monthlySavingAmount!= undefined) {
                    prod = {};
                    prod.product = product;
                    prod.monthlySaving = product.monthlySavingAmount;
                    for(var productId of product.productId) {
                        if (productId.productCodeAlternativeClassificationCode == 'M') {
                            prod.prodCode = productId.productAlternativeNumber;
                        }
                    }
                    for(var attribute of product.attributeList) {
                        if (attribute.attributeName == 'riskLevel') {
                            prod.riskLevel = attribute.attributeValue;
                        }
                    }
                    utRegularProdList.push(prod);
                }
                if (attribute.attributeName=='productType'&&attribute.attributeValue=='BOND') {
                    prod = {};
                    prod.product = product;
                    prod.lumpsum = product.buyLumSumAmount;
                    for(var productId of product.productId) {
                        if (productId.productCodeAlternativeClassificationCode == 'M') {
                            prod.prodCode = productId.productAlternativeNumber;
                        }
                    }
                    for(var attribute of product.attributeList) {
                        if (attribute.attributeName == 'riskLevel') {
                            prod.riskLevel = attribute.attributeValue;
                        }
                    }
                    otherInvProdList.push(prod);
                }
                if (attribute.attributeName=='productType'&&attribute.attributeValue=='INS') {
                    prod = {};
                    prod.product = product;
                    prod.coverageInsuranceAmount = product.coverageInsuranceAmount;
                    prod.premiumInsuranceAmount = product.premiumInsuranceAmount;
                    for(var productId of product.productId) {
                        if (productId.productCodeAlternativeClassificationCode == 'M') {
                            prod.prodCode = productId.productAlternativeNumber;
                        }
                    }
                    for(var attribute of product.attributeList) {
                        if (attribute.attributeName == 'riskLevel') {
                            prod.riskLevel = attribute.attributeValue;
                        }
                    }
                    insProdList.push(prod);
                }
            }
        }

        orderPlacementList = {
             'utSumProdList':utSumProdList,
             'utRegularProdList':utRegularProdList,
             'otherInvProdList':otherInvProdList,
             'insProdList':insProdList
        }
        //console.log("orderPlacementList object",orderPlacementList);
        return orderPlacementList;
    },
        retrieveAssetConcentrationCalculationGetHoldingConvertRequest:(params) =>{
        console.log("-----retrieveAssetConcentrationCalculationGetHoldingConvertRequest----start---");
       let request = {
        };
        //let sessionInfo=params.sessionInfo;
       request={
            staffId: "29000101",
            customerNumber: "Q8360330"
        };

        let assetRequest={
            filterCriteria:request,
            messageId:params.messageId
        }
        console.log("-----retrieveAssetConcentrationCalculationGetHoldingConvertRequest----excute---",assetRequest);
        return assetRequest;
    },

   retrieveAssetConcentrationCalculationGetHoldingConvertResponse:(response)=>{
        let singleAssetsResult=[];
        if(response.productCategoryInformations!=undefined && response.productCategoryInformations.length > 0) {
            let productCategoryInformations = response.productCategoryInformations;
            
            if(productCategoryInformations!=undefined && productCategoryInformations.length>0){
                for(var i=0; i<productCategoryInformations.length; i++ ){
                    let category = productCategoryInformations[i].productCategory;
                    console.log("retrieveAssetConcentrationCalculationGetHoldingConvertResponse----category------",category);
                    
                    let productCategoryMultipleCurrencyInformation = [];
                    productCategoryMultipleCurrencyInformation = productCategoryInformations[i].productCategoryMultipleCurrencyInformation;
                    
                    let singleAssetsMixMap={};
                    if(productCategoryMultipleCurrencyInformation!=undefined && productCategoryMultipleCurrencyInformation.length>0){
                        for(var j=0; j<productCategoryMultipleCurrencyInformation.length; j++){
                            
                            let productCategoryMultipleCurrencyInfor = productCategoryMultipleCurrencyInformation[j];
                            
                            let  currencyTypeCode = productCategoryMultipleCurrencyInfor.currencyTypeCode;
                            let  currencyProductHoldingMarketValueAmountCode = productCategoryMultipleCurrencyInfor.currencyProductHoldingMarketValueAmountCode;
                            let  productHoldingMarketValueAmount= productCategoryMultipleCurrencyInfor.productHoldingMarketValueAmount;
                           
                            console.log(currencyTypeCode,currencyProductHoldingMarketValueAmountCode,productHoldingMarketValueAmount);
                            singleAssetsMixMap={
                                category:category,
                                currencyCode: currencyTypeCode,
                                currencyAmountCode:currencyProductHoldingMarketValueAmountCode,
                                productAmount:productHoldingMarketValueAmount
                            }
                            singleAssetsResult.push(singleAssetsMixMap);
                        }
                    }
                }
            }
	    }
        return singleAssetsResult;
    },
     retrieveFinancialSituationReferenceRecordServiceAssetsConvertRequest:(params) =>{
        console.log("-----retrieveFinancialSituationReferenceRecordServiceAssetsConvertRequest----start---");
       let request = {
        };
        //let sessionInfo=params.sessionInfo;
       request={
            staffId: "29000101",
            customerNumber: "Q8360330"
        };

        let assetRequest={
            filterCriteria:request,
            messageId:params.messageId
        }
        console.log("-----retrieveFinancialSituationReferenceRecordServiceAssetsConvertRequest----excute---",assetRequest);
        return assetRequest;
    },

     retrieveFinancialSituationReferenceRecordServiceAssetsConvertResponse:(response) =>{
        
        return response;
    },
    fpsDownloadControlDataConvertRequest: (params) => {
        const {sessionInfo, controlDataType, birthDate, provinceCode} = params
        let controlDataList, controlDataParams
        switch (controlDataType) {
            case "P": 
                controlDataList = ["SYS_PARM", "TAX_MODULE", "ACCT_TYPE_MAPPING"]
                controlDataParams = [
                    {key: "PROVINCE_CODE", value: provinceCode},
                    {key: "COUNTRY_CODE", value: sessionInfo.countryCode},
                    {key: "CUSTOMER_BIRTH_YEAR", value: new Date(birthDate).getUTCFullYear()}
                ]
                break;
            case "S":
            default: 
                controlDataList = ["SYS_PARM", "ACCT_TYPE_MAPPING"]
                break;
        }

        return {
            messageId: 'fpsDownloadControlData',
            sessionInfo: sessionInfo,
            request: {
                localeCode: [{localeCode: sessionInfo.localeCode}],
                controlDataList,
                controlDataParams
            }
        }
    },
    fpsDownloadControlDataConvertResponse: (response) => {
        const {fpsControlData} = response
        const {taxModuleControlData: taxModuleControlDataJsonStr, 
            systemParameter: systemParameterJsonStr, 
            accountTypeMapping: accountTypeMappingJsonStr, 
            accountFormat: accountFormatJsonStr
        } = fpsControlData
        let taxIntegration=null, systemParameterMap={}, accountTypeMapping=[], accountFormat={}

        if (taxModuleControlDataJsonStr) {
            taxIntegration = JSON.parse(taxModuleControlDataJsonStr)
        }

        if (systemParameterJsonStr) {
            const systemParameters = JSON.parse(systemParameterJsonStr)
            systemParameters.forEach((systemParameter)=>{
                systemParameterMap[systemParameter.id.parameterIdentificationNumber] = systemParameter.parameterValueText
            })
        }

        if (accountTypeMappingJsonStr) {
            accountTypeMapping = JSON.parse(accountTypeMappingJsonStr)
        }

        if (accountFormatJsonStr) {
            accountFormat = JSON.parse(accountFormatJsonStr)
        }

        return {taxIntegration, systemParameterMap, accountTypeMapping, accountFormat}
    }

}
export default fpsConverter;