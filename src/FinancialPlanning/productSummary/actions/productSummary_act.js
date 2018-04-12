export const RETRIEVE_GOAL_SOLUTIO_DETAIL_PRODSUMM = 'RETRIEVE_GOAL_SOLUTIO_DETAIL_PRODSUMM';
export const RETRIEVE_GOAL_SOLUTIO_DETAIL_PRODSUMM_SUCCESS = 'RETRIEVE_GOAL_SOLUTIO_DETAIL_PRODSUMM_SUCCESS';
export const REVIEWINVESTMENT_PRODSUMM = 'REVIEWINVESTMENT_PRODSUMM';
export const REVIEWINVESTMENT_PRODSUMM_SUCCESS = 'REVIEWINVESTMENT_PRODSUMM_SUCCESS';
export const RECORD_GOAL_SOLUTIO_DETAIL_PRODSUMM = 'RECORD_GOAL_SOLUTIO_DETAIL_PRODSUMM';
export const RECORD_GOAL_SOLUTIO_DETAIL_PRODSUMM_SUCCESS = 'RECORD_GOAL_SOLUTIO_DETAIL_PRODSUMM_SUCCESS';


export const retrieveGoalSolutionDetailforProdSumm=(request)=>({
    type: RETRIEVE_GOAL_SOLUTIO_DETAIL_PRODSUMM,
    request
})

export const reviewInvestmentforProdSumm=(request)=>({
    type: REVIEWINVESTMENT_PRODSUMM,
    request
})

export const recordGoalSolutionDetailforProdSumm=(request)=>({
    type: RECORD_GOAL_SOLUTIO_DETAIL_PRODSUMM,
    request
})
