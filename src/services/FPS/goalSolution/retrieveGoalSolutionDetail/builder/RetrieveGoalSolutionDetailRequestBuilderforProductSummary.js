import ObjectHelper from '../../../../../common/lib/ObjectHelper';
import goalSolutionUtil from '../../goalSolutionUtil';
import {goalSolutionDetailConfig} from '../../../../config/goalSolution/goalSolutionDetailConfig';
const buildRetrieveGoalSolutionDetailRequest={
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
            request.localeCode={"localeCode": requestParams.sessionInfo.localeCode};
            //build subserviceId
            request.subserviceId = buildRetrieveGoalSolutionDetailRequest.buildSubServiceId(requestParams);
            //build comment
            request.requestComment = buildRetrieveGoalSolutionDetailRequest.buildRequestComment(requestParams);
            request={
                request,
                messageId:"retrieveGoalSolutionDetail"
            }
            return request;

      },

      buildSubServiceId:(goalSolutionDetailData)=>{
        let subServiceIds=new Array;
        subServiceIds=goalSolutionDetailConfig['retrieveGoalSolutionDetail_'+goalSolutionDetailData.pageMessageType+'_subServiceIds'];
        
        let subServiceId=new Array;
        for (let i = 0; i < subServiceIds.length; i++) {
             let functionOutputCode = subServiceIds[i];
             let tempMap={};
             tempMap.functionOutputCode=functionOutputCode;
             subServiceId.push(tempMap);
        }
        return subServiceId;
      },

      buildRequestComment:(goalSolutionDetailData)=>{
            let requestComments=new Array;
            requestComments=ObjectHelper.isNullOrEmpty( goalSolutionDetailConfig['retrieveGoalSolutionDetail_'+goalSolutionDetailData.pageMessageType+'_requestComment']) ? []: goalSolutionDetailConfig['retrieveGoalSolutionDetail_'+goalSolutionDetailData.pageMessageType+'_requestComment']; 
            
            let requestComment=new Array;
            for (let i = 0; i < requestComments.length; i++) {
                let commentType = requestComments[i];
                let tempMap={};
                tempMap.commentType=commentType;
                requestComment.push(tempMap);
            }
            return requestComment;
     }
    
}
export default buildRetrieveGoalSolutionDetailRequest;