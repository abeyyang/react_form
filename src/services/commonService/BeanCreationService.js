import getRetrieveProductSearchResultRequestBean from '../FPS/beans/RetrieveProductSearchResultRequest';
import getRetrieveProductSearchResultResponseBean from '../FPS/beans/RetrieveProductSearchResultResponse';
import getReviewInvestmentRequestBean from '../FPS/beans/ReviewInvestmentRequest';
import getReviewInvestmentResponseBean from '../FPS/beans/ReviewInvestmentResponse';

const beanCreation={

    getRetrieveProductSearchResultRequest:()=>{
        return getRetrieveProductSearchResultRequestBean();
    },

    getRetrieveProductSearchResultResponse :()=>{
        return getRetrieveProductSearchResultResponseBean();
    },
    
    getReviewInvestmentRequest:()=>{
        return getReviewInvestmentRequestBean();
    },

    getReviewInvestmentResponse :()=>{
        return getReviewInvestmentResponseBean();
    }
}

export default beanCreation;