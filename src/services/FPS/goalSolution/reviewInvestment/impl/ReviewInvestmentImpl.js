
import buildRequest from '../builder/ReviewInvestmentRequestBuilderforProductSummary';
const reviewInvestmentImpl={


    buildReviewInvestmentImplRequest:(params)=>{
        let request={};
        request= buildRequest.buildRequestImpl(params);
        return request;
    },
 
        
    buildReviewInvestmentImplResponse:(response)=>{
       
    }


}

export default reviewInvestmentImpl;