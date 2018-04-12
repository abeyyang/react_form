import {PIQCriterias,productCriterias} from "../constant/IAJProductSearchCriteriasConstant";


const IajRetrieveProductSearchResultRequestBuilder={
  buildRetrieveProductSearchResultRequest:(params)=>{
          let request = { };
          let customers = [];
          let customersObj = {};
          customersObj.countryISOCode = "HK"; //sessionInfo.countryISOCode;
          customersObj.groupMemberCode = "HBAP"//sessionInfo.groupMemberCode;
          customersObj.sourceSystemRolePlayerCode = "CDM";
          customersObj.rolePlayerIdentificationNumber = "IF200106";//sessionInfo.customerId;
          customers.push(customersObj);
          request.customers = customers;

          let goalKey = {};
          goalKey.arrangementIdentifierFinancialPlanning = "90261";
          request.goalKey = goalKey;

          let requestModes = [];
          requestModes.push("INVESTMENT_ONLY");
          request.requestModes = requestModes;

          let localeCodeObj = {};
          localeCodeObj.localeCode = "en_US";
          request.localeCode = localeCodeObj;
              
          let requestAction = params.requestAction;

          let requestPIQAnswer = requestAction.requestPIQAnswer;
          let investmentPreference = IajRetrieveProductSearchResultRequestBuilder.buildPIQQuestionAndAnswers(requestPIQAnswer,PIQCriterias);
          request.investmentPreference = investmentPreference;

          let productSearchCriteria = [];
          let criterias = requestAction.requestCriterias;

          let productSearchCriteriaObj = IajRetrieveProductSearchResultRequestBuilder.buildProductSearchCriterias(requestAction.requestCriterias,productCriterias);
          
          let sortingCriteria = [];
          let sortingObj = {};
          sortingObj.sortField = "A.PROD_NAME";
          sortingObj.sortOrder = "+";
          sortingCriteria.push(sortingObj);
          productSearchCriteriaObj.sortingCriteria = sortingCriteria;
          
          productSearchCriteriaObj.productSelectionMethodCode = "S";
          
      productSearchCriteria.push(productSearchCriteriaObj);
        
      request.productSearchCriteria = productSearchCriteria;
      
      let  paginationDetail=  {
      "accordionType": "",
      "numberOfRecords": 15,
      "pageCount": 1,
      "pagingDirectionCode": " ",
      "totalNumberOfRecords": 130
      }
      request.paginationDetail = paginationDetail;
      console.log("request********end",request);
        request={
              request,
              messageId : "retrieveProductSearchResult"
        }

        return request;
  },

  buildPIQQuestionAndAnswers:(requestPIQAnswer,PIQCriterias) => {
    let investmentPreferenceList = [];
    for(let key in requestPIQAnswer){
      PIQCriterias.filter(function(item,index){
        if(item.code == key){
          switch(item.type){
            case "singleValue": {
              var investmentPreference = {};
              investmentPreference.investmentPreferenceTypeCode = key;
              investmentPreference.investmentPreferenceCode = requestPIQAnswer[key];
              investmentPreferenceList.push(investmentPreference);
              return;
            }
            case "list":{
              //DODO: if type == list use this type
              return;
            }
          }
        }
      });
    };
     var investmentPreference = {};
        investmentPreference.investmentPreferenceTypeCode = "GOALTYPE";
        investmentPreference.investmentPreferenceCode = "SP_PROD_NEED";
        investmentPreferenceList.push(investmentPreference);
    return investmentPreferenceList;
  },

  buildProductSearchCriterias:(requestCriterias,criteriaConstant) =>{
    debugger;
    let productSearchCriteriaObj = {};
    let criteriaList = [];
    let searchCriteria = [];
    let formula = "";
    let criteriaIndex = 0;
    for(let key in requestCriterias){
      criteriaConstant.filter(function(item,index){
        if(item.code == key && item.opt =="auto"){
          switch(item.type){
            case "singleValue":{
              //patch singleValue criterias
              let criteria = {};
              let keyValueWithIndex = IajRetrieveProductSearchResultRequestBuilder.patchKeyValueWithIndex(item,criteriaIndex);
              let valueList = [];
              if(requestCriterias[key] != undefined){
                let value = {};
                value.value=requestCriterias[key];
                valueList.push(value);
                criteria.keyValueWithIndex = keyValueWithIndex;
                criteria.value = valueList;
                criteriaList.push(criteria);
                //patch formula
                formula = IajRetrieveProductSearchResultRequestBuilder.appendFormula(formula,criteriaIndex);
                criteriaIndex = criteriaIndex + 1;
              }
              return;
            }
            case "list":{
              //patch singleValue criterias
              let criteria = {};
              let keyValueWithIndex = IajRetrieveProductSearchResultRequestBuilder.patchKeyValueWithIndex(item,criteriaIndex);
              let valueList = [];
              console.log("criteriaKey",key);
              console.log("criteriaValue",requestCriterias[key].length);
              if(requestCriterias[key] != undefined && requestCriterias[key].length > 0){
                  requestCriterias[key].filter(function(valueItem){
                  let value = {};
                  value.value=valueItem.value;
                  valueList.push(value);
                });
                criteria.keyValueWithIndex = keyValueWithIndex;
                criteria.value = valueList;
                criteriaList.push(criteria);
                //patch formula
                formula = IajRetrieveProductSearchResultRequestBuilder.appendFormula(formula,criteriaIndex);
                criteriaIndex = criteriaIndex + 1;
              }
              return;
            }
            case "searchCriteria" :{
              searchCriteria.push({key : item.code, value : requestCriterias[key]});
              return;
            }
            default:
            return ;
          }
        }else if(item.code == key && item.opt =="manual"){
          switch(item.type){
            case "singleValue":{
              //TODO like RISK need to add null value
              let criteria = {};
              let keyValueWithIndex = IajRetrieveProductSearchResultRequestBuilder.patchKeyValueWithIndex(item,criteriaIndex);
              let valueList = [];
              if(requestCriterias[key] != undefined){
                if(key == "PROD_NAME" && requestCriterias[key] ==""){
                    return;
                }else{
                  let value = {};
                  value.value=requestCriterias[key];
                  valueList.push(value);
                  if(item.code =="RISK_LVL_CDE"){
                    let emptyValue = {};
                    emptyValue.value = "NULL";
                    valueList.push(emptyValue);
                  }
                  criteria.keyValueWithIndex = keyValueWithIndex;
                  criteria.value = valueList;
                  criteriaList.push(criteria);
                  //patch formula
                  formula = IajRetrieveProductSearchResultRequestBuilder.appendFormula(formula,criteriaIndex);
                  criteriaIndex = criteriaIndex +1;
                }              
              }
              return;
            }
            case "list":{
              //TODO like strategy,
              let criteria = {};
              let keyValueWithIndex = IajRetrieveProductSearchResultRequestBuilder.patchKeyValueWithIndex(item,criteriaIndex);
              let valueList = [];
              if(item.code =="PROD_TYPE_CDE"){
                valueList.push({value:"UT"});
              }
              criteria.keyValueWithIndex = keyValueWithIndex;
              criteria.value = valueList;
              criteriaList.push(criteria);
              //patch formula
              formula = IajRetrieveProductSearchResultRequestBuilder.appendFormula(formula,criteriaIndex);
              criteriaIndex = criteriaIndex +1;   
              return;
            }
            default:
            return ;
          }
        }
      })
    }
    
    productSearchCriteriaObj.keyValueCriteriaWithIndex = criteriaList;
    productSearchCriteriaObj.filterCriteriaFormula = {filterFormula:formula};
    productSearchCriteriaObj.searchCriteria=searchCriteria;
    return productSearchCriteriaObj;
  },

  appendFormula(formula,criteriaIndex){
    if(formula == ""){
      formula += "{"+criteriaIndex+"}";
    } else {
      formula += " AND {"+criteriaIndex+"}";
    }
    return formula;
  },
  patchKeyValueWithIndex(item,criteriaIndex){
    let keyValueWithIndex = {
      index : criteriaIndex,
      key : item.code,
      keyType : item.keyType,
      operator : item.operation,
      valueType : item.valueType
    }
    return keyValueWithIndex;
  }
  
}
export default IajRetrieveProductSearchResultRequestBuilder;