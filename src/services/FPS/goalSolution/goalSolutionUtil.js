
import sessionInfoService from '../../sessionInfoService'
import ObjectHelper from '../../../common/lib/ObjectHelper';
import formatHelper from '../../../common/lib/formatHelper';
import {goalSolutionConfig} from '../../config/goalSolution/goalSolutionConfig'; 
import {productSearchConstants} from '../../config/goalSolution/productSearchConstants';
import {sortingCriteriaUtils} from '../../commonService/sortingCriteriaUtils';
import {prodSearchUtils} from '../../commonService/prodSearchUtils';
import modalCreationService from '../../commonService/ModalCreationService';


let searchFormBean = modalCreationService.getSearchFormModal();
let filterFormBean =modalCreationService.getFilterFormModal();
let utSortingFormBean=new Map;
let insSortingFormBean=new Map;
let otherSortingFormBean=new Map;
let utPaginationFormBean=new Map;
let insPaginationFormBean=new Map;
let otherPaginationFormBean=new Map;
let numOfRecordsPerPageFormBean={
    numOfRecordsPerPageStr:null
}
let goalDetailFormBean={
    financialGoal:{},
    riskLevelKey:null,
    financialGoaljson:null,
    goalDescription:null
}
const goalSolutionUtil={
      _buildBaseGoal:(requestData) =>{
          //		"riskLevelNumber":"4",
		  //	"riskToleranceLevel":"4",
          
          let mjAppConfig=goalSolutionConfig.mjAppConfig;
          var dateStr=new Date();
          let nowDate=formatHelper.dateFormatPattern(dateStr,"YYYYMMDD_HHmmss");
          console.log('nowDate...',requestData)
           var baseGoal={
               needTypeCode:null,
               goalTypeCode:null,
               goalDescription:null,
               currencyCode:null,
               applyInflationIndicator:null,
               simulateSegmentIndicator:null,
               riskLevelNumber:null,
               riskToleranceLevel:null,
               calculatedRiskCapacityLevelNumber:null,
               skipRiskProfilingIndicator:null
           }  
            baseGoal.needTypeCode = ObjectHelper.isNullOrEmpty(requestData.needTypeCode) ? "GNRC": requestData.needTypeCode;
			baseGoal.goalTypeCode = ObjectHelper.isNullOrEmpty(requestData.goalTypeCode) ? "INS_JOURNEY": requestData.goalTypeCode;
			baseGoal.goalDescription = ObjectHelper.isNullOrEmpty(requestData.goalName) ? mjAppConfig.SPN_GOAL_DESCRIPTION+"_"+nowDate: requestData.goalName+"_"+nowDate + Math.floor((Math.random() * 100) + 1);
			baseGoal.currencyCode = mjAppConfig.SPN_CURRENCY_CODE;
			baseGoal.applyInflationIndicator = mjAppConfig.SPN_APPLY_INFLATION_INDICATOR;
			baseGoal.simulateSegmentIndicator = "I";
			baseGoal.riskLevelNumber = ObjectHelper.isNullOrEmpty(requestData.riskLevelNumber) ? '': requestData.riskLevelNumber;  
			baseGoal.riskToleranceLevel = ObjectHelper.isNullOrEmpty(requestData.riskToleranceLevel) ? '':requestData.riskToleranceLevel;
			baseGoal.calculatedRiskCapacityLevelNumber =  ObjectHelper.isNullOrEmpty(requestData.calculatedRiskCapacityLevelNumber) ? '':requestData.calculatedRiskCapacityLevelNumber;
			baseGoal.skipRiskProfilingIndicator = "N";
            if(!ObjectHelper.isNullOrEmpty(requestData.goalDescription)){
                baseGoal.goalDescription=requestData.goalDescription
            }
            console.log('baseGoal....',baseGoal);
            return baseGoal;
      },
     _handleResponse:(recordCustomerGeneralGoalResp)=>{
        let GoalPlannerConstants=goalSolutionConfig.GoalPlannerConstants;
        let mjWireDestMsgSrc=goalSolutionConfig.mjWireDestMsgSrc;
        let goalStatus=recordCustomerGeneralGoalResp.status;
        let goalKey=recordCustomerGeneralGoalResp.goalKey;
        let mjFormBean={
            goalKey:{

            }
        }
        if (null != goalStatus) {
            let  statusCode = goalStatus.financialGoalProcessStatusCode
            if (ObjectHelper.isNullOrEmpty(statusCode)) {
                if (statusCode==='S_W_CP') {
                    mjFormBean.JourneyName=GoalPlannerConstants.JOURNEY_MJ_FNA;
                    MJ_FNA
                }else if(statusCode==='S_W_IP'){
                     mjFormBean.JourneyName=GoalPlannerConstants.JOURNEY_MJ_PIQ
                }
                 mjFormBean.WIRE_DESTINATION= mjWireDestMsgSrc[statusCode]

            }
        }
        // wire data to next portlet.
        if (null != goalKey) {
            let goalId = goalKey.goalSequenceNumber;
            let planId = goalKey.arrangementIdentifierFinancialPlanning;
            mjFormBean.goalKey={
                goalId:goalId,
                planId:planId
            }
        }
        return mjFormBean
    },
    _buildIPDetail:(custmerId)=>{
           let RetrieveIPDetails=goalSolutionConfig.RetrieveInvolvedPartyDetailsIndividualModel;
           RetrieveIPDetails.cdmBusinessObjectIdentification.externalReferenceNumber=custmerId;
           return RetrieveIPDetails
    },
    buildRetrieveProductSearchResultRequest:(productSelectionData)=>{
        // let request=new Map;
       
        if(!ObjectHelper.isNullOrEmpty(productSelectionData.searchFormBean)){
            searchFormBean=productSelectionData.searchFormBean;
        }else{
            productSelectionData.searchFormBean=searchFormBean
        }
        if(!ObjectHelper.isNullOrEmpty(productSelectionData.filterFormBean)){
            filterFormBean=productSelectionData.filterFormBean;
        }else{
            productSelectionData.filterFormBean=filterFormBean
        }   
         if(!ObjectHelper.isNullOrEmpty(productSelectionData.goalDetailFormBean)){
            goalDetailFormBean=productSelectionData.goalDetailFormBean;
        }else{
            productSelectionData.goalDetailFormBean=goalDetailFormBean
        }
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
      let goalKey=productSelectionData.goalKey;
      productSelectionData.goalKey=goalSolutionUtil.buildGoalKey(goalKey.goalId,goalKey.planId);
      let productSearchCriteriaList=[];
      let productSearchCriteria={
          productSelectionMethodCode:"S",
          filterCriteriaFormula:{
            filterFormula:null
          },
          keyValueCriteriaWithIndex:null,
          sortingCriteria:null,
          searchCriteria:[]

      };
      let keyValueCriteriaWithIndex=new Array;
      let tabConfigCriteria=new Array;
      tabConfigCriteria=goalSolutionUtil.buildTabConfigCriteria(productSelectionData);
      console.log('tabConfigCriteria...',tabConfigCriteria);
      let keyValueCriteria=new Array;
      keyValueCriteria =goalSolutionUtil.buildKeyValueCriteriaWithIndex(productSelectionData);
       console.log('keyValueCriteria...',keyValueCriteria);
      let characteristicsCriteria=new Array;
      characteristicsCriteria=prodSearchUtils.buildCharacteristicsCriteria(searchFormBean.characteristics);
      console.log('characteristicsCriteria...',characteristicsCriteria);
      let keyNlsValueCriteria=new Array;
      productSearchCriteria.filterCriteriaFormula=goalSolutionUtil.buildFilterCriteriaFormulaAndReOrderCriteriaIndex(productSelectionData,tabConfigCriteria,keyValueCriteria,keyNlsValueCriteria,characteristicsCriteria)
      keyValueCriteriaWithIndex=tabConfigCriteria.concat(keyValueCriteria,characteristicsCriteria);
      productSearchCriteria.keyValueCriteriaWithIndex=keyValueCriteriaWithIndex;
      productSearchCriteria.sortingCriteria=goalSolutionUtil.buildSortingCriteria(productSelectionData);
      productSearchCriteria.searchCriteria = goalSolutionUtil.buildSearchCriteria(productSelectionData.searchFormBean);
      productSearchCriteriaList.push(productSearchCriteria);
      RetrieveProductSearchResultRequest.productSearchCriteria=productSearchCriteriaList;
                                                                                                
        //RetrieveProductSearchResultRequest.pageCountCriteria=goalSolutionUtil.buildPageCountCriteria(productSelectionData)
        RetrieveProductSearchResultRequest.paginationDetail=goalSolutionUtil.buildPaginationRequest(productSelectionData);
        //request.setLocaleCode(buildLocaleCode(ctx));
        let shortlistOnlyFlag=false;
        let shortlistOnly=new Array;
        shortlistOnly=searchFormBean.shortlistProductOnly;
        if(!ObjectHelper.isNullOrlengthZore(shortlistOnly)){
            if(productSearchConstants.YES===shortlistOnly[0]){
                shortlistOnlyFlag = true;
            }
        }
        if(shortlistOnlyFlag){
            RetrieveProductSearchResultRequest.requestMode=goalSolutionUtil.buildRequestMode();
        }
        let tab = productSelectionData.selectedTab;
        if(prodSearchUtils.isInsuranceOnlySelected(searchFormBean.productType)|| productSearchConstants.TAB_INS===tab){
            RetrieveProductSearchResultRequest.requestModes=goalSolutionUtil.appendInsuranceSearchRequestMode(RetrieveProductSearchResultRequest.requestModes);
        }
        //RetrieveProductSearchResultRequest.piqQuestAndAnsDetails=prodSearchUtils.buildPiqQuestAndAnsDetails(filterFormBean,searchFormBean);
        RetrieveProductSearchResultRequest.goalKey=productSelectionData.goalKey;
        return RetrieveProductSearchResultRequest;
    },
     buildGoalKey:(goalId,planId)=>{
        let goalKey={
            goalSequenceNumber:"",
            arrangementIdentifierFinancialPlanning:""
        };
        if(!ObjectHelper.isNullOrEmpty(goalId)){
            goalKey.goalSequenceNumber=goalId
        }
        if(!ObjectHelper.isNullOrEmpty(planId))
        {   
            goalKey.arrangementIdentifierFinancialPlanning=planId
        }
        return goalKey
    },
    buildCustomer:(sessionInfo)=>{
       
        let customers=[];    
        if(!ObjectHelper.isNullOrEmpty(sessionInfo)){
              customers= [{
                    countryISOCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    sourceSystemRolePlayerCode: sessionInfo.sourceSystemRolePlayerCode,
                    rolePlayerIdentificationNumber: sessionInfo.customerId
                }]
        }
        return customers;
    },
    buildTabConfigCriteria:(productSelectionData)=>{
         let criterias=new Array;
         let tabKey=productSelectionData.selectedTab;
         filterFormBean=productSelectionData.filterFormBean;
         let filterCriteriaConfig=goalSolutionConfig.filterCriteriaConfig;
         let tabConfigCriteria={

        };
        let disbleSearchWOInsPiq=filterCriteriaConfig[productSearchConstants.DISABLE_SEARCH_WO_INS_PIQ]
        if(disbleSearchWOInsPiq==='Y'){
            if(tabKey===productSearchConstants.TAB_INS){
                if(ObjectHelper.isNullOrEmpty(filterFormBean.selectedInsContributePeriod)){
                     tabKey = productSearchConstants.TAB_INS + "_NO";
                }
                if(ObjectHelper.isNullOrlengthZore(filterFormBean.selectedInsType)){
                     tabKey = productSearchConstants.TAB_INS + "_NO";
                }
            }
        }
        let cList=[];
        let cLists=new String;
        cLists=filterCriteriaConfig[tabKey][productSearchConstants.FILTER_CRITERIA_TAB_CRITERIAS];
        cList=cLists.split(",");
        if(!ObjectHelper.isNullOrlengthZore(cList)){
            for (let cIter = 0; cIter < cList.length; cIter++) {
                 let cKey = cList[cIter];
                 let key=filterCriteriaConfig[cKey][productSearchConstants.FILTER_CRITERIA_TAB_CRITERIA_KEY]
                 let vList=new Array;
                 let vLists=new String;
                 vLists=filterCriteriaConfig[cKey][productSearchConstants.FILTER_CRITERIA_TAB_CRITERIA_VALUES]
                 vList=vLists.split(",");
                 let vals=new Array;
                 for (var vIter = 0; vIter < vList.length; vIter++) {
                      var value = vList[vIter];value
                      let val={
                          value:value
                      }
                      vals.push(val);
                 }
                 let index=filterCriteriaConfig[cKey][productSearchConstants.FILTER_CRITERIA_TAB_CRITERIA_INDEX];
                 let keyType=filterCriteriaConfig[cKey][productSearchConstants.FILTER_CRITERIA_TAB_CRITERIA_KEY_TYPE];
                 if(ObjectHelper.isNullOrEmpty(keyType)){
                     keyType = productSearchConstants.CriteriaKeyType.GENL;
                 }
                 let valueType=filterCriteriaConfig[cKey][productSearchConstants.FILTER_CRITERIA_TAB_CRITERIA_VALUE_TYPE];
                 if(ObjectHelper.isNullOrEmpty(valueType)){
                    valueType = productSearchConstants.CriteriaValueType.TEXT;
                 }
                 let operator=filterCriteriaConfig[cKey][productSearchConstants.FILTER_CRITERIA_TAB_CRITERIA_OPERATOR];
                 if(ObjectHelper.isNullOrEmpty(operator)){
                    operator = productSearchConstants.CriteriaOperator.EQUAL;
                 }
                 let criteria={};
                 criteria=goalSolutionUtil.buildCriteria(index, key, keyType, operator, valueType, vals);
                 criterias.push(criteria);
            }
        }
        return criterias;
    },
    buildKeyValueCriteriaWithIndex:(productSelectionData)=>{
        let criterias=new Array;
        // filterFormBean=productSelectionData.filterFormBean;
        prodSearchUtils.buildCommonSearchCriteria(searchFormBean,criterias,false);
        goalSolutionUtil.buildProductTypeCriteria(productSelectionData,criterias);
        let tab = productSelectionData.selectedTab;
        if (productSearchConstants.TAB_UT===tab) {
        	prodSearchUtils.buildUTCriteria(filterFormBean, criterias);
        }
          if (productSearchConstants.TAB_INS===tab) {
        	prodSearchUtils.buildINSCriteria(filterFormBean, criterias);
        }
        return criterias;


    },
    buildKeyNlsValueCriteriaWithIndex:(productSelectionData)=>{
        let criterias=new Array;
        goalSolutionUtil.buildProductNameCriteria(productSelectionData,criterias);
        let tab=productSelectionData.selectedTab;
        if(productSearchConstants.TAB_UT===tab){
            goalSolutionUtil.buildFundNameCriteria(productSelectionData,criterias);
        }
        return criterias;
    },
    buildProductNameCriteria:(productSelectionData,criterias)=>{
        if(!ObjectHelper.isNullOrEmpty(searchFormBean.productName)){
            let criteriaKey=productSearchConstants.CriteriaKey.PROD_NAME;
            let localeCode=new String;
            localeCode=productSelectionData.localeCode;
            if(!localeCode.startsWith("en")){
                criteriaKey=productSearchConstants.CriteriaKey.PROD_PLL_NAME;
            }
            let val={
                value:null
            }
            val.value=searchFormBean.productName;
            let vals=new Array;
            vals.push(val);
            let criteria=new Map;
                criteria=goalSolutionUtil.buildNlsCriteria(null, criteriaKey,
                productSearchConstants.CriteriaKeyType.GENL, productSearchConstants.CriteriaOperator.LIKE,
                productSearchConstants.CriteriaValueType.OTHER, vals);
                criterias.push(criteria); 
        }
    },
    buildFundNameCriteria:(productSelectionData,criterias)=>{
        if(!ObjectHelper.isNullOrEmpty(filterFormBean.fundName)){
            let criteriaKey=productSearchConstants.CriteriaKey.PROD_NAME;
            let localeCode=new String;
            localeCode=productSelectionData.localeCode;
            if(!localeCode.startsWith("en")){
                criteriaKey=productSearchConstants.CriteriaKey.PROD_PLL_NAME;
            }
            let val={
                value:null
            }
            val.value=searchFormBean.fundName;
            let vals=new Array;
            vals.push(val);
            let criteria=new Map;
                criteria=goalSolutionUtil.buildNlsCriteria(null, criteriaKey,
                productSearchConstants.CriteriaKeyType.GENL, productSearchConstants.CriteriaOperator.LIKE,
                productSearchConstants.CriteriaValueType.OTHER, vals);
                criterias.push(criteria); 
        }
    },
    buildFilterCriteriaFormulaAndReOrderCriteriaIndex:(productSelectionData,tabConfigCriteria,keyValueCriteria,keyNlsValueCriteria,characteristicsCriteria)=>{
        let filterCriteriaFormula={};
        let filterFormulaBuffer=new String;
        let filterCriteriaConfig=goalSolutionConfig.filterCriteriaConfig;
        let criteriaIndex=0;
        if(!ObjectHelper.isNullOrlengthZore(tabConfigCriteria)){
            let tabKey=productSelectionData.selectedTab;
            let disbleSearchWOInsPiq=filterCriteriaConfig[productSearchConstants.DISABLE_SEARCH_WO_INS_PIQ];
            if(disbleSearchWOInsPiq==='Y'){
                if(tabKey===productSearchConstants.TAB_INS){
                    if(ObjectHelper.isNullOrEmpty(filterFormBean.selectedInsContributePeriod)){
                         tabKey = productSearchConstants.TAB_INS + "_NO";
                    }
                    if(ObjectHelper.isNullOrlengthZore(filterFormBean.selectedInsType)){
                        tabKey = productSearchConstants.TAB_INS + "_NO";
                    }
                    
                }
            }
            let formula=new String;
            formula=filterCriteriaConfig[tabKey][productSearchConstants.FILTER_CRITERIA_TAB_FORMULA];
            if(!ObjectHelper.isNullOrEmpty(formula)){
                    for (var tabConfigCriteriaIndex = 0; tabConfigCriteriaIndex < tabConfigCriteria.length; tabConfigCriteriaIndex++) {
                         var crteria = tabConfigCriteria[tabConfigCriteriaIndex];
                         let keyValueWithIndex=crteria.keyValueWithIndex;
                         let index=keyValueWithIndex.index;
                         let newIndex="";
                         newIndex=criteriaIndex++;
                         keyValueWithIndex.index=newIndex;
                         formula=formula.replace(index, newIndex);
                    }
                    filterFormulaBuffer=filterFormulaBuffer+formula + "" + productSearchConstants.AND_RALATION;
            }
        }

        if(!ObjectHelper.isNullOrlengthZore(keyValueCriteria)){
            for (var keyValueCriteriaIndex = 0; keyValueCriteriaIndex < keyValueCriteria.length; keyValueCriteriaIndex++) {
                 var crteria = keyValueCriteria[keyValueCriteriaIndex];
                 let keyValueWithIndex=crteria.keyValueWithIndex;
                 let newIndex="";
                 newIndex=criteriaIndex++;
                 keyValueWithIndex.index=newIndex;
                 filterFormulaBuffer=filterFormulaBuffer+productSearchConstants.INDEX_PREFIX+newIndex+productSearchConstants.INDEX_SUFFIX+productSearchConstants.AND_RALATION;
            }
        }

        if(!ObjectHelper.isNullOrlengthZore(characteristicsCriteria)){
            let tempStrBuf=new String;
            filterFormulaBuffer=filterFormulaBuffer+productSearchConstants.PARENTHESES_LEFT;
            for (var characteristicsCriteriaIndex = 0; characteristicsCriteriaIndex < characteristicsCriteria.length; characteristicsCriteriaIndex++) {
                 var crteria = characteristicsCriteria[characteristicsCriteriaIndex];
                 let keyValueWithIndex=crteria.keyValueWithIndex;
                 let newIndex="";
                 newIndex=criteriaIndex++;
                 keyValueWithIndex.index=newIndex;
                 tempStrBuf=tempStrBuf+productSearchConstants.INDEX_PREFIX+newIndex+productSearchConstants.INDEX_SUFFIX+productSearchConstants.OR_RALATION;
            }
            filterFormulaBuffer=filterFormulaBuffer+tempStrBuf.substring(0,tempStrBuf.length - productSearchConstants.OR_RALATION.length)+productSearchConstants.PARENTHESES_RIGHT+productSearchConstants.AND_RALATION;
        }

        if(!ObjectHelper.isNullOrlengthZore(keyNlsValueCriteria)){
            for (var keyNlsValueCriteriaIndex = 0; keyNlsValueCriteriaIndex < keyNlsValueCriteria.length; keyNlsValueCriteriaIndex++) {
                 var crteria = keyNlsValueCriteria[keyNlsValueCriteriaIndex];
                 let keyNlsValueWithIndex=crteria.keyNlsValueWithIndex;
                 let newIndex="";
                 newIndex=criteriaIndex++;
                 keyNlsValueWithIndex.index=newIndex;
                 filterFormulaBuffer=filterFormulaBuffer+productSearchConstants.INDEX_PREFIX+newIndex+productSearchConstants.INDEX_SUFFIX+productSearchConstants.AND_RALATION;
            }
        }
        if(0 < filterFormulaBuffer.length){
            filterCriteriaFormula.filterFormula=filterFormulaBuffer.substring(0,filterFormulaBuffer.length-productSearchConstants.AND_RALATION.length)
        }
        return filterCriteriaFormula;
    },
    buildCriteria:(index, key, keyType, operator, valueType, vals)=>{
        let criteria={};
        let keyValueWithIndex={};
        keyValueWithIndex.index=index;
        keyValueWithIndex.keyType=keyType;
        keyValueWithIndex.key=key;
        keyValueWithIndex.operator=operator;
        keyValueWithIndex.valueType=valueType;
        criteria.keyValueWithIndex=keyValueWithIndex;
        criteria.value=vals;
        return criteria;
    },
    buildNlsCriteria:(index, key, keyType, operator, valueType, vals)=>{
        let criteria={};
        let keyNlsValueWithIndex={};
        keyNlsValueWithIndex.index=index;
        keyNlsValueWithIndex.keyType=keyType;
        keyNlsValueWithIndex.key=key;
        keyNlsValueWithIndex.operator=operator;
        keyNlsValueWithIndex.valueType=valueType;
        criteria.KeyNlsValueWithIndex=keyNlsValueWithIndex;
        criteria.NlsValue=vals;
        return criteria;
    },
    buildProductTypeCriteria:(productSelectionData,criterias)=>{
        let vals=[]=goalSolutionUtil.getProductTypesForKeyValueSet(productSelectionData);
        let criteria=goalSolutionUtil.buildCriteria(null, productSearchConstants.CriteriaKey.PROD_TYPE_CDE,
             productSearchConstants.CriteriaKeyType.GENL, productSearchConstants.CriteriaOperator.EQUAL,
             productSearchConstants.CriteriaValueType.REFDAT, vals);
        criterias.push(criteria);
    },
    getProductTypesForKeyValueSet:(productSelectionData)=>{
        let filterCriteriaConfig=goalSolutionConfig.filterCriteriaConfig;
        let feProdTypeTab=productSelectionData.selectedTab;
        let searchFormBean=productSelectionData.searchFormBean;
        let feProdTypeList=new Array;
        let prodTypeBean=searchFormBean.productType;
        if(productSearchConstants.TAB_UT===feProdTypeTab){
            goalSolutionUtil.addtoList(productSearchConstants.UT,feProdTypeList)
        }else{
            if(productSearchConstants.TAB_INS===feProdTypeTab){
                goalSolutionUtil.addtoList(productSearchConstants.INS,feProdTypeList)
            }
            if(productSearchConstants.TAB_OTHER===feProdTypeTab){
                let othersTypeList=new Array;
                let selectValArr=new Array;
                selectValArr=prodTypeBean.selectedVal;
                let selectValMap=new Map;
                selectValMap=prodSearchUtils.convertToProdTypeMap(prodTypeBean);    
                if(selectValMap.has(productSearchConstants.FE_PROD_TYPE_CDE_BOND)){
                    let bondTypeCodeList=new Array;
                    bondTypeCodeList=filterCriteriaConfig[productSearchConstants.WPC_PRODUCT_TYPE_CODES_PREFIX][productSearchConstants.FE_PROD_TYPE_CDE_BOND]
                    othersTypeList.push(bondTypeCodeList);
                }
                 if(selectValMap.has(productSearchConstants.FE_PROD_TYPE_CDE_SP)){
                    let spTypeCodeList=new Array;
                    spTypeCodeList=filterCriteriaConfig[productSearchConstants.WPC_PRODUCT_TYPE_CODES_PREFIX][productSearchConstants.FE_PROD_TYPE_CDE_SP]
                    othersTypeList.push(spTypeCodeList);
                }
                if(selectValMap.has(productSearchConstants.FE_PROD_TYPE_CDE_DPS)){
                    let dpsTypeCodeList=new Array;
                    dpsTypeCodeList=filterCriteriaConfig[productSearchConstants.WPC_PRODUCT_TYPE_CODES_PREFIX][productSearchConstants.FE_PROD_TYPE_CDE_DPS]
                    othersTypeList.push(dpsTypeCodeList);
                }
                for (var x = 0; x < othersTypeList.length;x++) {
                     var otherProdType = othersTypeList[x];
                     goalSolutionUtil.addtoList(otherProdType, feProdTypeList);
                }
            }
        }
        return feProdTypeList;
    },
    addtoList:(prodType,feProdTypeList)=>{
        let value = {
            value:null
        }
    	value.value=prodType;
    	feProdTypeList.push(value);
    },
    buildProductDisplay:(productSelectionData)=>{
        let productDisplay=new Map;
        productDisplay.productTypeCode=goalSolutionUtil.getProductTypeForProductDisplay(productSelectionData);
        let suitableProductOnly=new Array;
        suitableProductOnly=searchFormBean.suitableProductOnly;
        if(!ObjectHelper.isNullOrlengthZore(suitableProductOnly) && productSearchConstants.YES===suitableProductOnly[0]){
            productDisplay.suitableProductOnlyIndicator=productSearchConstants.YES;
        }else{
            productDisplay.suitableProductOnlyIndicator=productSearchConstants.NOT;
        }
        return productDisplay;
    },
    buildSearchCriteria:(searchFormBean)=>{
        let searchCriteria = new Array;
        let suitableProductOnly=new Array;
        suitableProductOnly=searchFormBean.suitableProductOnly;
        if(!ObjectHelper.isNullOrlengthZore(suitableProductOnly)){
            
            suitableProductOnly.forEach(function(suitableProductOnlyValue,key,map){
                let currentObj={
                    key:"SUITABLE_PRODUCT_ONLY",
                    value:suitableProductOnlyValue
                }
                
                searchCriteria.push(currentObj);
            });
            
           
        }
        return searchCriteria;
    },
    buildProductSearchTecSegment:(productSelectionData)=>{
        let indicator=new Map;
        let tab=productSelectionData.selectedTab;
        if(productSearchConstants.TAB_OTHER===tab){
            indicator.prodSearchTechField=productSearchConstants.ProdSearchTechFieldVal.O;
        }else{
            indicator.prodSearchTechField=productSearchConstants.CriteriaValue.N;
        }
        return indicator;
    },
    buildSortingCriteria:(productSelectionData)=>{
        let sortList=[];
        let tab=productSelectionData.selectedTab;
        if(productSearchConstants.TAB_UT===tab){
            let field=utSortingFormBean.field;
            if(ObjectHelper.isNullOrEmpty(field)){
                sortList.push(goalSolutionUtil.sort(productSearchConstants.Sorting.PROD_NAME,productSearchConstants.Sorting.ASC));
                utSortingFormBean.field=productSearchConstants.Sorting.PROD_NAME;
                utSortingFormBean.order=productSearchConstants.Sorting.ASC;
            }else{
                sortList.push(goalSolutionUtil.sort(field, utSortingFormBean.order));
            }
        }else if(productSearchConstants.TAB_INS===tab){
            let field=insSortingFormBean.field;
            if(ObjectHelper.isNullOrEmpty(field)){
                sortList.push(goalSolutionUtil.sort(productSearchConstants.Sorting.PROD_NAME,productSearchConstants.Sorting.ASC));
                insSortingFormBean.field=productSearchConstants.Sorting.PROD_NAME;
                insSortingFormBean.order=productSearchConstants.Sorting.ASC;
            }else{
                sortList.push(goalSolutionUtil.sort(field, insSortingFormBean.order));
            }

        }else if(productSearchConstants.TAB_OTHER===tab){
            let field=otherSortingFormBean.field;
            if(ObjectHelper.isNullOrEmpty(field)){
                sortList.push(goalSolutionUtil.sort(productSearchConstants.Sorting.PROD_TYPE_CDE,productSearchConstants.Sorting.ASC));
                otherSortingFormBean.field=productSearchConstants.Sorting.PROD_TYPE_CDE;
                otherSortingFormBean.order=productSearchConstants.Sorting.ASC;
            }else{
                sortList.push(goalSolutionUtil.sort(field, otherSortingFormBean.order));
            }
        }
        let shortlistOnly=new Array;
        shortlistOnly=searchFormBean.shortlistProductOnly;
        if(!ObjectHelper.isNullOrlengthZore(shortlistOnly)){
            if(productSearchConstants.YES===shortlistOnly[0]){
                if(null!==goalDetailFormBean){
                    //todo...
                    sortingCriteriaUtils.buildExtraSortingCriteria(productSelectionData,goalDetailFormBean.financialGoal.goalObjectiveTypeCode)
                }
            }
        }
        return sortList
    },
    buildPageCountCriteria:(productSelectionData)=>{
        let pageCount=1;
        let tab=productSelectionData.selectedTab;
        if(productSearchConstants.TAB_UT){
            pageCount=utPaginationFormBean.currentPageNumber;
        }else if(productSearchConstants.TAB_INS){
             pageCount=insPaginationFormBean.currentPageNumber;
        }else if(productSearchConstants.TAB_OTHER){
             pageCount=otherPaginationFormBean.currentPageNumber;
        }
        let pageCountCriteria=new Map;
        pageCountCriteria.pageCount=pageCount;
        return pageCountCriteria;
    },
    buildPaginationRequest:(productSelectionData)=>{
        let paginationRequest={};
        paginationRequest.accordionType=productSearchConstants.EMPTY_STRING;
        paginationRequest.pageCount=1;
        paginationRequest.totalNumberOfRecords=0;
        paginationRequest.pagingDirectionCode=productSearchConstants.WPC_PAGINATION_ORDER_SPACE;
        paginationRequest.numberOfRecords=goalSolutionUtil.getNumberOfRecords(productSelectionData);
        return paginationRequest;
    }
   ,
    buildCoreRservArea:(productSelectionData)=>{
        let coreRservArea={
            coreReserveArea:null
        }
        let CoreReserveAreas=new Array;
        CoreReserveAreas.push(coreRservArea);
        return CoreReserveAreas;
    },
    buildLocalFieldsArea:(productSelectionData)=>{
        let localFieldsAreaArray =new Array;
        let localFieldsArea={
            localFieldsArea:null
        }
        localFieldsAreaArray[0]=localFieldsArea;
        return localFieldsAreaArray;
    },
    appendInsuranceSearchRequestMode:(reqModes)=>{
         if(reqModes!=null){
            let requestModes=productSearchConstants.INSURANCE_ONLY_REQUEST_MODE;
            reqModes.push(requestModes);
         }
         return reqModes;
    },
    getProductTypeForProductDisplay:(productSelectionData)=>{
        let result=productSearchConstants.UT;
        let tab=productSelectionData.selectedTab;
        if (productSearchConstants.TAB_UT===tab) {
             result = productSearchConstants.UT;
        }else if(productSearchConstants.TAB_INS===tab){
            result = productSearchConstants.INS;
        }else if(productSearchConstants.TAB_OTHER===tab){
            result = productSearchConstants.OTHER;
        }
        return result;
    },
    sort:(sortField,sortOrder)=>{
        let sortingCriteria={};
        sortingCriteria.sortField=sortField
        sortingCriteria.sortOrder=sortOrder
         return sortingCriteria;
    },
    getNumberOfRecords:(productSelectionData)=>{
        let numRecordInt=0;
        let filterCriteriaConfig=goalSolutionConfig.filterCriteriaConfig;
        let numRecordStr=filterCriteriaConfig[productSearchConstants.NUM_RECORDS_PER_PAGE]
        let temNumRecordInt=parseFloat(numRecordStr);
        if(ObjectHelper.isNullOrEmpty(numOfRecordsPerPageFormBean.numOfRecordsPerPageStr)){
              numRecordInt = temNumRecordInt;
        }else{
             numRecordInt = parseFloat(numOfRecordsPerPageFormBean.numOfRecordsPerPageStr);
        }
        return numRecordInt;
    },
    buildRequestMode:()=>{
        let requestMode = null;
        let requestModes=new Array[1];
        requestMode=productSearchConstants.SHORTLIST_ONLY_REQUEST_MODE;
        requestModes[0]=requestMode;
        return requestModes;
    }
}

export default goalSolutionUtil;