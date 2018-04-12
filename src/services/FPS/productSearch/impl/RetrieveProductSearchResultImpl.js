
import sessionInfoService from '../../../sessionInfoService'
import ObjectHelper from '../../../../common/lib/ObjectHelper';
import formatHelper from '../../../../common/lib/formatHelper';
import {goalSolutionConfig} from '../../../config/goalSolution/goalSolutionConfig'; 
import {productSearchConstants} from '../../../config/goalSolution/productSearchConstants';
import {sortingCriteriaUtils} from '../../../commonService/sortingCriteriaUtils';
import {prodSearchUtils} from '../../../commonService/prodSearchUtils';
import modalCreationService from '../../../commonService/ModalCreationService';
import beanCreationService from '../../../commonService/BeanCreationSerfice';
import piqQuestAndAnsResponseBuilder from '../builder/PiqQuestAndAnsResponseBuilder';

const retrieveProductSearchResultImpl={


 buildRetrieveProductSearchResultRequest:(productSelectionData)=>{
        // let request=new Map;
        
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
        // let RetrieveProductSearchResultRequest={
        //         customers:[],
        //         goalKey:{},
        //         localeCode:{},
        //         productSearchCriteria:[],
        //         requestMode:[],
        //         paginationDetail:{}
        // }
       let RetrieveProductSearchResultRequest= beanCreationService.getRetrieveProductSearchResultRequest();
      let goalKey=productSelectionData.goalKey;
      productSelectionData.goalKey=goalSolutionUtil.buildGoalKey(goalKey.goalId,goalKey.planId);
      let productSearchCriteriaList=[];
    //   let productSearchCriteria={
    //       productSelectionMethodCode:"S",
    //       filterCriteriaFormula:null,
    //       keyValueCriteriaWithIndex:null,
    //       keyNlsValueCriteriaWithIndex:null,
    //       productDisplay:null,
    //       productSearchTecSegment:null,
    //       sortingCriteria:null

    //   };
      let productSearchCriteria= modalCreationService.getProductSearchCriteriaModal();
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
      keyNlsValueCriteria=goalSolutionUtil.buildKeyNlsValueCriteriaWithIndex(productSelectionData);
       console.log('keyNlsValueCriteria...',keyNlsValueCriteria);
      
      productSearchCriteria.filterCriteriaFormula=goalSolutionUtil.buildFilterCriteriaFormulaAndReOrderCriteriaIndex(productSelectionData,tabConfigCriteria,keyValueCriteria,keyNlsValueCriteria,characteristicsCriteria)
      keyValueCriteriaWithIndex=tabConfigCriteria.concat(keyValueCriteria,characteristicsCriteria);
      productSearchCriteria.keyValueCriteriaWithIndex=keyValueCriteriaWithIndex;
      productSearchCriteria.keyNlsValueCriteriaWithIndex=keyNlsValueCriteria;
      productSearchCriteria.productDisplay=goalSolutionUtil.buildProductDisplay(productSelectionData);
      productSearchCriteria.productSearchTecSegment=goalSolutionUtil.buildProductSearchTecSegment(productSelectionData);
      productSearchCriteria.sortingCriteria=goalSolutionUtil.buildSortingCriteria(productSelectionData);

        productSearchCriteriaList.push(productSearchCriteria);
        RetrieveProductSearchResultRequest.productSearchCriteria=productSearchCriteriaList;
                                                                                                
        RetrieveProductSearchResultRequest.pageCountCriteria=goalSolutionUtil.buildPageCountCriteria(productSelectionData)
        RetrieveProductSearchResultRequest.paginationRequest0263=goalSolutionUtil.buildPaginationRequest(productSelectionData);
        // request.setLocaleCode(buildLocaleCode(ctx));
        RetrieveProductSearchResultRequest.coreReserveArea=goalSolutionUtil.buildCoreRservArea(productSelectionData);
        RetrieveProductSearchResultRequest.localFieldsArea=goalSolutionUtil.buildLocalFieldsArea(productSelectionData);
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
            RetrieveProductSearchResultRequest.requestMode=goalSolutionUtil.appendInsuranceSearchRequestMode(RetrieveProductSearchResultRequest.requestMode);
        }
        RetrieveProductSearchResultRequest.piqQuestAndAnsDetails=prodSearchUtils.buildPiqQuestAndAnsDetails(filterFormBean,searchFormBean);

        return RetrieveProductSearchResultRequest;
    }



}

export default retrieveProductSearchResultImpl;