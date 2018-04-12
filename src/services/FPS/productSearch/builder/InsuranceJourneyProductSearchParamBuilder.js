import ObjectHelper from '../../../../common/lib/ObjectHelper';
import formatHelper from '../../../../common/lib/formatHelper';
import {goalSolutionConfig} from '../../../config/goalSolution/goalSolutionConfig'; 
import {goalSolutionDetailConfig} from '../../../config/goalSolution/goalSolutionDetailConfig';
import {productSearchConstants} from '../../../config/goalSolution/productSearchConstants';
import {sortingCriteriaUtils} from '../../../commonService/sortingCriteriaUtils';
import {prodSearchUtils} from '../../../commonService/prodSearchUtils';

const insuranceJourenyProductSearchParamBuilder={

buildInsuranceJourenyProductSearchParamBuilder:(response,filterFormBean,searchFormBean)=>{
        // let request=new Map;
        
       let riskProfile,skipRiskProfilingIndicator,riskLevelKeys=[];
      

        searchFormBean.searchCountMap={key:"INS",value:0};
        searchFormBean.searched=true;
        searchFormBean.timeToMaturity.optionList=[];
        searchFormBean.suitableProductOnly=["Y"];
        searchFormBean.productType={
                selectedVal:["FE_ALL"],
                optionList:[
                    {
                    key:null,
                    value:null   
                    }
                ]
            };

        //set risk level
        if(!ObjectHelper.isNullOrEmpty(response.goalSummary)){
              let goalSummary = response.goalSummary;
              if(!ObjectHelper.isNullOrEmpty(goalSummary[0].riskProfile[0])){
                skipRiskProfilingIndicator = goalSummary[0].financialGoal.skipRiskProfilingIndicator;
                riskProfile = goalSummary[0].riskProfile[0];
                if(skipRiskProfilingIndicator && "N"==skipRiskProfilingIndicator){
                    if(riskProfile){
                        for(let i=0;i<=Number(riskProfile.riskCapacityLevelNumber);i++){
                            riskLevelKeys.push(i);
                        }
                       searchFormBean.riskLevelIndex= riskProfile.riskCapacityLevelNumber;

                    }
                }
              }
        }
        searchFormBean.riskLevelKeys=riskLevelKeys;

        
        filterFormBean.insuranceProductType={
                optionList:[
                    {key:"INSP",value:"INSP"},
                    {key:"INSS",value:"INSS"},
                    {key:"INSII",value:"INSII"},
                    {key:"INSP",value:"INSP"}
                ]
        };


}
 
}

export default insuranceJourenyProductSearchParamBuilder;