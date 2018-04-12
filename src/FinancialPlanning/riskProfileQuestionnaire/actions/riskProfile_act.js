export const RISKPROFILE_INIT = 'RISKPROFILE_INIT';
export const RISKPROFILE_UPDATE_RTQ = 'RISKPROFILE_UPDATE_RTQ';
export const RISKPROFILE_INIT1 = 'RISKPROFILE_INIT1';
export const RISKPROFILE_RENEW = 'RISKPROFILE_RENEW';
export const RISKPROFILE_SUBMIT = 'RISKPROFILE_SUBMIT';
export const RISKPROFILE_CLEAN = 'RISKPROFILE_CLEAN';
export const RISKPROFILE_CLEANDONE ="RISKPROFILE_CLEANDONE";
export const RISKPROFILE_CLEANUPRESULT ="RISKPROFILE_CLEANUPRESULT";
export const RISKPROFILE_GETRISKDES ="RISKPROFILE_GETRISKDES";
export const RISKPROFILE_GETRISKDES_DONE ="RISKPROFILE_GETRISKDES_DONE";
export const RISKPROFILE_PRINT ="RISKPROFILE_PRINT";
export const initRiskProfileData=(rtqParams)=>({
    type: RISKPROFILE_INIT,
    rtqParams
})

export const submitRTQressult=(ansParams)=>({
    type: RISKPROFILE_SUBMIT,
    ansParams
})

export const clearUp=()=>({
    type: RISKPROFILE_CLEAN
})

export const clearUpCalResult=()=>({
    type: RISKPROFILE_CLEANUPRESULT
})

export const getTheRiskDescription=(rpqTextParams)=>({
    type: RISKPROFILE_GETRISKDES,
    rpqTextParams
})

export const riskSinglePrint=(printRequest)=>({
    type: RISKPROFILE_PRINT,
    printRequest
})

