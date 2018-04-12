import {
    COMMON_REQUEST_BUILDER,
    COMMON_REQUEST_BUILDER_SUCCESS
} from '../actions/requestBuilder';
// import {
//     FETCH_RISK_LEVEL,
//     UPDATE_RISK_LEVEL,
//     FETCH_CUSTOMER_ELIGIBILITY,
//     UPDATE_CUSTOMER_ELIGIBILITY
// } from '../actions/authorization';

const initialState = {
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case COMMON_REQUEST_BUILDER:
          console.log("common rrequest builder reducer,",action);
            return state;
        case COMMON_REQUEST_BUILDER_SUCCESS:
        return state;
        default:
            return state;
    }
};

export default reducer;
