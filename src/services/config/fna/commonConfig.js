export const commonConfig={
        bizConfig:{
                indicator_keys:["INV","AIPI","EF","DCI", "MR"],
                currencyCodeAndDataControl: true,
                displayKYC:false,
                displayMIAE:true,
                MIAEComment:['SIGNFC_SALRY_ADJSTMT','UNSTABLE_INC_STR','ADD_INC_STR','SIGNFC_OTH_INC_STR','RED_SAL','OTHERS'],
                incomeItems : [ "PERSONAL_INC", "CONTRI_BY_FAMILY", "DIVIDEND_INC", "RENTAL_INC", "OTHER_INC"],
                incomeTotal : "TOTAL_INC",
                monthlyIncome : "DEC_TOTAL_INC",
                expenseItems : [ "LIVING_EXP", "MORTGAGE_PAYMENT", "EDUCATION_EXPENSES", "RENTAL", "OTHER_EXP", "INSURANCE"],
                livingexpenseItems: [ "LIVING_EXP", "RENTAL", "MORTGAGE_PAYMENT", "INSURANCE", "OTHER_EXP", "OTHER_NON_LIVING", "PENSION" ],
                expenseTotal : "TOTAL_EXP",
                monthlyExpense : "DEC_TOTAL_EXP",
                assetsItems : [ "LOCAL_CCY_DE", "NHSBC_LOCAL_CCY_DE", "STRU_NOTE", "NHSBC_STRU_NOTE", "OTHER_LIQ_AST", "NHSBC_OTHER_LIQ_AST", "INVESTMENT_PROPERTY","NHSBC_INVST_PROP","CPF_ORIDINARY","NHSBC_CPF_ORIDINARY","OTHER_NON_LIQ_AST","NHSBC_OTHER_NLIQ_AST"],
                liquidassetsItems : [ "CASH", "NON_CASH", "INVESTMENT", "NON_INVESTMENT", "OTHER_LIQ_AST", "NON_OTHER_LIQ_AST", "RESIDENTIAL_PROPERTY", "NON_RESIDENTIAL_PRO","INVESTMENT_PROPERTY","NON_INVESTMENT_PRO","CPF_ORIDINARY","NON_CPF_ORIDINARY","OTHER_NON_LIQ_AST","NON_OTHER_NON_LIQ_AS"],
                assetsTotal :  "TOTAL_AST",
                liabilityItems : [ "OTHER_LONG_LIA", "OTHER_SHORT_LIA", "NHSBC_OTHER_LONG_LIA", "NHSBC_OTHER_SHRT_LIA"],
                liabilityTotal : "TOTAL_LIA",     
                investmentItems : [ "LIW", "LIW_NH", "PEA", "PEA_NH", "PEAPME", "PEAPME_NH", "PERP", "PERP_NH", "SECUREACCT", "SECUREACCT_NH", "SAVINGS", "SAVINGS_NH"],
                investmentTotal : "TOTAL_INVST",
                reasonToUpdateMonthlyAndExpense:{
                    SIGNFC_SALRY_ADJSTMT:"I have significant salary adjustment rencently",
                    UNSTABLE_INC_STR:"I have unstable income  stream  in the past 2 years",
                    ADD_INC_STR:"I have additional income  stream  rencently",
                    SIGNFC_OTH_INC_STR:"My other income stream has significant adjustment rencently",
                    RED_SAL:"I foresee i will have significant  reduction in my salary due to change in life state or personal plans",
                    OTHERS:"others, please specify"
                },
                efConfig:{
                    defaultEmergencyFundAmount : 0,
                    defaultEmergencyFundMap : [
                            {"USD":"100"},
                            {"JPY":"200"},
                            {"TWD":"300"},
                            {"GBP":"400"},
                            {"EUR":"500"},
                            {"AUD":"600"},
                            {"HKD":"700"},
                            {"NZD":"800"},
                            {"SGD":"900"},
                            {"PHP":"1000"},
                            {"VND":"1100"},
                            {"INR":"1200"}],
                    ef_calculate_Method: "month",
                    ef_calculate_Method_higerAmount: {
                        refAmount: 10,
                        netWorthPersent: 10
                    },
                    ef_calculate_Method_month: {
                            month: 3,
                            type: "TotalExpense"
                     }
                }
        },
       pvcConfig:{
                PVC_FEATURE : true,
                CIH_KEYS : "CIH_UT",
                LIMIT_MEANS_KEY : "PVC_EAI",
                EXC_AGE_KEY : "EXC_AGE",
                PVC_OVERALL : "PVC_OVALL",
                PVC_RISK_LEVEL_KEY : 4,
                HIGH_ASSET_CONCENTRATION_CODE : ["PVC0003"]
       },
       FNAConstants:{
            FPS_INFO_TYPE: {
                    SOFT_FACT : "SOFT_FACT",
                    FPS_INFO_TYPE_INVESTMENT: "INVST",
                    FPS_INFO_TYPE_EF : "EF",
                    MORE_CUST_INFO : "CUST_INFO",
                    INVESTMENT : "INVST",
                    FNA_INC_DET : "FNA_INC_DET",
                    FNA_KYC : "FNA_KYC",
                    MFD : "MFD",
                    INC_EXP_JSTTFCTN:"INC_EXP_JSTTFCTN"
                },
            COMMENT_TYPE: {
                    HEALTH : "HEALTH",
                    REP_FUNDS : "REP_FUNDS",
                    INV_EXP : "INV_EXP",
                    DRAW_INC : "DRAW_INC",
                    TERM : "TERM",
                    CERT_OUTCOME : "CERT_OUTCOME",
                    YOUR_WILL : "YOUR_WILL",

                    CUST_INFO_ADDR_BUSI : "ADDR_BUSI",
                    CUST_INFO_COUNTRY : "COUNTRY",
                    CUST_INFO_DOM : "DOM",
                    CUST_INFO_JOD_DEC : "JOD_DEC",
                    CUST_OTHER : "OTHER",
                    CUST_INFO_PRE_EMP : "PRE_EMP",
                    
                    //AMH SIJ add
                    INC_EXP_JSTTFCTN : "INC_EXP_JSTTFCTN",
                    INSUR_PREM : "INSUR_PREM"
                },
            COMMENT_ACTION_U: "U",
            COMMENT_ACTION_R: "R",

            INSURANCE_NEED_TYPE: {
                    SUPPMFAM: "SUPPMFAM",
                    RESERLOT: "RESERLOT",
                    ESTAPLAN: "ESTAPLAN",
                    OTHERS: "OTHERS"
                },
            SUBSERVICEID:{
                    INSURANCE_NEED_SUBSERVICEID_NDEVADTL: "NDEVADTL",
                    BUY_PRODUCT_PURPOSE_SUBSERVICEID_SUMMARY: "SUMMARY",
                    BUY_PRODUCT_PURPOSE_SUBSERVICEID_BUYPURP: "BUYPURP",
                    INSURANCE_NEED_SUBSERVICEID_SAVNDEVA: "SAVNDEVA",
                    BUY_PRODUCT_PURPOSE_SUBSERVICEID_SAVBUYPURP: "SAVBUYPURP",
                    DEATH_BENEFIT_PAYABLE_SUBSERVICEID_SAVLCLFLD: "SAVLCLFLD",
                    INSURANCE_FINANCIAL_PROFILE_SUBSERVICEID_SAVINVIND: "SAVINVIND",
                    INSURANCE_FINANCIAL_PROFILE_SUBSERVICEID_SAVSIJFNA: "SAVSIJFNA"
                },
            POLICY_TYPE: {
                    DEATH: "DEATH", //death
                    DISA : "DISA",  //disability
                    CRIT : "CRIT",  //critical illness
                    HOS  : "HOS",   //hospital
                    ACC  : "ACC"    //acident
                 },
            PRIORITY_TYPE: {
                    HP: "HP", //hospitalization
                    HIP : "HIP" //health insurance
                },
        COMMENT_ACTION_D: "D"
    },
    financialProfiles:{
        MIAEOption:{ 
            selected:{
                commentType:null,
		        commentKey:null
            } 
        }, 
        MIAESelected:{
            commentType:null,
		    commentKey:null
        },
        softFacts : {
            health : null,
            repFunds : null,
            invExp : null,
            drawInc : null,
            term : null
        },
        moreCustomerInfo : {
            jobDesc : null,
            addressAndBusiness : null,
            previousEmployer : null,
            domicile : null,
            countriesForTax : null,
            other : null
	    }, 
        financialSituation:{ 
            baseCurrenyCode: null,
    		incomes:{
                total: {currencyCode: null, amount: 0},
                detailList: []
		    },
		    moreIncomeDetail:{
                incomeSourceWithinFamily: null,
                dividendIncomeFrequency: null,
                rentalIncomeFrequency: null,
                otherIncomeFrequency: null,
                sourceOfOtherIncome: null
		    },
		    expenses:{
                totalLivingExpense: {currencyCode: null, amount: 0},
                total: {currencyCode: null, amount: 0},
                detailList: []
	        },
            assets:{
                totalLiquidAssets: {currencyCode: null, amount: 0},
                total: {currencyCode: null, amount: 0},
                mfdTotalLiquidAsset: {currencyCode: null, amount: 0},
                mfdTotalFixedAssets: {currencyCode: null, amount: 0},
                detailList: []
            },
            liability: {
                total: {currencyCode: null, amount: 0},
                detailList: [],
                mfdTotalLiability: {currencyCode: null, amount: 0}
            },
            investment: {
                total: {currencyCode: null, amount: 0},
                detailList: [],
                remarkList: []
            },
            dependentNo: null,
		    dependentDetails: [],
		    dependentNoFromHUB: null,
		    dependentDetailsFromHUB: [],
		    incomePayTaxRate: null,
		    surplus:  {currencyCode: null, amount: 0},
            netWorth:  {currencyCode: null, amount: 0},
		    mfdNetWorth:  {currencyCode: null, amount: 0},
            savingCapacity:  {currencyCode: null, amount: 0}
        },
        fxRate: [],
        emergencyFunds:{
            emergeFundMode: null,
            emergeFundDetail: {
                efOption: null,
                emergencyFundAmount: null,
                efOverrideReason: null,
                efSourceField: null,
                userInputEmergencyFundAmount: 0
            },
            availableInvestment: null	
	    },
        KYCQuestions: {
            question1:null,
            question2:null,
            question3:null,
            question4:null,
            knowledge: {
                customer1 : null,
                customer2 : null,
                customer3 : null,
                customer4: null,
                customer5 : null
            }
        },
        insuranceNeeds: {
            baseCurrenyCode: null,
            supportFamilyAmount: null,
            reserveExpenseAmount: null,
            estatePlanAmount: null,
            otherAmount: null,
            total: null,
            otherText: null
        },  
	    dualCurrencyInvestment:[],
	    limitMeans: null, 
	    oldingList: [],
	    ilasInvestmentList: [],
        selectedPurpose: {
            purposeCodeSelected:[],
            otherCode: [],
            otherText: null,
            deathBenefitPayable: null
        },
        insuranceNeeds: {
            baseCurrenyCode: null,
            supportFamilyAmount: null,
            reserveExpenseAmount: null,
            estatePlanAmount: null,
            otherAmount: null,
            total: null,
            otherText: null
        },
        insurancePolicyList: [],
        insurancePriority:{
            healthInsurancePriorities:[],
            hospitalizationPriorities:[]

        },
        reviewDateTime: null,
        id: null,
        currencyCode: null,
        countryISOCode:null,
        groupMemberCode:null
    },
    currencyConfig:{
			defaultCurrency : "HKD", 	       
    },
    financialSituationRemark:{
        propertyName: null,
        type: null,
        fieldLabel: null,
        fieldLabelTitle: null, 
        tooltip: null,
        remarkText: null
    }
}