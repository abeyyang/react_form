export default{
        spendingCountry:[
            {code:'AU',amount:196656},
            {code:'CA',amount:143174},
            {code:'GB',amount:195501},
            {code:'US',amount:149505},
            {code:'HK',amount:42100},
            {code:'HN',amount:146000}
        ],
        currencyCodeForInputField:'HKD',
        maleAvgMortalityAge:81,
        femaleAvgMortalityAge:87,
        baseCurrency:"HKD",
        calculationServiceProtocol:"WS", //WS or REST
        education:{
            skipRiskProfilingIndicator:"N",
            goalActionCode:"A",
            goalTypeCode:"EDUC",
            incomeOrLumpSumMode:"L",
            performanceMarketLevelCode:"MEDM",
            periodicityGoalCode:"MO",
            returnRateTypeCode:"NOML",
            simulateSegmentIndicator:"I",
            goalDescription:"Education Planning",
            applyInflationIndicator:"Y",
            projectionType:"D"
        },
        retirement:{
            goalTypeCode:"RTIRE",
            goalDescription:"Retirement Planning",
            incomeOrLumpSumMode: "L",
            performanceMarketLevelCode: "MEDM",
            periodicityIncomePensionCode: "L",
            periodicityPostRetirementIncomeCode: "MO",
            returnRateTypeCode: "NOML",
            simulateSegmentIndicator: "I",
            skipRiskProfilingIndicator: "N",
            taxFreeCashIndicator: "N",
            viewType: "SS",
            retirementExpenseSource: "C",
            applyInflationIndicator: "Y",
            projectionType:"D"
        },
        lifeCoverage:{
            coveragePeriodIndicator:"Y",
            applyInflationIndicator:"Y",
            goalDescription:"Protection Planning",
            goalTypeCode:"LIFE_PROTC",
            planForCustomerIndicator:"Y",
            returnRateTypeCode:"NOML",
            simulateSegmentIndicator:"I",
            skipRiskProfilingIndicator:"N",
            projectionType:"D"
        },
        criticalIllness:{
            coveragePeriodIndicator:"Y",
            applyInflationIndicator:"Y",
            goalDescription:"Protection Planning",
            goalTypeCode:"LIFE_PROTC",
            planForCustomerIndicator:"Y",
            returnRateTypeCode:"NOML",
            simulateSegmentIndicator:"I",
            skipRiskProfilingIndicator:"N",
            projectionType:"D"
        },

        maleCriticalIllnessSupportAmt:561000,
        femaleCriticalIllnessSupportAmt:790000
    };