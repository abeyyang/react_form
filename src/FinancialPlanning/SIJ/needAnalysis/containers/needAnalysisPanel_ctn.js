import { connect } from 'react-redux';
import needAnalysisPanel from '../components/needAnalysisPanel';
import {loadingNeedAnalysisPage,needAnalysisSave,calculateProtectionNeedPage,updateNeedAnlysisField} from '../actions/needAnalysisPanel_act';
import {commonValidate} from '../../../../common/actions/nav'
const mapStateToProps = (state) => ({
    goalSolutionDetail:state.needAnalysis.goalSolutionDetail,
    sessionInfo:state.session,
    totalProNeedAmount:state.needAnalysis.totalProNeedAmount,
    goProductSearchFlag:state.needAnalysis.goProductSearchFlag,
    estatePlanAmountVaildate:state.needAnalysis.estatePlanAmountVaildate,
    supportFamilyAmountVaildate:state.needAnalysis.supportFamilyAmountVaildate,
    reserveExpenseAmountVaildate:state.needAnalysis.reserveExpenseAmountVaildate,
    totalProNeedAmountVaildate:state.needAnalysis.totalProNeedAmountVaildate,
    supportFamilyNumberRender:state.needAnalysis.supportFamilyNumberRender,
    otherAmountVaildate :state.needAnalysis.otherAmountVaildate,
    otherAmountNumberRender :state.needAnalysis.otherAmountNumberRender,
    reserveExpenseNumberRender:state.needAnalysis.reserveExpenseNumberRender,
    saveQuestionsVaildate:state.needAnalysis.saveQuestionsVaildate,
    saveQuestionsNumberRender:state.needAnalysis.saveQuestionsNumberRender,
    errorList:state.nav.errors
});

const needAnalysisContainer = connect(
    mapStateToProps,
    {loadingNeedAnalysisPage,needAnalysisSave,calculateProtectionNeedPage,commonValidate,updateNeedAnlysisField},
)(needAnalysisPanel);

export default needAnalysisContainer;
