export const AFFORDABILITY_INIT = 'AFFORDABILITY_INIT';
export const AFFORDABILITY_INIT_DONE = 'AFFORDABILITY_INIT_DONE';
export const initAffordabilityData=(affordParams)=>({
    type: AFFORDABILITY_INIT,
    affordParams
})
