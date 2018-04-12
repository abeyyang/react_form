import { connect } from 'react-redux';
import QuestionsAndCriteriasComponent from '../components/questionAndCriterias/questionAndCriterias_cpn';
import {searchProduct,updateLayoutStaus,reviewProducts,updateCriteria,updateProductCode,updatePIQAnswers,addProducts,discussProducts} from '../actions/investmentProductSelection_act';

const mapStateToProps = (state) => ({
    productCode:state.invPS.productCode,
    requestCriterias:state.invPS.requestCriterias,
    requestPIQAnswer:state.invPS.requestPIQAnswer,
    productSearch:state.invPS.productSearch,
    shortCriteria:state.invPS.shortCriteria,
    seachCriteria:state.invPS.seachCriteria,
    renderPageTargetUrl:state.invPS.renderPageTargetUrl
});

const QuestionsAndCriteriasComponentContainer = connect(
    mapStateToProps,
    {searchProduct,updatePIQAnswers,updateCriteria,updateProductCode,updateLayoutStaus}
)(QuestionsAndCriteriasComponent);

export default QuestionsAndCriteriasComponentContainer;