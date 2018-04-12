import { connect } from 'react-redux';
import FinancialProfilePanel from '../components/financialProfilePanel';
import {initFNAData,initFnaAssestData,initFnaIncomeData,initFnaExpensesData,initFnaLiailitiesData, updateTotalIncome,recordFinancialSituationData,updateRenderIndicator,retrieveFxrateByCurrency} from '../actions/financialProfile_act';

const mapStateToProps = (state) => ({
    fnaObj:state.financialProfile.fnaObj,
    incomeDetail:state.financialProfile.incomeDetail,
    expenseDetail:state.financialProfile.expenseDetail,
    assetsDetail:state.financialProfile.assetsDetail,
    liabilityDetail:state.financialProfile.liabilityDetail,
    EFIndicatorDetail:state.financialProfile.EFIndicatorDetail,
    pvcIndicatorDetail:state.financialProfile.pvcIndicatorDetail,
    closeIndicator : state.financialProfile.closeIndicator,
    fnaDataModel:state.financialProfile.fnaDataModel,
    renderToLanding:state.financialProfile.renderToLanding,
    fxrateDetail:state.financialProfile.fxrateDetail,
    dciIndicatorDetail:state.financialProfile.dciIndicatorDetail,
    assetReferenceRecord:state.financialProfile.assetReferenceRecord,
    incomeReferenceRecord:state.financialProfile.incomeReferenceRecord,
    expensesReferenceRecord:state.financialProfile.expensesReferenceRecord,
    liabilitiesReferenceRecord:state.financialProfile.liabilitiesReferenceRecord
});
 
const financialProfileContainer = connect(
    mapStateToProps,
    {initFNAData,initFnaAssestData,initFnaIncomeData,initFnaExpensesData,initFnaLiailitiesData,updateTotalIncome,recordFinancialSituationData,updateRenderIndicator,retrieveFxrateByCurrency}
)(FinancialProfilePanel);

export default financialProfileContainer;