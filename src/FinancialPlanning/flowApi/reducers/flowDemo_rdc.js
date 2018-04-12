import {
    DEMO_FLOW,DEMO_RESULT_UPDATE
} from '../actions/flowDemo_act';

const initialState = {
    rtqResult: {
    },
    // templateNumber:{

    // },
    errorCodes:{

    }
};
//action
//----1---------2------------3------4-----------5-------

const reducer = (state = initialState, action) => {
    //you   can do your action in this code block{}
    action = { ...action, testActionResult: "test data from reducer,actionType:"+action.type+"." }
    switch (action.type) {
        case DEMO_FLOW:
            return { ...state};
        case DEMO_RESULT_UPDATE:
            const response=action.result;
            if(response===undefined){
                const errorCodes={
                    value: '500'
                };
                console.log("DEMO_RESULT_UPDATE start reducer response undefined",errorCodes);
                return {...state,errorCodes};
            }
            if(response.errorCodes!==undefined){
                const errorCodes=response.errorCodes;
                console.log("DEMO_RESULT_UPDATE start reducer error",errorCodes);
                return {...state,errorCodes};
            }
            const rtqResult = response; 
            // const templateNumber = response.questionnaireResponse; 
            console.log("DEMO_RESULT_UPDATE start reducer response",response);
            return { ...state,rtqResult};
        default:
            return state;
    }
};



export default reducer;
