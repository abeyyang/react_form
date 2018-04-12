import { connect } from 'react-redux';
import productSummaryPanel from '../components/productSummaryPanel';
import {retrieveGoalSolutionDetailforProdSumm,reviewInvestmentforProdSumm,recordGoalSolutionDetailforProdSumm} from '../actions/productSummary_act';

const mapStateToProps = (state) => ({
    // discussProductTableData:state,
    alternativeProductList:state.ProdSumm.discussProductReducer.alternativeProductList,
    productCardList:state.ProdSumm.invProductReducer.productCardList,
    insProductCardList:state.ProdSumm.insProductReducer.insProductCardList,
    financialGoal:state.ProdSumm.discussProductReducer.financialGoal,
    rtvGSResponse:state.ProdSumm.discussProductReducer.rtvGSResponse
});

const productSummary = connect(
    mapStateToProps,
    {retrieveGoalSolutionDetailforProdSumm,reviewInvestmentforProdSumm,recordGoalSolutionDetailforProdSumm}
)(productSummaryPanel);

export default productSummary;
