
export default getRetrieveProductSearchResult=>{
 return {

            customers:[],
            goalKey:{},
            localeCode:{},
            productSearchCriteria:[],
            requestMode:[],
            piqQuestAndAnsDetails:[{
                investmentPreferenceTypeCode:null,
                investmentPreferenceCode:null,
                investmentPreferenceText:null
            }],
            investmentAppropriateness : [{
                appropriatenessTypeCode:null,
                appropriatenessResultCode:null,
                interestedIndicator:null,
                appropriatenessFeedback :[{
                    questionNumber:null,
                    answerNumber:null
                    }
                ]

            }],
            productSelectionCriteria:[{
                productSelectionMethodCode:"S",
                queryToken:{
                    queryTokenId:null
                },
                filterCriteriaFormula:{
                    filterFormula:null
                },
                keyValueCriteriaWithIndex:[],
                keyNlsValueCriteriaWithIndex:null,
                productDisplay:null,
                productSearchTecSegment:null,
                sortingCriteria:null
                }
            ],
            paginationDetail:{}
        }
}