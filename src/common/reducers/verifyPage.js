import { SAVE_VERIFY_INPUT_DATA } from '../actions/trade';

const initialState = {
    ineligibleReasonCode:null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_VERIFY_INPUT_DATA:
            return {
                ...state,
                ...action.inputedData
            };

        default:
            return state;
    }
};

export default reducer;
