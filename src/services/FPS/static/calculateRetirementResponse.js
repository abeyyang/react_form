export default{
    calculateResult: [   {
       simulateSegmentIndicator: "I",
       calculateFinancialResult: [
         {
             key: "surplusShortfall",
             value: -0.0990853797E7
          },
                   {
             key: "targetAmount",
             value: 1.1933580232E7
          },
                   {
             key: "midReturn",
             value: 42726.435
          },
                   {
             key: "extraMonthlySaving",
             value: 3918520.678
          },
                   {
             key: "growthRate",
             value: 7.1
          },
                   {
             key: "inflationRate",
             value: 2.12
          },
                   {
             key: "totalPaidIn",
             value: 42000
          }
       ],
       calculatePhaseResult: [      {
          phaseType: "accumulation",
          calculateReturnResult:          [
                         {
                performanceMarketLevelCode: "high",
                year: 2017,
                month: null,
                returnAmount: 45086.737
             },
                         {
                performanceMarketLevelCode: "mid",
                year: 2017,
                month: null,
                returnAmount: 42726.435
             },
                         {
                performanceMarketLevelCode: "low",
                year: 2017,
                month: null,
                returnAmount: 38928.116
             }
          ],
          stochasticPercentileResult: [         {
             percentile: null,
             title: null,
             stochasticDataPoint: [            {
                xValue: 2017,
                xMonthValue: null,
                yValue: 42000,
                meta: "totalPaidIn"
             }]
          }]
       }],
       calculateAccountResult: null
    }],
    calculateJsonResult: [   {
       simulateSegmentIndicator: "I",
       jsonResult: "{\"financialPlanId\":0,\"invesmentYearNum\":null,\"invesmentMonthNum\":null,\"childrenSchedule\":{\"2017\":{\"yearNum\":2017,\"youNeed\":1000000.0,\"youHave\":42726.43503500252079962612,\"youHaveHigh\":45086.73734314897563091289,\"youHaveLow\":38928.11556365359557625004,\"shortfall\":-957273.56496499747920037388,\"costMap\":{\"EDUC\":0,\"OTHER\":0,\"CAR\":0,\"INC_EDU\":0E-20,\"WED\":0,\"HOUSE\":0},\"totalPaidIn\":42000.00000000000000000000,\"totalHolding\":42000.00000000000000000000,\"existingHolding\":0}},\"costMap\":{\"CAR\":0,\"EDUC\":11933580.23241749539,\"HOUSE\":0,\"OTHER\":0,\"WED\":0},\"youHave\":42726.43503500259185376691,\"youNeed\":11933580.23241749539,\"totalShortFall\":-11890853.79738249279814623309,\"moRequriedMoSaving\":3918520.67778255409468611168,\"currencyCode\":\"HKD\",\"averageRate\":7.10000000000008402200,\"remodelAverageRate\":null,\"simulateSegmentIndicator\":\"I\",\"inflationRate\":0.02120000000000000000,\"projectMonthAmount\":null,\"totalContribution\":0E-20,\"scale\":3,\"roundingMode\":4,\"childBirthDate\":null,\"respContributionCCY\":null,\"respContributionAmt\":null,\"ahievedMap\":{\"achievedAmt\":42726.43503500259185376691,\"gapAmt\":11890853.79738249279814623309,\"achievedPer\":0.00},\"resultMap\":{}}"
    }]
 }