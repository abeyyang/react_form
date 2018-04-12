export const SIJ_GS_RETRIEVE_GOAL_SOLUTIO_DETAIL='SIJ_GS_RETRIEVE_GOAL_SOLUTIO_DETAIL';
export const SIJ_GS_RETRIEVE_GOAL_SOLUTIO_DETAIL_SUCCESS='SIJ_GS_RETRIEVE_GOAL_SOLUTIO_DETAIL_SUCCESS';
export const SIJ_GS_REVIEWINVESTMENT='SIJ_GS_REVIEWINVESTMENT';
export const SIJ_GS_REVIEWINVESTMENT_SUCCESS='SIJ_GS_REVIEWINVESTMENT_SUCCESS';
export const SIJ_GS_RECORD_GOAL_SOLUTIO_DETAIL='SIJ_GS_RECORD_GOAL_SOLUTIO_DETAIL';
export const SIJ_GS_RECORD_GOAL_SOLUTIO_DETAIL_SUCCESS='SIJ_GS_RECORD_GOAL_SOLUTIO_DETAIL_SUCCESS';
export const SIJ_GET_OR_UPDATE_QUOTE='SIJ_GET_OR_UPDATE_QUOTE';
export const SIJ_GET_QUOTE_OVERLAY='SIJ_GET_QUOTE_OVERLAY';
export const SHOW_GET_QUOTE_OVERLAY='SHOW_GET_QUOTE_OVERLAY';
export const UPDATE_GET_QUOTE_DATA_FORM='UPDATE_GET_QUOTE_DATA_FORM';
export const SIJ_GS_UPDATE_FORM_DATA='SIJ_GS_UPDATE_FORM_DATA';
export const SIJ_GS_UPDATE_FORM_DATA_SUCCESS='SIJ_GS_UPDATE_FORM_DATA_SUCCESS';
export const SIJ_GS_ADD_MORE_DISCUSS_PRODUCT='SIJ_GS_ADD_MORE_DISCUSS_PRODUCT';
export const SIJ_GS_ADD_MORE_DISCUSS_PRODUCT_SUCCESS='SIJ_GS_ADD_MORE_DISCUSS_PRODUCT_SUCCESS';
export const SIJ_GS_REMOVE_DISCUSS_PRODUCT='SIJ_GS_REMOVE_DISCUSS_PRODUCT';
export const SIJ_GS_REMOVE_DISCUSS_PRODUCT_SUCCESS='SIJ_GS_REMOVE_DISCUSS_PRODUCT_SUCCESS';
export const SIJ_GS_REMOVE_INS_PRODUCT='SIJ_GS_REMOVE_INS_PRODUCT';
export const SIJ_GS_REMOVE_INS_PRODUCT_SUCCESS='SIJ_GS_REMOVE_INS_PRODUCT_SUCCESS';


export const retrieveGoalSolutionDetail=(request)=>({
    type: SIJ_GS_RETRIEVE_GOAL_SOLUTIO_DETAIL,
    request
})

export const reviewInvestment=(request)=>({
    type: SIJ_GS_REVIEWINVESTMENT,
    request
})

export const recordGoalSolutionDetail=(request)=>({
    type: SIJ_GS_RECORD_GOAL_SOLUTIO_DETAIL,
    request
})

export const loadingGetQuoteOverlay=(params)=>({
    type: SIJ_GET_QUOTE_OVERLAY, 
    params
})

export const getOrUpdateQuote=(request)=>({
    type: SIJ_GET_OR_UPDATE_QUOTE,
    request
})

export const updateGetQuoteDataForm=(updateDate)=>({
    type: UPDATE_GET_QUOTE_DATA_FORM,
    updateDate
})

export const updateFormData=(request)=>({
    type: SIJ_GS_UPDATE_FORM_DATA,
    request
})

export const addMoreDiscussProd=(request)=>({
    type: SIJ_GS_ADD_MORE_DISCUSS_PRODUCT,
    request
})

export const removeDiscussProd=(request)=>({
    type: SIJ_GS_REMOVE_DISCUSS_PRODUCT,
    request
})

export const removeInsProd=(request)=>({
    type: SIJ_GS_REMOVE_INS_PRODUCT,
    request
})



