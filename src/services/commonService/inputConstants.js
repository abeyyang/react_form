export default{
    retrieveFinancialSituationData  :{
		messageId:'retrieveFinancialSituationData',
		request:['messageId']
	},
    recordFinancialSituationData :{
		messageId:'recordFinancialSituationData',
		request:['messageId']	
    },
	retrieveGoalSummaryList :{
		messageId:'retrieveGoalSummaryList',
		request:['messageId']
	},
	retrieveGoalSolutionDetail :{
		messageId:'retrieveGoalSolutionDetail',
		request:['messageId']
	},
	recordGoalSolutionDetail :{
		messageId:'recordGoalSolutionDetail',
		request:['messageId']
	},
	deleteGoalInformation :{
		messageId:'deleteGoalInformation',
		request:['messageId']
	},
	recordBaseGoal:{
		messageId:'recordBaseGoal',
		request:['messageId','baseGoal','leadId']
	},
    retrieveQuestionnaireResponseDetail :{
		messageId:'retrieveQuestionnaireResponseDetail',
		request:['messageId','customers','detailSearchCriteria','questionnaireKey','searchCriteria','questionnaireTypeCode']
	},
    calculateQuestionnaireRanking :{
		messageId:'calculateQuestionnaireRanking',
		request:['messageId']
    },
	retrieveQuestionnaire :{
         messageId:'retrieveQuestionnaire',
		request:['messageId']
	},
	maintainQuestionnaireResponseDetail :{
        messageId:'maintainQuestionnaireResponseDetail',
		request:['messageId']
	},
	downloadQASControlData :{
        messageId:'downloadQASControlData',
		request:['messageId']
	},
	retrieveQuestionnaireReport :{
        messageId:'retrieveQuestionnaireReport',
		request:['messageId']
	},
	retrieveInvolvedPartyDetailsIndividual:{
		messageId:'retrieveInvolvedPartyDetailsIndividual',
		request:['messageId','cdmBusinessObjectIdentification','cdmResponseScope','cdmResponseScope2','cdmResponseScope3',
				'cdmResponseScope4','cdmResponseScope5','cdmResponseScope6','cdmResponseScope7','cdmResponseScope8','cdmResponseScope9','cdmResponseScope10',
				'cdmResponseScope11','coreReserveAreaDetails','localFieldsAreaDetails']
	},

	retrieveFinancialSituationReferenceRecordAssets :{
        messageId:'retrieveFinancialSituationReferenceRecordAssets',
		request:['messageId']
	},
	retrieveFinancialSituationReferenceRecordExpenses :{
        messageId:'retrieveFinancialSituationReferenceRecordExpenses',
		request:['messageId']
	},
	retrieveFinancialSituationReferenceRecordIncome :{
        messageId:'retrieveFinancialSituationReferenceRecordIncome',
		request:['messageId']
	},
	retrieveFinancialSituationReferenceRecordLiabilities :{
        messageId:'retrieveFinancialSituationReferenceRecordLiabilities',
		request:['messageId']
	},
	enquireFhcSummary :{
		messageId:'enquireFhcSummary',
		request:['messageId']
	},
	retrieveFhcDetail :{
		messageId:'retrieveFhcDetail',
		request:['messageId','financialCheckDate']

	},
	retrieveLife400InsuranceDetail :{
		messageId:'retrieveLife400InsuranceDetail',
		request:['messageId']
	},
	updateFhcResult :{
		messageId:'updateFhcResult',
		request:['messageId']
	},
    retrieveByCurrency :{
		messageId:'retrieveByCurrency',
		request:['messageId','targetCurrency']
	},
	calculateEducation :{
		messaegId:'calculateEducation',
		request:['messageId']
	},
	calculateRetirement :{
		messaegId:'calculateRetirement',
		request:['messageId']
	},
	calculateLifeCoverage :{
		messaegId:'calculateLifeCoverage',
		request:['messageId']
	},
	calculateCriticalIllness :{
		messaegId:'calculateCriticalIllness',
		request:['messageId']
	},
	calculateGrowYourWealth :{
		messaegId:'calculateGrowYourWealth',
		request:['messageId']
	},
	retrieveOrderPlacement : {
		messageId:'retrieveOrderPlacement',
		request:['messageId']
	},
	retrievePlanningYourRetirement :{
		messageId:'retrievePlanningYourRetirement',
		request:['messageId']
	},
	calculatePlanningYourRetirement :{
		messageId:'calculatePlanningYourRetirement',
		request:['messageId']
	},
	recordPlanningYourRetirement :{
		messageId:'recordPlanningYourRetirement',
		request:['messageId']
	},
	calculateGrowingYourWealth :{
		messageId:'calculateGrowingYourWealth',
		request:['messageId']
	},
	calculateEducation2 :{
		messaegId:'calculateEducation2',
		request:['messageId']
	},
	calculateRetirement2 :{
		messaegId:'calculateRetirement2',
		request:['messageId']
	},
	calculateLifeCoverage2 :{
		messaegId:'calculateLifeCoverage2',
		request:['messageId']
	},
	calculateCriticalIllness2 :{
		messaegId:'calculateCriticalIllness2',
		request:['messageId']
	},
	assetConcentrationCalculationGetHolding :{
		messageId:'assetConcentrationCalculationGetHolding',
		request:['messageId']
	}
}