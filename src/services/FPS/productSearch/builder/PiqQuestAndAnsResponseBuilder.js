import ObjectHelper from '../../../../common/lib/ObjectHelper';
import formatHelper from '../../../../common/lib/formatHelper';
import {goalSolutionConfig} from '../../../config/goalSolution/goalSolutionConfig'; 
import {goalSolutionDetailConfig} from '../../../config/goalSolution/goalSolutionDetailConfig';
import {productSearchConstants} from '../../../config/goalSolution/productSearchConstants';
import {sortingCriteriaUtils} from '../../../commonService/sortingCriteriaUtils';
import {prodSearchUtils} from '../../../commonService/prodSearchUtils';

const piqQuestAndAnsResponseBuilder={

buildPiqQuestAndAnsResponseBuilder:(response,filterFormBean,searchFormBean)=>{
        // let request=new Map;
        
      let piqQuestAndAnsDetails = response.piqQuestAndAnsDetails;
      
      let currencyCode="", preQuestionsList=goalSolutionDetailConfig.ins_type_meet_object,insTypeList=[],nochangePiqList=[];
       if(!ObjectHelper.isNullOrEmpty(response.goalSummary)){
                let goalSummary=response.goalSummary;
              if(!ObjectHelper.isNullOrEmpty(goalSummary)){
                   for(let i =0;i<goalSummary.length;i++){
                      currencyCode=goalSummary[i].financialGoal.goalTargetCurrencyCode;
                      searchFormBean.goalTypeCode=goalSummary[i].financialGoal.goalTypeCode;
                    }
                
            }
        }
        filterFormBean.targetAmountCcyCode=currencyCode;
        if(!ObjectHelper.isNullOrlengthZore(piqQuestAndAnsDetails)){
              // label 
           for (let i = 0; i < piqQuestAndAnsDetails.length; i++) {
                 let  piqQuestAndAnsDetail = piqQuestAndAnsDetails[i];

                 // filter INSINVPERD insinvperdQuestions
                 if(piqQuestAndAnsDetail.investmentPreferenceTypeCode==goalSolutionDetailConfig.INS_CONTRIBUTE_PERIOD_PIQ_KEY){
                    searchFormBean.selectedInsContributePeriod=piqQuestAndAnsDetail.investmentPreferenceCode;
                 }

                 // filter SAVAMTOPT
                else if(piqQuestAndAnsDetail.investmentPreferenceTypeCode==goalSolutionDetailConfig.SAVAMTOPT){
                    filterFormBean.selectTargetAmount=piqQuestAndAnsDetail.investmentPreferenceCode;
                 }

                 // filter SAVAMT 
                else if(piqQuestAndAnsDetail.investmentPreferenceTypeCode==goalSolutionDetailConfig.SAVAMT){
                   if(ObjectHelper.isNullOrEmpty(filterFormBean.targetAmountValue)){
                       filterFormBean.targetAmountValue=currencyCode;
                    }
                    if(piqQuestAndAnsDetail.investmentPreferenceCode==goalSolutionDetailConfig.SAVAMTVAL){
                        filterFormBean.targetAmountValue=piqQuestAndAnsDetail.investmentPreferenceText;
                    }else if(piqQuestAndAnsDetail.investmentPreferenceCode==goalSolutionDetailConfig.SAVE_AMT_CCY){
                        filterFormBean.targetAmountCcyCode=piqQuestAndAnsDetail.investmentPreferenceText;
                        filterFormBean.targetAmountValue.currency=piqQuestAndAnsDetail.investmentPreferenceText;
                    }
                 }      
                 // filter TIMFRAMOPT
                 else if(piqQuestAndAnsDetail.investmentPreferenceTypeCode==goalSolutionDetailConfig.TIMFRAMOPT){
                        filterFormBean.selectTimeFrame=piqQuestAndAnsDetail.investmentPreferenceCode;

                 }
                 // filter TIMFRAMVAL 
                else if(piqQuestAndAnsDetail.investmentPreferenceTypeCode==goalSolutionDetailConfig.TIMFRAMVAL){
                    filterFormBean.selecttimeFramesubList=piqQuestAndAnsDetail.investmentPreferenceCode;
                 }else if(preQuestionsList.indexOf(piqQuestAndAnsDetail.investmentPreferenceTypeCode)>-1){

                        if(piqQuestAndAnsDetail.investmentPreferenceCode=="Y"){
                            insTypeList.push(piqQuestAndAnsDetail.investmentPreferenceTypeCode);
                        }
                        if("PRE_OTHERS" ==piqQuestAndAnsDetail.investmentPreferenceTypeCode){
                            searchFormBean.otherInsTypeText=piqQuestAndAnsDetail.investmentPreferenceText;
                        }
                       
                     
                }else{
                    if(goalSolutionDetailConfig.INSINVPERD == (piqQuestAndAnsDetail.investmentPreferenceTypeCode)){
                		filterFormBean.protectPeriodValue=piqQuestAndAnsDetail.investmentPreferenceCode;
                	}
    				nochangePiqList.push(piqQuestAndAnsDetail);

                }
                   
                
            }
            if(insTypeList && insTypeList.length >0){
                searchFormBean.selectedInsType=insTypeList
            }
            if(nochangePiqList && nochangePiqList.length > 0){
                searchFormBean.noChangePiqAndAskList=nochangePiqList;
            }
            filterFormBean.selectedInsType=searchFormBean.selectedInsType;
            filterFormBean.selectedInsContributePeriod=searchFormBean.selectedInsContributePeriod;
            filterFormBean.otherInsTypeText=searchFormBean.otherInsTypeText;

        
        }
      
    }
 
}

export default piqQuestAndAnsResponseBuilder;