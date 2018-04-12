import {AFFORDABILITY_INIT,AFFORDABILITY_INIT_DONE} from '../actions/affordability_act.js';

const initialState = {
    affResult:{
        
    },
    validationResult:{
       protGapData:{
           underPROTGapCSS:null,
           overPROTGapCSS:null,
           insuranceSumInsured:null,
           totalProtectionGapSum:null,
           protectionGapCCY:null,

       },
       affrdData : {
                liquidAsset:null,
                unFormatLiquidAsset:null,
                monthlyDisposableIncomePaidToInsuranceRatio:null,
                monthlyPremiumOverBudgetCSS:null,
                monthlyPremiumOverBudgetThreshold:null,
                monthlyPremiumOverBudgetIndicator:null,
                singlePremiumOverBudgetCSS:null,
                singlePremiumOverBudgetThreshold:null,
                AT_6_A_001_checked : "",
                AT_6_B_001_checked : "",
                AT_6_C_001_checked : "",
                AT_6_D_001_checked : "",
                AT_6_E_001_checked : "",
                AT_6_F_001_checked : "",
                AT_6_G_001_checked : "",
                AT_6_A_001_css : "",
                AT_6_B_001_css : "",
                AT_6_C_001_css : "",
                AT_6_D_001_css : "",
                AT_6_E_001_css : "",
                AT_6_F_001_css : "",
                AT_6_G_001_css : "",
                monthlyDisposableIncomeNotPositive:null,
                monthlyDisposableIncomePositive:null
            },
            paymentTermData:{
                retireAge:null,
                isBeyondRetirement:null

            },
            evaLiqNeedsData:{
                idicator:null,
                evaCalYear:null,
                evaCalMonth:null,
                liqCss:null,
                evaProdNameList:null,


            },
            allowSalaryPayment: '',
            allowIncomePayment:'',
            allowSavingPayment: '',
            allowInvestPayment: '',
            allowChangeExpense:'',
            hideExpenseInput: 'csHide',
            hide3rdParty_mthPremium: '',
            hideExpAmtLongTerm: '',
            isAffordInputValidate: false,
            isAffordabilityPassed: false,


    }
};
//action
//----1---------2------------3------4-----------5-------

const reducer = (state = initialState, action) => {
    //you   can do your action in this code block{}
    // action = { ...action, testActionResult: "test data from reducer,actionType:"+action.type+"." };
    // console.log("riskprofile reducer....");
    switch (action.type) {
        case AFFORDABILITY_INIT:
            console.log("excute afford profile init action");
            return { ...state};
        case AFFORDABILITY_INIT_DONE:
            console.log("excute afford done profile init action1");
             let affResult = action.affResult;
            return { ...state,affResult};
        default:
            return state;
    }
};



export default reducer;
