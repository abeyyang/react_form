export const INV_PRODUCT_SEARCH = 'INV_PRODUCT_SEARCH';
export const INV_REVIEW_PRODUCTS = 'INV_REVIEW_PRODUCTS';
export const INV_PRODUCT_SEARCH_UPDATE_LAYOUT = 'INV_PRODUCT_SEARCH_UPDATE_LAYOUT';
export const INV_PRODUCT_SEARCH_UPDATE_CRITERIA = 'INV_PRODUCT_SEARCH_UPDATE_CRITERIA';
export const INV_PRODUCT_SEARCH_UPDATE_PRODUCT_CODE = 'INV_PRODUCT_SEARCH_UPDATE_PRODUCT_CODE';
export const INV_PRODUCT_SEARCH_ADD_PRODUCT = 'INV_PRODUCT_SEARCH_ADD_PRODUCT';
export const INV_PRODUCT_SEARCH_DISCUSS_PRODUCT = 'INV_PRODUCT_SEARCH_DISCUSS_PRODUCT';
export const INV_PRODUCT_SEARCH_UPDATE_PIQ = 'INV_PRODUCT_SEARCH_UPDATE_PIQ';
export const INV_PRODUCT_SEARCH_UPDATE_PRODUCT_RESULT = 'INV_PRODUCT_SEARCH_UPDATE_PRODUCT_RESULT';
export const INV_PRODUCT_SEARCH_UPDATE_PRODUCT_RESULT_FOR_BOND = 'INV_PRODUCT_SEARCH_UPDATE_PRODUCT_RESULT_FOR_BOND';
export const INV_PRODUCT_SEARCH_REOPEN_CRITERIAS = 'INV_PRODUCT_SEARCH_REOPEN_CRITERIAS';
export const RECORD_BASE_IAJ_SUCCESS = 'RECORD_BASE_IAJ_SUCCESS';
export const INV_PRODUCT_SEARCH_RENDER_PAGE ='INV_PRODUCT_SEARCH_RENDER_PAGE';
export const INV_PRODUCT_SEARCH_RESET_STATUS = 'INV_PRODUCT_SEARCH_RESET_STATUS';

export const searchProduct=(request)=>({
    type: INV_PRODUCT_SEARCH,
    requestAction : request
})
export const updateLayoutStaus=(request) =>({
    type:INV_PRODUCT_SEARCH_UPDATE_LAYOUT,
    request:request
})

export const reviewProducts = (request) => ({
    type:INV_REVIEW_PRODUCTS,
    selectedProducts:request.selectedProducts,
    discussedProducts:request.discussedProducts,
    requestPIQAnswer:request.requestPIQAnswer
})

export const updateCriteria = (requestCriterias) => ({
    type:INV_PRODUCT_SEARCH_UPDATE_CRITERIA,
    requestCriterias:requestCriterias
})

export const updateProductCode = (productCode) => ({
    type:INV_PRODUCT_SEARCH_UPDATE_PRODUCT_CODE,
    productCode:productCode
})

export const updatePIQAnswers = (requestPIQAnswer) => ({
    type:INV_PRODUCT_SEARCH_UPDATE_PIQ,
    requestPIQAnswer:requestPIQAnswer
})

export const addProducts = (request) =>({
    type:INV_PRODUCT_SEARCH_ADD_PRODUCT,
    productSearchResult:request.productSearchResult,
    selectedProducts:request.selectedProducts,
    discussedProducts:request.discussedProducts,
    operation:request.operation
})


export const discussProducts = (request) =>({
    type:INV_PRODUCT_SEARCH_DISCUSS_PRODUCT,
    product:request.product,
    operation:request.operation
})

export const reOpenCriterias = (request) => ({
    type:INV_PRODUCT_SEARCH_REOPEN_CRITERIAS,
    productSearchResult:request.productSearchResult
})

export const resetPageStatus =(request) => ({
    type:INV_PRODUCT_SEARCH_RESET_STATUS,
    productSearch:"none",
    shortCriteria:"none",
    seachCriteria:"block",
    renderPageTargetUrl:""
})