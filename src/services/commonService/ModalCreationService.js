import getSearchFormBean from '../FPS/productSearch/modal/searchFormBean';
import getFilterFormBean from '../FPS/productSearch/modal/filterFormBean';
import getProductSearchCriteria from '../FPS/productSearch/modal/productSearchCriteria';
import getProductSelectionDataBean from '../FPS/productSearch/modal/productSelectionData';
import getReviewMyProductsFormBean from '../FPS/productSearch/modal/reviewMyProductsFormBean';

const modalCreation={

    getSearchFormModal:()=>{
        return getSearchFormBean();
    },

    getFilterFormModal :()=>{
        return getFilterFormBean()
    },
    getProductSearchCriteriaModal :()=>{
        return getProductSearchCriteria();
    },

    getProductSearchData :()=>{
        return getProductSelectionDataBean();
    },
    getReviewMyProductsFormModal:()=>{
        return getReviewMyProductsFormBean();
    }


}

export default modalCreation;
