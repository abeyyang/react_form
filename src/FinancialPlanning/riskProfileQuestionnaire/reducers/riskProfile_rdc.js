import {
    RISKPROFILE_PRINT,RISKPROFILE_UPDATE_RTQ,RISKPROFILE_INIT,RISKPROFILE_INIT1,RISKPROFILE_RENEW,RISKPROFILE_SUBMIT
,RISKPROFILE_CLEAN,RISKPROFILE_CLEANDONE,RISKPROFILE_GETRISKDES,RISKPROFILE_GETRISKDES_DONE} from '../actions/riskProfile_act';

const initialState = {
    rtqResult:{
        
    },
};
//action
//----1---------2------------3------4-----------5-------

const reducer = (state = initialState, action) => {
    //you   can do your action in this code block{}
    // action = { ...action, testActionResult: "test data from reducer,actionType:"+action.type+"." };
    // console.log("riskprofile reducer....");
    switch (action.type) {
        case RISKPROFILE_INIT:
            console.log("excute risk profile init action");
            return { ...state};
        case RISKPROFILE_INIT1:
            console.log("excute risk profile init action1");
             let rtqResult = action.rtqResult;
            return { ...state,rtqResult};
        case RISKPROFILE_UPDATE_RTQ:
            return { ...state, rtqResult};
        case RISKPROFILE_RENEW:
            let msgName = "submit";
            let mainResult = action.confirmedRtqResult;
            return { ...state,mainResult,msgName};
        case RISKPROFILE_SUBMIT:            
            return { ...state};
        case RISKPROFILE_CLEAN:            
            return { ...state};
        case RISKPROFILE_CLEANDONE:
            msgName ="cleanUp";
            mainResult = false;
           // rtqResult = {};
            console.log("action for clean",action)                     
            return { ...state,mainResult,msgName};
        case RISKPROFILE_GETRISKDES_DONE:
            let qasConfig = action.qasConfig;            
            return { ...state,qasConfig};
        case RISKPROFILE_GETRISKDES:            
            return { ...state};
        case RISKPROFILE_PRINT:
            console.log("single print in redeucer") ;           
            return { ...state};
        default:
            return state;
    }
};



export default reducer;
