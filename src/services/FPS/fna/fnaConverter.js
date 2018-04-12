
import sessionInfoService from '../../sessionInfoService'
import ObjectHelper from '../../../common/lib/ObjectHelper';
import fnaUtil from './fnaUtil';
import {commonConfig} from '../../config/fna/commonConfig';
import {pvcHandleUtil} from '../../commonService/pvcHandleUtil';
let pvcConfig=commonConfig.pvcConfig;
let bizConfig=commonConfig.bizConfig;
let FNAConstants=commonConfig.FNAConstants;
let financialProfiles=commonConfig.financialProfiles
const fnaConverter={
       /** 
      * fna landing 
     */
    retrieveFinancialSituationDataConvertRequest:(params) =>{
       let request = {
        };
        let sessionInfo=params.sessionInfo;
		console.log("sessionInfo in FNA page",sessionInfo);
        request={
                customers: [{
                    countryISOCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    sourceSystemRolePlayerCode: sessionInfo.sourceSystemRolePlayerCode,
                    rolePlayerIdentificationNumber: sessionInfo.customerId
                }]
        };
        request.requestInvestorIndicator=fnaUtil._buildRequestInvestorIndicator(params);
        request.requestComment=fnaUtil._buildRequestComment(params);
        request={
            request,
            messageId:params.messageId
        }
        return request;
    },
	retrieveFinancialSituationReferenceRecordAssetsRequest:(params) =>{
        let jsonData = {
        };
		console.log("retrieveFinancialSituationReferenceRecordAssetsRequest",params);
        let sessionInfo= params.sessionInfo;
        console.log("assest sessionInfo",sessionInfo);
        jsonData={
                customers: [{
                    countryCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    sourceSystemCode: "OBS",
                    customerId: sessionInfo.customerId
                }],
				serviceContext: {
					countryCode: sessionInfo.countryISOCode,
                    groupMember: sessionInfo.groupMemberCode,
					channelId: sessionInfo.channelId,
					businessLine: "PFS",
					userId: sessionInfo.staffId,
					consumerId: "SFP",
					hubUserId: "WD01",
					hubWorkstationId:"WD01",
					localeCode: sessionInfo.localeCode
				}
        };
        jsonData.fieldKeys=fnaUtil._buildRequestfieldKeys(params);
        
        jsonData={
            jsonData,
            messageId:params.messageId
        }
        console.log("fna Coverter asset jsonData",jsonData);
        return jsonData;
    },
	retrieveFinancialSituationReferenceRecordIncomeRequest:(params) =>{
        let jsonData = {
        };
        let sessionInfo= params.sessionInfo;
        //console.log("Income sessionInfo",sessionInfo);
        jsonData={
               customers: [{
                    countryCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    sourceSystemCode: "OBS",
                    customerId: sessionInfo.customerId
                }],
				serviceContext: {
					countryCode: sessionInfo.countryISOCode,
                    groupMember: sessionInfo.groupMemberCode,
					channelId: sessionInfo.channelId,
					businessLine: "PFS",
					userId: sessionInfo.staffId,
					consumerId: "SFP",
					hubUserId: "WD01",
					hubWorkstationId:"WD01",
					localeCode: sessionInfo.localeCode
				}
			

        };
        jsonData.fieldKeys=fnaUtil._buildRequestfieldKeys(params);
        
        jsonData={
            jsonData,
            messageId:params.messageId
        }
        //console.log("fna Coverter income jsonData",jsonData);
        return jsonData;
    },
	retrieveFinancialSituationReferenceRecordExpensesRequest:(params) =>{
        let jsonData = {
        };
        let sessionInfo= params.sessionInfo;
        console.log("Expenses sessionInfo",sessionInfo);
        jsonData={
                customers: [{
                    countryCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    sourceSystemCode: "OBS",
                    customerId: sessionInfo.customerId
                }],
				serviceContext: {
					countryCode: sessionInfo.countryISOCode,
                    groupMember: sessionInfo.groupMemberCode,
					channelId: sessionInfo.channelId,
					businessLine: "PFS",
					userId: sessionInfo.staffId,
					consumerId: "SFP",
					hubUserId: "WD01",
					hubWorkstationId:"WD01",
					localeCode: sessionInfo.localeCode
				}
			

        };
        jsonData.fieldKeys=fnaUtil._buildRequestfieldKeys(params);
        
        jsonData={
            jsonData,
            messageId:params.messageId
        }
        console.log("fna Coverter expenses jsonData",jsonData);
        return jsonData;
    },
	retrieveFinancialSituationReferenceRecordLiabilitiesRequest:(params) =>{
        let jsonData = {
        };
        let sessionInfo= params.sessionInfo;
        console.log("Liabilitie sessionInfo",sessionInfo);
        jsonData={
               customers: [{
                    countryCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    sourceSystemCode: "OBS",
                    customerId: sessionInfo.customerId
                }],
				serviceContext: {
					countryCode: sessionInfo.countryISOCode,
                    groupMember: sessionInfo.groupMemberCode,
					channelId: sessionInfo.channelId,
					businessLine: "PFS",
					userId: sessionInfo.staffId,
					consumerId: "SFP",
					hubUserId: "WD01",
					hubWorkstationId:"WD01",
					localeCode: sessionInfo.localeCode
				}
			

        };
        jsonData.fieldKeys=fnaUtil._buildRequestfieldKeys(params);
        
        jsonData={
            jsonData,
            messageId:params.messageId
        }
        console.log("fna Coverter Liabilities jsonData",jsonData);
        return jsonData;
    },
    retrieveFinancialSituationDataConvertResponse:(response) =>{
		console.log("retrieveFinancialSituationDataConvertResponse",response);
        let sessionInfo=sessionInfoService.getSessionInfo();
        var fnaDataModelList=[];
        if(response && ObjectHelper.isNullOrEmpty(response.errorCode)){
					for(var j = 0; j <= response.financialSituationData.length - 1; j++){
								var fnaDataModel =financialProfiles;
								var financialSituationVar = {
									baseCurrenyCode: null,
									income:{
										total: {currencyCode: null, amount: 0},
										detailList: []
									},
									moreIncomeDetail:{
										incomeSourceWithinFamily: null,
										dividendIncomeFrequency: null,
										rentalIncomeFrequency: null,
										otherIncomeFrequency: null,
										sourceOfOtherIncome: null
										
									},
									expense:{
										totalLivingExpense: {currencyCode: null, amount: 0},
										total: {currencyCode: null, amount: 0},
										detailList: []
									},
									assets:{
										totalLiquidAssets: {currencyCode: null, amount: 0},
										total: {currencyCode: null, amount: 0},
				
										detailList: []
									},
									liability: {
										total: {currencyCode: null, amount: 0},
										detailList: []
									},
									investment: {
										total: {currencyCode: null, amount: 0},
										detailList: [],
										remarkList: []
									},
									additionalSituation:{},
									dependentNo: null,
									dependentDetails: [],
									dependentNoFromHUB: null,
									dependentDetailsFromHUB: [],
									incomePayTaxRate: null,
									surplus:  {currencyCode: null, amount: 0},
							        netWorth:  {currencyCode: null, amount: 0},
									mfdNetWorth:  {currencyCode: null, amount: 0},
							        savingCapacity:  {currencyCode: null, amount: 0}
								};
                                fnaDataModel.financialSituation = financialSituationVar;
                                var tempFinancialSituationComment=response.financialSituationData[j].comment;
								if (tempFinancialSituationComment) {
									fnaDataModel.softFacts = fnaUtil.populateSoftfact(tempFinancialSituationComment);
                                    fnaDataModel.moreCustomerInfo = fnaUtil.populateMoreCustomerInfo(tempFinancialSituationComment);
                                    if(bizConfig.displayKYC){
										fnaDataModel.KYCQuestions =fnaUtil.populateKYCComment(tempFinancialSituationComment,fnaDataModel);
	                               	}
									 if(bizConfig.displayMIAE){
										// MIAEQuestions MIAEQuestionsSelected
										fnaDataModel.MIAEOption =fnaUtil.populateMIAEComment(tempFinancialSituationComment,fnaDataModel);
										if(!ObjectHelper.isNullOrEmpty(fnaDataModel.MIAEOption.selected.commentKey)){
											fnaDataModel.MIAESelected=fnaDataModel.MIAEOption.selected
										}
	                               	}   
								}
								var baseCurrenyCode = null;
                                var tempFinancialSituationDetail=response.financialSituationData[j].financialSituationDetail;
								if (tempFinancialSituationDetail !== null && tempFinancialSituationDetail.length > 0) {
									if (tempFinancialSituationDetail[0].income) {
										fnaDataModel.financialSituation.income = fnaUtil.populateFinancialSituationDetail(tempFinancialSituationDetail[0].income, 'incomes' , sessionInfo);
                                    }else{
										fnaDataModel.financialSituation.income = {};
									}

									if (tempFinancialSituationDetail[0].expense) {
										fnaDataModel.financialSituation.expense = fnaUtil.populateFinancialSituationDetail(tempFinancialSituationDetail[0].expense, 'expenses' , sessionInfo);
						                fnaDataModel.financialSituation.expense.totalLivingExpense = fnaUtil.calculateTotalLivingExpensePrefill(fnaDataModel.financialSituation, []);
									}else{
										fnaDataModel.financialSituation.expense = {};
									}
                                    if (tempFinancialSituationDetail[0].assets) {
										fnaDataModel.financialSituation.assets = fnaUtil.populateFinancialSituationDetail(tempFinancialSituationDetail[0].assets, 'assets' , sessionInfo);
										fnaDataModel.financialSituation.assets.totalLiquidAssets = fnaUtil.calculateTotaLiquidassetsPrefill(fnaDataModel.financialSituation, []);
									}else{
										fnaDataModel.financialSituation.assets = {};
									}
									if (tempFinancialSituationDetail[0].liability) {
										fnaDataModel.financialSituation.liability = fnaUtil.populateFinancialSituationDetail(tempFinancialSituationDetail[0].liability, 'liabilities' , sessionInfo);
										if (tempFinancialSituationComment && bizConfig.displayKYC) {
											fnaUtil.populateMFDComment(tempFinancialSituationComment,fnaDataModel);
										}
									}else{
										fnaDataModel.financialSituation.liability = {};
									}
									if (tempFinancialSituationDetail[0].investment) {
										fnaDataModel.financialSituation.investment = fnaUtil.populateFinancialSituationDetail(tempFinancialSituationDetail[0].investment, 'investments' , sessionInfo);
	
										fnaDataModel.financialSituation.investment.remarkList = fnaUtil.populateFinancialSituationDetailRemarkList(tempFinancialSituationComment, 'investments' , sessionInfo);
									}else{
										fnaDataModel.financialSituation.investment = {};
									}
                                    if (tempFinancialSituationDetail[0].additionalSituation) {
			            	    		//populate Premiums of life insurance policy to be paid by liquid assets(HSBC or Other)
			            	    		fnaDataModel.financialSituation.additionalSituation = fnaUtil.populateLifeInsurancePremiumByAssets(tempFinancialSituationDetail[0].additionalSituation, "INSUR");
	            	    			}else{
										fnaDataModel.financialSituation.additionalSituation = {};
									}       
                                    if(baseCurrenyCode == null){
										baseCurrenyCode = fnaUtil.getTotalCurrency(fnaDataModel.financialSituation.income);
									}
									if(baseCurrenyCode == null){
										baseCurrenyCode = fnaUtil.getTotalCurrency(fnaDataModel.financialSituation.expense);
									}
									if(baseCurrenyCode == null){
										baseCurrenyCode = fnaUtil.getTotalCurrency(fnaDataModel.financialSituation.assets);
									}
									if(baseCurrenyCode == null){
										baseCurrenyCode = fnaUtil.getTotalCurrency(fnaDataModel.financialSituation.liability);
									}
									if(baseCurrenyCode == null){
										baseCurrenyCode = fnaUtil.getTotalCurrency(fnaDataModel.financialSituation.investment);
									}
									//AMH handle baseCurrencyCode
									if(baseCurrenyCode == null){
										baseCurrenyCode = fnaDataModel.financialSituation.baseCurrenyCode || currencyConfig.defaultCurrency;
									}
									fnaDataModel.financialSituation.baseCurrenyCode = baseCurrenyCode;
	

                                    if(bizConfig.currencyCodeAndDataControl){//AMH add data
	                                	if(bizConfig.currencyCodeAndDataControl){//AMH add data
			                                //populate monthly income
				            	    		fnaDataModel.financialSituation.monthlyIncome = fnaUtil.populateMonthlyIncome(tempFinancialSituationDetail[0].income, 'DEC_TOTAL_INC');
				            	    		//populate monthly expense
				            	    		fnaDataModel.financialSituation.monthlyExpense = fnaUtil.populateMonthlyExpense(tempFinancialSituationDetail[0].expense, 'DEC_TOTAL_EXP');
	                                	}
	                                }
									fnaUtil.initFinancialSituationDetailTotal(fnaDataModel , response.financialSituationData[j].comment);
                            }
                            //dependant
								fnaDataModel.financialSituation.dependentDetails = [];
								var tempFinancialSituationDependant=response.financialSituationData[j].dependant;
								if(response && tempFinancialSituationDependant && tempFinancialSituationDependant.length > 0){
									for(i in tempFinancialSituationDependant){
										var dependant = tempFinancialSituationDependant[i];
										fnaDataModel.financialSituation.dependentDetails.push(dependant);
									}
									fnaDataModel.financialSituation.dependentNo = tempFinancialSituationDependant.length;
								}
								
								if(bizConfig.currencyCodeAndDataControl){//AMH add data
									//AMH dependantNumber
									var tempFinancialSituationDependantNumber=response.financialSituationData[j].financialSituationDetail[0].numberOfDependents;
									if(fnaDataModel.financialSituation.dependentNo ==null){
										fnaDataModel.financialSituation.dependentNo = tempFinancialSituationDependantNumber;
									}
								}
	
								if(bizConfig.dependentNumberForAoc){
									var tempFinancialSituationDependantNumber=response.financialSituationData[j].financialSituationDetail[0].numberOfDependents;
									if(tempFinancialSituationDependantNumber){
										fnaDataModel.financialSituation.dependentNo = tempFinancialSituationDependantNumber;
									}
								}

                                //populate investorIndicator
								var tempFinancialSituationInvestorIndicator=response.financialSituationData[j].investorIndicator;
								if(response && tempFinancialSituationInvestorIndicator && tempFinancialSituationInvestorIndicator.length > 0){
									//AMH SIJ-populate investorIndicator
		            	    		fnaDataModel.financialSituation.investorIndicators = [];
		            	    		
									for (var i = tempFinancialSituationInvestorIndicator.length - 1; i >= 0; i--) {
										
										var investorIndicator = tempFinancialSituationInvestorIndicator[i];
										if (investorIndicator.indicatorKey && investorIndicator.indicatorKey === "EF"){
											fnaDataModel.emergencyFunds.emergeFundMode = investorIndicator.indicatorValue;
											fnaDataModel.financialSituation.investorIndicators.push(investorIndicator);
										}
	
										if (investorIndicator.indicatorKey && investorIndicator.indicatorKey === "MR"){
											fnaDataModel.matrimonialRegime = {};
											fnaDataModel.matrimonialRegime = investorIndicator.indicatorValue; // sprint 12
	
										}
										
										if (investorIndicator.indicatorKey && investorIndicator.indicatorKey === "PVC_EAI"){//AMH add
											fnaDataModel.regularIncomeTotalCurrentAsset = investorIndicator.indicatorValue;
											fnaDataModel.financialSituation.investorIndicators.push(investorIndicator);
	
										}
										
										if(investorIndicator.indicatorKey && investorIndicator.indicatorKey === "INV"){
				            	    		fnaDataModel.financialSituation.investorIndicators.push(investorIndicator);
										}
										
										if(investorIndicator.indicatorKey && investorIndicator.indicatorKey === "AIPI"){
				            	    		fnaDataModel.financialSituation.investorIndicators.push(investorIndicator);
										}
										if(investorIndicator.indicatorKey && investorIndicator.indicatorKey === "DCI"){
				            	    		fnaDataModel.financialSituation.investorIndicators.push(investorIndicator);
										}
									}
								}

                                //populate confirm reviewed date time
								if (response.financialSituationData[j].financialSituationDetail[0] && response.financialSituationData[j].financialSituationDetail[0].reviewDateTime) {
									fnaDataModel.reviewDateTime = response.financialSituationData[j].financialSituationDetail[0].reviewDateTime;
								}
	
								//populate marginal income tax rate
	            				if (response.financialSituationData[j].financialSituationDetail[0] && response.financialSituationData[j].financialSituationDetail[0].marginalIncomeTaxRate){
	            					fnaDataModel.financialSituation.marginalIncomeTaxRate = response.financialSituationData[j].financialSituationDetail[0].marginalIncomeTaxRate || "";
	            				}else{
	            					fnaDataModel.financialSituation.marginalIncomeTaxRate = 0;
	            				}	

                                //populate more income details
	            				fnaDataModel.financialSituation.moreIncomeDetail.incomeSourceWithinFamily = fnaUtil.populateMoreIncomeDetails(tempFinancialSituationComment, "INCOME_FAMLY");
	            				fnaDataModel.financialSituation.moreIncomeDetail.dividendIncomeFrequency = fnaUtil.populateMoreIncomeDetails(tempFinancialSituationComment, "INCOME_FREQDIV");
	            				fnaDataModel.financialSituation.moreIncomeDetail.rentalIncomeFrequency = fnaUtil.populateMoreIncomeDetails(tempFinancialSituationComment, "INCOME_FREQRENT");
	            				fnaDataModel.financialSituation.moreIncomeDetail.otherIncomeFrequency = fnaUtil.populateMoreIncomeDetails(tempFinancialSituationComment, "INCOME_FREQINC");
	            				fnaDataModel.financialSituation.moreIncomeDetail.sourceOfOtherIncome = fnaUtil.populateMoreIncomeDetails(tempFinancialSituationComment, "INCOME_OTINC");

                                if(bizConfig.currencyCodeAndDataControl){//AMH add data
	            					//populate acknowledge montyly income/expense reason
		            	    		fnaDataModel.financialSituation.acknowledgeReasonDetail = fnaUtil.populateAcknowledgeReasonDetails(tempFinancialSituationComment, "INC_EXP_JSTTFCTN");
		            	    		//populate life insurance premium type
		            	    		fnaDataModel.financialSituation.lifeInsurancePremiumType = fnaUtil.populateLifeInsurancePremiumType(tempFinancialSituationComment, "INSUR_PREM_PAID_TYPE");
	            				}
	            				
	            				// setup the id and country code/group member
								fnaDataModel.id = response.financialSituationData[j].rolePlayerIdentificationNumber;
								fnaDataModel.currencyCode = response.financialSituationData[j].currencyCode;
								fnaDataModel.countryISOCode = response.financialSituationData[j].countryISOCode;
								fnaDataModel.groupMemberCode = response.financialSituationData[j].groupMemberCode;
								
								// only for option C enable
								if (fnaDataModel.emergencyFunds.emergeFundMode == "C") {
									// setup the BE return/user input amount
							        if (response.financialSituationData[j].emergencyFund 
							        		&& response.financialSituationData[j].emergencyFund.length>0){
							        	if (response.financialSituationData[j].emergencyFund[0].emergencyFundAmount) {
							        		fnaDataModel.emergencyFunds.emergeFundDetail.userInputEmergencyFundAmount = response.financialSituationData[j].emergencyFund[0].emergencyFundAmount;
							        	}
							        }
								}
                                fnaDataModelList.push(fnaDataModel)
					}		 
        }else{
            fnaDataModelList=response;
        }    
        return fnaDataModelList;
    },


	retrieveFinancialSituationReferenceRecordAssetsConvertResponse:(assetResponse) =>{
        console.log("retrieveFinancialSituationReferenceRecordAssetsConvertResponse response = ", assetResponse);//JSON.stringify
        let assetInvestmentObj = {};
		let assetSavingObj = {};
		let assetDci = {};
		if(assetResponse.records.length>0){
			for(var i=0;i<assetResponse.records.length;i++){
				if(assetResponse.records[i].fieldKey=='HSBC_SAVING'){
					let currencyCode = assetResponse.records[i].recordCurrency;
					let amount=assetResponse.records[i].recordNumberValue;
					assetSavingObj = {ccyCode:currencyCode,amt:amount};
				}

				if(assetResponse.records[i].fieldKey=='HSBC_INVESTMENT'){
					let currencyCode = assetResponse.records[i].recordCurrency;
					let amount = assetResponse.records[i].recordNumberValue;
					assetInvestmentObj = {ccyCode:currencyCode,amt:amount};
				}

				if(assetResponse.records[i].fieldKey=='HSBC_DEPOSIT_CONSENT_INDICATOR'){
					let value = assetResponse.records[i].recordValue;
					assetDci = {val: value};
				}
			}
		}
        return {assetSavingObj,assetInvestmentObj,assetDci};
    },
	retrieveFinancialSituationReferenceRecordIncomeConvertResponse:(incomeResponse) =>{
        console.log("retrieveFinancialSituationReferenceRecordIncomeConvertResponse response = ", incomeResponse);//JSON.stringify
        let monthlyIncomeRecordObj = {};
		if(incomeResponse.records.length>0){
			for(var i=0;i<incomeResponse.records.length;i++){
				if(incomeResponse.records[i].fieldKey=='HSBC_MONTHLY_INCOME'){
					let currencyCode = incomeResponse.records[i].recordCurrency;
					let amount = incomeResponse.records[i].recordNumberValue;
					monthlyIncomeRecordObj = {ccyCode:currencyCode,amt:amount};
				}
			}
		}
        return monthlyIncomeRecordObj;
    },
	retrieveFinancialSituationReferenceRecordExpensesConvertResponse:(expensesResponse) =>{
        console.log("retrieveFinancialSituationReferenceRecordExpensesConvertResponse response = ", expensesResponse);//JSON.stringify
        let mortgageRentalPaymentRecordObj = {};
		let monthlyInsurancePremiumRecordObj = {};
		let lifeInsurancePremiumRecordObj = {};
		if(expensesResponse.records.length>0){
			for(var i=0;i<expensesResponse.records.length;i++){
				if(expensesResponse.records[i].fieldKey=='HSBC_MORTGAGE_RENTAL_PAYMENT'){
					let currencyCode = expensesResponse.records[i].recordCurrency;
					let amount = expensesResponse.records[i].recordNumberValue;
					mortgageRentalPaymentRecordObj = {ccyCode:currencyCode,amt:amount};
				}
				if(expensesResponse.records[i].fieldKey=='HSBC_MONTHLY_INSURANCE_PREMIUM'){
					let currencyCode = expensesResponse.records[i].recordCurrency;
					let amount = expensesResponse.records[i].recordNumberValue;
					monthlyInsurancePremiumRecordObj = {ccyCode:currencyCode,amt:amount};
				}
				if(expensesResponse.records[i].fieldKey=='HSBC_LIFE_INSURANCE_PREMIUM'){
					let currencyCode = expensesResponse.records[i].recordCurrency;
					let amount = expensesResponse.records[i].recordNumberValue;
					lifeInsurancePremiumRecordObj = {ccyCode:currencyCode,amt:amount};

				}
			}
		}
         
        return {mortgageRentalPaymentRecordObj,monthlyInsurancePremiumRecordObj,lifeInsurancePremiumRecordObj};
    },
	retrieveFinancialSituationReferenceRecordLiabilitiesResponse:(liabilitiesResponse) =>{
        console.log("retrieveFinancialSituationReferenceRecordLiabilitiesResponse response = ", liabilitiesResponse);//JSON.stringify
        let morgageLoansRecordObj = {};
        let otherPersonalLoansAndDebtsRecordObj = {};
		if(liabilitiesResponse.records.length>0){
			for(var i=0;i<liabilitiesResponse.records.length;i++){
				if(liabilitiesResponse.records[i].fieldKey=='HSBC_MORTGAGE_LOANS'){
					let currencyCode = liabilitiesResponse.records[i].recordCurrency;
					let amount = liabilitiesResponse.records[i].recordNumberValue;
					morgageLoansRecordObj = {ccyCode:currencyCode,amt:amount};
				}
				if(liabilitiesResponse.records[i].fieldKey=='HSBC_OTHER_PERSONAL_LOANS_AND_DEBTS'){
					let currencyCode = liabilitiesResponse.records[i].recordCurrency;
					let amount = liabilitiesResponse.records[i].recordNumberValue;
					otherPersonalLoansAndDebtsRecordObj = {ccyCode:currencyCode,amt:amount};
				}
			}
		}
        return {morgageLoansRecordObj,otherPersonalLoansAndDebtsRecordObj};
    },

    recordFinancialSituationDataConvertRequest:(params) =>{
        let sessionInfo=sessionInfoService.getSessionInfo();
        let fnaDataModelList={};
		let saveParam=params.request;
		fnaDataModelList=fnaUtil._buildfnaDataModelList(saveParam);
        let request = {
                customers: [{
                    countryISOCode: sessionInfo.countryCode,
                    groupMemberCode: sessionInfo.groupMember,
                    sourceSystemRolePlayerCode: "CDM",
                    rolePlayerIdentificationNumber: sessionInfo.custmerId
                }]
        };
        // if(isGoalJourney){
		// 		request.goalKey = this._buildGoalKey(goalKey, sessionInfo);
		// }
        request.financialSituationData = [];
             var fnaDataModel = fnaDataModelList
             var commentVar = fnaUtil._buildComments(sessionInfo,fnaDataModel);
				var commentActionVar = fnaUtil._buildCommentAction(fnaDataModel);
				var dependantVar = fnaUtil._buildDependent(fnaDataModel);
				var emergencyFundVar = fnaUtil._buildEmergencyFund(fnaDataModel);
				var financialSituationDetailVar = fnaUtil._buildFinancialSituationDetail(fnaDataModel);
				var fxRateVar = fnaUtil._buildFxRate(fnaDataModel);
				var investorIndicatorVar = fnaUtil._buildInvestorIndicator(fnaDataModel);
				// financialSituationDetailVar.investorIndicatorVar=investorIndicatorVar
                request.financialSituationData.push(
					{
						rolePlayerIdentificationNumber: sessionInfo.custmerId,
						currencyCode: fnaDataModel.financialSituation.baseCurrenyCode,
						countryISOCode: fnaDataModel.countryISOCode,
						groupMemberCode: fnaDataModel.groupMemberCode,				
						comment: commentVar,
						commentAction: commentActionVar,
						dependant: dependantVar,
						emergencyFund: emergencyFundVar,
						financialSituationDetail: financialSituationDetailVar,
						fxRate: fxRateVar,
						investorIndicator: investorIndicatorVar
					}
                );

     
        request={
            request,
            messageId:params.request.messageId
        }
        return request;
    }
    /** 
      * Financial profile 
     */
}

export default fnaConverter;