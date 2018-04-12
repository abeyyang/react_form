
import ObjectHelper from '../../../../common/lib/ObjectHelper';
import formatHelper from '../../../../common/lib/formatHelper';
import {insuranceQuoteConstants} from '../../../config/productInfo/insuranceQuoteConstants';

const recordInsuranceQuoteRequestBuilder={
    buildEnInfo:(sessionInfo,enInfoBean)=>{
        let  enInfo=enInfoBean
        enInfo.countryISOCode=ObjectHelper.isNullOrEmpty(sessionInfo.countryISOCode) ? '':sessionInfo.countryISOCode;
        enInfo.groupMemberCode=ObjectHelper.isNullOrEmpty(sessionInfo.groupMemberCode) ? '':sessionInfo.groupMemberCode; 
        return  enInfo;
    },
    buildQuoteId:(sessionInfo,quoteIdBean)=>{
        let quoteId=quoteIdBean;
    // customerId + staffId + productAlternativeNumber;
        let customerId=sessionInfo.customerId
        let staffId=sessionInfo.staffId
        let productAlternativeNumber=sessionInfo
        quoteId.quotationInternalReferenceNumber=customerId + staffId + quoteId.productAlternativeNumber;
        let nowDate= new Date();
    //    locale.format(new Date() , {selector: 'date' , datePattern: 'yyyyMMddHHmmss'});
        quoteId.applicationReferenceNumber=formatHelper.dateFormatPattern(nowDate,'yyyyMMddHHmmss')
    
        return  quoteId;

    },
    buildRiderInformation:(riderInfoList,selectedRiderList,customerProfile,yearTerm,policyEffectiveDate)=>{
        let riderAttrBute=[];
        let i=0;
        for (var index = 0; index < riderList.length; index++) {
            // set RiderInformation
             var rider = riderList[index];
             let rideInfo={};
             rideInfo.riderCode=rider.riderCode;
             let attrList=[];
             let selectedValue='N';
             for (var selectedRiderCodeIndex = 0; selectedRiderCodeIndex < selectedRiderList.length; selectedRiderCodeIndex++) {
                  var selectedRiderCode = selectedRiderList[selectedRiderCodeIndex];
                 	if (selectedRiderCode==rider.riderCode) {
                        rider.discussed=true;
                        rider.selected=true;
                        selectedValue = "Y";
                        break;
                     }
             }
              // set RiderAttribute selected indicator
             recordInsuranceQuoteRequestBuilder.setRiderAttribute(insuranceQuoteConstants.SEL_IND,insuranceQuoteConstants.TEXT,selectedValue,attrList);
              // set RiderAttribute discussed indicator
             recordInsuranceQuoteRequestBuilder.setRiderAttribute(insuranceQuoteConstants.DIS_IND,insuranceQuoteConstants.TEXT,selectedValue,attrList);
             if(rider.selected){
                  // set RiderAttribute payment term indicator
                recordInsuranceQuoteRequestBuilder.setRiderAttribute(insuranceQuoteConstants.PAY_TERM,insuranceQuoteConstants.NUMBER,yearTerm,attrList);
                 // set RiderAttribute protection period
                recordInsuranceQuoteRequestBuilder.setRiderAttribute(insuranceQuoteConstants.PROT_PERD,insuranceQuoteConstants.NUMBER,recordInsuranceQuoteRequestBuilder.getProtectionPeriod(rider.protectionPeriod,customerProfile,policyEffectiveDate,yearTerm),attrList);
             }
             rideInfo.riderAttribute=attrList
             riderAttrBute[i] = rideInfo;
              i++;
        }
        return riderAttrBute
    },
    setRiderAttribute:(nameCode,typeCode,value,attrList)=>{
        let riderAttr={};
        riderAttr.riderAttributeNameCode=nameCode;
        riderAttr.riderAttributeTypeCode=typeCode;
        riderAttr.riderAttributeValue=value;
        attrList.push(riderAttr);
    },  
    getRiderProtectionPeriod:(value,customerProfile,policyEffectiveDate,yearTerm)=>{
        let protectionPeriod = value;
        if(ObjectHelper.isNullOrEmpty(protectionPeriod)){
            try {
                let age = recordInsuranceQuoteRequestBuilder.calculateAgeByPolicyEffectiveDateForRider(customerProfile,policyEffectiveDate);
                if(age!=null){
                    let paymentTermInt=parseInt(yearTerm);
                    protectionPeriod=paymentTermInt +age+'';
                }
            } catch (error) {
                if(this.isDebug){
					console.log("Error on caculate rider protection period",error);
				}
            }
        }
    	return protectionPeriod;
    },
    calculateAgeByPolicyEffectiveDateForRider:(customerProfile,policyEffectiveDate)=>{

        let age = null;
        let date= new cale
        if(customerProfile !=null && policyEffectiveDate != null){
            let birthDateCalendar=new Date;
            birthDateCalendar.setTime(customerProfile.dateOfBirth);
            policyEffectiveCalendar.setTime(policyEffectiveDate);
            let birthDateYear=birthDateCalendar.getFullYear();
            let birthDateMonth=birthDateCalendar.getMonth()+1;
            let birthDateDayOfMonth = birthDateCalendar.getDate();
            let policyYear = policyEffectiveCalendar.getFullYear();
            let policyMonth = policyEffectiveCalendar.getMonth()+1;
            let policyDayOfMonth= policyEffectiveCalendar.getDate();
            age = policyYear - birthDateYear;
             if (policyMonth > birthDateMonth || (policyMonth == birthDateMonth && policyDayOfMonth >= birthDateDayOfMonth)) {
	        	age = age +1 ;
	        }
        }
        return age;
    },
    getOptionValueByKey:(key,dropDownValueMap)=>{
        let optionValue = '';
        if (dropDownValueMap != null) {
            optionValue = dropDownValueMap.get(key);
        }
        return optionValue;
    },
    getCurrencyByKey:(currencyIndex,currencyMapKeys)=>{
         let currencyCode = '';
        if (null != currencyMapKeys) {
            let  size = currencyMapKeys.length;
            if (currencyIndex > 0 && currencyIndex <= size) {
                let  index = currencyIndex - 1;
                currencyCode = currencyMapKeys[index];
            }
        }
        return currencyCode;
    }
}   

export default recordInsuranceQuoteRequestBuilder;
