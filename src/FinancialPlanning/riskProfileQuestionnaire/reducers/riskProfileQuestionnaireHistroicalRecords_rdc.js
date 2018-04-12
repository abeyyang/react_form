import {
    RISKPROFILE_GET_REPORT,RISKPROFILE_GET_REPORT_DONE,RISKPROFILE_GET_HISTORICAL_REOCRDS,RISKPROFILE_GET_HISTORICAL_REOCRDS_DONE
} from '../actions/riskProfileQuestionnaireHistroicalRecords_act';
const initialState = {
    rtqHistoryResult:[]
};
//action
//----1---------2------------3------4-----------5-------

const reducer = (state = initialState, action) => {
    //you can do your action in this code block{}
    // action = { ...action, testActionResult: "test data from reducer,actionType:"+action.type+"." };
    // console.log("riskprofile reducer....");
    switch (action.type) {
        case RISKPROFILE_GET_REPORT:
            console.log("RISKPROFILE_GET_REPORT");
            return { ...state};
        case RISKPROFILE_GET_REPORT_DONE:
            let report = action.resultReport;
            console.log("RISKPROFILE_GET_HISTORICAL_REOCRDS_DONE",report);
            return { ...state,report}; 
        case RISKPROFILE_GET_HISTORICAL_REOCRDS:
            console.log("RISKPROFILE_GET_HISTORICAL_REOCRDS");
            return { ...state};
        case RISKPROFILE_GET_HISTORICAL_REOCRDS_DONE:
            let rtqHistoryResult = action.historyRecords;
            console.log("RISKPROFILE_GET_HISTORICAL_REOCRDS_DONE",rtqHistoryResult);
            return { ...state,rtqHistoryResult}; 
        default:
            return state;
    }
};



export default reducer;
