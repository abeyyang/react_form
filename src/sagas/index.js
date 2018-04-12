import app from './app';
import landing from './landing';
import flowDemo from './flowDemo';
import recentPirority from './recentPirority_sga';
import meetingSummy from './meetingSummy_sga';
import financialProfile from './financialProfile';
import riskProfile from './riskProfile';
import riskProfileQues from './riskProfileQues';
import knowledgeAndExperience from './knowledgeAndExperience';
import fhc from './fhc';
import goalSimulator from './goalSimulator_sga';
import historicalPlans from './historicalPlans_sga';
import historicalPlans_recordGoalSolutionDetail from './historicalPlans_recordGoalSolutionDetail_sga';
import historicalPlans_deleteGoalInformation from './historicalPlans_deleteGoalInformation_sga';
import {saveNeedAnalysis,loadingNeedAnalysis,calculateProtectionNeedAnalysis} from './needAnalysis_sga';
import {loadingINSPS,addOrDeleteInsProduct,addOrDeleteDiscussedInsProduct,reviewInsProduct} from './sij_ps_sga';
import sij_gs_sga from './sij_gs_sga';
import productSummary_sga from './productSummary_sga';
import investmentJourneyProductSearch from './investmentJourneyProductSearch';
import investmentJourneyGoalSummary from './investmentJourneyGoalSummary';
import requestBuilder from './requestBuilder';
import commonValidate_sage from './commonValidate_sage';
import riskProfileQuestionnaireHistroicalRecords from './riskProfileQuestionnaireHistroicalRecordsSage';
import affordability from './affordability';
import sampleSaga from './sample_sga';
import orderPlacementSaga from './orderPlacement_saga';
import getQute_sage from './getQute_sage';

export default function* root () {
    yield [
        app(),
        landing(),
        flowDemo(),
        recentPirority(),
        meetingSummy(),
        financialProfile(),
        riskProfile(),
        knowledgeAndExperience(),
        fhc(),
        goalSimulator(),
        historicalPlans(),
        historicalPlans_recordGoalSolutionDetail(),
        historicalPlans_deleteGoalInformation(),
        riskProfileQues(),
        saveNeedAnalysis(),
        loadingNeedAnalysis(),
        calculateProtectionNeedAnalysis(),
        loadingINSPS(),
        addOrDeleteInsProduct(),
        addOrDeleteDiscussedInsProduct(),
        reviewInsProduct(),
        sij_gs_sga(),
        productSummary_sga(),
        investmentJourneyProductSearch(),
        requestBuilder(),
        commonValidate_sage(),
        investmentJourneyGoalSummary(),
        riskProfileQuestionnaireHistroicalRecords(),
        affordability(),
        sampleSaga(),
        orderPlacementSaga(),
        getQute_sage()
    ];
}
