 export const reviewInvestmentConfig={

    productSummary:{
        invokePoint:["GOAL_SUMMARY"],
        validationRequired:"Y",
        reviewInvestmentScope:"GOAL",
        validationTypeCode:{}
    },
    meetingSummary:{
        invokePoint:["MEETING_SUMMARY"],
        validationRequired:"Y",
        reviewInvestmentScope:"GOAL",
        validationTypeCode:{
            monthPreminumCheckThreashHold:"MTHY_PREM_CHK_THRLD",
            singlePremiumPaymentAffordability:"SGL_PREM_PYM_AFFDLTY",
            LumpSumPrem:"LMP_SUM_PREM",
            TPP:"TPP",                 
            NetLiquidAsset:"NET_LIQ_AST",      
            MonthlyDisposiableIncomeRTINS:"MNLY_DISP_INC_RT_INS",
            MonthlyIncome:"MNTHY_INC",    
            MonthlyPremiumOverBudget:"MNTHY_PREM_OVR_BGDT", 
            singlePremiumOverBudget:"SGL_PREM_OVR_BGDT",   
            LiquidAsset:"LIQ_AST",       
            MonthlyDisposiableIncome:"MTHY_DISP_INC",  
            ProtectionGap:"PROTC_GAP",        
            PaymentBeyondRetirementAge:"PAYTERM_BYD_RETMTAGE",
            LiquidityNeeds:"LIQUIDITY_NEEDS"
        }
    },
    affordability:{
        invokePoint:[],
        validationTypeCode:{}
    }


 }