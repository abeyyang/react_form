import ObjectHelper from '../../../../../common/lib/ObjectHelper';
import BeanCreationService from '../../../../commonService/BeanCreationService';
import goalSolutionUtil from '../../goalSolutionUtil';
import {reviewInvestmentConfig} from '../constant/ReviewInvestmentConfig';
const buildReviewInvestmentRequest={
      buildRequestImpl:(reviewInvestmentParams)=>{
            let request=BeanCreationService.getReviewInvestmentRequest();
            
            //build goal key
            if(!ObjectHelper.isNullOrEmpty(reviewInvestmentParams.sessionInfo)){
                request.customers=goalSolutionUtil.buildCustomer(reviewInvestmentParams.sessionInfo);
            }
            // build customer
            if(!ObjectHelper.isNullOrEmpty(reviewInvestmentParams.sessionInfo)
             && !ObjectHelper.isNullOrEmpty(reviewInvestmentParams.sessionInfo.goalJourney)
            ){
               let goalKey = reviewInvestmentParams.sessionInfo.goalJourney;
               if(goalKey){
                    request.goalKeys=[goalSolutionUtil.buildGoalKey(goalKey.goalId,goalKey.planId)] ;
               }
              
            }
            //build localeCode
            request.localeCode={"localeCode": reviewInvestmentParams.sessionInfo.localeCode};
            
            //build request criteria
            request.requestCriteria=buildReviewInvestmentRequest._buildRequestCriterias(reviewInvestmentParams.invokePoint);
            request={
                request,
                messageId:"reviewInvestments"
            }
            return request;

      },
      _buildRequestCriterias : function (invokePoint) {
            let requestCriterias = [];
			let currentInvokePoint = reviewInvestmentConfig[""+invokePoint+""];
            if(invokePoint && currentInvokePoint){

                let setInvokePoints = currentInvokePoint.invokePoint;
                if(setInvokePoints){
                    setInvokePoints.map(function(value,index,map){
                         let invokePoints = {
                            requestCriteriaKeyCode : "INVOKE_POINT",
                            requestCriteriaValueAttributes : [{
                                requestCriteriaValue: value
                            }]
                        };
                        let validationRequired={
                            requestCriteriaKeyCode : "VALIDATION_REQUIRED",
                            requestCriteriaValueAttributes : [{
                                requestCriteriaValue: currentInvokePoint.validationRequired
                            }]
                        };
                        
                        let reviewInvestmentScope={  
                            requestCriteriaKeyCode : "REVIEW_INVESTMENT_SCOPE",
                            requestCriteriaValueAttributes : [{
                                requestCriteriaValue: currentInvokePoint.reviewInvestmentScope
                            }]
                        };
                        requestCriterias.push(invokePoints);
                        requestCriterias.push(validationRequired);
                        requestCriterias.push(reviewInvestmentScope);
                        
                    });
                     return requestCriterias;
                }

            }
		}
     
}
export default buildReviewInvestmentRequest;