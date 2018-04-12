import { connect } from 'react-redux';
import ProductTableComponent from '../components/productTable/productTable_cpn';
import {searchProduct,reviewProducts,updateCriteria,updatePIQAnswers,addProducts,discussProducts,updateLayoutStaus} from '../actions/investmentProductSelection_act';

const mapStateToProps = (state) => ({
    productSearchResult:state.invPS.productSearchResult,
    productSearchResultForBond:state.invPS.productSearchResultForBond,
    productData:state.invPS.productData,
    selectedProducts:state.invPS.selectedProducts,
    discussedProducts:state.invPS.discussedProducts,
    productSearch:state.invPS.productSearch,
    shortCriteria:state.invPS.shortCriteria,
    seachCriteria:state.invPS.seachCriteria,
    renderPageTargetUrl:state.invPS.renderPageTargetUrl
});

const productTableContainer = connect(
    mapStateToProps,
    {reviewProducts,addProducts,discussProducts,updateLayoutStaus}
)(ProductTableComponent);

export default productTableContainer;
