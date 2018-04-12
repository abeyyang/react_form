import ObjectHelper from '../../../../../common/lib/ObjectHelper';
const reviewInvestmentResponseBuilder={
    convertResponseImpl:(response)=>{
        let validationResult = {
            validationList:[],
            totalNetWorth:{}
        };
        let validationDetails = response.validationDetails;
        if(!ObjectHelper.isNullOrEmpty(validationDetails)){
            validationDetails.map((validation)=>{
                validation.validationResultAttributes.map((validationAttr)=>{
                    if(validationAttr.key == 'TL_LIQ_NET_WORTH' && !ObjectHelper.isNullOrEmpty(validationAttr.value)) 
                    validationResult.totalNetWorth.key =  validationAttr.key,validationResult.totalNetWorth.value = validationAttr.value;
                    if(validationAttr.key == 'CCY' || validationAttr.key == 'CAL_CCY') validationResult.totalNetWorth.currency = validationAttr.value;
                    if(validationAttr.key == 'VAL_TYPE_CODE' && !ObjectHelper.isNullOrEmpty(validationAttr.value)){
                        let obj = reviewInvestmentResponseBuilder.convertValidationAttrtoObj(validationAttr.value,validation.validationResultAttributes);
                        if(!ObjectHelper.isNullOrEmpty(obj.value) || (validationAttr.value == 'AC_INVST' && !ObjectHelper.isNullOrEmpty(obj.BondValidation.value)
                        ||(validationAttr.value == 'AC_INVST' && !ObjectHelper.isNullOrEmpty(obj.UTValidation.value))
                        || (validationAttr.value == 'AC_INVST' && !ObjectHelper.isNullOrEmpty(obj.STRUValidation.value)))){
                            console.log(obj);
                            validationResult.validationList.push(obj);
                        }
                    }
                })
            })
        }
        console.log("validationResult obk",validationResult);
        return validationResult;
    },
    convertValidationAttrtoObj:(typeCode,list)=>{
         let validationObj ={};
        list.map((item)=>{
            validationObj.typeCode = typeCode;
            if(item.key == 'CAL_RESULT') validationObj.key = item.key,validationObj.value = item.value;
            if(item.key =='CCY' ||item.key =='CAL_CCY') validationObj.currency =item.value;
            if(item.key == 'CAL_UT_RATIO') validationObj.UTValidation = item ;
            if(item.key == 'CAL_STRU_RATIO') validationObj.STRUValidation = item;
            if(item.key == 'CAL_BOND_RATIO') validationObj.BondValidation = item;
        })
        console.log("validationObj",validationObj);
        return validationObj
    }
}
export default reviewInvestmentResponseBuilder;