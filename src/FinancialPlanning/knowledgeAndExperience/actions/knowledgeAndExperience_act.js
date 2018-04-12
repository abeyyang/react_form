export const KE_INIT = 'KE_INIT';
export const KE_UPDATE = 'KE_UPDATE';
export const KE_ONCHANGE = 'KE_ONCHANGE';
export const SUBMIT_KE_RESULT = 'SUBMIT_KE_RESULT';
export const SUBMIT_KE_RESULT_DO_SAVE = 'SUBMIT_KE_RESULT_DO_SAVE';

export const initKnowladgeAndExperienceData=(request)=>({
    type: KE_INIT,
    customerId : request.customerId
})

export const updateKEResult=(request)=>({
    type: KE_ONCHANGE,
    keResult : request.keResult
})

export const submitKEResult=(request)=>({
    type: SUBMIT_KE_RESULT,
    customerId: request.customerId,
    keResult:request.keResult,
    lastDateTime:request.lastDateTime
})

