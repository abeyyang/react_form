export const INIT_FNA_ACTION ='INIT_FNA_ACTION';
export const INIT_FNA_ASSEST_ACTION ='INIT_FNA_ASSEST_ACTION';
export const INIT_FNA_INCOME_ACTION ='INIT_FNA_INCOME_ACTION';
export const INIT_FNA_EXPENSES_ACTION ='INIT_FNA_EXPENSES_ACTION';
export const INIT_FNA_LIABILITIES_ACTION ='INIT_FNA_LIABILITIES_ACTION';
export const GET_FNAPROFILE_ACTION ='GET_FNAPROFILE_ACTION';
export const UPDATE_TOTAL_INCOME = 'UPDATE_TOTAL_INCOME';
export const FNA_SUBMIT_TOTAL_INCOME ='FNA_SUBMIT_TOTAL_INCOME';
export const FNA_SUBMIT_TOTAL_EXPENSE ='FNA_SUBMIT_TOTAL_EXPENSE';
export const FNA_SUBMIT_TOTAL_ASSETS ='FNA_SUBMIT_TOTAL_ASSETS';
export const FNA_SUBMIT_TOTAL_LIABILITIES ='FNA_SUBMIT_TOTAL_LIABILITIES';
export const FNA_RECORD_FNA_DATA ='FNA_RECORD_FNA_DATA';
export const FNA_SAVE_FINISHED_RENDER_TO_LANDING = 'FNA_SAVE_FINISHED_RENDER_TO_LANDING';
export const FNA_RESET_RENDER_INDICATOR = 'FNA_RESET_RENDER_INDICATOR';
export const GET_FXRATEBYCURRENCY_ACTION ='GET_FXRATEBYCURRENCY_ACTION';
export const RETRIEVE_FXRATEBYCURRENCY_ACTION ='RETRIEVE_FXRATEBYCURRENCY_ACTION';
export const UPDATE_ASSET_REFERENCE_RECORD ='UPDATE_ASSET_REFERENCE_RECORD';
export const UPDATE_INCOME_REFERENCE_RECORD ='UPDATE_INCOME_REFERENCE_RECORD';
export const UPDATE_EXPENSES_REFERENCE_RECORD ='UPDATE_EXPENSES_REFERENCE_RECORD';
export const UPDATE_LIABILITIES_REFERENCE_RECORD ='UPDATE_LIABILITIES_REFERENCE_RECORD';
export const SOME_HSBC_RECORD_LOAD_FAILURE = 'SOME_HSBC_RECORD_LOAD_FAILURE'


export const submitIncomeDetail =(incomeDetail)=>({
    type:FNA_SUBMIT_TOTAL_INCOME,
    incomeDetail
})

export const submitExpenseDetail = (expenseDetail) => ({
    type:FNA_SUBMIT_TOTAL_EXPENSE,
    expenseDetail
})

export const submitAssetsDetail = (assetsDetail) => ({
    type:FNA_SUBMIT_TOTAL_ASSETS,
    assetsDetail
})

export const submitLiabilitiesDetail = (liabilitiesDetail) => ({
    type:FNA_SUBMIT_TOTAL_LIABILITIES,
    liabilitiesDetail
})

export const initFNAData =(fnaParams)=>({
    type:INIT_FNA_ACTION,
    fnaParams
})

export const initFnaAssestData =()=>({
    type:INIT_FNA_ASSEST_ACTION
})

export const initFnaIncomeData =()=>({
    type:INIT_FNA_INCOME_ACTION
})

export const initFnaExpensesData =()=>({
    type:INIT_FNA_EXPENSES_ACTION
})

export const initFnaLiailitiesData =()=>({
    type:INIT_FNA_LIABILITIES_ACTION
})

export const recordFinancialSituationData = (request) => ({
    type:FNA_RECORD_FNA_DATA,
    request
})
export const updateRenderIndicator = () => ({
    type:FNA_RESET_RENDER_INDICATOR
})

export const retrieveFxrateByCurrency = (request) => ({
    type:RETRIEVE_FXRATEBYCURRENCY_ACTION,
    request
})

export const someHsbcRecordLoadFilure =(responseWithError)=>({
    type:SOME_HSBC_RECORD_LOAD_FAILURE,
    responseWithError
})