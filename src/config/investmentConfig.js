export const investment_style ={
    "RISK_PROFILE_DEC":[
        {key:0,value:'Secure'},
        {key:1,value:'Very cautious'},
        {key:2,value:'Cautious'},
        {key:3,value:'Balanced'},
        {key:4,value:'Adventurous'},
        {key:5,value:'Speculative'}
    ]
}
export const Investment_Period_Question={
    "QUESTIONARIE_INVESTMENT_LIST":[
        {key:"ANSWER_1",value:"<= 1 year"},
        {key:"ANSWER_2",value:"> 1 and <= 3 years"},
        {key:"ANSWER_3",value:"> 3 and <= 5 years"},
        {key:"ANSWER_4",value:"> 5 and < 10 years"},
        {key:"ANSWER_5",value:">= 10 years"}
    ]
}
export const L_liqQues={
    "LIQUIDITY_QUESTION_LIST":[
        {key:'N_CARE',value:"No preference"},
        {key:'LQT_HIGH',value:"High liquidity (i.e.daily dealing)"},
        {key:'LQT_LOW',value:"Low liquidity (i.e. monthly dealing or more frequent)"}


    ]
}
export const L_capProQues={
    "CAPITAL_QUESTION_LIST":[
        {key:'N_CARE',value:"No preference"},
        {key:'FULL',value:"Full capital protection (i.e. 100%)"}
    ]
}

export const feProductTypeDec={
    "PRODUCT_TYPE_DEC":[
        {key:"FE_BOND",value:"Bond/CDs"},
        {key:"FE_SP",value:"Structured Products"},
        {key:"FE_UT",value:"Unit Trust"},
        {key:"FE_DPS",value:"Deposits"}

    ]
}

