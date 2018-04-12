export const RETRIEVE_GOAL_LIST = 'RETRIEVE_GOAL_LIST';
export const HISTORICALPLANS_UPDATE_GOAL_LIST = 'HISTORICALPLANS_UPDATE_GOAL_LIST';
export const RETRIEVE_GOAL_DETAIL = 'RETRIEVE_GOAL_DETAIL';
export const HISTORICALPLANS_UPDATE_GOAL_DETAIL = 'HISTORICALPLANS_UPDATE_GOAL_DETAIL';
export const RECORD_GOAL_DETAIL = 'RECORD_GOAL_DETAIL';
export const HISTORICALPLANS_UPDATE_RECORD_GOAL_DETAIL = 'HISTORICALPLANS_UPDATE_RECORD_GOAL_DETAIL';
export const DELETE_GOAL_INFORMATION = 'DELETE_GOAL_INFORMATION';
export const HISTORICALPLANS_UPDATE_DELETE_GOAL_INFORMATION = 'HISTORICALPLANS_UPDATE_DELETE_GOAL_INFORMATION';
export const retrieveGoalList=(request)=>({
    type: RETRIEVE_GOAL_LIST,
    requestAction : request
})
export const retrieveGoalDetail=(request)=>({
    type: RETRIEVE_GOAL_DETAIL,
    requestAction : request
})
export const recordGoalDetail=(request)=>({
    type: RECORD_GOAL_DETAIL,
    requestAction : request
})
export const deleteGoalInformation=(request)=>({
    type: DELETE_GOAL_INFORMATION,
    requestAction : request
})



