import { connect } from 'react-redux';
import CriteriaShortList from '../components/criteriaShortList/criteriaShortList_cpn';
import {searchProduct,reviewProducts,updateCriteria,updatePIQAnswers,addProducts,discussProducts,updateLayoutStaus} from '../actions/investmentProductSelection_act';

const mapStateToProps = (state) => ({
    selectedProducts:state.invPS.selectedProducts,
    discussedProducts:state.invPS.discussedProducts,
    productSearch:state.invPS.productSearch,
    shortCriteria:state.invPS.shortCriteria,
    seachCriteria:state.invPS.seachCriteria
});

const criteriaShortListContainer = connect(
    mapStateToProps,
    {addProducts,discussProducts,updateLayoutStaus}
)(CriteriaShortList);

export default criteriaShortListContainer;
