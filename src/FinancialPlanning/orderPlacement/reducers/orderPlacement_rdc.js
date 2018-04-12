import {
    ORDERPLACEMENT_PAGE_INIT,ORDERPLACEMENT_PAGE_INIT_UPDATE
} from '../actions/orderPlacement_act';

const initialState = {
    orderPlacementList:{}
};

const reducer = (state = initialState, action) => {
    action = { ...action, testActionResult: "test data from reducer,actionType:"+action.type+"." };
    switch (action.type) {
        case ORDERPLACEMENT_PAGE_INIT:
            return {...state};
        case ORDERPLACEMENT_PAGE_INIT_UPDATE:
            let orderPlacementList = action.orderPlacementList;
            return {...state, orderPlacementList};
        default:
            return state;
    }
};

export default reducer;