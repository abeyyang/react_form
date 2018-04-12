import {
    RETRIEVE_GOAL_LIST,HISTORICALPLANS_UPDATE_GOAL_LIST,
    RETRIEVE_GOAL_DETAIL,HISTORICALPLANS_UPDATE_GOAL_DETAIL,
    RECORD_GOAL_DETAIL,HISTORICALPLANS_UPDATE_RECORD_GOAL_DETAIL,
    DELETE_GOAL_INFORMATION,HISTORICALPLANS_UPDATE_DELETE_GOAL_INFORMATION

} from '../actions/recentPirority_act';

const initialState = {
     retrieveGoalSummarylist: [
            {
                goalTypeMatch:{
                    goalImg:"",
                    goalContext:""
                },
                isShow :"",
                goalDetailOverlayisShow:"",
                lastModified:"",
                goalDescription:"",
                goalStfinancialGoalProcessStatusCodeatusMatch:{
                    goalStatusImg:"",
                    goalStatusContent:""
                },
                goalKey:{
                    arrangementIdentifierFinancialPlanning:'',
                    goalSequenceNumber:''
                }
            }
         ],
       retrieveGoalDetailsView :{
            //   fundingDetails:{
            //     fundAmount:"",
            //     fundCurrencyCode:"",
            //     fundMonthlyAmount:"",
            //     fundMonthlyCurrencyCode:""
            //    }
            OverviewDetailString:"",
            riskProfile:{
                         riskCapacityLevelNumber:"",
                         riskMatchContent:""
             },
             goalDetailContentButtonIndicate :{
                  isEditButton:"",
                  isResumeButton:"",
                  isDeletedButton:""

             }    
       
      },
    //   recordGoalDetailsResponseView:{
    //   },
      deleteGoalInformationResponseView:{   
      }
};
const reducer = (state = initialState, action) => {
   // let i = 1;
    //you   can do your action in this code block{}
    action = { ...action, testActionResult: "test data from reducer,actionType:"+action.type+"." };
    switch (action.type) {
        case RETRIEVE_GOAL_LIST:
            return { ...state};
        case HISTORICALPLANS_UPDATE_GOAL_LIST:
            const retrieveGoalSummarylist = action.retrieveGoalSummarylist;
            return { ...state, retrieveGoalSummarylist};
        case RETRIEVE_GOAL_DETAIL:
            return { ...state};
        case HISTORICALPLANS_UPDATE_GOAL_DETAIL:
            const retrieveGoalDetailsView = action.retrieveGoalDetailsView;
            return { ...state, retrieveGoalDetailsView};
        case RECORD_GOAL_DETAIL:
            return { ...state};
        case HISTORICALPLANS_UPDATE_RECORD_GOAL_DETAIL:
            const recordGoalDetailsResponseView = action.recordGoalDetailsResponseView;
            return { ...state, recordGoalDetailsResponseView};
        case DELETE_GOAL_INFORMATION:
            return { ...state};
        case HISTORICALPLANS_UPDATE_DELETE_GOAL_INFORMATION:
            const deleteGoalInformationResponseView = action.deleteGoalInformationResponseView;
            return { ...state, deleteGoalInformationResponseView};
        default:
            return state;
    }
};



export default reducer;
