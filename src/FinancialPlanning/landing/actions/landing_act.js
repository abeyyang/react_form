export const DASHBOARD_INIT = 'DASHBOARD_INIT';
export const DASHBOARD_UPDATE_RTQ = 'DASHBOARD_UPDATE_RTQ';
export const DASHBOARD_UPDATE_KE = 'DASHBOARD_UPDATE_KE';
export const DASHBOARD_UPDATE_FNA = 'DASHBOARD_UPDATE_FNA';
export const DASHBOARD_UPDATE_FNA_DATA = 'DASHBOARD_UPDATE_FNA_DATA';
export const DASHBOARD_UPDATE_FNA_DATA_UPDATE = 'DASHBOARD_UPDATE_FNA_DATA_UPDATE';
export const DASHBOARD_INIT_FNA_DATA='DASHBOARD_INIT_FNA_DATA';
export const RECORD_BASE_SIJ_GOAL = 'RECORD_BASE_SIJ_GOAL';
export const DASHBOARD_INIT_IPDETAIL='DASHBOARD_INIT_IPDETAIL';
export const DASHBOARD_INIT_IPDETAIL_UPDATE='DASHBOARD_INIT_IPDETAIL_UPDATE';
export const DASHBOARD_INIT_FHCSUMMARY='DASHBOARD_INIT_FHCSUMMARY';
export const DASHBOARD_UPDATE_FHCSUMMARY_DATE='DASHBOARD_UPDATE_FHCSUMMARY_DATE';
export const DASHBOARD_INIT_ASSETSMIX = 'DASHBOARD_INIT_ASSETSMIX';
export const DASHBOARD_INIT_ASSETSMIX_UPDATE = 'DASHBOARD_INIT_ASSETSMIX_UPDATE';
export const DASHBOARD_UPDATE_FHCSUMMARY_RECORED_STATE = 'DASHBOARD_UPDATE_FHCSUMMARY_RECORED_STATE';




export const initDashboardData=(request)=>({
    type: DASHBOARD_INIT,
    customerId : request.customerId
})

export const updateDashboardFNAData=(fnaParams)=>({
    type: DASHBOARD_UPDATE_FNA_DATA,
    fnaParams
})

export const initDashboardFNAData=(fnaParams)=>({
    type: DASHBOARD_INIT_FNA_DATA,
    fnaParams
})

export const recordBaseSIJGoal=(request)=>({
    type: RECORD_BASE_SIJ_GOAL,
    requestAction : request
})


export const initFhcSummary=()=>({
    type: DASHBOARD_INIT_FHCSUMMARY
})

export const initInvolvedPartyDetail=(ipDetailRequest,assetsParams)=>({
    type: DASHBOARD_INIT_IPDETAIL,
    ipDetailRequest:ipDetailRequest,
    assetsParams:assetsParams
})

export const initAssetsMix=(request)=>({
    type: DASHBOARD_INIT_ASSETSMIX,
    request
})



