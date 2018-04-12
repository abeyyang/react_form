export const RETRIEVE_GOAL_SOLUTIO_DETAIL_SIJ_PS = 'RETRIEVE_GOAL_SOLUTIO_DETAIL_SIJ_PS';
export const RETRIEVE_GOAL_SOLUTIO_DETAIL_SIJ_PS_SUCCESS = 'RETRIEVE_GOAL_SOLUTIO_DETAIL_SIJ_PS_SUCCESS';
export const RENDER_SIJ_PS_SUCESS ='RENDER_SIJ_PS_SUCESS';
export const RENDER_SIJ_PS ='RENDER_SIJ_PS';
export const ADD_OR_DELETE_INS_PRODUCT='ADD_OR_DELETE_INS_PRODUCT';
export const ADD_OR_DELETE_DISCUSSED_INS_PRODUCT='ADD_OR_DELETE_DISCUSSED_INS_PRODUCT';
export const ADD_OR_DELETE_INS_PRODUCT_SUCCESS='ADD_OR_DELETE_INS_PRODUCT_SUCCESS';
export const ADD_OR_DELETE_DISCUSSED_INS_PRODUCT_SUCCESS='ADD_OR_DELETE_DISCUSSED_INS_PRODUCT_SUCCESS';
export const REVIEW_INS_PRODUCT='REVIEW_INS_PRODUCT';
export const REVIEW_INS_PRODUCT_SUCCESS='REVIEW_INS_PRODUCT_SUCCESS';

export const retrieveGoalSolutionDetailforSIJPS=(request)=>({
    type: RETRIEVE_GOAL_SOLUTIO_DETAIL_SIJ_PS,
    request
})

export const renderSIJPS=(params)=>({
    type: RENDER_SIJ_PS,
    request: params
})

export const addOrDeleteInsProduct=(params)=>({
    type: ADD_OR_DELETE_INS_PRODUCT,
    request: params
})
export const addOrDeleteDiscussedInsProduct=(params)=>({
    type: ADD_OR_DELETE_DISCUSSED_INS_PRODUCT,
    request: params
})
export const reviewInsProduct=(params)=>({
    type: REVIEW_INS_PRODUCT,
    request: params
})



