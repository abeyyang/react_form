import ObjectHelper from '../../common/lib/ObjectHelper';
import {goalSolutionConfig} from '../config/goalSolution/goalSolutionConfig'; 
import {productSearchConstants} from '../config/goalSolution/productSearchConstants';
import {selectProdConstants} from '../config/goalSolution/selectProdConstants';
export const sortingCriteriaUtils={
    buildExtraSortingCriteria:(productSelectionData,goalObjectiveTypeCode)=>{
        
        let sortingCriteriaConfig=goalSolutionConfig.sortingCriteriaConfig;       
        let sortList=new Array;
        let sortingCriteriaKeysList=new Array;
        let sortingCriteriaKeys=new String
        sortingCriteriaKeys=sortingCriteriaConfig[selectProdConstants.SORTINGCRITERIAKEYSLIST_KEY];
        sortingCriteriaKeysList=sortingCriteriaKeys.split(",");
        for (var sortingCriteriaKeysIndex = 0; sortingCriteriaKeysIndex < sortingCriteriaKeysList.length; sortingCriteriaKeysIndex++) {
             var sortingCriteriaVal = sortingCriteriaKeysList[sortingCriteriaKeysIndex];
             let subSortingCriteriaKeys=new String
             subSortingCriteriaKeys=sortingCriteriaConfig[sortingCriteriaVal];
             let subSortingCriteriaKeysList=new Array;
             subSortingCriteriaKeysList=subSortingCriteriaKeys.split(",");
              if(selectProdConstants.PRIORITYKEYSLIST_KEY===sortingCriteriaVal){
                    if(!ObjectHelper.isNullOrEmpty(goalObjectiveTypeCode)){
                        if(subSortingCriteriaKeysList.indexOf(goalObjectiveTypeCode)>-1){
                            continue;
                        }else{
                            let tempList=new Array;
                            tempList.push(goalObjectiveTypeCode);
                            subSortingCriteriaKeysList=tempList;
                        }
                    }
              }
           for (var subSortingCriteriaKeysIndex = 0; subSortingCriteriaKeysIndex < subSortingCriteriaKeysList.length; subSortingCriteriaKeysIndex++) {
                var subIterKey = subSortingCriteriaKeysList[subSortingCriteriaKeysIndex];
                let subIterKeys=new String;
                subIterKeys=sortingCriteriaConfig[subIterKey];
                let subIterKeyList=new Array;
                subIterKeyList=subIterKeys.split(",");
                let subIterVal=sortingCriteriaConfig[subIterKey];
                let  sortField =  subIterKeyList[0];
            	let  sortOrder =  subIterKeyList[1];
                if(ObjectHelper.isNullOrEmpty(sortOrder)){
                    sortOrder=sortingCriteriaConfig[selectProdConstants.DEFAULT_ORDER_KEY]
                }   
                sortList.push(sortingCriteriaUtils.sort(sortField,sortOrder));
           }
        }
        return sortList;
    },
    sort:(sortField,sortOrder)=>{
        let sortingCriteria=new Map;
        sortingCriteria.sortField=sortField;
        sortingCriteria.sortOrder=sortOrder;
        return sortingCriteria;
    }
}
