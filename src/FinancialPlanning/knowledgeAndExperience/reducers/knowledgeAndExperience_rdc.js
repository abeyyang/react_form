import {
    KE_INIT,KE_UPDATE,KE_ONCHANGE,SUBMIT_KE_RESULT,SUBMIT_KE_RESULT_DO_SAVE
} from '../actions/knowledgeAndExperience_act';


const initialState = {
    keResult : [],
    keQuestionaire : {},
    itemMap:{},
    lastDateTime:""
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SUBMIT_KE_RESULT:
        return {...state};
        case SUBMIT_KE_RESULT_DO_SAVE:
        return {...state,"success":"YES"};
        case KE_ONCHANGE:
        keResult = action.keResult;
        return {...state, keResult};
        case KE_INIT:
            console.log("excute ke init action");
            return { ...state};
        case KE_UPDATE:
            let keResult = action.keResult;
            let keQuestionaire = action.keQuestionaire;
            let itemMap = action.itemMap;
            let lastDateTime= action.lastDateTime;
            return { ... state, keResult, keQuestionaire,itemMap,lastDateTime};
        default:
            return state;
    }
};



export default reducer;