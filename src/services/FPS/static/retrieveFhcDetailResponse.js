export default {
    "reasonCode": [],
    "responseDetails": {
        "responseCode": 0
    },
    "calculationDto": {
            "calculationResults": [{
                "achievedAmt": 1988888,
                "calculationTypeCode": "CAL_LIFE_COVERAGE",
                "currencyCode": "HKD",
                "priority": "1",
                "referenceAmt": 65502298
            }, {
                "achievedAmt": 50000,
                "calculationTypeCode": "CAL_CRITICAL_ILL",
                "currencyCode": "HKD",
                "priority": "2",
                "referenceAmt": 24467696
            }, {
                "achievedAmt": 240794,
                "calculationTypeCode": "CAL_RETIREMENT",
                "currencyCode": "HKD",
                "priority": "3",
                "referenceAmt": 67958368
            }, {
                "achievedAmt": 102815,
                "calculationTypeCode": "CAL_EDUCATION",
                "currencyCode": "HKD",
                "priority": "4",
                "referenceAmt": 1063525
            }, {
                "achievedAmt": 0,
                "calculationTypeCode": "CAL_GENERAL",
                "currencyCode": "",
                "priority": "",
                "referenceAmt": 0
            }, {
                "achievedAmt": 0,
                "calculationTypeCode": "CAL_LEGACY",
                "currencyCode": "",
                "priority": "",
                "referenceAmt": 0
            }, {
                "achievedAmt": 0,
                "calculationTypeCode": "CAL_PROPERTY",
                "currencyCode": "",
                "priority": "",
                "referenceAmt": 0
            }, {
                "achievedAmt": 0,
                "calculationTypeCode": "CAL_SHORT_TERM_GO",
                "currencyCode": "",
                "priority": "",
                "referenceAmt": 0
            }],
            "comments": "",
            "shortTermInvestDetail": "Please provide more details of customer's short term investment plan"
        },
        "financialInfoDto": {
            "finhckId": 139053,
            "crmsCustInsPolicyType": "",
            "crmsRecordDate": null,
            "custRpqLevel": "5",
            "existingCoverage": {
                "hasInpCoverage": "Y",
                "hasOutptCoverage": "Y",
                "hasTravCoverage": "N",
                "illnessCoverAmt": 50000,
                "illnessCoverCurrCde": "HKD",
                "lifeInsCoverAmt": 100000,
                "lifeInsCoverCurrCde": "HKD",
                "lifeInsCmpnyBnftAmt":333656,
                "lifeInsCmpnyBnftCurrCde":"HKD",
                "retireAge": 65,
                "savingForEduAmt": 40000,
                "savingForEduCurrCde": "HKD",
                "savingForRetireAmt": 50000,
                "savingForRetireCurrCde": "HKD"
            },
            "familyCirCum": {
                "universityCountryCde": "GB",
                "yearOfChildrenDOB1": "2016",
                "yearOfChildrenDOB2": "2010",
                "yearOfChildrenDOB3": "",
                "yearOfChildrenDOB4": "",
                "yearOfChildrenDOB5": ""
            },
            "fhcAdditionalInfo": [],
            "hasEmergencyFund": "",
            "hasLegacyPlan": "Y",
            "hasLegacyPlanDesc": "Here is legacy plan description...",
            "hasMortgageProperty": "N",
            "hasNoMortgageProperty": "N",
            "hasOverseaProperty": "N",
            "hasRentProperty": "Y",
            "hasShortTermInvest": "Y",
            "monthlyExps": [{
                "currencyCode": "HKD",
                "expenseAmt": 200000,
                "expenseTypeCode": "TOTAL_EXP"
            }],
            "monthlyIncs": [{
                "currencyCode": "HKD",
                "currencyincomeAmt": 1000000,
                "incomeTypeCode": "TOTAL_INC"
            }, {
                "currencyCode": "HKD",
                "currencyincomeAmt": 200000,
                "incomeTypeCode": "MONTHLY_INC"
            }],
            "rpqLevel": "5",
            "staffName": "STAFF NAME",
            "toalLiabilities": [{
                "currencyCode": "HKD",
                "liabilityAmt": 500000,
                "liabilityTypeCode": "TOTAL_LIA"
            }],
            "totalAssetsDtos": [{
                "assetAmt": 1888888,
                "assetTypeCode": "TOTAL_AST",
                "currencyCode": "HKD"
            }]
        },
        "goalPlanningDto": {
            "criticalIllness": {
                "supportAmt": 561000,
                "supportCurrCde": "HKD",
                "yearToSupport": 2
            },
            "educationPlan": {
                "annualExpAmt": 195501,
                "annualExpCurrCde": "HKD",
                "yearInSchool": 4,
                "yearTillEnterSchool": 17
            },
            "protectionPlan": {
                "savingAndInvesAmt": 1888888,
                "savingAndInvesCurrCde": "HKD",
                "supportAmt": 0,
                "supportCurrCde": "HKD",
                "totalLiaOutsAmt": 11111111.11,
                "totalLiaOutsCurrCde": "HKD",
                "yearToSupport": 29
            },
            "retirementPlan": {
                "monthlyExpAmt": 500,
                "monthlyExpCurrCde": "HKD",
                "postRetireYear": 22,
                "targeRetireAge": 65
            }
        }
}