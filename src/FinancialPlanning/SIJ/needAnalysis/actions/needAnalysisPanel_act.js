export const RETRIEVE_GOAL_SOLUTION_DETAIL = 'RETRIEVE_GOAL_SOLUTION_DETAIL';
export const UPDATE_GOAL_SOLUTION_DETAIL= 'UPDATE_GOAL_SOLUTION_DETAIL';
export const NEED_ANALYSIS_SAVE= 'NEED_ANALYSIS_SAVE';
export const RECORD_BASE_GOAL_SUCCESS='RECORD_BASE_GOAL_SUCCESS';
export const LOADING_NEED_ANALYSIS_PAGE='LOADING_NEED_ANALYSIS_PAGE';
export const RETRIEVE_FNA_GET_NEED_DATA='RETRIEVE_FNA_GET_NEED_DATA';
export const CALCULATE_PROTECTION_NEED_ANALYSIS='CALCULATE_PROTECTION_NEED_ANALYSIS';
export const UPDATE_TOTALPRONEEDAMOUNT='UPDATE_TOTALPRONEEDAMOUNT';
export const NEED_PAGE_SAVE_PROGRESS='NEED_PAGE_SAVE_PROGRESS';
export const NEED_ANLYSIS_ERROR_HANDER='NEED_ANLYSIS_ERROR_HANDER';



export const loadingNeedAnalysisPage=(params)=>({
    type: LOADING_NEED_ANALYSIS_PAGE, 
    params
})
export const needAnalysisSave=(saveParams)=>({
    type: NEED_ANALYSIS_SAVE,
    saveParams
})

export const calculateProtectionNeedPage=(lifeParams)=>({
    type: CALCULATE_PROTECTION_NEED_ANALYSIS,
    lifeParams
})

export const formVaildateErrorList=(saveParams)=>({
    type: NEED_ANLYSIS_ERROR_HANDER,
    saveParams
})


export const updateNeedAnlysisField=(field)=>({
    type: 'update_NeedAnlysis_Field',
    field
})