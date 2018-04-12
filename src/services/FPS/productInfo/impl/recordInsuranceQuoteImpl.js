

import recordInsuranceQuoteRequestBuilder from '../builder/recordInsuranceQuoteRequestBuilder';
import insuranceCoverageArrangement from '../model/insuranceCoverageArrangement';
import insuranceQuoteForm from '../model/insuranceQuoteForm';
import entityInformation from '../model/entityInformation';
import productId from '../model/productId';
import quoteId from '../model/quoteId';
import quotationArrangement from '../model/quotationArrangement';
import ObjectHelper from '../../../../common/lib/ObjectHelper';
import insuranceQuoteConfig from  '../../../config/productInfo/insuranceQuoteConfig'
import {insuranceQuoteConstants} from '../../../config/productInfo/insuranceQuoteConstants';
import {productSearchConstants} from '../../../config/goalSolution/productSearchConstants'
import formatHelper from '../../../../common/lib/formatHelper';
const recordInsuranceQuoteImpl={
    buildRecordInsuranceQuoteRequest:(params)=>{
            let request={}
            let sessionInfo=params.sessionInfo,
            productAlternativeNumber=params.productAlternativeNumber,
            riderInfoList=params.riderInfoList,
            selectedRiderList=params.selectedRiderList,
            customerProfile=params.customerProfile,
            yearTerm=params.yearTerm,
            insuranceQuoteFormBean=insuranceQuoteForm.getInsuranceQuoteForm(),
            policyEffectiveDate=params.policyEffectiveDate,
            enInfoBean=entityInformation.getEntityInformation(),
            quoteIdBean=quoteId.getQuoteId(),
            quotationArrangementBean=quotationArrangement.getQuotationArrangement(),insuranceCoverageArrangementBean=insuranceCoverageArrangement.getInsuranceCoverageArrangement();
            // let rideInfo=insuranceQuoteFormBean.RiderInfoList
            let requestParams={
                sessionInfo,insuranceQuoteFormBean,enInfoBean,quoteIdBean,quotationArrangementBean,insuranceCoverageArrangementBean
                
            }
            quoteIdBean.productAlternativeNumber=productAlternativeNumber;
            let enInfo=recordInsuranceQuoteRequestBuilder.buildEnInfo(sessionInfo,enInfoBean);
            let quote=recordInsuranceQuoteRequestBuilder.buildQuoteId(sessionInfo,quoteIdBean);
            if(!ObjectHelper.isNullOrlengthZore(riderInfoList)){
                let riderInformation=recordInsuranceQuoteRequestBuilder.buildRiderInformation(riderInfoList,selectedRiderList,customerProfile,yearTerm,policyEffectiveDate);
            }
            let ProductId=productId.getProductId();
            ProductId.countryProductTradableCode=insuranceQuoteFormBean.countryProductTradableCode;
            ProductId.productAlternativeNumber=insuranceQuoteFormBean.productAlternativeNumber;
            ProductId.productCodeAlternativeClassificationCode=insuranceQuoteFormBean.productCodeAlternativeClassificationCode;
            ProductId.productTypeCode=insuranceQuoteFormBean.getProductTypeCode;
            // if(null != insuranceQuoteFormBean.expiryDate){
            //     let timezone 
            // }

            insuranceCoverageArrangementBean.coverageAmount=insuranceQuoteFormBean.coverageAmount.value;
            if(!ObjectHelper.isEmpty(insuranceQuoteFormBean.coverageTermNumber)){
                let coverageTermBigDecimal=insuranceQuoteFormBean.coverageTermNumber;
                insuranceCoverageArrangementBean.coverageTermNumber=coverageTermBigDecimal;
                insuranceCoverageArrangementBean.coverageTermPeriodicityCod=recordInsuranceQuoteRequestBuilder.getOptionValueByKey(insuranceQuoteFormBean.coverageTermPeriodicityCode,insuranceQuoteFormBean.dropDownValueMap);
            }   
             insuranceCoverageArrangementBean.currencyCoverageCode=recordInsuranceQuoteRequestBuilder.getCurrencyByKey(insuranceQuoteFormBean.selectCurrencyCoverageIndex,insuranceQuoteFormBean.currencyMapKeys);


            let expiryDate=params.quotationDetails.expiryDate;
            let expiryTime=params.quotationDetails.expiryTime;
            if(expiryDate&&expiryTime){
            	var timeStamp=null;
                expiryDate=expiryDate.split("/");
                var newExpiryDate=expiryDate[2]+"-"+expiryDate[1]+"-"+expiryDate[0];
                var hh=expiryTime[0]+expiryTime[1];
                var mm=expiryTime[2]+expiryTime[3];
                var ss="00";
                var newExpiryTime=hh+":"+mm+":"+ss;
                timeStamp=newExpiryDate+"T"+newExpiryTime+"+08:00";
                quotationArrangementBean.quotationValidToDateTime={};
                quotationArrangementBean.quotationValidToDateTime=timeStamp;
            }

        let  productQuotationAmount=[];
        productQuotationAmount.push({
            currencyPremiumCode:recordInsuranceQuoteRequestBuilder.getCurrencyByKey(insuranceQuoteFormBean.selectCurrencyPremiumIndex),
            paymentPeriodicityCode:recordInsuranceQuoteRequestBuilder.getOptionValueByKey(insuranceQuoteFormBean.paymentPeriodicityCode),
            premiumAmount:insuranceQuoteFormBean.premiumAmount.value
        })
        quotationArrangementBean.productQuotationAmount=productQuotationAmount;
        // save payment term to quotation local fields
        let quotationLocalFieldsArray=[];
        quotationLocalFieldsArray.push({
            localFieldNameCode:insuranceQuoteConstants.PayTerm
        })
        if (insuranceQuoteConstants.IQ_FREQUENCY_TYPE_SINGL==insuranceQuoteFormBean.getPaymentPeriodicityCode()) {
            quotationLocalFieldsArray[0].localFieldValu="1";
        } else {
            quotationLocalFieldsArray[0].localFieldValue=insuranceQuoteFormBean.yearTerm;
        }
           
        if (insuranceQuoteFormBean.policyEffectiveDate!= null) {
                quotationLocalFieldsArray.push({
                        localFieldNameCode:insuranceQuoteConstants.POLICY_EFFECTIVE_DATE,
                        localFieldValue:  formatHelper.dateFormatPattern(insuranceQuoteFormBean.policyEffectiveDate,'yyyyMMdd')
                })

         }
        let showPolicyTerm=insuranceQuoteConfig[insuranceQuoteConstants.SHOW_POLICY_TERM];
        if(showPolicyTerm==true){
            let holderAge =0;
            	if (customerProfile.dateOfBirth!=null) {
                        let dob=new Date;
                        dob.setTime(customerProfile.dateOfBirth);
                        let today=new Date;
                        holderAge=today.getFullYear()-dob.getMonth()
                        if(today.getMonth() < dob.getMonth() ){
                            holderAge--; 
                        }else if(today.getMonth()==dob.getMonth && today.getDay() < dob.getDay()){
                            holderAge--; 
                        }
                }
            insuranceQuoteFormBean.policyTerm=insuranceQuoteFormBean.yearTerm;
                if(insuranceQuoteFormBean.policyTermMaxAge!=null){
                    let maxAge=0;
                    try {
                        maxAge=parseInt(insuranceQuoteFormBean.protectPeriod) 
                    } catch (error) {
                            maxAge=0
                    }
                    if(maxAge > 0){
                            let policyTerm=maxAge -holderAge;
                            insuranceQuoteFormBean.policyTerm(parseInt(policyTerm)+'');
                    }
                }
        }

       




        if(insuranceQuoteFormBean.policyTerm !=null){
            quotationLocalFieldsArray.push(
                {
                    localFieldNameCode:insuranceQuoteConstants.POLICY_TERM,
                    localFieldValue:insuranceQuoteFormBean.policyTerm
                }
            )
        }

        if(productSearchConstants.WITH_VALUE==insuranceQuoteFormBean.targetSavingAmountOption && productSearchConstants.YES == insuranceQuoteFormBean.projectedSavingAmountindicator){
            quotationLocalFieldsArray.push({
                 localFieldNameCode:insuranceQuoteConstants.PROJECT_RETURN_AMOUNT,
                    localFieldValue:insuranceQuoteFormBean.projectedAmount.value+''
            })
            quotationLocalFieldsArray.push({
                     localFieldNameCode:insuranceQuoteConstants.PROJECT_RETURN_AMOUNT_CCY,
                    localFieldValue:recordInsuranceQuoteRequestBuilder.getCurrencyByKey(insuranceQuoteFormBean.selectCurrencyCoverageIndex)
            })
            quotationLocalFieldsArray.push({
                     localFieldNameCode:insuranceQuoteConstants.TARGET_DATE_FOR_RETURN,
                    localFieldValue:insuranceQuoteFormBean.targetDate
            })
        }



             request.entityInformation=enInfo;
             request.quoteId=quote;
             request.insuranceCoverageArrangement=insuranceCoverageArrangementBean;
             request.productId=ProductId;
             request.quotationArrangement=quotationArrangementBean;
             return request;

    },

}

export default recordInsuranceQuoteImpl;
