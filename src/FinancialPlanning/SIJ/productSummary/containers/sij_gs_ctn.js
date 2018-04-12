import { connect } from 'react-redux';
import productSummaryPanel from '../components/productSummaryPanel';
import {retrieveGoalSolutionDetail,reviewInvestment,recordGoalSolutionDetail,
        getOrUpdateQuote,loadingGetQuoteOverlay,updateGetQuoteDataForm,
        updateFormData,addMoreDiscussProd,removeDiscussProd,removeInsProd} from '../actions/sij_gs_act';

const mapStateToProps = (state) => ({
    goalSolutionDetailData : state.sijGS.goalSolutionDetailData,
    customerDeclaration : state.sijGS.customerDeclaration,
});

const productSummary = connect(
    mapStateToProps,
    {retrieveGoalSolutionDetail,reviewInvestment,recordGoalSolutionDetail,
    getOrUpdateQuote,loadingGetQuoteOverlay,updateGetQuoteDataForm,
    updateFormData,addMoreDiscussProd,removeDiscussProd,removeInsProd}
)(productSummaryPanel);

export default productSummary;
