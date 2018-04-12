import {
MEETINGSUMMY_INIT_IPDETAIL,MEETINGSUMMY_INIT_IPDETAIL_UPDATE,
MEETINFSUMMARY_RETRIEVE_QUESTIONNAIRE_SUMMARY,
MEETINFSUMMARY_RETRIEVE_QUESTIONNAIRE_SUMMARY_UPDATE,
MEETINFSUMMARY_RETRIEVE_FNA_DATA,MEETINFSUMMARY_RETRIEVE_FNA_DATA_UPDATE,
MEETINFSUMMARY_GOAL_SUMMARY_LIST,MEETINFSUMMARY_GOAL_SUMMARY_LIST_UPDATE,
MEETINFSUMMARY_RETRIEVE_GOAL_DETAIL,MEETINFSUMMARY_RETRIEVE_GOAL_DETAIL_UPDATE

} from '../actions/meetingSummy_act';

const initialState = {
     customerInfo:{},
     depositeConstentCode:'',
     historyRecords:[
         {
          meetingSummaryRisk:"",
          riskDesc:""
         }
      
     ],
     fnaResult : [],
     meetingSummaryRetrieveGoalSummarylist: [
            {
                goalType:"",
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
     meetingSummaryretrieveGoalDetails :{
            OverviewDetailString:"",
            riskProfile:{
                         riskCapacityLevelNumber:"",
                         riskMatchContent:""
             },
             goalDetailContentButtonIndicate :{
                  isEditButton:"",
                  isResumeButton:"",
                  isDeletedButton:""

             },   
            invProductList:[],
            goalDetailProductTableDesc:"",
            invDiscussedProductList:[],
            insProductList:[]
      },
};
const reducer = (state = initialState, action) => {
   // let i = 1;
    //you   can do your action in this code block{}
    action = { ...action, testActionResult: "test data from reducer,actionType:"+action.type+"." };
    switch (action.type) {
        case MEETINGSUMMY_INIT_IPDETAIL:
            console.log('MEETINGSUMMY_INIT_IPDETAIL excute...');
            return {...state};
        case MEETINGSUMMY_INIT_IPDETAIL_UPDATE:
            let customerInfo = action.customerInfo;
            let depositeConstentCode = action.depositeConstentCode; 
            return {...state, customerInfo, depositeConstentCode};
        case MEETINFSUMMARY_RETRIEVE_QUESTIONNAIRE_SUMMARY:
            return {...state};
        case MEETINFSUMMARY_RETRIEVE_QUESTIONNAIRE_SUMMARY_UPDATE:
            let historyRecords = action.historyRecords;
            return {...state, historyRecords};
        case MEETINFSUMMARY_RETRIEVE_FNA_DATA:
            return {...state};
        case MEETINFSUMMARY_RETRIEVE_FNA_DATA_UPDATE:
            let fnaResult = action.fnaResult;
            return {...state, fnaResult};           
        case MEETINFSUMMARY_GOAL_SUMMARY_LIST:
            return {...state};
        case MEETINFSUMMARY_GOAL_SUMMARY_LIST_UPDATE:
            let meetingSummaryRetrieveGoalSummarylist = action.meetingSummaryRetrieveGoalSummarylist;
            return {...state, meetingSummaryRetrieveGoalSummarylist}; 
        case MEETINFSUMMARY_RETRIEVE_GOAL_DETAIL:
            return {...state};
        case MEETINFSUMMARY_RETRIEVE_GOAL_DETAIL_UPDATE:
            let meetingSummaryretrieveGoalDetails = action.meetingSummaryretrieveGoalDetails;
            return {...state, meetingSummaryretrieveGoalDetails};      

        default:
            return state;
    }
};
export default reducer;
