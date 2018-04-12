import ObjectHelper from '../../common/lib/ObjectHelper';
import {goalSolutionConfig} from '../config/goalSolution/goalSolutionConfig'; 
import {productSearchConstants} from '../config/goalSolution/productSearchConstants';
export const prodSearchUtils={
    buildCommonSearchCriteria:(searchFormBean,criterias,isProudctCountCritieria)=>{
      if (!isProudctCountCritieria){
            prodSearchUtils.buildAllowBuyIndicatorCriteria(criterias);
        }
        prodSearchUtils.buildSearchOnshoreOffshoreCriteria(searchFormBean.onshoreOffshore,criterias);
        prodSearchUtils.buildRiskLevelCriteria(searchFormBean,criterias);
        prodSearchUtils.buildTimeToMaturityCriteria(searchFormBean.timeToMaturity,criterias);
        prodSearchUtils.buildUnderlyingInvestmentCriteria(searchFormBean.underlyingInvestment,criterias);
        prodSearchUtils.buildMarketCriteria(searchFormBean.market,criterias)
        prodSearchUtils.buildCurrencyCriteria(searchFormBean.currency,criterias)
        prodSearchUtils.buildMinimumInvestmentAmountCriteria(searchFormBean.minimumInvestmentAmount,criterias)

    },
    buildAllowBuyIndicatorCriteria:(criterias)=>{
        let value=productSearchConstants.CriteriaValue.Y
        let vals=[];
        let val={
            value:value
        }
        vals.push(val);
        let criteria={};
        criteria=prodSearchUtils.buildCriteria(null,productSearchConstants.CriteriaKey.ALLOW_BUY_PROD_IND,productSearchConstants.CriteriaKeyType.GENL,productSearchConstants.CriteriaOperator.EQUAL,productSearchConstants.CriteriaValueType.TEXT,vals)
        criterias.push(criteria);
        return criterias;
    },
    buildSearchOnshoreOffshoreCriteria:(expandBtnBean,criterias)=>{
        if (!prodSearchUtils.selectAllOrNonSelected(expandBtnBean)){
            let vals=new Array; let criteria={};
    		 vals = prodSearchUtils.buildSelectedList(expandBtnBean);
    		 criteria = prodSearchUtils.buildCriteria(null, productSearchConstants.CriteriaKey.PROD_SHORE_LOC_CDE,
                    productSearchConstants.CriteriaKeyType.UNTR, productSearchConstants.CriteriaOperator.EQUAL,
                    productSearchConstants.CriteriaValueType.REFDAT, vals);
                criterias.push(criteria);
    	}
    },
    buildRiskLevelCriteria:(searchFormBean,criterias)=>{
        let riskLevelIndex=searchFormBean.riskLevelIndex
        let riskLevelKeys=searchFormBean.riskLevelKeys
        let riskLevel=new String;
        riskLevel=prodSearchUtils.getSelected(riskLevelIndex,riskLevelKeys);
        if(ObjectHelper.isNullOrEmpty(riskLevel)){
            let riskLevelKeys=new Array;
            if(ObjectHelper.isNullOrEmpty(riskLevelKeys)){
                 riskLevel =riskLevelKeys[riskLevelKeys.length-1]
            }else{
                 riskLevel=productSearchConstants.CriteriaValue.NULL   
            }
        }
        let val1={
            value:null
        }
        val1.value=riskLevel;
        let val2={
            value:null
        }
        let vals=[
            val1
        ]
        if(!ObjectHelper.isNullOrEmpty(riskLevel)){
            vals.push(val2);
        }
        let criteria=prodSearchUtils.buildCriteria(null, productSearchConstants.CriteriaKey.RISK_LVL_CDE,
             productSearchConstants.CriteriaKeyType.GENL, productSearchConstants.CriteriaOperator.LESS_THAN_OR_EQUAL,
             productSearchConstants.CriteriaValueType.REFDAT, vals);
        criterias.push(criteria);
    },
    getSelected:(selectedIndex,list)=>{
        let index = selectedIndex;
        let result = null;
        if (!ObjectHelper.isNullOrEmpty(list)) {
            let size = list.length;
            if (index > 0 && index <= size) {
                //index--;
                result = list[index]
            }
        }
        return result;
    },
    buildTimeToMaturityCriteria:(expandBtnBean,criterias)=>{
        if(!prodSearchUtils.selectAllOrNonSelected(expandBtnBean)){
            let vals=[];
            vals=prodSearchUtils.buildSelectedList(expandBtnBean);
            let nullValue={
                value:null
            }
            let valueList=new Array;
            for (var index = 0; index < vals.length; index++) {
                 var val = vals[index];
                 valueList.push(val);
            }
            valueList.push(nullValue);
            let resultVals=new Array;
            resultVals=valueList;
            let criteria=prodSearchUtils.buildCriteria(null, productSearchConstants.CriteriaKey.TERM_REMAIN_DAY_CNT,
                    productSearchConstants.CriteriaKeyType.GENL, productSearchConstants.CriteriaOperator.RANGE,
                    productSearchConstants.CriteriaValueType.REFDAT, resultVals);
            criterias.push(criteria);
        }
    },
    buildUnderlyingInvestmentCriteria:(expandBtnBean,criterias)=>{
        if(!prodSearchUtils.selectAllOrNonSelected(expandBtnBean)){
            let vals=new Array;
            vals=prodSearchUtils.buildSelectedList(expandBtnBean);
            let criteria=prodSearchUtils.buildCriteria( null, productSearchConstants.CriteriaKey.ASET_UNDL_CDE,
                    productSearchConstants.CriteriaKeyType.UDAS, productSearchConstants.CriteriaOperator.EQUAL,
                    productSearchConstants.CriteriaValueType.TEXT, vals);
             criterias.push(criteria);      
        }
    },
    buildMarketCriteria:(expandBtnBean,criterias)=>{
        if (!prodSearchUtils.selectAllOrNonSelected(expandBtnBean)){
            let vals=new Array;
    		    vals = prodSearchUtils.buildSelectedList(expandBtnBean);
    		let criteria = prodSearchUtils.buildCriteria(null, productSearchConstants.CriteriaKey.MKT_INVST_CDE,
                    productSearchConstants.CriteriaKeyType.GENL, productSearchConstants.CriteriaOperator.EQUAL,
                    productSearchConstants.CriteriaValueType.REFDAT, vals);
    		 criterias.push(criteria);
    	}
    },
    buildCurrencyCriteria:(expandBtnBean,criterias)=>{
        if (!prodSearchUtils.selectAllOrNonSelected(expandBtnBean)){
            let vals=new Array;
    		    vals = prodSearchUtils.buildSelectedList(expandBtnBean);
    		 let criteria = buildCriteria(null,productSearchConstants.CriteriaKey.CCY_PROD_CDE,
    	                productSearchConstants.CriteriaKeyType.GENL, productSearchConstants.CriteriaOperator.EQUAL,
    	                productSearchConstants.CriteriaValueType.REFDAT, vals);
    	            criterias.push(criteria);
    	}
    },
    buildMinimumInvestmentAmountCriteria:(expandBtnBean,criterias)=>{
        if (!prodSearchUtils.selectAllOrNonSelected(expandBtnBean)){
             let vals=new Array;
    		     vals = prodSearchUtils.buildSelectedList(expandBtnBean);
    		let criteria = buildCriteria(null, productSearchConstants.CriteriaKey.INVST_INIT_MIN_AMT,
                    productSearchConstants.CriteriaKeyType.GENL, productSearchConstants.CriteriaOperator.RANGE,
                    productSearchConstants.CriteriaValueType.REFDAT, vals);
                criterias.push(criteria);
    	}
    },
    buildProductCodeCriteria:()=>{

    },
    buildHsbcHighlightCriteria:()=>{

    },
    buildAssetClassCriteria:()=>{

    },
    buildCriteria:(index,key,keyType,operator,valueType,vals)=>{
        let criteria={

        }
        let keyValueWithIndex={

        }
        keyValueWithIndex.index=index;
        keyValueWithIndex.keyType=keyType;
        keyValueWithIndex.key=key;
        keyValueWithIndex.operator=operator;
        keyValueWithIndex.valueType=valueType;
        criteria.keyValueWithIndex=keyValueWithIndex;
        criteria.value=vals;
        return criteria
    },
    buildSelectedList:(expandButtonBean)=>{
        if(null != expandButtonBean){
            let selectedArr=new Array;
            selectedArr=expandButtonBean.selectedVal;
            if(!ObjectHelper.isNullOrlengthZore(selectedArr)){
                let valueList=new Array;
                let selectedList=selectedArr;
                for (var index = 0; index < selectedList.length; index++) {
                    var selectedVal = selectedList[index];
                        let valObj={
                            value:selectedVal.value
                        };
                    valueList.push(valObj);
                }
                return valueList
            }
        }
        return null;
    },
    selectAllOrNonSelected:(expandBtnBean)=>{
        let result=false;
        if(expandBtnBean==null){
            return true;
        }
        let selectedVals=new Array;
        selectedVals=expandBtnBean.selectedVal;
        let optionList=new Array;
        optionList=expandBtnBean.optionList;
        if(ObjectHelper.isNullOrlengthZore(selectedVals)){
            return true;
        }
        if(selectedVals.length ==optionList.length){
            return true;
        }
        for (var index = 0; index < selectedVals.length; index++) {
             var selectedVal = selectedVals[index];
             if(productSearchConstants.FE_PROD_TYPE_CDE_ALL==selectedVal){
                  result = true;
    			  break;
             }
            
        }
        return result
    },
    convertToProdTypeMap:(productTypeBean)=>{
        let prodTypeMap=new Map;
        if(prodSearchUtils.selectAllOrNonSelected(productTypeBean)){
            let optionList=new Array;
            optionList=productTypeBean.optionList;
            for (var index = 0; index < optionList.length; index++) {
                 var option = optionList[index];
                 prodTypeMap.set(option.key,option.key);
            }
        }else{
            let selectedArr=new Array;
            selectedArr=productTypeBean.selectedVal;
            for (var index = 0; index < selectedArr.length; index++) {
                 var selectedVal = selectedArr[index];
                prodTypeMap.set(selectedVal,selectedVal);
            }
        }
        return prodTypeMap;
    },
    buildUTCriteria:(filterFormBean,criterias)=>{
        prodSearchUtils.buildHsbcWorldwideFundsServiceCriteria(filterFormBean.hsbcWorldwideFundsService, criterias);
        prodSearchUtils.buildFundHouseCriteria(filterFormBean.fundHouse, criterias);
        prodSearchUtils.buildFundCategoryCriteria(filterFormBean.fundCategory, criterias);
        prodSearchUtils.buildFundCodeCriteria(filterFormBean.fundCode, criterias);
        prodSearchUtils.buildTopPerformerCriteria(filterFormBean.topPerformer, criterias);
        prodSearchUtils.buildBestsellersCriteria(filterFormBean.bestsellers, criterias);
        prodSearchUtils.buildShareClassCriteria(filterFormBean.shareClass, criterias);
        prodSearchUtils.buildFundClassCriteria(filterFormBean.fundClass, criterias);
        prodSearchUtils.buildEligibilityForRegularSavingsPlanCriteria(filterFormBean.eligibilityForRegularSavingsPlan, criterias);
        prodSearchUtils.buildOnshoreOffshoreCriteria(filterFormBean.onshoreOffshore, criterias);
        let isaNonIsa=prodSearchUtils.getSelected(filterFormBean.isaNonIsaIndex,filterFormBean.isaNonIsaKeys);
         // ISA/ non ISA. (not need in AMH)
        prodSearchUtils.buildIsaNonIsaCriteria(isaNonIsa, criterias);
        prodSearchUtils.buildFundClass(filterFormBean.fundClassName, criterias);
    },
    buildINSCriteria:(filterFormBean,criterias)=>{
        prodSearchUtils.buildInsuranceProductTypeCriteria(filterFormBean.insuranceProductType,criterias)
    },
    buildHsbcWorldwideFundsServiceCriteria:(hsbcWorldwideFundsService,criterias)=>{
        if(!ObjectHelper.isNullOrEmpty(hsbcWorldwideFundsService)&&productSearchConstants.CriteriaValue.Y===hsbcWorldwideFundsService[0]){
            let val={
                value:null
            }
            val.value=productSearchConstants.CriteriaValue.SLT_SLT_1;
            let vals=new Array;
            vals.push(val);
            let criteria=new Map;
            criteria=prodSearchUtils.buildCriteria(null,
                 productSearchConstants.CriteriaKey.HSBC_WORLDWIDE_FUNDS_SERVICE, productSearchConstants.CriteriaKeyType.PDSL,
                 productSearchConstants.CriteriaOperator.EQUAL, productSearchConstants.CriteriaValueType.TEXT, vals);
            criterias.push(criteria);     
        }
    },
    buildFundHouseCriteria:(expandBtnBean,criterias)=>{
        if(!prodSearchUtils.selectAllOrNonSelected(expandBtnBean)){
            let vals=new Array;
            vals= prodSearchUtils.buildSelectedList(expandBtnBean);
            let criteria=new Map;
            criteria=prodSearchUtils.buildCriteria(null, productSearchConstants.CriteriaKey.FUND_HOUSE_CDE,
                    productSearchConstants.CriteriaKeyType.UNTR, productSearchConstants.CriteriaOperator.EQUAL,
                    productSearchConstants.CriteriaValueType.REFDAT, vals);
            criterias.push(criteria);   
        }
    },
    buildFundCategoryCriteria:(expandBtnBean,criterias)=>{
         if(!prodSearchUtils.selectAllOrNonSelected(expandBtnBean)){
            let vals=new Array;
            vals= prodSearchUtils.buildSelectedList(expandBtnBean);
            let criteria=new Map;
            criteria=prodSearchUtils.buildCriteria(null,
                    productSearchConstants.CriteriaKey.FUND_CATEGORY_PROD_SUBTP_CDE, productSearchConstants.CriteriaKeyType.GENL,
                    productSearchConstants.CriteriaOperator.EQUAL, productSearchConstants.CriteriaValueType.REFDAT, vals);
              criterias.push(criteria);   
    	}
    },
    buildFundCodeCriteria:(fundCode,criterias)=>{
        if(!ObjectHelper.isNullOrEmpty(fundCode)){
            let val={
                value:null
            }
            val.value=productSearchConstants.CriteriaValue.M + productSearchConstants.VALUE_OR + fundCode
            let vals=new Array;
            vals.push(val);     
            let criteria=new Map;
            criteria=prodSearchUtils.buildCriteria(null, 
                productSearchConstants.CriteriaKey.FUND_CODE_PROD_CDE_ALT_CLASS_CDE_OR_PROD_ALT_NUM,
                productSearchConstants.CriteriaKeyType.PDAL, productSearchConstants.CriteriaOperator.EQUAL,
                productSearchConstants.CriteriaValueType.TEXT, vals);
            criterias.push(criteria);
        }
    },
    buildTopPerformerCriteria:(temp,criterias)=>{
        if(!ObjectHelper.isNullOrlengthZore(temp) && productSearchConstants.CriteriaValue.Y===temp[0]){
             let val={
                 value:null
             }
             val.value=productSearchConstants.CriteriaValue.Y;
             let vals=new Array;
             vals.push(val);   
             let criteria=new Map;
             criteria=prodSearchUtils.buildCriteria(null, 
                productSearchConstants.CriteriaKey.TOP_PERFM_PROD_IND,
                productSearchConstants.CriteriaKeyType.GENL, productSearchConstants.CriteriaOperator.EQUAL,
                productSearchConstants.CriteriaValueType.TEXT, vals);
             criterias.push(criteria);

        }
    },
    buildBestsellersCriteria:(temp,criterias)=>{
        if(!ObjectHelper.isNullOrlengthZore(temp) && productSearchConstants.CriteriaValue.Y===temp[0]){
             let val={
                 value:null
             }
             val.value=productSearchConstants.CriteriaValue.Y;
             let vals=new Array;
             vals.push(val);   
             let criteria=new Map;
             criteria=prodSearchUtils.buildCriteria(null, 
                productSearchConstants.CriteriaKey.TOP_SELL_PROD_IND,
                productSearchConstants.CriteriaKeyType.GENL, productSearchConstants.CriteriaOperator.EQUAL,
                productSearchConstants.CriteriaValueType.TEXT, vals);
             criterias.push(criteria);

        }
    },
    buildShareClassCriteria:(expandBtnBean,criterias)=>{
         if(!prodSearchUtils.selectAllOrNonSelected(expandBtnBean)){
            let vals=new Array;
            vals= prodSearchUtils.buildSelectedList(expandBtnBean);
            let criteria=new Map;
            criteria=prodSearchUtils.buildCriteria(null, productSearchConstants.CriteriaKey.INCM_HANDL_OPT_CDE,
                    productSearchConstants.CriteriaKeyType.UNTR, productSearchConstants.CriteriaOperator.EQUAL,
                    productSearchConstants.CriteriaValueType.REFDAT, vals);
              criterias.push(criteria);   
    	}
    },
    buildFundClassCriteria:(expandBtnBean,criterias)=>{
         if(!prodSearchUtils.selectAllOrNonSelected(expandBtnBean)){
            let vals=new Array;
            vals= prodSearchUtils.buildSelectedList(expandBtnBean);
            let criteria=new Map;
            criteria=prodSearchUtils.buildCriteria(null, productSearchConstants.CriteriaKey.FUND_CLASS_CDE,
                    productSearchConstants.CriteriaKeyType.UNTR, productSearchConstants.CriteriaOperator.EQUAL,
                    productSearchConstants.CriteriaValueType.REFDAT, vals);
              criterias.push(criteria);   
    	}
    },
    buildEligibilityForRegularSavingsPlanCriteria:(temp,criterias)=>{
        if(ObjectHelper.isNullOrEmpty(temp)){
            let val={
                value:null
            }
             val.value=temp;
             let vals=new Array;
             vals.push(val);   
             let criteria=new Map;
             criteria=prodSearchUtils.buildCriteria(null, productSearchConstants.CriteriaKey.ALLOW_SELL_MIP_PROD_IND,
                productSearchConstants.CriteriaKeyType.GENL, productSearchConstants.CriteriaOperator.EQUAL,
                productSearchConstants.CriteriaValueType.TEXT, vals);
              criterias.push(criteria); 
        }   
    },
    buildOnshoreOffshoreCriteria:(expandBtnBean,criterias)=>{
         if(!prodSearchUtils.selectAllOrNonSelected(expandBtnBean)){
            let vals=new Array;
            vals= prodSearchUtils.buildSelectedList(expandBtnBean);
            let criteria=new Map;
            criteria=prodSearchUtils.buildCriteria(null, productSearchConstants.CriteriaKey.PROD_SHORE_LOC_CDE,
                    productSearchConstants.CriteriaKeyType.UNTR, productSearchConstants.CriteriaOperator.EQUAL,
                    productSearchConstants.CriteriaValueType.REFDAT, vals);
              criterias.push(criteria);   
    	}

    },
    buildIsaNonIsaCriteria:(isaNonIsa,criterias)=>{
        if(ObjectHelper.isNullOrEmpty(isaNonIsa)){
            if(productSearchConstants.FUND_ISA===isaNonIsa){
                let val={
                value:null
                }
                val.value=productSearchConstants.CriteriaValue.ONE;
                let vals=new Array;
                vals.push(val);   
                let criteria=new Map;
                criteria=prodSearchUtils.buildCriteria(null,
                    productSearchConstants.CriteriaKey.PROD_TAX_FREE_WRAP_ACT_STA_CDE, productSearchConstants.CriteriaKeyType.GENL,
                    productSearchConstants.CriteriaOperator.EQUAL, productSearchConstants.CriteriaValueType.TEXT, vals);
                criterias.push(criteria); 
            }else{
                let val1={
                    value:null
                }
                val1.value=productSearchConstants.CriteriaValue.TWO;
                let val2={
                    value:null
                }
                val2.value=productSearchConstants.CriteriaValue.THREE;
                let vals=new Array;
                vals.push(val1);
                vals.push(val2);
                let criteria=new Map;
                criteria=prodSearchUtils.buildCriteria(null,
                    productSearchConstants.CriteriaKey.PROD_TAX_FREE_WRAP_ACT_STA_CDE, productSearchConstants.CriteriaKeyType.GENL,
                    productSearchConstants.CriteriaOperator.EQUAL, productSearchConstants.CriteriaValueType.TEXT, vals);
                criterias.push(criteria); 
            }
        }
    },
    buildFundClass:(fundClassName,criterias)=>{
        if(ObjectHelper.isNullOrEmpty(fundClassName)){
            let val={
                value:null
            }
             val.value=fundClassName;
             let vals=new Array;
             vals.push(val);   
             let criteria=new Map;
             criteria=prodSearchUtils.buildCriteria(null, productSearchConstants.FUND_CLASS_GROUP_KEY,
    				productSearchConstants.CriteriaKeyType.EXFD, productSearchConstants.CriteriaOperator.EQUAL,
    				productSearchConstants.CriteriaValueType.TEXT, vals);
              criterias.push(criteria); 
        }   

    },
    buildInsuranceProductTypeCriteria:(insProdTypeBean,criterias)=>{
        let vals=new Array;
        vals=null;
        if(!prodSearchUtils.selectAllOrNonSelected(insProdTypeBean)){
            vals=prodSearchUtils.buildSelectedList(insProdTypeBean);
        }else{
            let optionList=new Array;
            optionList=insProdTypeBean.optionList;
            let valueList=new Array;
            for (var y = 0; y < optionList.length; y++) {
                 var optionBean = optionList[y];
                 let value={
                     value:null
                 }
                 value.value=optionBean.key;
                 valueList.push(value);
            }
            vals=valueList;
        }
        let criteria=new Map;
            criteria=prodSearchUtils.buildCriteria(null,
                productSearchConstants.CriteriaKey.INSURANCE_PRODUCT_TYPE_PROD_SUBTP_CDE,
                productSearchConstants.CriteriaKeyType.GENL, productSearchConstants.CriteriaOperator.EQUAL,
                productSearchConstants.CriteriaValueType.REFDAT, vals);
            criterias.push(criteria); 
    },
    buildCharacteristicsCriteria:(expandBtnBean)=>{
        let criterias=new Array;
        let criteriaKey = null;
        if (!prodSearchUtils.selectAllOrNonSelected(expandBtnBean)){
            let val={
                value:null
            }
            val.value=productSearchConstants.CriteriaValue.Y;
            let resultVals = new Array;
            resultVals.push(val)
    		let selectedVals = new Array;
    		selectedVals = prodSearchUtils.buildSelectedList(expandBtnBean);
            for (var indexSelected = 0; indexSelected < selectedVals.length; indexSelected++) {
             var selectedValue = selectedVals[indexSelected];
                if(productSearchConstants.RefCodeCharacteristics.CDE_INCOME===selectedValue.value){
                    let criteria=new Map;
                        criteria=prodSearchUtils.buildCriteria(null,
                            productSearchConstants.CriteriaKey.INSURANCE_PRODUCT_TYPE_PROD_SUBTP_CDE,
                            productSearchConstants.CriteriaKeyType.GENL, productSearchConstants.CriteriaOperator.EQUAL,
                            productSearchConstants.CriteriaValueType.REFDAT, vals);
                        criterias.push(criteria); 
                }
                if(productSearchConstants.RefCodeCharacteristics.CDE_CAPITAL_PROTECTION===selectedValue.value){
                    let criteria=new Map;
                        criteria=prodSearchUtils.buildCriteria(null, criteriaKey, productSearchConstants.CriteriaKeyType.GENL,
    	                    productSearchConstants.CriteriaOperator.EQUAL, productSearchConstants.CriteriaValueType.REFDAT, resultVals);
                        criterias.push(criteria); 
                }
                if(productSearchConstants.RefCodeCharacteristics.CDE_YIELD_ENHANCEMENT===selectedValue.value){
                    let criteria=new Map;
                        criteria=prodSearchUtils.buildCriteria(null, criteriaKey, productSearchConstants.CriteriaKeyType.GENL,
    	                    productSearchConstants.CriteriaOperator.EQUAL, productSearchConstants.CriteriaValueType.REFDAT, resultVals);
                        criterias.push(criteria); 
                }
                if(productSearchConstants.RefCodeCharacteristics.CDE_CAPITAL_GAIN===selectedValue.value){
                    let criteria=new Map;
                        criteria=prodSearchUtils.buildCriteria(null, criteriaKey, productSearchConstants.CriteriaKeyType.GENL,
    	                    productSearchConstants.CriteriaOperator.EQUAL, productSearchConstants.CriteriaValueType.REFDAT, resultVals);
                        criterias.push(criteria); 
                }
            }
        }
        
        return criterias;
    },
    isInsuranceOnlySelected:(productTypeBean)=>{
        let result=false;
        if(!ObjectHelper.isNullOrlengthZore(productTypeBean.selectedVal)){
            if(productSearchConstants.FE_PROD_TYPE_CDE_INS==productTypeBean.selectedVal[0]){
                 result = true;
            }
        }
        return result;
    },
    buildPiqQuestAndAnsDetails:(filterFormBean,searchFormBean)=>{
        let selectedInsType=new Array;
        selectedInsType=filterFormBean.selectedInsType;
        let selectedInsContributePeriod=filterFormBean.selectedInsContributePeriod;
        let selectTargetAmount=filterFormBean.selectTargetAmount;
        let selectTimeFrame=filterFormBean.selectTimeFrame;
        let nochangePiqlist=new Array;
        nochangePiqlist=searchFormBean.noChangePiqAndAskList;
        if(nochangePiqlist==null){
             nochangePiqlist = new Array;
        }
        if(!ObjectHelper.isNullOrlengthZore(selectedInsType)){
            for (var insTypeIndex = 0; insTypeIndex < selectedInsType.length; insTypeIndex++) {
                 var insType = selectedInsType[insTypeIndex];
                 let insTypePiq=new Map;
                 insTypePiq.investmentPreferenceTypeCode=insType
                 insTypePiq.investmentPreferenceCode="Y";
                 if("PRE_OTHERS"===insType){
                    insTypePiq.investmentPreferenceText=filterFormBean.otherInsTypeText;
                 }
                 nochangePiqlist.push(insTypePiq);
            }
        }

        if(!ObjectHelper.isNullOrEmpty(selectedInsContributePeriod)){
            let insTypePiq=new Map;
            insTypePiq.investmentPreferenceTypeCode=productSearchConstants.INS_CONTRIBUTE_PERIOD_PIQ_KEY
            insTypePiq.investmentPreferenceCode=selectedInsContributePeriod
            nochangePiqlist.push(insTypePiq);
        }

        if(filterFormBean.customerObjective){
            if(selectTargetAmount!=null && productSearchConstants.WITH_VALUE===selectTargetAmount){
                nochangePiqlist.push(prodSearchUtils.convertPiqQuestAndAnsDetails(productSearchConstants.SAVE_AMT_IND,productSearchConstants.WITH_VALUE,null))
                if(filterFormBean.targetAmountValue!=null && filterFormBean.targetAmountValue.value!=null){
                    nochangePiqlist.push(prodSearchUtils.convertPiqQuestAndAnsDetails(productSearchConstants.SAVE_AMT,productSearchConstants.SAVE_AMT_CCY,filterFormBean.targetAmountCcyCode))
                    let  savingAmount = filterFormBean.targetAmountValue.value;
                    nochangePiqlist.push(prodSearchUtils.convertPiqQuestAndAnsDetails(productSearchConstants.SAVE_AMT,productSearchConstants.SAVE_AMT_VAL,savingAmount))
                }
            }else if(selectTargetAmount!=null && productSearchConstants.NO_VALUE===selectTargetAmount){
                nochangePiqlist.push(prodSearchUtils.convertPiqQuestAndAnsDetails(productSearchConstants.SAVE_AMT_IND,productSearchConstants.NO_VALUE,null));
            }else{
                nochangePiqlist.push(prodSearchUtils.convertPiqQuestAndAnsDetails(productSearchConstants.SAVE_AMT_IND,productSearchConstants.NOT_SELECT,null));
            }

            if(selectTimeFrame!=null && productSearchConstants.NO_VALUE===selectTimeFrame){
                nochangePiqlist.push(prodSearchUtils.convertPiqQuestAndAnsDetails(productSearchConstants.TIMFRAMOPT,productSearchConstants.NO_VALUE,null));
            }else if(selectTimeFrame != null  && productSearchConstants.WITH_VALUE===selectTimeFrame){
                nochangePiqlist.push(prodSearchUtils.convertPiqQuestAndAnsDetails(productSearchConstants.TIMFRAMOPT,productSearchConstants.WITH_VALUE,null));
                if(!ObjectHelper.isNullOrEmpty(filterFormBean.selecttimeFramesubList)){
                    nochangePiqlist.push(prodSearchUtils.convertPiqQuestAndAnsDetails(productSearchConstants.TIMFRAMOPT,filterFormBean.selecttimeFramesubList,null));
                }
            }else{
                nochangePiqlist.push(productSearchConstants.TIMFRAMOPT,productSearchConstants.NOT_SELECT,null);
            }
        }
        if(nochangePiqlist != null && nochangePiqlist.length>0){
            return nochangePiqlist
        }else{
            return null;
        }

    },
    convertPiqQuestAndAnsDetails:(typeCode,code,text)=>{
        let piqQuestAndAnsDetails=new Map;
        piqQuestAndAnsDetails.investmentPreferenceTypeCode=typeCode;
        piqQuestAndAnsDetails.investmentPreferenceCode=code;
        piqQuestAndAnsDetails.investmentPreferenceText=text;
        return piqQuestAndAnsDetails;
    },
    _judageProductKey:(productId1,productId2)=>{
        
        if(productId1 && productId2){
            return (
            productId1.productTypeCode ==productId2.productTypeCode
                                            
            && productId1.productCodeAlternativeClassificationCode == productId2.productCodeAlternativeClassificationCode
            
            && productId1.productAlternativeNumber ==productId2.productAlternativeNumber
            && productId1.countryProductTradableCode ==productId2.countryProductTradableCode);

        }

    },
    _judageMapHasProductId:(productMap,productId)=>{
        let result=false;
        if(ObjectHelper.isNullOrlengthZore(productMap)){
            return result;
        }
        productMap.forEach(function(product,tmpProductId,map){
            if(tmpProductId && productId){
                
                if(!result && prodSearchUtils._judageProductKey(tmpProductId,productId)){
                    result=true;
                }

            }

        });
        return result;

    },
}