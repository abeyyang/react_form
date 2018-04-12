export const INV_RETRIEVE_GOAL_SOLUTION_DETAIL ="INV_RETRIEVE_GOAL_SOLUTION_DETAIL";
export const GET_GOAL_SOLUTION_DETAIL = "GET_GOAL_SOLUTION_DETAIL";
export const ADD_MORE_PRODUCT = "ADD_MORE_PRODUCT";
export const REMOVE_PRODUCT ="REMOVE_PRODUCT";
export const REMOVE_INV_PRODUCT ="REMOVE_INV_PRODUCT";
export const RECORD_SOLUTION_DETAIL = "RECORD_SOLUTION_DETAIL";
export const RECORD_FINALISE_GOAL_DETAIL = "RECORD_FINALISE_GOAL_DETAIL";
export const RECORD_FINALISE_GOAL_DETAIL_SUCCESS = "RECORD_FINALISE_GOAL_DETAIL_SUCCESS";
export const SAVE_DISCUSSED_PRODUCT_TO_STATE = "SAVE_DISCUSSED_PRODUCT_TO_STATE";
export const IAJ_GOALSUMMARY_REVIEW_INVESTMENT = "IAJ_GOALSUMMARY_REVIEW_INVESTMENT";
export const IAJ_GOALSUMMARY_REVIEW_INVESTMENT_SUCCESS = "IAJ_GOALSUMMARY_REVIEW_INVESTMENT_SUCCESS";
export const IAJ_GOALSUMMARY_RECORD_GOAL_SUCCESS = "IAJ_GOALSUMMARY_RECORD_GOAL_SUCCESS";
export const IAJ_GOALSUMMARY_RETRIEVE_ASSETSMIX_HOLDING_SUCCESS = "IAJ_GOALSUMMARY_RETRIEVE_ASSETSMIX_HOLDING_SUCCESS";
export const RETRIEVE_GOAL_SUMMARY_ASSETS_HOLDING_SUCCESS = 'RETRIEVE_GOAL_SUMMARY_ASSETS_HOLDING_SUCCESS';
export const getPreviewProductData =(requestParams)=>({
        type:INV_RETRIEVE_GOAL_SOLUTION_DETAIL,
        requestParams
});
export const addMoreProduct = (params) =>({
        type:ADD_MORE_PRODUCT,
        goalSolutionDetail:{
            alternativeProductList:params.alternativeProductList
        }     
});

export const removeProduct = (params)=>({
        type:REMOVE_PRODUCT,
        goalSolutionDetail:{
            alternativeProductList:params.alternativeProductList,
            rowIndex:params.rowIndex,
            type:params.type,
            productCardList:params.productCardList
        } 
});

export const removeInvProduct = (params)=>({
        type:REMOVE_INV_PRODUCT,
        goalSolutionDetail:{
            productCardList:params.productCardList,
            rowIndex:params.rowIndex
        } 
});
export const recordSolutionDetail = (params)=>({
        type:RECORD_SOLUTION_DETAIL,
        params
});
export const recordFinaliseGoalDetail = (params) =>({
        type:RECORD_FINALISE_GOAL_DETAIL,
        params
});
export const saveMoreDiscussedProductToState = (params) =>({
        type:SAVE_DISCUSSED_PRODUCT_TO_STATE,
        params
});
export const reviewInvestment = (params) =>({
        type:IAJ_GOALSUMMARY_REVIEW_INVESTMENT,
        params
});
