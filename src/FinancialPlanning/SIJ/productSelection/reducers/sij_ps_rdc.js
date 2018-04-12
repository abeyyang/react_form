import {
    RETRIEVE_GOAL_SOLUTIO_DETAIL_SIJ_PS,RENDER_SIJ_PS,RENDER_SIJ_PS_SUCESS,
    RETRIEVE_GOAL_SOLUTIO_DETAIL_SIJ_PS_SUCCESS,ADD_OR_DELETE_INS_PRODUCT,
    ADD_OR_DELETE_DISCUSSED_INS_PRODUCT,REVIEW_INS_PRODUCT,
    ADD_OR_DELETE_INS_PRODUCT_SUCCESS,ADD_OR_DELETE_DISCUSSED_INS_PRODUCT_SUCCESS,
    REVIEW_INS_PRODUCT_SUCCESS

} from '../actions/sij_ps_act';


const initialState = {
    goalSolutionDetail: {
        purposeBuyingProductQuestions:[],
        piqQuestAndAnsQuestions:{
            saveQuestions :{},
            timeFramQuestions:{
                instimeframe_answers:[]
            },
            preQuestions :[],
            insinvperdQuestions :[],
            invperiodQuestions:[]
        }, 
        needEvaluationList:{
            supportFamilyAmount:{},
            reserveExpenseAmount:{},
            estatePlanAmount:{},
            otherAmount:{},
            ProGapAmount:{},
            totalGap :{},
            totalProNeedAmount:{},
            mortAndDebetsAmount:{},
            monIncomeAmount:{} ,
            provideYear:{},
            lumpSumAmount:{}, 
            monReplaceAmount:{},
        },
        financialGoal:{
            goalCompletionDateTime: null,
            goalDescription: "",
            goalMonthCount: "",
            goalObjectiveTypeCode: "",
            goalTargetAmount: null,
            goalTargetCurrencyCode: "",
            goalTypeCode: "",
            jurisdictionType: null,
            needTypeCode: "",
            periodicityGoalCode: null,
            recordCreateDateTime: null,
            recordUpdateDateTime: "",
            skipRiskProfilingIndicator: ""
        },
        riskProfile: 
        {
          riskCapacityAssignDate: null,
          riskCapacityLevelNumber: null,
          riskCapacityRecommendLevelNumber: null,
          riskToleranceLevelNumber: null
        },
      },
    productSearchResult : {
        retrieveProductSearchInsuranceListData:{
            searchResultProducts:[],
            searchResultProductsForTable:[],
        },
        productSearchResponse:{},
        reviewMyProductsFormBean:{}
    },
    fnaResult : [],
    customerInfo:{},
    pageShowHide:{},
    goProductSummaryFlag:false
};

//action test
//----1---------2------------3------4-----------5-------

const reducer = (state = initialState, action) => {
    //you   can do your action in this code block{}
    action = { ...action, testActionResult: "test data from reducer,actionType:"+action.type+"." };
    let fnaResult, productSearchResult,goalSolutionDetail,riskProfile;
    switch (action.type) {
        case RETRIEVE_GOAL_SOLUTIO_DETAIL_SIJ_PS:
            return { ...state};
        case RENDER_SIJ_PS:
        console.log('RENDER_SIJ_PS rdc...')
            return { ...state};
        case RENDER_SIJ_PS_SUCESS:
        console.log("render ps success in reducer",action);
        goalSolutionDetail= action.goalSolutionDetail;
        productSearchResult=action.productSearchResult;
        riskProfile = action.riskProfile; 
        
        return {...state, goalSolutionDetail,productSearchResult,riskProfile};

        case RETRIEVE_GOAL_SOLUTIO_DETAIL_SIJ_PS_SUCCESS:
            console.log("retrieve SIJ_PS goalsolution detail success");
            return { ...state};
        case ADD_OR_DELETE_INS_PRODUCT:
         console.log("ADD_OR_DELETE_INS_PRODUCT success");
         return { ...state};
         
        case ADD_OR_DELETE_INS_PRODUCT_SUCCESS:
           productSearchResult=action.productSearchResult;
         console.log("ADD_OR_DELETE_INS_PRODUCT success",productSearchResult);
         return { ...state,productSearchResult};

        case ADD_OR_DELETE_DISCUSSED_INS_PRODUCT:
        console.log("ADD_OR_DELETE_DISCUSSED_INS_PRODUCT success");
         return { ...state};
        case ADD_OR_DELETE_DISCUSSED_INS_PRODUCT_SUCCESS:
         productSearchResult=action.productSearchResult;
        console.log("ADD_OR_DELETE_DISCUSSED_INS_PRODUCT success");
         return { ...state,productSearchResult};
        case REVIEW_INS_PRODUCT:
        console.log("REVIEW_INS_PRODUCT success");
         return { ...state};
        case REVIEW_INS_PRODUCT_SUCCESS:
        console.log("REVIEW_INS_PRODUCT success");
        let goProductSummaryFlag= action.goProductSummaryFlag;
         return { ...state,goProductSummaryFlag};
        default:
            return state;
    }
};



export default reducer;
