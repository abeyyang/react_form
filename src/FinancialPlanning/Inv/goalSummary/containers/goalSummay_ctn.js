import {connect} from 'react-redux';
import productSummaryPanel from '../components/goalSummaryPanel';
import {getPreviewProductData,addMoreProduct,removeProduct,removeInvProduct,recordSolutionDetail,recordFinaliseGoalDetail,saveMoreDiscussedProductToState} from '../actions/goalSummary_act';

const mapStateToProps = (state)=>({
    alternativeProductList:state.invGS.discussReducer.alternativeProductList,
    productCardList:state.invGS.invProductReducer.productCardList,
    productList:state.invGS.invProductReducer.productList,
    resParams:state.invGS.discussReducer.resParams,
    assetsHolding:state.invGS.invProductReducer.assetsHolding,
    moreProducts:state.invGS.discussReducer.moreProducts,
    recordSuccessFlag:state.invGS.invProductReducer.recordSuccessFlag,
    validationDetails:state.invGS.invProductReducer.validationDetails
})

const goalSummaryContainer = connect(
    mapStateToProps,
    {getPreviewProductData,addMoreProduct,removeProduct,removeInvProduct,recordSolutionDetail,recordFinaliseGoalDetail,saveMoreDiscussedProductToState}
)(productSummaryPanel);

export default goalSummaryContainer;