export const currencyCode={
    "CURRENCY_CODE_LIST":[
        {key:'AUD',value:'AUD'},
        {key:'CAD',value:'CAD'},
        {key:'CHF',value:'CHF'},
        {key:'CNY',value:'CNY'},
        {key:'CYP',value:'CYP'},
        {key:'DEM',value:'DEM'},
        {key:'DKK',value:'DKK'},
        {key:'EUR',value:'EUR'},
        {key:'FRF',value:'FRF'},
        {key:'GBP',value:'GBP'},
        {key:'HKD',value:'HKD'},
        {key:'IDR',value:'IDR'},
        {key:'INR',value:'INR'},
        {key:'JPY',value:'JPY'},
        {key:'KRW',value:'KRW'},
        {key:'MYR',value:'MYR'},
        {key:'NLG',value:'NLG'},
        {key:'NOK',value:'NOK'},
        {key:'NZD',value:'NZD'},
        {key:'PGK',value:'PGK'},
        {key:'PHP',value:'PHP'},
        {key:'PKR',value:'PKR'},
        {key:'SEK',value:'SEK'},
        {key:'SGD',value:'SGD'},
        {key:'THB',value:'THB'},
        {key:'USD',value:'USD'},
        {key:'VND',value:'VND'},
        {key:'ZAR',value:'South African Rand'},
        {key:'ZXZ',value:'ZXZ'}
    ]
}
export const riskLevel = {
    "RISK_LEVEL_LIST":[
        {key:"0",value:"darkgrey"},
        {key:'1',value:'#6989ab'},
        {key:'2',value:'#72a898'},
        {key:'3',value:'#78bc51'},
        {key:'4',value:'#f47c2b'},
        {key:'5',value:'#FF0303'}
    ]
}
export const alternativeProductRiskLevel = {
    "GOAL_SUMMARY_DISCUSSED_RISK_LEVEL":[
        {key:'5',value:'5'},
        {key:'4',value:'4'},
        {key:'3',value:'3'},
        {key:'2',value:'2'},
        {key:'1',value:'1'},
        {key:'0',value:'0'}
      
    ]
}
export const alternativeProductType = {
    "GOAL_SUMMARY_DISCUSSED_PRODUCT_TYPE":[
        {key:"BOND",value:"Bonds/CD"},
        {key:"DPS",value:"Deposit Plus"},
        {key:"ELI",value:"Equity Linked Investments"},
        {key:"FCYDEP",value:"FCY/RMB Deposits"},
        {key:"LCYDEP",value:"HKD Deposits"},
        {key:"SID",value:"Structured Investment Deposit"},
        {key:"SN",value:"Structured Notes/ Structured Investments"},
        {key:"UT",value:"Unit Trusts"},
        {key:"INS-INSP",value:"Pure Insurance"},
        {key:"INS-INSS",value:"INS with savings"},
        {key:"INS-INSII",value:"INS with INV (borne by insurer)"},
        {key:"INS-INSIL",value:"INS with INV (borne by policyholder)"}
    ]
}
export const goalSummaryValidation = {
    "GOAL_SUMMARY_VALIDATIONRATIONS":[
        {key:'AC_HYB',value:"Asset Concentration (High Yield Bonds)"},
        {key:'AC_ELI',value:"Asset Concentration (Equity Linked Investments)"},
        {key:'AC_HYB_FUND',value:"Asset Concentration (Funds requiring Derivative Knowledge)"},
        {key:'AC_DERI_FUND',value:"Asset Concentration (High Yield Bond Fund)"},
        {key:'AC_SOB',value:"Asset Concentration (Subordinated Bonds)"},
    ],

    "GOAL_SUMMARY_VALIDATION_AC_HYB":[
        {key:'assetcont_high_yield_bonds_declr_less',value:"You confirm that your cumulative investment in high yield bonds <= 40% of your total net worth (excluding real estate properties)"},
        {key:'assetcont_high_yield_bonds_declr_more',value:"You confirm that your cumulative investment in high yield bonds > 40% of your total net worth (excluding real estate properties)"},
        {key:'assetcont_high_yield_bonds_declr_less_less',value:"You confirm that your cumulative investment (including this transaction) in high yield bonds is less than 20% of your total net worth (excluding real estate properties)."},
        {key:'assetcont_high_yield_bonds_declr_middle',value:"You confirm that your cumulative investment (including this transaction) in high yield bonds is between 20% and 40% of your total net worth (excluding real estate properties)."},
        {key:'assetcont_high_yield_bonds_declr_more_more',value:"You confirm that your cumulative investment (including this transaction) in high yield bonds is more than 40% of your total net worth (excluding real estate properties)."},
        {key:'contrisk_high_yield_bonds_declr_less',value:"You confirm that your investment amount in each high yield bond transaction is less than 20% of your total net worth (excluding real estate properties)."},
        {key:'contrisk_high_yield_bonds_declr_more',value:"You confirm that your investment amount in one or more of the high yield bond transactions is equal to or more than 20% of your total net worth (excluding real estate properties)."}
    ],
    "GOAL_SUMMARY_VALIDATION_AC_ELI":[
        {key:'assetcont_equity_lined_investments_declr_less',value:"You confirm that your cumulative investment in equity linked investments <= 40% of your total net worth (excluding real estate properties)"},
        {key:'assetcont_equity_lined_investments_declr_more',value:"You confirm that your cumulative investment in equity linked investments > 40% of your total net worth (excluding real estate properties)"},
        {key:'assetcont_equity_lined_investments_declr_less_less',value:"You confirm that your cumulative investment (including this transaction) in equity linked investments is less than 20% of your total net worth (excluding real estate properties)."},
        {key:'assetcont_equity_lined_investments_declr_middle',value:"You confirm that your cumulative investment (including this transaction) in equity linked investments is between 20% and 40% of your total net worth (excluding real estate properties)."},
        {key:'assetcont_equity_lined_investments_declr_more_more',value:"You confirm that your cumulative investment (including this transaction) in equity linked investments is more than 40% of your total net worth (excluding real estate properties)."}
        ],
    "GOAL_SUMMARY_VALIDATION_AC_DERI_FUND":[
        {key:'assetcont_derivative_fund_declr_less',value:"You confirm that your cumulative investment in funds requiring derivative knowledge <= 40% of your total net worth (excluding real estate properties)"},
        {key:'assetcont_derivative_fund_declr_more',value:"You confirm that your cumulative investment in funds requiring derivative knowledge > 40% of your total net worth (excluding real estate properties)"},
        {key:'assetcont_derivative_fund_declr_less_less',value:"You confirm that your cumulative investment (including this transaction) in funds requiring derivative knowledge is less than 20% of your total net worth (excluding real estate properties)."},
        {key:'assetcont_derivative_fund_declr_middle',value:"You confirm that your cumulative investment (including this transaction) in funds requiring derivative knowledge is between 20% and 40% of your total net worth (excluding real estate properties)."},
        {key:'assetcont_derivative_fund_declr_more_more',value:"You confirm that your cumulative investment (including this transaction) in funds requiring derivative knowledge is more than 40% of your total net worth (excluding real estate properties)."}
    ],
    "GOAL_SUMMARY_VALIDATION_AC_HYB_FUND":[
        {key:'assetcont_high_yield_bond_fund_declr_less',value:"You confirm that your cumulative investment in high yield bond fund <= 40% of your total net worth (excluding real estate properties)"},
        {key:'assetcont_high_yield_bond_fund_declr_more',value:"You confirm that your cumulative investment in high yield bond fund > 40% of your total net worth (excluding real estate properties)"},
        {key:'assetcont_high_yield_bond_fund_declr_less_less',value:"You confirm that your cumulative investment (including this transaction) in high yield bond funds is less than 20% of your total net worth (excluding real estate properties)."},
        {key:'assetcont_high_yield_bond_fund_declr_middle',value:"You confirm that your cumulative investment (including this transaction) in high yield bond funds is between 20% and 40% of your total net worth (excluding real estate properties)."},
        {key:'assetcont_high_yield_bond_fund_declr_more_more',value:"You confirm that your cumulative investment (including this transaction) in high yield bond funds is more than 40% of your total net worth (excluding real estate properties)."}
    ],
    "GOAL_SUMMARY_VALIDATION_AC_SOB":[
        {key:'assetcont_subordinated_bonds_declr_less',value:"You confirm that your cumulative investment (including this transaction) in subordinated bonds is less than or equal to 20% of your total net worth (excluding real estate properties)."},
        {key:'assetcont_subordinated_bonds_declr_more',value:"You confirm that your cumulative investment (including this transaction) in subordinated bonds is more than 20% of your total net worth (excluding real estate properties)."}
    ]
}






