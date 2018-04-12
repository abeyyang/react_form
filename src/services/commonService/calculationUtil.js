import {commonConfig} from '../config/fna/commonConfig'
import ObjectHelper from '../../common/lib/ObjectHelper';
let pvcConfig=commonConfig.pvcConfig;
let bizConfig=commonConfig.bizConfig;
let FNAConstants=commonConfig.FNAConstants;
let currencyConfig=commonConfig.currencyConfig
export const calculationUtil={
    getTotalThroughTotal:(total, totalAmountRelatedTypeCodes, fxRates, totalAmountCcy)=>{
        	var totalAmountValue = 0; 
			var ccy;
			var initAmount;
			if(total&&total.currencyCode){
				ccy = total.currencyCode;
			}
			if(total&&(typeof total.amount)!='undefined'){
				initAmount = total.amount;
			}
			if(!ccy||typeof initAmount=='undefined'){
				return;
			}
			
			if(ccy!=totalAmountCcy){
				var fxRate = 1;
                let fxRateArr=[];
                for (var index = 0; index < fxRates.length; index++) {
                    var fxRateVar = fxRates[index];
                    if(fxRateVar.fxRateCurrencyFrom === ccy && fxRateVar.fxRateCurrencyTo === totalAmountCcy){
                        fxRateArr.push(fxRateVar);
                    }
                }
				if(fxRateArr != null && fxRateArr[0] != null){
					fxRate = fxRateArr[0].fxRateValue;
				} else {
					console.log("fxRate missing : " + ccy + " VS. " + totalAmountCcy);
				}
				totalAmountValue = totalAmountValue + initAmount * fxRate;
			}else{
				totalAmountValue = initAmount;
			}
			return totalAmountValue;
    },
    getTotal:(amounts, totalAmountRelatedTypeCodes, fxRates, totalAmountCcy)=>{
        //filter the valid amounts (amounts.amount is numeric -> true)
        let validAmounts=[]
        for (var index = 0; index < amounts.length; index++) {
             var amount = amounts[index];
            if(null !== amount.amount && !isNaN(amount.amount)){
                validAmounts.push(amount);
            }
        }
		if(validAmounts.length > 0){
			var totalAmountValue = 0; 
            for (var y = 0; y < validAmounts.length; y++) {
                var item = validAmounts[y];
                var ccy = item.currencyCode;
				var amountValue = item.amount;
				if (ccy != null) {
                    let flag=false;
                    for (var index = 0; index < totalAmountRelatedTypeCodes.length; index++) {
                        var element = totalAmountRelatedTypeCodes[index];
                        if(element===item.typeCode){
                            flag=true;
                        }
                    }
					if(flag){
					var fxRate = 1 ;
						if(ccy != totalAmountCcy){
                            let fxRateArr=[]
                            for (var x = 0; x < fxRates.length; x++) {
                                var fxRateVar = fxRates[x];
                                if(fxRateVar.fxRateCurrencyFrom ===ccy && fxRateVar.fxRateCurrencyTo === totalAmountCcy){
                                    fxRateArr.push(fxRateVar);
                                }
                            }
                            console.log("fxRateArr[0]:" ,fxRateArr[0]);
							if(fxRateArr != null && fxRateArr[0] != null){
                                 console.log("fxRateArr[0]...." );
                                fxRate = fxRateArr[0].fxRateValue;
							} else {
								console.log("fxRate missing : " + ccy + " VS. " + totalAmountCcy);
							}
						}			
						totalAmountValue = totalAmountValue + amountValue * fxRate;
					}
				}
            }
			return totalAmountValue;
		}else{
			return;
		}
    },
    calculateSurplus:(financialSituation)=>{
            var totalIncome = financialSituation.income.total.amount;
            var totalExpense = financialSituation.expense.total.amount;
            if(null !== totalIncome && !isNaN(totalIncome) && null !== totalExpense && !isNaN(totalExpense)){
                var totalAmount = totalIncome-totalExpense;
                var total = {
                    currencyCode: financialSituation.baseCurrenyCode,
                    amount: totalAmount
                };


                if(financialSituation.surplus == null){
                    financialSituation.surplus = new Object();
                }

                financialSituation.surplus.currencyCode = total.currencyCode;
                financialSituation.surplus.amount = !isNaN(total.amount)? total.amount : 0;

                return total;
            }else{
                if(financialSituation.surplus == null){
                    financialSituation.surplus = new Object();
                }

                financialSituation.surplus.currencyCode = financialSituation.baseCurrenyCode;
                financialSituation.surplus.amount = null;
                return;
            }
    },
    calculateNetWorth:(financialSituation)=>{
         var totalLiquidAssets = financialSituation.assets.totalLiquidAssets.amount;
         var totalLiability = financialSituation.liability.total.amount;

            if(null !== totalLiquidAssets && !isNaN(totalLiquidAssets) && null !== totalLiability && !isNaN(totalLiability)){
                var totalAmount = totalLiquidAssets-totalLiability;
                var total =  {
                    currencyCode: financialSituation.baseCurrenyCode,
                    amount: totalAmount
                };
                if(financialSituation.netWorth == null){
                    financialSituation.netWorth = new Object();
                }
                financialSituation.netWorth.currencyCode = total.currencyCode;
                financialSituation.netWorth.amount = !isNaN(total.amount)? total.amount : 0;
                return total;

            }else{
                if(financialSituation.netWorth == null){
                    financialSituation.netWorth = new Object();
                }
                financialSituation.netWorth.currencyCode =  financialSituation.baseCurrenyCode;
                financialSituation.netWorth.amount = null;//!isNaN(total.amount)? total.amount : 0;
                return;
            }
    },
    calculateSavingCapacity:(financialSituation)=>{
         var surplus = financialSituation.surplus.amount;
            var totalInvestment = financialSituation.investment.total.amount;

            if(null !== surplus && !isNaN(surplus) && null !== totalInvestment && !isNaN(totalInvestment)){

                var totalAmount = surplus-totalInvestment;
                var total =  {
                    currencyCode: financialSituation.baseCurrenyCode,
                    amount: totalAmount
                };
                if(financialSituation.savingCapacity == null){
                    financialSituation.savingCapacity = new Object();
                }
                financialSituation.savingCapacity.currencyCode = total.currencyCode;
                financialSituation.savingCapacity.amount = !isNaN(total.amount)? total.amount : 0;

                return total;
            }else{
                if(financialSituation.savingCapacity == null){
                    financialSituation.savingCapacity = new Object();
                }
                financialSituation.savingCapacity.currencyCode =  financialSituation.baseCurrenyCode;
                financialSituation.savingCapacity.amount = null;//!isNaN(total.amount)? total.amount : 0;
                return;
            }
    }, 
     calculateEmergencyFund:(comments , fnaDataModel)=>{
            var emergencyFund = null;
            var efCalculateMethod = bizConfig.efConfig["ef_calculate_Method"];
            var efCalculateMethodConfig = bizConfig.efConfig["ef_calculate_Method_" + efCalculateMethod ];
            if(efCalculateMethod == "higerAmount"){
                var refAmount = efCalculateMethodConfig["refAmount"]*1000;
                var netWorthPersent = efCalculateMethodConfig["netWorthPersent"] * 0.01;
                var netWorthPersentAmount = netWorthPersent * fnaDataModel.financialSituation.netWorth.amount;
                if (netWorthPersentAmount > refAmount){
                    emergencyFund = netWorthPersentAmount;
                }else{
                    emergencyFund = refAmount;
                }

            } else if(efCalculateMethod == "month"){
                var month= efCalculateMethodConfig["month"];
                var type= efCalculateMethodConfig["type"];
                var totalAmountRelatedTypeCodes = [];

                if(type == "TotalExpense"){
                    totalAmountRelatedTypeCodes = bizConfig.expenseItems;

                }else if(type == "TotalLivingexpense"){
                    totalAmountRelatedTypeCodes = bizConfig.livingexpenseItems;

                }

                var amounts = fnaDataModel.financialSituation.expense.detailList;
                var fxRates = fnaDataModel.fxRate;
                var totalAmountCcy = fnaDataModel.financialSituation.baseCurrenyCode;

                var baseAmount = 0;
                
                if(bizConfig.needFxRateEmergency){
                	 baseAmount = calculationUtil.getTotal(amounts, totalAmountRelatedTypeCodes, fxRates, totalAmountCcy);
                }else{
                	 baseAmount = calculationUtil.getTotal(amounts, totalAmountRelatedTypeCodes, null, totalAmountCcy);
                }
                if(amounts&&amounts.length==0){
                	emergencyFund =  fnaDataModel.financialSituation.expense.total.amount * month;
                }else{
                	emergencyFund =  baseAmount * month;
                }
                
            }

            // return emergencyFund;

            var total = {
                currencyCode: fnaDataModel.financialSituation.baseCurrenyCode,
                amount: emergencyFund
            };

            if(fnaDataModel.emergencyFunds.emergeFundDetail.emergencyFundAmount == null){
                fnaDataModel.emergencyFunds.emergeFundDetail.emergencyFundAmount = new Object();
                fnaDataModel.emergencyFunds.emergeFundDetail.userInputEmergencyFundAmount = 0;
            }

            fnaDataModel.emergencyFunds.emergeFundDetail.emergencyFundAmount.currencyCode = total.currencyCode;
            fnaDataModel.emergencyFunds.emergeFundDetail.emergencyFundAmount.amount = total.amount; //!isNaN(total.amount)? total.amount : 0;
           
            
            if(comments && comments.length > 0){
                let efComments=[];
                for (var index = 0; index < comments.length; index++) {
                    var comment = comments[index];
                    if(comment.commentType === "EF"){
                        efComments.push(comment);
                    }
                }
                for(var i = 0 ; i < efComments.length ; i++){
                    if("EF_REASON" == efComments[i].commentKey){
                        fnaDataModel.emergencyFunds.emergeFundDetail.efOverrideReason = efComments[i].commentText;
                    }else if("EF_SOURCE" == efComments[i].commentKey){
                        fnaDataModel.emergencyFunds.emergeFundDetail.efSourceField = efComments[i].commentText;
                    }
                }
            }

            return total;

    }, 
     calculateAvailableInvestment:(fnaDataModel, userInput)=>{
        var netWorth = fnaDataModel.financialSituation.netWorth.amount;
            var emergencyFund = (fnaDataModel.emergencyFunds.emergeFundDetail && fnaDataModel.emergencyFunds.emergeFundDetail.emergencyFundAmount) ? fnaDataModel.emergencyFunds.emergeFundDetail.emergencyFundAmount.amount : null;
            
            // if user choose user input
            if(userInput) {
            	if (emergencyFund) {
            		emergencyFund = fnaDataModel.emergencyFunds.emergeFundDetail.userInputEmergencyFundAmount;
            	}
            }
            	
            if(null !== netWorth && !isNaN(netWorth) && null !== emergencyFund && !isNaN(emergencyFund)){
                var totalAmount = netWorth-emergencyFund;
                var total = {
                    currencyCode: fnaDataModel.financialSituation.baseCurrenyCode,
                    amount: totalAmount
                };
                if(fnaDataModel.emergencyFunds.availableInvestment == null){
                    fnaDataModel.emergencyFunds.availableInvestment = new Object();
                }
                fnaDataModel.emergencyFunds.availableInvestment.currencyCode = total.currencyCode;
                fnaDataModel.emergencyFunds.availableInvestment.amount = !isNaN(total.amount)? total.amount : 0;
                return total;
            }else{
                if(fnaDataModel.emergencyFunds.availableInvestment == null){
                    fnaDataModel.emergencyFunds.availableInvestment = new Object();
                }
                fnaDataModel.emergencyFunds.availableInvestment.currencyCode = fnaDataModel.financialSituation.baseCurrenyCode;
                fnaDataModel.emergencyFunds.availableInvestment.amount = null;//!isNaN(total.amount)? total.amount : 0;
                return;
            }
    }
}