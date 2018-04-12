import {INV_PRODUCT_SEARCH,INV_REVIEW_PRODUCTS,INV_PRODUCT_SEARCH_UPDATE_CRITERIA,INV_PRODUCT_SEARCH_UPDATE_PRODUCT_CODE,INV_PRODUCT_SEARCH_UPDATE_LAYOUT,
    INV_PRODUCT_SEARCH_ADD_PRODUCT,INV_PRODUCT_SEARCH_DISCUSS_PRODUCT,INV_PRODUCT_SEARCH_UPDATE_PIQ,
    INV_PRODUCT_SEARCH_REOPEN_CRITERIAS,INV_PRODUCT_SEARCH_UPDATE_PRODUCT_RESULT,INV_PRODUCT_SEARCH_UPDATE_PRODUCT_RESULT_FOR_BOND,INV_PRODUCT_SEARCH_RENDER_PAGE
} from '../actions/investmentProductSelection_act';

const initialState = {
    goalSolutionDetail:{
        riskLevel:"",
        goalDescription:""
    },
    productCode:[{id:'productCode0'}],
    requestCriterias:{
        PROD_NAME:"",
        PROD_TYPE_CDE:[]
    },
    requestPIQAnswer:{
        GOALTYPE:"SP_PROD_NEED"
    },
    productSearchResult:{
        resultInfo:{
            totalCount:0,
            pageNum:0,
            pageSize:0
        }
    },
    productSearchResultForBond:{
        resultInfo:{
            totalCount:0,
            pageNum:0,
            pageSize:0
        }
    },
    selectedProducts:[
    ],
    discussedProducts:[
    ],
    productsData:[],
    productDataForBond:[],
    productSearch:"none",
    shortCriteria:"none",
    seachCriteria:"block",
    renderPageTargetUrl:""
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INV_PRODUCT_SEARCH:
            console.log('investment journey product search',state);
            return { ...state};
        case INV_REVIEW_PRODUCTS:
            console.log('investment journey review products',state);
            return { ...state};
        case INV_PRODUCT_SEARCH_UPDATE_LAYOUT:
        let productSearch = action.request.productSearch;
        let shortCriteria = action.request.shortCriteria;
        let seachCriteria = action.request.seachCriteria;
        let renderPageTargetUrl = action.request.renderPageTargetUrl;
        return {...state,productSearch,shortCriteria,seachCriteria,renderPageTargetUrl};
        case INV_PRODUCT_SEARCH_UPDATE_CRITERIA:
            let requestCriteria = action.requestCriterias;
            return {...state,requestCriteria};
        case INV_PRODUCT_SEARCH_UPDATE_PRODUCT_CODE:
            let productCode = action.productCode;
            return {...state,productCode}
        case INV_PRODUCT_SEARCH_ADD_PRODUCT:
            let productSearchResult = action.productSearchResult;
            let productData = action.productSearchResult.productData;
            let selectedProducts = action.selectedProducts;
            let discussedProducts = action.discussedProducts;
            return {...state,productSearchResult,productData,selectedProducts,discussedProducts};
        case INV_PRODUCT_SEARCH_DISCUSS_PRODUCT:
            let discussProduct = action.product;
            let discussOperation = action.operation;
            discussedProducts = state.discussedProducts;
            if(discussOperation == 'addDiscuss'){
                discussedProducts.push(discussProduct);
            } else {
                discussedProducts.filter(function(selectedItem) { 
                    if(product.productKey != selectedItem.productKey){
                        return selectedItem;
                    }
                })
            }
            return { ...state,discussedProducts};
        case INV_PRODUCT_SEARCH_UPDATE_PIQ:
            let requestPIQAnswer = action.requestPIQAnswer;
            return { ...state,requestPIQAnswer};
        case INV_PRODUCT_SEARCH_UPDATE_PRODUCT_RESULT:
            productSearchResult = action.productSearchResult;
            productData = action.productData;
            return {...state,productSearchResult,productData};
        case INV_PRODUCT_SEARCH_UPDATE_PRODUCT_RESULT_FOR_BOND:
            let productSearchResultForBond = action.productSearchResultForBond;
            let productDataForBond = action.productDataForBond;
            return {...state,productSearchResultForBond,productDataForBond};
        default:
            return state;
    }
};



export default reducer;
