import {
    UPDATE_STICKY_HEIGHT,
    UPDATE_NAV_CHILDREN,
    UPDATE_ERROR_INFO,
    UPDATE_MESSAGE_BOX_DONE,
    CLEAN_ALL_ERROR_INFO,
    NAVIGATE
} from 'SFP/common/actions/nav';

const initialState = {
    children: null,
    height: 0,
    errors:{
        errorHanding:{
               error:[],
               warning:[],
               info:[],
               success:[]
        }
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_STICKY_HEIGHT:
            return { ...state, height: action.height };
        case UPDATE_NAV_CHILDREN:
            return { ...state, children: action.children };
        case UPDATE_ERROR_INFO:
            
            return { ...state, errors: {errorHanding:action.errorHanding }};
        case UPDATE_MESSAGE_BOX_DONE:
            return { ...state, errors: {errorHanding:action.errorHanding }};
        case CLEAN_ALL_ERROR_INFO:
            return { ...state, errors: {errorHanding:{
               error:[],
               warning:[],
               info:[],
               success:[]
            }}};
        case NAVIGATE: 
            const {targetDesc: currentFunction, params: navParams} = action
            const previousFunction = state.currentFunction;
            return {...state, currentFunction, navParams, previousFunction}
        default:
            return state;
    }
};

export default reducer;
