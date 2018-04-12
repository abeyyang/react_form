export const ORDERPLACEMENT_PAGE_INIT = 'ORDERPLACEMENT_PAGE_INIT';
export const ORDERPLACEMENT_PAGE_INIT_UPDATE = 'ORDERPLACEMENT_PAGE_INIT_UPDATE';

export const initOrderPlacementPage=(orderPlacementRequest)=>({
    type: ORDERPLACEMENT_PAGE_INIT,
    orderPlacementRequest:orderPlacementRequest
})