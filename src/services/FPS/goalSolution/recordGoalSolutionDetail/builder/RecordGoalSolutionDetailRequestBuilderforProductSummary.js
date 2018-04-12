import ObjectHelper from '../../../../../common/lib/ObjectHelper';
import goalSolutionUtil from '../../goalSolutionUtil';
import {goalSolutionDetailConfig} from '../../../../config/goalSolution/goalSolutionDetailConfig';
const buildRecordGoalSolutionDetailRequest={
      buildRequestImpl:(requestParams)=>{
            debugger;
            let request={};
            //build customer
            if(!ObjectHelper.isNullOrEmpty(requestParams.sessionInfo)){
                request.customers=goalSolutionUtil.buildCustomer(requestParams.sessionInfo);
            }
            // build goalKey
            if(!ObjectHelper.isNullOrEmpty(requestParams.sessionInfo)
             && !ObjectHelper.isNullOrEmpty(requestParams.sessionInfo.goalJourney)
            ){
               let goalKey = requestParams.sessionInfo.goalJourney;
               if(goalKey){
                    request.goalKey= goalSolutionUtil.buildGoalKey(goalKey.goalId,goalKey.planId);
               }
              
            }
            //build localeCode
            // request.goalLocalFields=[{"localeCode": requestParams.sessionInfo.localeCode}];
            //build subserviceId
            request.subserviceId = buildRecordGoalSolutionDetailRequest.buildSubServiceId(requestParams);
            //build comment
            // request.comment = [];
            // request.commentAction = [];
            request.productTable = requestParams.goalSolutionDetailData.rtvResponse.productTable;
            request.declaration = requestParams.customerDeclaration;

            // request.existingHolding = [];
            // request.productList = [];
            // request.goalAttribute = [];
            // request.leadId = {
            //     leadSourceSystemNumber : ''
            // };
            // request.packageKey = [];
            // request.piqQuestAndAnsDetails = [];
            // request.piqAnswerValidationInfo = [];
            // request.investmentAppropriateness = [];
            // request.needEvaluation = [];
            // request.purposeBuyingProduct = [];
            // request.notes = [];
            // request.suitability = [];
            // request.staffAdviseSeg = {
            //     employeeAdviceIndicator : ''
            // };
            // request.actualPortfolioAllocation = [];
            // request.currentPortfolioAllocation = [];

            // request.modelPortfolioAssetClassAllocationList = [];
            // request.portfolioCalculationResult = {};
            // request.controlAdviceJourney = {};
            // request.alternativeProduct = requestParams.goalSolutionDetailData.rtvResponse.alternativeProduct;
            // request.investorIndicator = [];
            // request.affordability = [];
            // request.affordabilityValidation = [];
            // request.assetConcentration = [];
            // request.assetConcentrationValidation = [];
            // request.optOutDetails = [];
            // request.multipleAdviceStyleDetails = [];
            // request.cacheIndicator = {};
            // request.taxOptimizationDetails = [];
            // request.selectedProduct = [];
            // request.coreReserveArea = [];
            // request.localFieldsArea = [];
            request={
                request,
                messageId:"recordGoalSolutionDetail"
            }
            return request;
      },

      buildSubServiceId:(requestParams)=>{
        let subServiceIds=new Array;
        subServiceIds=goalSolutionDetailConfig['recordGoalSolutionDetail_'+requestParams.pageMessageType+'_subServiceIds'];
        
        let subServiceId=new Array;
        for (let i = 0; i < subServiceIds.length; i++) {
             let functionOutputCode = subServiceIds[i];
             let tempMap={};
             tempMap.functionOutputCode=functionOutputCode;
             subServiceId.push(tempMap);
        }
        return subServiceId;
      }
    
}
export default buildRecordGoalSolutionDetailRequest;