import {
    RETRIEVE_GOAL_SOLUTION_DETAIL,UPDATE_GOAL_SOLUTION_DETAIL,NEED_ANALYSIS_SAVE,LOADING_NEED_ANALYSIS_PAGE,
    CALCULATE_PROTECTION_NEED_ANALYSIS,UPDATE_TOTALPRONEEDAMOUNT,NEED_PAGE_SAVE_PROGRESS
} from '../actions/needAnalysisPanel_act';

import {
    COMMON_VALIDATE,UPDATE_ERROR_INFO
} from '../../../../common/actions/nav'

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
            supportFamilyAmount:{
                currencyInsuranceNeedCode:"",
                insuranceNeedAmount:'',
                insuranceNeedOtherText:null,
                insuranceNeedTypeCode:null
            },
            reserveExpenseAmount:{
                currencyInsuranceNeedCode:"",
                insuranceNeedAmount:0,
                insuranceNeedOtherText:null,
                insuranceNeedTypeCode:null
            },
            estatePlanAmount:{
                currencyInsuranceNeedCode:"",
                insuranceNeedAmount:0,
                insuranceNeedOtherText:null,
                insuranceNeedTypeCode:null
            },
            otherAmount:{
                currencyInsuranceNeedCode:"",
                insuranceNeedAmount:0,
                insuranceNeedOtherText:"",
                insuranceNeedTypeCode:null
            },
            ProGapAmount:{
                currencyInsuranceNeedCode:"",
                insuranceNeedAmount:0,
                insuranceNeedOtherText:null,
                insuranceNeedTypeCode:null
            },
            totalGap :{
                currencyInsuranceNeedCode:"",
                insuranceNeedAmount:0,
                insuranceNeedOtherText:null,
                insuranceNeedTypeCode:null
            },
            totalProNeedAmount:{
                currencyInsuranceNeedCode:"",
                insuranceNeedAmount:0,
                insuranceNeedOtherText:null,
                insuranceNeedTypeCode:null
            },
            mortAndDebetsAmount:{
                currencyInsuranceNeedCode:"",
                insuranceNeedAmount:0,
                insuranceNeedOtherText:null,
                insuranceNeedTypeCode:null
            },
            monIncomeAmount:{
                currencyInsuranceNeedCode:"",
                insuranceNeedAmount:0,
                insuranceNeedOtherText:null,
                insuranceNeedTypeCode:null
            } ,
            provideYear:{
                currencyInsuranceNeedCode:"",
                insuranceNeedAmount:0,
                insuranceNeedOtherText:null,
                insuranceNeedTypeCode:null
            },
            lumpSumAmount:{
                currencyInsuranceNeedCode:"",
                insuranceNeedAmount:0,
                insuranceNeedOtherText:null,
                insuranceNeedTypeCode:null
            }, 
            monReplaceAmount:{
                currencyInsuranceNeedCode:"",
                insuranceNeedAmount:0,
                insuranceNeedOtherText:null,
                insuranceNeedTypeCode:null
            },
        }, 
        retireAge:{
            nameCode:null,
            value:null
        }, 
        aipiIndicators:{}
    },
    sessionInfo:{
        
    },
    totalProNeedAmount:0,
    goProductSearchFlag:false,
    estatePlanAmountVaildate:true,
    supportFamilyAmountVaildate:true,
    reserveExpenseAmountVaildate:true,
    totalProNeedAmountVaildate:true,
    supportFamilyNumberRender:true,
    otherAmountVaildate :true,
    otherAmountNumberRender :true,
    reserveExpenseNumberRender:true,
    saveQuestionsNumberRender:true,
    saveQuestionsVaildate:true,
    errorList:{

    }
};
//action
//----1---------2------------3------4-----------5-------

const reducer = (state = initialState, action) => {
    //you   can do your action in this code block{}
    action = { ...action, testActionResult: "need Analysis reducer:"+action.type+"." }
    switch (action.type) {
        case LOADING_NEED_ANALYSIS_PAGE:
            console.log('need Analysis reducer retrieve...',state);
            return { ...state};
        case UPDATE_GOAL_SOLUTION_DETAIL:
           let goalSolutionDetail={};
           goalSolutionDetail=action.goalSolutionDetail
            console.log('need Analysis reducer update ...',action.goalSolutionDetail);
            return  { ...state,goalSolutionDetail};
        case NEED_ANALYSIS_SAVE:    
            console.log('need Analysis reducer save...',action);
            return { ...state};
        case CALCULATE_PROTECTION_NEED_ANALYSIS:    
            console.log('need Analysis reducer calculate...',action);
            return { ...state};
        case UPDATE_TOTALPRONEEDAMOUNT:
        console.log('need Analysis reducer update totalproneedamount...',action);
            let totalProNeedAmount=action.totalProNeedAmount
            return { ...state,totalProNeedAmount};
        case NEED_PAGE_SAVE_PROGRESS:
        
              console.log('need Analysis reducer update NEED_PAGE_SAVE_PROGRESS...',action);
              let goProductSearchFlag=action.goProductSearchFlag
              return { ...state,goProductSearchFlag};
        case COMMON_VALIDATE:
              console.log('need Analysis reducer update COMMON_VALIDATE...',action);
              return { ...state};    
        case 'update_NeedAnlysis_Field':
            let newState = {...state};
              newState.goalSolutionDetail.needEvaluationList.supportFamilyAmount = Object.assign({}, newState.goalSolutionDetail.needEvaluationList.supportFamilyAmount, action.field);
            return newState;
        // case UPDATE_ERROR_INFO:
        //      
        //       console.log('need Analysis reducer update UPDATE_ERROR_INFO...',action.errors);
        //       let errorList=action.errors;
        //       return { ...state,errorList};    
        default:
            return state;
    }
};



export default reducer;
