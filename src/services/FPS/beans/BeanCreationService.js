import getRetrieveProductSearchResultRequestBean from './RetrieveProductSearchResultRequest';
import getRetrieveProductSearchResultResponseBean from './RetrieveProductSearchResultResponse';

const beanCreation={

    getRetrieveProductSearchResultRequest:()=>{
        return getRetrieveProductSearchResultRequestBean();
    },

    getRetrieveProductSearchResultResponse :()=>{
        return getRetrieveProductSearchResultResponseBean();
    }
}

export default beanCreation;