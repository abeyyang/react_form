
 
 const insuranceQuoteForm ={
    

    getInsuranceQuoteForm:()=>{
        let insuranceQuoteFormBean={
                quotationInquotationInternalReferenceNumberternalReferenceNumber:'',
                applicationReferenceNumber:'',
                allocationSequenceNumber:'',
                packageId:'',
                productCodeAlternativeClassificationCode:'',
                productTypeCode:'',
                productAlternativeNumber:'',
                countryProductTradableCode:'',
                quotationValidToDateTime:'',
                quotationValidToTimeZone:'',
                expiryDate:'',
                expiryTime:'',
                currencyCoverageCode:'',
                coverageAmount:{

                },
                coverageAmountStr:'',
                coverageTermNumber:'',
                coverageTermPeriodicityCode:'',
                selectCurrencyCoverageIndex:'',
                currencyPremiumCode:'',
                premiumAmount:{
                    
                },
                premiumAmountStr:'',
                paymentPeriodicityCode:'',
                selectCurrencyPremiumIndex:'',
                productName:'',
                dropDownKeys:[],
                dropDownOptionsMap:{},
                dropDownValueMap:{},
                currencyMapKeys:[],
                amountRegex:'',
                baseCurrency:'',
                prodSelMedCode:'',
                yearTerm:'',
                policyEffectiveDate:'',
                policyTerm:'',
                policyTermMaxAge:'',
                riderInfoList:[],
                selectedRiderList:[],
                documentFinancialTypeCode:'',
                protectPeriod:'',
                customerObjective:'',
                contributionPeriod:'',
                goalTypeCode:'',
                targetSavingAmountOption:'',
                selectCurrencyProjectedIndex:0,
                projectedAmount:{},
                targetDate:'',
                projectedAmountTooltip:'',
                projectedSavingAmountindicator:''
        };
        // quotationInternalReferenceNumber  locale.format(new Date() , {selector: 'date' , datePattern: 'yyyyMMddHHmmss'});

        return insuranceQuoteFormBean
    }

 
}

export default insuranceQuoteForm;
