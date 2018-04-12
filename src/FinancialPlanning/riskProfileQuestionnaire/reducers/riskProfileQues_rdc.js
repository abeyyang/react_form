import {
    RISKPROFILEQUESTTEXT_SETBACK,RISKPROFILEQUESTTEXT_GETSTAFFINFO,RISKPROFILEQUESTTEXT_GETSTAFFINFO_DONE,RISKPROFILEQUESTTEXT_CLEANCULRESULT,RISKPROFILEQUEST_INIT,RISKPROFILEQUEST_INIT1,RISKPROFILEQUESTTEXT_INIT,RISKPROFILEQUESTTEXT_UPDATE,RISKPROFILEQUESTTEXT_GETRESULT,RISKPROFILEQUESTTEXT_CAL
} from '../actions/riskProfileQuest_act';
import {
   RISKPROFILE_CLEANUPRESULT
} from '../actions/riskProfile_act';
const initialState = {
    rtqResult:{
        ansRecord:[]
    },
    rtqTextResult:{
        questionText:[],
        answerText:{
            a1:[],
            a2:[],
            a3:[],
            a4:[],
            a5:[],
            a6:[]
        }
    },
    calResult:{
        
    },
    ansRecord:[],
};
//action
//----1---------2------------3------4-----------5-------

const reducer = (state = initialState, action) => {
    //you can do your action in this code block{}
    // action = { ...action, testActionResult: "test data from reducer,actionType:"+action.type+"." };
    // console.log("riskprofile reducer....");
    switch (action.type) {
        
        case RISKPROFILEQUEST_INIT:
            console.log("excute risk profile init action");
            return { ...state};
        case RISKPROFILEQUEST_INIT1:
            console.log("excute risk profile init action1");
            const rtqResult = action.rtqResult;
            return { ...state,rtqResult};
        case RISKPROFILEQUESTTEXT_INIT:
            console.log("excute RISKPROFILEQUESTTEXT_INIT init action");
            return { ...state};
        case RISKPROFILEQUESTTEXT_UPDATE:
            console.log("excute RISKPROFILEQUESTTEXT_UPDATE init action1" +action.rtqTextResult );
            let rtqTextResult = action.rtqTextResult;
            return { ...state,rtqTextResult};
        case RISKPROFILEQUESTTEXT_GETRESULT:
        //   console.log("excute RISKPROFILEQUESTTEXT_INIT init action");
            return { ...state};
        case RISKPROFILEQUESTTEXT_CAL:
            console.log("excute RISKPROFILEQUESTTEXT_CAL init action1" +action.calResult,action.ansRecord );
            let messageName = "calculate"
            let calResult = action.calResult;
            const ansRecord = action.ansRecord;
          //  let sourceName = "calculate";
            return { ...state,calResult,ansRecord,messageName};
        case RISKPROFILEQUESTTEXT_GETSTAFFINFO:
            console.log("RISKPROFILEQUESTTEXT_GETSTAFFINFO");
            return { ...state};
        case RISKPROFILEQUESTTEXT_GETSTAFFINFO_DONE:
            messageName ="staff"
            let staffInfo = action.staffInfo
            let staffValid = action.staffValid
            console.log("RISKPROFILEQUESTTEXT_GETSTAFFINFO_DONE",staffInfo,staffValid,messageName);
            return { ...state,staffInfo,staffValid,messageName};
        case RISKPROFILEQUESTTEXT_SETBACK:
            staffValid =undefined;
            console.log("RISKPROFILEQUESTTEXT_SETBACK",staffValid,messageName)
            return { ...state,staffValid};    
        case RISKPROFILE_CLEANUPRESULT:
            calResult ={};
             messageName = undefined;
             console.log("RISKPROFILE_CLEANUPRESULT",messageName);
            return { ...state,calResult,messageName};
        case RISKPROFILEQUESTTEXT_CLEANCULRESULT:
            calResult ={};
            //staffInfo ={};
            return { ...state,calResult};  
        default:
            return state;
    }
};



export default reducer;
