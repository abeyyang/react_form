
import ObjectHelper from '../../../common/lib/ObjectHelper';
import {commonConfig} from '../../config/fna/commonConfig';
import {pvcHandleUtil} from '../../commonService/pvcHandleUtil';
import {calculationUtil} from '../../commonService/calculationUtil'
let pvcConfig=commonConfig.pvcConfig;
let bizConfig=commonConfig.bizConfig;
let FNAConstants=commonConfig.FNAConstants;
let currencyConfig=commonConfig.currencyConfig;

const fnaUtil={
    _buildRequestInvestorIndicator:(requestData) =>{
		var requestInvestorIndicatorKeys=[];
         requestInvestorIndicatorKeys = ["INV","AIPI","EF","DCI", "MR"];
			if(pvcHandleUtil.isPVCApplicable("PVC_CONFIG_MODE")){
				requestInvestorIndicatorKeys.push(pvcConfig.LIMIT_MEANS_KEY);
				requestInvestorIndicatorKeys.push(pvcConfig.EXC_AGE_KEY);
				requestInvestorIndicatorKeys.push(pvcConfig.CIH_KEYS);

			}
			var requestInvestorIndicators = [];	
			
			requestInvestorIndicatorKeys.forEach(function(item) {
				var requestInvestorIndicator =  new Object();
				requestInvestorIndicator.indicatorKey = item;
				requestInvestorIndicators.push(requestInvestorIndicator);
			}, this);
		return requestInvestorIndicators;
    },
    _buildRequestComment:(requestData)=>{
        var commentKeys = ["EF","INVST","SOFT_FACT","CUST_INFO","INC_EXP_JSTTFCTN"];
			if(bizConfig.currencyCodeAndDataControl){
				commentKeys = ["EF","INVST","SOFT_FACT","CUST_INFO","INC_EXP_JSTTFCTN"];//L400_PREM_AMT
			}
			var requestComments = [];
			commentKeys.forEach(function(item) {
			var requestComment =  new Object();
				requestComment.commentType = item;
				requestComments.push(requestComment);
			}, this);
		return requestComments;
    },
	 _buildRequestfieldKeys:(requestData) =>{
		return requestData.fieldKeys;
    },
	_buildComment:(type, key, value)=> {
            return {
                commentType: type,
                commentKey: key,
                commentText: value,
            };
        },
	_buildComments:(sessionInfo,fnaDataModel)=>{
			var comments = [];

			// if(fnaDataModel.softFacts!=null){
			// 	var softFacts = fnaDataModel.softFacts;

			// 	if(softFacts.health!=null){
			// 		comments.push(fnaUtil._buildComment(FNAConstants.COMMENT_TYPE.HEALTH,softFacts.health,FNAConstants.FPS_INFO_TYPE.SOFT_FACT));
			// 	}
			// 	if(softFacts.repFunds!=null){
			// 		comments.push(fnaUtil._buildComment(FNAConstants.COMMENT_TYPE.REP_FUNDS,softFacts.repFunds,FNAConstants.FPS_INFO_TYPE.SOFT_FACT));
			// 	}
			// 	if(softFacts.invExp!=null){
			// 		comments.push(fnaUtil._buildComment(FNAConstants.COMMENT_TYPE.INV_EXP,softFacts.invExp,FNAConstants.FPS_INFO_TYPE.SOFT_FACT));
			// 	}
			// 	if(softFacts.drawInc!=null){
			// 		comments.push(fnaUtil._buildComment(FNAConstants.COMMENT_TYPE.DRAW_INC,softFacts.drawInc,FNAConstants.FPS_INFO_TYPE.SOFT_FACT));
			// 	}
			// 	if(softFacts.term!=null){
			// 		comments.push(fnaUtil._buildComment(FNAConstants.COMMENT_TYPE.TERM,softFacts.term,FNAConstants.FPS_INFO_TYPE.SOFT_FACT));
			// 	}
			// 	if(softFacts.certOutCome!=null){
			// 		comments.push(fnaUtil._buildComment(FNAConstants.COMMENT_TYPE.CERT_OUTCOME,softFacts.certOutCome,FNAConstants.FPS_INFO_TYPE.SOFT_FACT));
			// 	}
			// 	if(softFacts.yourWill!=null){
			// 		comments.push(fnaUtil._buildComment(FNAConstants.COMMENT_TYPE.YOUR_WILL, softFacts.yourWill , FNAConstants.FPS_INFO_TYPE.SOFT_FACT));
			// 	}
			// }
			
			
			// if(fnaDataModel.moreCustomerInfo!=null){
			// 	var moreCustomerInfo = fnaDataModel.moreCustomerInfo;

			// 	if(moreCustomerInfo.jobDesc!=null){
			// 		comments.push(fnaUtil._buildComment(FNAConstants.COMMENT_TYPE.CUST_INFO_JOD_DEC, moreCustomerInfo.jobDesc, FNAConstants.FPS_INFO_TYPE.MORE_CUST_INFO));
			// 	}
			// 	if(moreCustomerInfo.addressAndBusiness!=null){
			// 		comments.push(fnaUtil._buildComment(FNAConstants.COMMENT_TYPE.CUST_INFO_ADDR_BUSI, moreCustomerInfo.addressAndBusiness, FNAConstants.FPS_INFO_TYPE.MORE_CUST_INFO));
			// 	}
			// 	if(moreCustomerInfo.previousEmployer!=null){
			// 		comments.push(fnaUtil._buildComment(FNAConstants.COMMENT_TYPE.CUST_INFO_PRE_EMP, moreCustomerInfo.previousEmployer, FNAConstants.FPS_INFO_TYPE.MORE_CUST_INFO));
			// 	}
			// 	if(moreCustomerInfo.domicile!=null){
			// 		comments.push(fnaUtil._buildComment(FNAConstants.COMMENT_TYPE.CUST_INFO_DOM, moreCustomerInfo.domicile, FNAConstants.FPS_INFO_TYPE.MORE_CUST_INFO));
			// 	}
			// 	if(moreCustomerInfo.countriesForTax!=null){
			// 		comments.push(fnaUtil._buildComment(FNAConstants.COMMENT_TYPE.CUST_INFO_COUNTRY, moreCustomerInfo.countriesForTax, FNAConstants.FPS_INFO_TYPE.MORE_CUST_INFO));
			// 	}
			// 	if(moreCustomerInfo.other!=null){
			// 		comments.push(fnaUtil._buildComment(FNAConstants.COMMENT_TYPE.CUST_OTHER, moreCustomerInfo.other, FNAConstants.FPS_INFO_TYPE.MORE_CUST_INFO));
			// 	}
			// }
			if (fnaDataModel.financialSituation !=null && fnaDataModel.financialSituation.investment && fnaDataModel.financialSituation.investment.remarkList && fnaDataModel.financialSituation.investment.remarkList.length > 0){
				for (var index = 0; index < fnaDataModel.financialSituation.investment.remarkList.length; index++) {
					var remark = fnaDataModel.financialSituation.investment.remarkList[index];
					if (remark != null && remark.typeCode != null && remark.remarkText != null) {
						var typeCode = remark.typeCode.substring(0, remark.typeCode.indexOf('_RM'));
						//comments.push(this._buildComment(typeCode, remark.remarkText, FNAConstants.FPS_INFO_TYPE.INVESTMENT));
						console.log("text");
						var comment = new Object();
						comment.commentKey = typeCode;
						comment.commentText = remark.remarkText;
						comment.commentType = FNAConstants.FPS_INFO_TYPE.INVESTMENT;
						comments.push(comment);
					}
				}
			}

			//build emergency funds comments
			if(fnaDataModel.emergencyFunds && fnaDataModel.emergencyFunds.emergeFundDetail){
				var efComment = null;

				if("N" == fnaDataModel.emergencyFunds.emergeFundDetail.efOption){
					efComment = new Object();
					efComment.commentType = "EF";
					efComment.commentText = fnaDataModel.emergencyFunds.emergeFundDetail.efOverrideReason;
					efComment.commentKey = "EF_REASON";
					comments.push(efComment);
					
					var efCommentY = new Object();
					efCommentY.commentType = "EF";
					efCommentY.commentText = null;
					efCommentY.commentKey = "EF_SOURCE";
					comments.push(efCommentY);
				}else if("Y" == fnaDataModel.emergencyFunds.emergeFundDetail.efOption){
					efComment = new Object();
					efComment.commentType = "EF";
					efComment.commentText = fnaDataModel.emergencyFunds.emergeFundDetail.efSourceField;
					efComment.commentKey = "EF_SOURCE"; 
					comments.push(efComment);
					
					var efCommentN = new Object();
					efCommentN.commentType = "EF";
					efCommentN.commentText = null;
					efCommentN.commentKey = "EF_REASON";
					comments.push(efCommentN);
				}else if("C" == fnaDataModel.emergencyFunds.emergeFundDetail.efOption){
					efComment = new Object();
					efComment.commentType = "EF";
					efComment.commentText = fnaDataModel.emergencyFunds.emergeFundDetail.efSourceField;
					efComment.commentKey = "EF_SOURCE"; 
					
					efCommentReason = new Object();
					efCommentReason.commentType = "EF";
					efCommentReason.commentText = fnaDataModel.emergencyFunds.emergeFundDetail.efOverrideReason;
					efCommentReason.commentKey = "EF_REASON"; 
					
					comments.push(efComment,efCommentReason);
				}
			}

			// more income details
			// if(fnaDataModel.financialSituation.moreIncomeDetail){
			// 	var moreIncomeDetail = fnaDataModel.financialSituation.moreIncomeDetail;
			// 	var commentType = "FNA_INC_DET";
			// 	//incomeSourceWithinFamily
				
			// 	var incomeSourceWithinFamily = new Object();
			// 	incomeSourceWithinFamily.commentType = commentType;
			// 	incomeSourceWithinFamily.commentKey = "INCOME_FAMLY";
			// 	incomeSourceWithinFamily.commentText = JSON.stringify(moreIncomeDetail.incomeSourceWithinFamily);
			// 	comments.push(incomeSourceWithinFamily);
				
			// 	//Dividend / Interest income
			// 	var dividendIncomeFrequency = new Object();
			// 	dividendIncomeFrequency.commentType = commentType;
			// 	dividendIncomeFrequency.commentKey = "INCOME_FREQDIV";
			// 	dividendIncomeFrequency.commentText = JSON.stringify(moreIncomeDetail.dividendIncomeFrequency);	
			// 	comments.push(dividendIncomeFrequency);
			// 	//Rental income
			// 	var rentalIncomeFrequency = new Object();
			// 	rentalIncomeFrequency.commentType = commentType;
			// 	rentalIncomeFrequency.commentKey = "INCOME_FREQRENT";
			// 	rentalIncomeFrequency.commentText = JSON.stringify(moreIncomeDetail.rentalIncomeFrequency); 
			// 	comments.push(rentalIncomeFrequency);
			// 	//Other income
			// 	var otherIncomeFrequency = new Object();
			// 	otherIncomeFrequency.commentType = commentType;
			// 	otherIncomeFrequency.commentKey = "INCOME_FREQINC";
			// 	otherIncomeFrequency.commentText = JSON.stringify(moreIncomeDetail.otherIncomeFrequency); 
			// 	comments.push(otherIncomeFrequency);
			// 	//Income Source of other income
			// 	var sourceOfOtherIncome = new Object();
			// 	sourceOfOtherIncome.commentType = commentType;
			// 	sourceOfOtherIncome.commentKey = "INCOME_OTINC";
			// 	sourceOfOtherIncome.commentText = JSON.stringify(moreIncomeDetail.sourceOfOtherIncome);
			// 	comments.push(sourceOfOtherIncome);
				
			// }
						console.log("text4");
			if(bizConfig.displayMIAE){
			   var  IncomeAndExpense={},monthlyExpense={},monthlyIncome={},Income={},Expense={}; 
			   console.log("text5");
			   	let MIAESelected={
					   commentType:null,
					   commentKey:null
				   }
			    	 MIAESelected=fnaDataModel.financialSituation.MIAESelected;
					 if(!ObjectHelper.isNullOrEmpty(MIAESelected)){
						 IncomeAndExpense.commentKey =  fnaDataModel.financialSituation.MIAESelected.commentKey;
			   		     IncomeAndExpense.commentType = fnaDataModel.financialSituation.MIAESelected.commentType;
						 IncomeAndExpense.commentText =" "	;
					 }
			   		
					// monthlyIncome=fnaDataModel.financialSituation.monthlyIncome;
					// monthlyExpense=fnaDataModel.financialSituation.monthlyExpense;
					// console.log("monthlyIncome:",monthlyIncome)
					// console.log("monthlyExpense:",monthlyExpense)
					// if(!ObjectHelper.isNullOrEmpty(monthlyIncome)){
					// 		Income.commentKey="";
					// 		Income.commentText=monthlyIncome.currencyCode + monthlyIncome.amount;
					// 		Income.commentType="DEC_TOTAL_INC";
					// }
					// if(!ObjectHelper.isNullOrEmpty(monthlyExpense)){
					// 	    Expense.commentKey="";
					// 		Expense.commentText=monthlyExpense.currencyCode + monthlyExpense.amount;
					// 		Expense.commentType="DEC_TOTAL_EXP";
					// }
					if(!ObjectHelper.isNullOrEmpty(IncomeAndExpense.commentType)&&!ObjectHelper.isNullOrEmpty(IncomeAndExpense.commentKey)){
						comments.push(IncomeAndExpense);
					}
					// if(!ObjectHelper.isNullOrEmpty(Income.commentType)){
					// 	comments.push(Income);
					// }
					// if(!ObjectHelper.isNullOrEmpty(Expense.commentType)){
					// 	comments.push(Expense);
					// }
					
			}
		   console.log("comments",comments);
			// build KYC comments for question 1 - 4
			if(bizConfig.displayKYC){
			var baseCcy = FnaDataModel.financialProfiles.get(appState.sessionScope.customerID).financialSituation.baseCurrenyCode;

			//transform mfdNetWorth value to message from dataModel
			var netWorth = new Object();
			netWorth.commentType = "MFD";
			netWorth.commentKey = "MFD_NET_WORTH";
			if(!fnaDataModel.financialSituation.mfdNetWorth.currencyCode){
				fnaDataModel.financialSituation.mfdNetWorth.currencyCode=baseCcy;
			//	netWorth.commentText=null;
			}
			var tempMfdNetWorth=fnaDataModel.financialSituation.mfdNetWorth;
			netWorth.commentText = tempMfdNetWorth.currencyCode+" "+tempMfdNetWorth.amount;
			
			comments.push(netWorth);
			
			
			//transform totalliability value to message from dataModel
			var liability = new Object();
			liability.commentType = "MFD";
			liability.commentKey = "MFD_LIABILITY";
			if(!fnaDataModel.financialSituation.liability.mfdTotalLiability.currencyCode){
				fnaDataModel.financialSituation.liability.mfdTotalLiability.currencyCode=baseCcy;
			//	liability.commentText = null;
			}
			var tempMfdTotalLiability=fnaDataModel.financialSituation.liability.mfdTotalLiability;
			liability.commentText = tempMfdTotalLiability.currencyCode+" "+tempMfdTotalLiability.amount;

			comments.push(liability);
			
			//transform totalLiquidAssets value to message from dataModel
			var asset = new Object();
			asset.commentType = "MFD";
			asset.commentKey = "MFD_LIQUID_ASSET";
			if(!fnaDataModel.financialSituation.assets.mfdTotalLiquidAssets.currencyCode){
				fnaDataModel.financialSituation.assets.mfdTotalLiquidAssets.currencyCode=baseCcy;
			//	asset.commentText=null;
			}
			var tempMfdTotalLiquidAsset=fnaDataModel.financialSituation.assets.mfdTotalLiquidAssets;
			asset.commentText = tempMfdTotalLiquidAsset.currencyCode+" "+tempMfdTotalLiquidAsset.amount;
			
			comments.push(asset);
			
			//transform totalLiquidAssets value to message from dataModel
			var asset = new Object();
			asset.commentType = "MFD";
			asset.commentKey = "MFD_FIX_ASSET";
			if(!fnaDataModel.financialSituation.assets.mfdTotalFixedAssets.currencyCode){
				 fnaDataModel.financialSituation.assets.mfdTotalFixedAssets.currencyCode=baseCcy;
			//	 asset.commentText=null;
				}
			var tempMfdTotalFixedAssets=fnaDataModel.financialSituation.assets.mfdTotalFixedAssets;
			asset.commentText = tempMfdTotalFixedAssets.currencyCode+" "+tempMfdTotalFixedAssets.amount;
		
			comments.push(asset);
			//set Join investment knowledge to comment from dataModel
					var temp="";
					if(fnaDataModel.KYCQuestions.knowledge.customer1){
					temp=temp+fnaDataModel.KYCQuestions.knowledge.customer1;
					}
					if(fnaDataModel.KYCQuestions.knowledge.customer2){
					temp=temp+fnaDataModel.KYCQuestions.knowledge.customer2;
					}
					if(fnaDataModel.KYCQuestions.knowledge.customer3){
					temp=temp+fnaDataModel.KYCQuestions.knowledge.customer3;
					}
					if(fnaDataModel.KYCQuestions.knowledge.customer4){
					temp=temp+fnaDataModel.KYCQuestions.knowledge.customer4;
					}
					if(fnaDataModel.KYCQuestions.knowledge.customer5){
					temp=temp+fnaDataModel.KYCQuestions.knowledge.customer5;
					}
					if(temp!=""){
					var question = new Object();
					question.commentType = "MFD";
					question.commentKey = "MFD_INVST_KNOWLDGE";
					question.commentText =temp;
					comments.push(question);
					}
			
				if(fnaDataModel.KYCQuestions.question1 != null ){
					var question = new Object();
					question.commentType = "FNA_KYC";
					question.commentKey = "01";
					question.commentText = fnaDataModel.KYCQuestions.question1;
					comments.push(question);
				}
				if(fnaDataModel.KYCQuestions.question2 != null ){
					var question = new Object();
					question.commentType = "FNA_KYC";
					question.commentKey = "02";
					question.commentText = fnaDataModel.KYCQuestions.question2;
					comments.push(question);
				}
				if(fnaDataModel.KYCQuestions.question3 != null ){
					var question = new Object();
					question.commentType = "FNA_KYC";
					question.commentKey = "03";
					question.commentText = fnaDataModel.KYCQuestions.question3;
					comments.push(question);
				}
				if(fnaDataModel.KYCQuestions.question4 != null ){
					var question = new Object();
					question.commentType = "FNA_KYC";
					question.commentKey = "04";
					question.commentText = fnaDataModel.KYCQuestions.question4;
					comments.push(question);
				}
				console.log("comments",comments);
			}
			return comments;
	},	
	_buildCommentAction:(fnaDataModel)=>{
			var commentActionList = [];
			var commentAction1 = {};
			commentAction1.action = FNAConstants.COMMENT_ACTION_U;
			commentAction1.commentType = FNAConstants.FPS_INFO_TYPE.SOFT_FACT;
			var commentAction2 = {};
			commentAction2.action = FNAConstants.COMMENT_ACTION_U;
			commentAction2.commentType = FNAConstants.FPS_INFO_TYPE.FPS_INFO_TYPE_INVESTMENT;

			var commentAction3 = {};
			commentAction3.action = FNAConstants.COMMENT_ACTION_U;
			commentAction3.commentType = FNAConstants.FPS_INFO_TYPE.FPS_INFO_TYPE_EF;

			var commentAction4 = {};
			commentAction4.action = FNAConstants.COMMENT_ACTION_U;
			commentAction4.commentType = FNAConstants.FPS_INFO_TYPE.MORE_CUST_INFO;

			var commentAction5 = {};
			commentAction5.action = FNAConstants.COMMENT_ACTION_U;
			commentAction5.commentType = FNAConstants.FPS_INFO_TYPE.FNA_INC_DET;

			var commentAction6 = {};
			commentAction6.action = FNAConstants.COMMENT_ACTION_R;
			commentAction6.commentType = FNAConstants.FPS_INFO_TYPE.INC_EXP_JSTTFCTN;
			
			commentActionList.push(commentAction1);
			commentActionList.push(commentAction2);
			commentActionList.push(commentAction3);
			commentActionList.push(commentAction4);
			commentActionList.push(commentAction5);
			commentActionList.push(commentAction6);

			// build KYC comments for question 1 - 4
			if(bizConfig.displayKYC){
				var commentAction7 = {};
				commentAction7.action = FNAConstants.COMMENT_ACTION_U;
				commentAction7.commentType = "FNA_KYC";
				commentActionList.push(commentAction7);

				var commentAction8 = {};
				commentAction8.action = FNAConstants.COMMENT_ACTION_U;
				commentAction8.commentType = FNAConstants.FPS_INFO_TYPE.MFD;
				commentActionList.push(commentAction8);
			}

			return commentActionList;
		
	},
	_buildDependent:(fnaDataModel)=>{
		
			console.log("JML --> _buildDependent" ,fnaDataModel);
			var dependantList = [];
	        var dependentInfoList = fnaDataModel.financialSituation.dependentDetails;
	       
	        for(var i = 0 ; i < dependentInfoList.length ; i ++) {
	            var dep = dependentInfoList[i];
	            if (dep) {
	                if (dep.firstName || dep.lastName) {
	                    
	                    var dependant = {};
	                    dependant.dateOfBirth = new Date(dep.dateOfBirth);
	                    dependant.firstName = dep.firstName;
	                    dependant.lastName = dep.lastName;
	                    dependant.isFinanciallyDependent = dep.isFinanciallyDependent;
	                    dependant.orderNumber = i + 1;
	                    dependant.relationship = dep.relationship;
	                    dependantList.push(dependant);
	                }
	            }
	        }
	        return dependantList;
		
	},
	_buildEmergencyFund:(fnaDataModel)=>{
			var emergencyFund = {};
			var emergencyFundArray = [];


	        if(fnaDataModel.emergencyFunds){
	        	if(!fnaDataModel.emergencyFunds.emergeFundMode){
	        		fnaDataModel.emergencyFunds.emergeFundMode = fnaDataModel.emergencyFunds.emergeFundDetail.efOption;
	        	}
	       		var efMode = fnaDataModel.emergencyFunds.emergeFundMode;
	       		//if("Month" == efMode){
	       		var	emergencyFundAmount = fnaDataModel.emergencyFunds.emergeFundDetail.emergencyFundAmount.amount || 0;
	       		//}else{
	       		//	emergencyFundAmount = 0;// TODO this._buildEmergencyFundAmount(fnaDataModel);
	       		//}

	       		var currencyEmergencyFundCode = fnaDataModel.financialSituation.baseCurrenyCode;

				//emergencyFund.efOption = fnaDataModel.emergencyFunds.emergeFundDetail.efOption;	       			       		
		       	emergencyFund.amountSource = fnaDataModel.emergencyFunds.emergeFundDetail.efSourceField;
				emergencyFund.currencyEmergencyFundCode = currencyEmergencyFundCode;
				emergencyFund.emergencyFundAmount = emergencyFundAmount;
				emergencyFund.reasonOverriding = fnaDataModel.emergencyFunds.emergeFundDetail.efOverrideReason;
				// setup the emergencyFundAmount as user input if option is C.
				if(fnaDataModel.emergencyFunds.emergeFundDetail.efOption == "C") {
					emergencyFund.emergencyFundAmount = fnaDataModel.emergencyFunds.emergeFundDetail.userInputEmergencyFundAmount;
				}
	        }

			emergencyFundArray.push(emergencyFund);
	        return emergencyFundArray;
		
	},
	_buildFinancialSituationDetail:(fnaDataModel)=>{
			var detail = {};
			var financialSituationDetail = fnaDataModel.financialSituation;
			var financialSituationDetailArray = [];


			// number of dependents
			if(financialSituationDetail.dependentNo >= 0){
				detail.numberOfDependents = financialSituationDetail.dependentNo;
			}

			//income
			detail.income = [];
			//income total
			var incomeTotal = {};
			incomeTotal.currencyIncomeCode = financialSituationDetail.income.total.currencyCode;
			incomeTotal.incomeAmount = financialSituationDetail.income.total.amount;
			incomeTotal.incomeTypeCode = bizConfig.incomeTotal; //financialSituationDetail.income.total.typeCode;
			detail.income.push(incomeTotal);
			//income detail list
			
			if(financialSituationDetail.income.detailList && financialSituationDetail.income.detailList.length > 0){
				for(var i = 0 ; i < financialSituationDetail.income.detailList.length ; i ++){
					var incomeDetailInput = financialSituationDetail.income.detailList[i];
					
					if(!ObjectHelper.isNullOrEmpty(incomeDetailInput.amount)){
						var incomeDetail = {};
						incomeDetail.currencyIncomeCode = incomeDetailInput.currencyCode;
						incomeDetail.incomeAmount = incomeDetailInput.amount;
						incomeDetail.incomeTypeCode = incomeDetailInput.typeCode;
						detail.income.push(incomeDetail);
						console.log("income detail box",incomeDetailInput);
						console.log("income detail box",incomeDetail);
					}
					
				}
			}
			console.log("income detail box",financialSituationDetail.income.detailList);
			console.log("income detail box",detail);

			//expense
			detail.expense = [];
			//expense total
			var expenseTotal = {};
			expenseTotal.expenseCurrencyCode = financialSituationDetail.expense.total.currencyCode;
			expenseTotal.expenseAmount = financialSituationDetail.expense.total.amount;
			expenseTotal.expenseTypeCode = bizConfig.expenseTotal; //financialSituationDetail.expense.total.typeCode;
			detail.expense.push(expenseTotal);
			//expense detail list
			if(financialSituationDetail.expense.detailList && financialSituationDetail.expense.detailList.length > 0){
				for(var i = 0 ; i < financialSituationDetail.expense.detailList.length ; i ++){
					var expenseDetailInput = financialSituationDetail.expense.detailList[i];
					if(!ObjectHelper.isNullOrEmpty(expenseDetailInput.amount)){
						var expenseDetail = {};
						expenseDetail.expenseCurrencyCode = expenseDetailInput.currencyCode;
						expenseDetail.expenseAmount = expenseDetailInput.amount;
						expenseDetail.expenseTypeCode = expenseDetailInput.typeCode;
						detail.expense.push(expenseDetail);
					}
					
				}
			}
			
			//liability
			detail.liability = [];
			//liability total
			var liabilityTotal = {};
			liabilityTotal.liabilityCurrencyCode = financialSituationDetail.liability.total.currencyCode;
			liabilityTotal.liabilityAmount = financialSituationDetail.liability.total.amount;
			liabilityTotal.liabilityTypeCode = bizConfig.liabilityTotal;  //financialSituationDetail.liability.total.typeCode;bizConfig.
			detail.liability.push(liabilityTotal);
			//liability detail list
			if(financialSituationDetail.liability.detailList && financialSituationDetail.liability.detailList.length > 0){
				for(var i = 0 ; i < financialSituationDetail.liability.detailList.length ; i ++){
					var liabilityDetailInput = financialSituationDetail.liability.detailList[i];
					if(!ObjectHelper.isNullOrEmpty(liabilityDetailInput.amount)){
						var liabilityDetail = {};
						liabilityDetail.liabilityCurrencyCode = liabilityDetailInput.currencyCode;
						liabilityDetail.liabilityAmount = liabilityDetailInput.amount;
						liabilityDetail.liabilityTypeCode = liabilityDetailInput.typeCode;
						detail.liability.push(liabilityDetail);
					}
				}
			}
			
			//assets
			detail.assets = [];
			//assets total
			var assetsTotal = {};
			assetsTotal.assetCurrencyCode = financialSituationDetail.assets.total.currencyCode;
			assetsTotal.assetAmount = financialSituationDetail.assets.total.amount || 0;
			assetsTotal.assetTypeCode = bizConfig.assetsTotal; //financialSituationDetail.assets.total.typeCode;
			detail.assets.push(assetsTotal);
			//assets detail list
			if(financialSituationDetail.assets.detailList && financialSituationDetail.assets.detailList.length > 0){
				for(var i = 0 ; i < financialSituationDetail.assets.detailList.length ; i ++){
					var assetsDetailInput = financialSituationDetail.assets.detailList[i];
					if(!ObjectHelper.isNullOrEmpty(assetsDetailInput.amount)){
						var assetsDetail = {};
						assetsDetail.assetCurrencyCode = assetsDetailInput.currencyCode;
						assetsDetail.assetAmount = assetsDetailInput.amount;
						assetsDetail.assetTypeCode = assetsDetailInput.typeCode;
						detail.assets.push(assetsDetail);	
					}
					
				}
			}

			//investment
			detail.investment = [];
			//investment total
			var investmentTotal = {};
			investmentTotal.investmentCurrencyCode = financialSituationDetail.investment.total.currencyCode;
			investmentTotal.investmentAmount = financialSituationDetail.investment.total.amount;
			investmentTotal.investmentTypeCode = bizConfig.investmentTotal; //financialSituationDetail.investment.total.typeCode;
			detail.investment.push(investmentTotal);
			//investment detail list
			if(financialSituationDetail.investment.detailList && financialSituationDetail.investment.detailList.length > 0){
				for(var i = 0 ; i < financialSituationDetail.investment.detailList.length ; i ++){
					var investmentDetailInput = financialSituationDetail.investment.detailList[i];
					if(!ObjectHelper.isNullOrEmpty(investmentDetailInput.amount)){
						var investmentDetail = {};
						investmentDetail.investmentCurrencyCode = investmentDetailInput.currencyCode;
						investmentDetail.investmentAmount = investmentDetailInput.amount;
						investmentDetail.investmentTypeCode = investmentDetailInput.typeCode;
						detail.investment.push(investmentDetail);	
					}
					
				}
			}

			var ilasInvestmentArray = [];
			ilasInvestmentArray = financialSituationDetail.ilasSituationDetail;

			var wholdInvestmentArray = [];
			wholdInvestmentArray = []; 
			detail.reviewDateTime = new Date(); 
			detail.marginalIncomeTaxRate = financialSituationDetail.marginalIncomeTaxRate;
			financialSituationDetailArray.push(detail);
			return financialSituationDetailArray;
		
	},
	_buildFxRate:(fnaDataModel)=>{
			var currencyList = [];
			var baseCurrency = fnaDataModel.financialSituation.baseCurrenyCode;
			var fxRateObjList = [];
			var currencyPairList = [];
			currencyList.forEach(function(item) {
				if(targetCurrency != item){
					var currencyPair =  new Object();
					currencyPair.sourceCurrency = item;
	                currencyPair.targetCurrency = targetCurrency;
					currencyPairList.push(currencyPair);
				}
			}, this);			
			currencyPairList.forEach(function(item){
				var fxRateObj =  new Object();
				var currencyPair = new Object();

				currencyPair.sourceCurrency = item.sourceCurrency;
                currencyPair.targetCurrency = item.targetCurrency;

				fxRateObj.currencyPair = currencyPair;
                fxRateObj.fxRateType="MID";
				fxRateObjList.push(fxRateObj);
			},this);
			return fxRateObjList;
		
	},
	_buildInvestorIndicator:(fnaDataModel)=>{
			console.log("JML --> _buildInvestorIndicator" ,fnaDataModel);
			var declarationEnabled = true; // get the indicator from formbean ..AIPI
			var efEnabled = true; //TODO
			var dciEnabled = true; //TODO
			var requestInvestorIndicatorKeys = bizConfig.indicator_keys;
			var requestInvestorIndicators = [];
			requestInvestorIndicators=fnaDataModel.financialSituation.investorIndicators;
			// requestInvestorIndicatorKeys.forEach(function(item){
			// 	var requestInvestorIndicator =  new Object();

			// 	requestInvestorIndicator.indicatorKey = item;
			// 	if(item == "EF"){
			// 		requestInvestorIndicator.indicatorValue = fnaDataModel.emergencyFunds.emergeFundDetail.efOption;
			// 	}
			// 	if(item == "MR"){//Matrimonial regime
			// 		requestInvestorIndicator.indicatorValue = fnaDataModel.matrimonialRegime || "N"; // Y or N
			// 	}
			// 	requestInvestorIndicators.push(requestInvestorIndicator);
			// },this);
			return requestInvestorIndicators;		
	},
	populateSoftfact:(resComments)=>{
            var softFacts = {
                health : null,
                repFunds : null,
                invExp : null,
                drawInc : null,
                term : null
            };
			let filteredArr=[];
			for (var index = 0; index < resComments.length; index++) {
				 var element = resComments[index];
				 if(element.commentType === FNAConstants.FPS_INFO_TYPE.SOFT_FACT){
					filteredArr.push(element);
				 }
			}
			   for (var index = 0; index < filteredArr.length; index++) {
				   var commentVar = filteredArr[index];
				   if (commentVar && commentVar.commentText) {
                    var text = commentVar.commentText;

                    switch(commentVar.commentKey){
                        case FNAConstants.COMMENT_TYPE.HEALTH:
                            softFacts.health = text;
                            break;
                        case FNAConstants.COMMENT_TYPE.REP_FUNDS:
                            softFacts.repFunds = text;
                            break;
                        case FNAConstants.COMMENT_TYPE.INV_EXP:
                            softFacts.invExp = text;
                            break;
                        case FNAConstants.COMMENT_TYPE.DRAW_INC:
                            softFacts.drawInc = text;
                            break;
                        case FNAConstants.COMMENT_TYPE.TERM:
                            softFacts.term = text;
                            break;
                        case FNAConstants.COMMENT_TYPE.CERT_OUTCOME:
                            softFacts.certOutCome = text;
                            break;
                        case FNAConstants.COMMENT_TYPE.YOUR_WILL:
                            softFacts.yourWill = text;    
                        default:
                            break;
                    }
                }
			}
            return softFacts;
	},
	populateMoreCustomerInfo:(resComments)=>{
		var moreCustomerInfo = {
                jobDesc : null,
                addressAndBusiness : null,
                previousEmployer : null,
                domicile : null,
                countriesForTax : null,
                other : null
            };
			let filteredArr=[];
            for (var index = 0; index < resComments.length; index++) {
				 var element = resComments[index];
				 if(element.commentType === FNAConstants.FPS_INFO_TYPE.MORE_CUST_INFO){
					filteredArr.push(element);
				 }
			}
			for (var index = 0; index < filteredArr.length; index++) {
				var commentVar = filteredArr[index];
                if (commentVar && commentVar.commentText) {
                    var text = commentVar.commentText;
                    switch(commentVar.commentKey){
                    case FNAConstants.COMMENT_TYPE.CUST_INFO_ADDR_BUSI:
                        moreCustomerInfo.addressAndBusiness = text;
                        break;
                    case FNAConstants.COMMENT_TYPE.CUST_INFO_COUNTRY:
                        moreCustomerInfo.countriesForTax = text;
                        break;
                    case FNAConstants.COMMENT_TYPE.CUST_INFO_DOM:
                        moreCustomerInfo.domicile = text;
                        break;
                    case FNAConstants.COMMENT_TYPE.CUST_INFO_JOD_DEC:
                        moreCustomerInfo.jobDesc = text;
                        break;
                    case FNAConstants.COMMENT_TYPE.CUST_OTHER:
                        moreCustomerInfo.other = text;
                        break;
                    case FNAConstants.COMMENT_TYPE.CUST_INFO_PRE_EMP:
                        moreCustomerInfo.previousEmployer = text;
                        break;
                    default:
                        break;
                    }
                }
			}
        console.log("moreCustomerInfo",moreCustomerInfo);
        return moreCustomerInfo;
	},
	populateMIAEComment:(comments , fnaDataModel)=>{
		let commentKeys=bizConfig.MIAEComment;
		let commentTypes=FNAConstants.COMMENT_TYPE.INC_EXP_JSTTFCTN;
		let optionMap=bizConfig.reasonToUpdateMonthlyAndExpense;
		let selected ={
				commentKey:'',
				commentType:''
		}
		if(comments && comments.length > 0){
			let KYCComments=[];
            for (var index = 0; index < comments.length; index++) {
				 var comment = comments[index];
					if(comment.commentType === commentTypes){
					    selected.commentKey=comment.commentKey
						selected.commentType=comment.commentType
				    }
			}
		}
		let MIAEOption={
			optionMap,
			selected:selected
		}
		return MIAEOption
	},
	populateKYCComment:(comments , fnaDataModel)=>{
    	var KYCQuestions = {
    		question1:null,
    		question2:null,
    		question3:null,
    		question4:null
    	};
        if(comments && comments.length > 0){
			let KYCComments=[];
            for (var index = 0; index < comments.length; index++) {
				 var comment = comments[index];
				 if(comment.commentType === "FNA_KYC"){
					filteredArr.push(comment);
				 }
			}
			for (var index = 0; index < KYCComments.length; index++) {
				var item = KYCComments[index];
				switch (item.commentKey)
                {
                  	case "01":
                  		KYCQuestions.question1= item.commentText;
    	            	break;
    	            case "02":
    	            	KYCQuestions.question2= item.commentText;
    	            	break;
                  	case "03":
                  		KYCQuestions.question3= item.commentText;
    	            	break;
    	            case "04":
    	            	KYCQuestions.question4= item.commentText;
    	            	break;
                }
			}
        }
		return KYCQuestions
	},
	populateFinancialSituationDetail:(responseDataArr, detailType , sessionInfo)=>{
            var supportedTypeCodes = fnaUtil._getSupportedTypeCodes(detailType);
            var dataModelObj = new Object();
            if (responseDataArr.length > 0) {
                if (responseDataArr[0].financialSituationDetail) {
                    dataModelObj.reviewDateTime = responseDataArr[0].financialSituationDetail.reviewDateTime;
                }
                var detailList = [] ,detailFilteredArr=[];
				for (var index = 0; index < responseDataArr.length; index++) {
						var item = responseDataArr[index];
                    	var indexOfTotal = -1;
                    if (item != null) {

                        switch(detailType){
                            case 'incomes':
                                indexOfTotal = (item.incomeTypeCode ? item.incomeTypeCode.indexOf('TOTAL_'):-1);
                                break;
                            case 'expenses':
                                indexOfTotal = (item.expenseTypeCode ? item.expenseTypeCode.indexOf('TOTAL_'):-1);
                                break;
                            case 'assets':
                                indexOfTotal = (item.assetTypeCode ? item.assetTypeCode.indexOf('TOTAL_'):-1);
                                break;
                            case 'liabilities':
                                indexOfTotal = (item.liabilityTypeCode ? item.liabilityTypeCode.indexOf('TOTAL_'):-1);
                                break;
                            case 'investments':
                                indexOfTotal = (item.investmentTypeCode ? item.investmentTypeCode.indexOf('TOTAL_'):-1);
                                break;
                            default:
                                indexOfTotal = -1;
                        }
                    }
					if(indexOfTotal !==0 ){
						detailFilteredArr.push(item)
					}
                }
				for (var index = 0; index < detailFilteredArr.length; index++) {
					 var item = detailFilteredArr[index];
                     var currDetail = new Object();
                     if (item !== null) {
                        switch(detailType){
                            case 'incomes':
                                if (item.currencyIncomeCode) {
                                    currDetail.currencyCode=item.currencyIncomeCode;
                                }
                                if (item.incomeAmount || item.incomeAmount === 0) {
                                    currDetail.amount=item.incomeAmount;
                                }
                                if (item.incomeTypeCode) {
                                    currDetail.typeCode=item.incomeTypeCode;
                                }
                                break;
                            case 'expenses':
                                if (item.expenseCurrencyCode) {
                                    currDetail.currencyCode=item.expenseCurrencyCode;
                                }
                                if (item.expenseAmount || item.expenseAmount ===0) {
                                    currDetail.amount=item.expenseAmount;
                                }
                                if (item.expenseTypeCode) {
                                    currDetail.typeCode=item.expenseTypeCode;
                                }
                                break;
                            case 'assets':
                                if (item.assetCurrencyCode) {
                                    currDetail.currencyCode=item.assetCurrencyCode;
                                }
                                if (item.assetAmount || item.assetAmount === 0) {
                                    currDetail.amount=item.assetAmount;
                                }
                                if (item.assetTypeCode) {
                                    currDetail.typeCode=item.assetTypeCode;
                                }
                                break;
                            case 'liabilities':
                                if (item.liabilityCurrencyCode) {
                                    currDetail.currencyCode=item.liabilityCurrencyCode;
                                }
                                if (item.liabilityAmount || item.liabilityAmount ===0) {
                                    currDetail.amount=item.liabilityAmount;
                                }
                                if (item.liabilityTypeCode) {
                                    currDetail.typeCode=item.liabilityTypeCode;
                                }
                                break;
                            case 'investments':
                                if (item.investmentCurrencyCode) {
                                    currDetail.currencyCode=item.investmentCurrencyCode;
                                }
                                if (item.investmentAmount || item.investmentAmount ===0) {
                                    currDetail.amount=item.investmentAmount;
                                }
                                if (item.investmentTypeCode) {
                                    currDetail.typeCode=item.investmentTypeCode;
                                }
                                //TODO build remarks into detailList
                                break;
                            default:
                        }
                    }
                    if(!currDetail.currencyCode){
                        currDetail.currencyCode = currencyConfig.defaultCurrency;
                    }
					for (var x = 0; x < supportedTypeCodes.length; x++) {
						 var element = supportedTypeCodes[x];
						 if(element===currDetail.typeCode){
							  detailList.push(currDetail);
						 }
					}
                }
                dataModelObj.detailList = detailList;
				let totalFilteredArr=[]
				for (var index = 0; index < responseDataArr.length; index++) {
					 var item = responseDataArr[index];
                     var indexOfTotal = -1;
                    switch(detailType){
                        case 'incomes':
                            indexOfTotal = (item.incomeTypeCode ? item.incomeTypeCode.indexOf('TOTAL_'):-1);
                            break;
                        case 'expenses':
                            indexOfTotal = (item.expenseTypeCode ? item.expenseTypeCode.indexOf('TOTAL_'):-1);
                            break;
                        case 'assets':
                            indexOfTotal = (item.assetTypeCode ? item.assetTypeCode.indexOf('TOTAL_'):-1);
                            break;
                        case 'liabilities':
                            indexOfTotal = (item.liabilityTypeCode ? item.liabilityTypeCode.indexOf('TOTAL_'):-1);
                            break;
                        case 'investments':
                            indexOfTotal = (item.investmentTypeCode ? item.investmentTypeCode.indexOf('TOTAL_'):-1);
                            break;
                        default:
                            indexOfTotal = -1;
                    }
					if(indexOfTotal ===0){
						totalFilteredArr.push(item);
					}
                }
                if(totalFilteredArr.length > 0){
                    var totalResponseObj = totalFilteredArr[0];
                    var totalObj = new Object();

                    if (totalResponseObj !== null) {

                        switch(detailType){
                            case 'incomes':
                                if (totalResponseObj.currencyIncomeCode) {
                                    totalObj.currencyCode = totalResponseObj.currencyIncomeCode;
                                }
                                if (totalResponseObj.incomeAmount || totalResponseObj.incomeAmount == 0) { // special handle 0 case.
                                    totalObj.amount = totalResponseObj.incomeAmount;
                                }
                                if (totalResponseObj.incomeTypeCode) {
                                    totalObj.typeCode = totalResponseObj.incomeTypeCode;
                                }
                                break;
                            case 'expenses':
                                if (totalResponseObj.expenseCurrencyCode) {
                                    totalObj.currencyCode = totalResponseObj.expenseCurrencyCode;
                                }
                                if (totalResponseObj.expenseAmount || totalResponseObj.expenseAmount == 0) {
                                    totalObj.amount = totalResponseObj.expenseAmount;
                                }
                                if (totalResponseObj.expenseTypeCode) {
                                    totalObj.typeCode = totalResponseObj.expenseTypeCode;
                                }
                                break;
                            case 'assets':
                                if (totalResponseObj.assetCurrencyCode) {
                                    totalObj.currencyCode = totalResponseObj.assetCurrencyCode;
                                }
                                if (totalResponseObj.assetAmount || totalResponseObj.assetAmount == 0) {
                                    totalObj.amount = totalResponseObj.assetAmount;
                                }
                                if (totalResponseObj.assetTypeCode) {
                                    totalObj.typeCode = totalResponseObj.assetTypeCode;
                                }
                                break;
                            case 'liabilities':
                                if (totalResponseObj.liabilityCurrencyCode) {
                                    totalObj.currencyCode = totalResponseObj.liabilityCurrencyCode;
                                }
                                if (totalResponseObj.liabilityAmount || totalResponseObj.liabilityAmount == 0) {
                                    totalObj.amount = totalResponseObj.liabilityAmount;
                                }
                                if (totalResponseObj.liabilityTypeCode) {
                                    totalObj.typeCode = totalResponseObj.liabilityTypeCode;
                                }
                                break;
                            case 'investments':
                                if (totalResponseObj.investmentCurrencyCode) {
                                    totalObj.currencyCode = totalResponseObj.investmentCurrencyCode;
                                }
                                if (totalResponseObj.investmentAmount || totalResponseObj.investmentAmount == 0) {
                                    totalObj.amount = totalResponseObj.investmentAmount;
                                }
                                if (totalResponseObj.investmentTypeCode) {
                                    totalObj.typeCode = totalResponseObj.investmentTypeCode;
                                }
                                break;
                        }
                    }
                    if(!totalObj.currencyCode){
                        totalObj.currencyCode = currencyConfig.defaultCurrency;
                    }
                    dataModelObj.total = totalObj;
                }
                else {
                    var totalObj = new Object();
                    switch(detailType){
                            case 'incomes':
                                totalObj.currencyCode = null;
                                totalObj.amount = 0;
                                break;
                            case 'expenses':
                                totalObj.currencyCode = null;
                                totalObj.amount = 0;
                                break;
                            case 'assets':
                                totalObj.currencyCode = null;
                                totalObj.amount = 0;
                                break;
                            case 'liabilities':
                                totalObj.currencyCode = null;
                                totalObj.amount = 0;
                                break;
                            case 'investments':
                                totalObj.currencyCode = null; 
                                totalObj.amount = 0;
                                break;
                    }

                    dataModelObj.total = totalObj;
                }
				 switch(detailType){
                            case 'assets':
                                dataModelObj.mfdTotalLiquidAssets = {currencyCode: null, amount: 0};
								dataModelObj.mfdTotalFixedAssets = {currencyCode: null, amount: 0};
                                break;
                            case 'liabilities':
                                dataModelObj.mfdTotalLiability ={currencyCode: null, amount: 0};
                                break;
                    }
                return dataModelObj;
            }else{
                if(!dataModelObj.total){
                    dataModelObj.total = {
                        amount : null, // can't default set 0, as also allow null input.
                        currencyCode : currencyConfig.defaultCurrency,
                        typeCode : ""
                    }
                }
                if(!dataModelObj.detailList){
                    dataModelObj.detailList = [];
                }
                return dataModelObj;
            }
	},
	calculateTotalLivingExpensePrefill:(financialSituation, fxRate)=>{
		   var totalLivingExpense =  fnaUtil._calculateTotal(
                financialSituation.expense? financialSituation.expense.detailList:0,
                bizConfig.livingexpenseItems,
                fxRate,
                financialSituation.baseCurrenyCode,financialSituation.expense.total);          
            
            if (totalLivingExpense.currencyCode === null) {
                totalLivingExpense.currencyCode = financialSituation.expense.total.currencyCode;
            }

            return totalLivingExpense;
	},
	populateFinancialSituationDetailRemarkList:(resComments, detailType , sessionInfo)=>{
            var supportedTypeCodes = fnaUtil._getSupportedTypeCodes(detailType);
            var remarkList = new Array();
            if (detailType === "investments") {
				let filteredArr=[]
				for (var index = 0; index < resComments.length; index++) {
					var item = resComments[index];
					if(item.commentType === FNAConstants.FPS_INFO_TYPE.INVESTMENT){
						filteredArr.push(item)
					}
				}
				for (var x = 0; x < filteredArr.length; x++) {
					 var commentVar = array[x];
                    if (commentVar && commentVar.commentText) {

                        var text = commentVar.commentText;
						for (var y = 0; y < supportedTypeCodes.length; y++) {
							var detail = supportedTypeCodes[y];
							var remark = commonConfig.financialSituationRemark;
                            switch(commentVar.commentKey){
                                case detail:
                                    remark.propertyName = detail;
                                    remark.type = detailType;
                                    remark.fieldLabel = detail;
                                    remark.fieldLabelTitle = detail;
                                    remark.remarkText = text;
                                    remarkList.push(remark);
                                    break;
                                default:
                                    break;
                            }
							
						}
                    }
				}
               
            }
            return remarkList;
	},
	_getSupportedTypeCodes:(detailType)=>{
		let supportedTypeCodes;
        switch(detailType){
            case 'incomes':
             supportedTypeCodes = bizConfig.incomeItems;
             break;
            case 'expenses':
               supportedTypeCodes = bizConfig.expenseItems;
              break;
            case 'assets':
                supportedTypeCodes = bizConfig.assetsItems;
              break;
            case 'liabilities':
             supportedTypeCodes = bizConfig.liabilityItems;
              break;
            case 'investments':
                 supportedTypeCodes =  bizConfig.investmentItems;
                break;
            default:
              break;
        }
        return supportedTypeCodes;
	},
	_calculateTotal:(detailList, typeList, fxRates, totalCcy,total)=>{
		var totalAmount = null;
        	if(bizConfig.allowUseTotalAsSum && detailList == 0){
        		totalAmount = calculationUtil.getTotalThroughTotal(total, typeList, fxRates, totalCcy);
        	}else{
        		totalAmount = calculationUtil.getTotal(detailList, typeList, fxRates, totalCcy);
        	}
            return {
                currencyCode: totalCcy,
                amount: totalAmount
            };
	},
	populateMFDComment:(comments , fnaDataModel)=>{
		var knowledge = {
				customer1 : null,
				customer2 : null,
				customer3 : null,
				customer4: null,
				customer5 : null
		};
		var mfdTotalLiquidAssets={currencyCode: null, amount: 0};
		var mfdTotalFixedAssets={currencyCode: null, amount: 0};
		var mfdTotalNetWorth={currencyCode: null, amount: 0};
		var mfdTotalLiability={currencyCode: null, amount: 0};
		if(comments && comments.length > 0){
			var KYCComments=[]
			for (var index = 0; index < comments.length; index++) {
				var comment = comments[index];
				if(comment.commentType === "MFD"){
					KYCComments.push(comment);
				}
			}

			for (var index = 0; index < KYCComments.length; index++) {
				 var item = KYCComments[index];
				switch (item.commentKey)
				{
						case "MFD_INVST_KNOWLDGE":
							for(var i=0;i+2<=item.commentText.length;i=i+2){
								if(i==0){
										knowledge.customer1= item.commentText.substring(i,i+2);
								}
								if(i==2){
										knowledge.customer2= item.commentText.substring(i,i+2);
								}
								if(i==4){
										knowledge.customer3= item.commentText.substring(i,i+2);
								}
								if(i==6){
										knowledge.customer4= item.commentText.substring(i,i+2);
								}
								if(i==8){
										knowledge.customer5= item.commentText.substring(i,i+2);
								}
							}
							break;
						case "MFD_LIQUID_ASSET":
							if(item.commentText){
								mfdTotalLiquidAssets.currencyCode=item.commentText.substring(0,3);
								mfdTotalLiquidAssets.amount=item.commentText.substring(4);
							}
							break;
						case "MFD_FIX_ASSET":
							if(item.commentText){
								mfdTotalFixedAssets.currencyCode=item.commentText.substring(0,3);
								mfdTotalFixedAssets.amount=item.commentText.substring(4);
							}
							break;
						case "MFD_LIABILITY":
							if(item.commentText){
								mfdTotalLiability.currencyCode=item.commentText.substring(0,3);
								mfdTotalLiability.amount=item.commentText.substring(4);
							}
							break;
						case "MFD_NET_WORTH":
							if(item.commentText){
								mfdTotalNetWorth.currencyCode=item.commentText.substring(0,3);
								mfdTotalNetWorth.amount=item.commentText.substring(4);
							}
							break;
				}
			}
		}
			fnaDataModel.KYCQuestions.knowledge = knowledge;
			fnaDataModel.financialSituation.assets.mfdTotalLiquidAssets=mfdTotalLiquidAssets;
			fnaDataModel.financialSituation.assets.mfdTotalFixedAssets=mfdTotalFixedAssets;
			fnaDataModel.financialSituation.mfdNetWorth=mfdTotalNetWorth;
			fnaDataModel.financialSituation.liability.mfdTotalLiability=mfdTotalLiability;
	},
	
	calculateTotaLiquidassetsPrefill:(financialSituation, fxRate)=>{
		  var totalLiquidassets = fnaUtil._calculateTotal(
                financialSituation.assets? financialSituation.assets.detailList:0,
                bizConfig.liquidassetsItems,
                fxRate,
                financialSituation.baseCurrenyCode,financialSituation.assets.total);

            if (totalLiquidassets.currencyCode === null) {
                totalLiquidassets.currencyCode = financialSituation.assets.total.currencyCode;
            }
            return totalLiquidassets;
	},

	populateLifeInsurancePremiumByAssets:(additionalSituations, categoryCode)=>{
		let  additionals=[];
		for (var index = 0; index < additionalSituations.length; index++) {
			 var additionalSituation = additionalSituations[index];
			if(categoryCode === additionalSituation.situationCategoryCode){
				additionals.push(additionalSituation);
			}
		}
        return additionals;
	},
	getTotalCurrency:(dataModelObj)=>{
		if(dataModelObj.total !== null && dataModelObj.total.currencyCode !== null){
            return dataModelObj.total.currencyCode;
        }else{
            return null;
        }
	},
	populateMonthlyIncome : (responseDataArr, key)=>{
			let reason=[] 
			for (var index = 0; index < responseDataArr.length; index++) {
				var responseData = responseDataArr[index];
				if(key === responseData.incomeTypeCode){
					reason.push(responseData)
				}
			}
        	return reason;
    },
    populateMonthlyExpense : (responseDataArr, key)=>{
			let reason=[]
			for (var index = 0; index < responseDataArr.length; index++) {
				var responseData = responseDataArr[index];
				if(key === responseData.expenseTypeCode){
					reason.push(responseData)
				}
			}
        	return reason;
    },
	initFinancialSituationDetailTotal:(fnaDataModel , responseComment)=>{
		calculationUtil.calculateSurplus(fnaDataModel.financialSituation);
        calculationUtil.calculateNetWorth(fnaDataModel.financialSituation);
        calculationUtil.calculateSavingCapacity(fnaDataModel.financialSituation);
        var emergencyFundsVar = {
    		emergeFundMode: null,
    		emergeFundDetail: {
    			efOption: null,
    			emergencyFundAmount: null,
    			efOverrideReason: null,
    			efSourceField: null,
    			userInputEmergencyFundAmount: 0,
    		},

            availableInvestment: null	

    	};
    	fnaDataModel.emergencyFunds = emergencyFundsVar;
        calculationUtil.calculateEmergencyFund(responseComment , fnaDataModel);
        calculationUtil.calculateAvailableInvestment(fnaDataModel);
		
	},
	 populateMoreIncomeDetails: (comments, key)=>{
			let moreIncomeArray=[]
			for (var index = 0; index < comments.length; index++) {
				var comment = comments[index];
				if("FNA_INC_DET" === comment.commentType){
					moreIncomeArray.push(comment)
				}
			}
            var commentTextEncodedStr = "";
			for (var x = 0; index < moreIncomeArray.length; x++) {
				 var comment = moreIncomeArray[x];
				 var commentKey = comment.commentKey;
				 if(key === commentKey){
                    commentTextEncodedStr = comment.commentText;
                }
			}
            if("" !== commentTextEncodedStr){
                //Base64 decode , JSON.parse
                var commentTextDecodedStr = commentTextEncodedStr; //utility.Base64.decode(commentTextEncodedStr);
                var incomeDetail = {};
                incomeDetail = JSON.parse(commentTextDecodedStr);
                return incomeDetail;
            }else{
                return {};
            }
        },
		populateAcknowledgeReasonDetails : (comments, key)=>{
			let reason=[]
			for (var index = 0; index < comments.length; index++) {
				var comment = comments[index];
				if(key === comment.commentType){
					reason.push(comment)
				}

			}
            if(reason && reason.length>0){
                var reasonKey = reason[0].commentKey;
                var reasonText = reason[0].commentText;
                return {key:reasonKey,text:reasonText};
            }else{
              return null;  
            }
        },
		populateLifeInsurancePremiumType : (comments, key)=>{
			let reason=[]
			for (var index = 0; index < comments.length; index++) {
				var comment = comments[index];
				if(key === comment.commentType){
					reason.push(comment)
				}

			}
            if(reason && reason.length>0){
                return reason[0].commentText;
            }else{
              return "";  
            }
        },
		_buildfnaDataModelList:(saveParam)=>{
			let fnaDate=commonConfig.financialProfiles;
			let newfnaDataModelList=fnaDate;
			var fnaDataModel=newfnaDataModelList;
			if(!ObjectHelper.isNullOrEmpty(saveParam)){
			 var financialSituation=newfnaDataModelList.financialSituation;
			 var income={ total: {currencyCode: null, amount: 0},
                detailList: []};
			 var expense={ total: {currencyCode: null, amount: 0},
                detailList: []};
			 var liability={ total: {currencyCode: null, amount: 0},
                detailList: []};
			 var assets={ total: {currencyCode: null, amount: 0},
                detailList: []};
			 var dependentNo=saveParam.numberOfDependents;
			 var emergencyFunds=saveParam.emergencyFund;
			 var investorIndicator=saveParam.investorIndicator;
			 var MIAESelected=saveParam.MIAESelected;
			//  var monthlyExpense=saveParam.monthlyExpense;
			//  var monthlyIncome=saveParam.monthlyIncome;
				  for (var x = 0,index=0,y=0;x < saveParam.income.length; x++) {
					   var incomeDetail = saveParam.income[x];
					  if(incomeDetail.typeCode==='TOTAL_INC'){
						  income.total=incomeDetail;
					  }
					  else{
						  income.detailList[index]=incomeDetail;
						  index++;
					  }
				  }
				  for (var x = 0,index=0,y=0; x < saveParam.expense.length; x++) {
					   var expenseDetail = saveParam.expense[x];
					  if(expenseDetail.typeCode==='TOTAL_EXP'){
						  expense.total=expenseDetail; 
					  }
					  else{
						   expense.detailList[index]=expenseDetail;
						   index++;
					  }
				  }
				  for (var x = 0,index=0; x < saveParam.liability.length; x++) {
					   var liabilityDetail = saveParam.liability[x];
					  if(liabilityDetail.typeCode==='TOTAL_LIA'){
						  liability.total=liabilityDetail;
					  }else{
						  liability.detailList[index]=liabilityDetail;
						  index++;
					  }
				  }
				  for (var x = 0,index=0; x < saveParam.assets.length; x++) {
					   var assetsDetail = saveParam.assets[x];
					  if(assetsDetail.typeCode==='TOTAL_AST'){
						  assets.total=assetsDetail;
						  assets.totalLiquidAssets=assetsDetail;
					  }else{
						    assets.detailList[index]=assetsDetail;
							index++;
					  }
				  }
			 }
                financialSituation.income=income;
				financialSituation.expense=expense;
				financialSituation.assets=assets;
				financialSituation.liability=liability;
				financialSituation.dependentNo=dependentNo;
				financialSituation.emergencyFunds=emergencyFunds;
				financialSituation.investorIndicators=investorIndicator;
				financialSituation.MIAESelected=MIAESelected;
				// financialSituation.monthlyIncome=monthlyIncome;
				// financialSituation.monthlyExpense=monthlyExpense;
				fnaDataModel.financialSituation=financialSituation;
				newfnaDataModelList=fnaDataModel;
			return newfnaDataModelList
		}
}

export default fnaUtil;