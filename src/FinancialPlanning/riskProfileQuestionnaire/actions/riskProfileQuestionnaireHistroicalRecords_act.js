export const RISKPROFILE_GET_HISTORICAL_REOCRDS = 'RISKPROFILE_GET_HISTORICAL_REOCRDS';
export const RISKPROFILE_GET_HISTORICAL_REOCRDS_DONE = 'RISKPROFILE_GET_HISTORICAL_REOCRDS_DONE';
export const RISKPROFILE_GET_REPORT = 'RISKPROFILE_GET_REPORT';
export const RISKPROFILE_GET_REPORT_DONE = 'RISKPROFILE_GET_REPORT_DONE';
export const getHistoricalRecords=(rtqHistoricalParams)=>({
    type: RISKPROFILE_GET_HISTORICAL_REOCRDS,
    rtqHistoricalParams
})

export const getReport=(reqParams)=>({
    type: RISKPROFILE_GET_REPORT,
    reqParams
})

