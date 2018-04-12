import { connect } from 'react-redux';
import investmentProductSelection from '../components/investmentProductSelection_cpn';
import {searchProduct,reviewProducts,updateCriteria,updatePIQAnswers,addProducts,discussProducts,reOpenCriterias,updateLayoutStaus} from '../actions/investmentProductSelection_act';

const mapStateToProps = (state) => ({
    goalSolutionDetail:state.invPS.goalSolutionDetail,
    requestCriterias:state.invPS.requestCriterias,
    requestPIQAnswer:state.invPS.requestPIQAnswer,
    productSearchResult:state.invPS.productSearchResult,
    selectedProducts:state.invPS.selectedProducts,
    discussedProducts:state.invPS.discussedProducts,
    productSearch:state.invPS.productSearch,
    shortCriteria:state.invPS.shortCriteria,
    seachCriteria:state.invPS.seachCriteria,
    renderPageTargetUrl:state.invPS.renderPageTargetUrl
});

const investmentProductSelectionContainer = connect(
    mapStateToProps,
    {searchProduct,reviewProducts,updateCriteria,updatePIQAnswers,addProducts,discussProducts,reOpenCriterias,updateLayoutStaus}
)(investmentProductSelection);

export default investmentProductSelectionContainer;
