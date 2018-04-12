import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './app';
import intl from './intl';
import nav from './nav';
import session from './session';
import verifyPage from './verifyPage';
import landing from '../../FinancialPlanning/landing/reducers/landing_rdc';
import financialProfile from '../../FinancialPlanning/financialProfile/reducers/financialProfile_rdc';
import demoFlow from '../../FinancialPlanning/flowApi/reducers/flowDemo_rdc';
import recentPirority from '../../FinancialPlanning/landing/reducers/recentPirority_rdc';
import riskProfile from '../../FinancialPlanning/riskProfileQuestionnaire/reducers/riskProfile_rdc';
import riskHistoricalRecords from '../../FinancialPlanning/riskProfileQuestionnaire/reducers/riskProfileQuestionnaireHistroicalRecords_rdc';
import knowledgeAndExperience from '../../FinancialPlanning/knowledgeAndExperience/reducers/knowledgeAndExperience_rdc';
import riskProfileQues from '../../FinancialPlanning/riskProfileQuestionnaire/reducers/riskProfileQues_rdc';
import affordability from '../../FinancialPlanning/affordability/reducers/affordability_rdc';
import fhc from '../../FinancialPlanning/FHC/reducers/fhc_rdc';
import goalSimulator from '../../FinancialPlanning/goalSimulator/reducers/goalSimulator_rdc';
import needAnalysis from '../../FinancialPlanning/SIJ/needAnalysis/reducers/needAnalysisPanel_rdc';
import sijPS from '../../FinancialPlanning/SIJ/productSelection/reducers/sij_ps_rdc';
import sijGS from '../../FinancialPlanning/SIJ/productSummary/reducers/sij_gs_rdc';
import invPS from '../../FinancialPlanning/Inv/investmentProductSelection/reducers/investmentProductSelection_rdc';
import invGS from '../../FinancialPlanning/Inv/goalSummary/reducers/goalSummary_rdc';
import orderPlacement from '../../FinancialPlanning/orderPlacement/reducers/orderPlacement_rdc';
import ProdSumm from '../../FinancialPlanning/productSummary/reducers/productSummary_rdc';
import meetingSummy from '../../FinancialPlanning/meetingSummary/reducers/meetingSummy_rdc';
import requestBuilder from './requestBuilder';
import sampleReducer from '../../Sample/reducers/sample_rdc';
export default function createReducer (asyncReducers) {
    return combineReducers({
        routing: routerReducer,
        app,
        intl,
        nav,
        landing,
        demoFlow,
        session,
        financialProfile,
        recentPirority,
        riskProfile,
        knowledgeAndExperience,
        riskProfileQues,
        riskHistoricalRecords,
        fhc,
        goalSimulator,
        needAnalysis,
        invPS,
        sijPS,
        sijGS,
        invGS,
        orderPlacement,
        ProdSumm,
        meetingSummy,
        requestBuilder,
        sampleReducer,
        affordability,
        ...asyncReducers
    });
}
