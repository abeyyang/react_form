import buildResponse from '../builder/buildResponse';
import buildRequest from '../builder/buildRequest';
const CalculateProtectionPlanProcessor={
        coverterRequest:(params)=>{
        let calculateProtectionParams=params;
        let request={};
        request= buildRequest.buildRequestImpl(calculateProtectionParams);
          return request;
        },
        coverterResponse:(response)=>{
          let result={};   
          result=buildResponse.buildResponseImpl(response);
          return result;
        }
}

export default CalculateProtectionPlanProcessor