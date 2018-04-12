import { connect } from 'react-redux';
import SIJPS from '../components/productionSelectionPanel/productionSelection';
import {retrieveGoalSolutionDetailforSIJPS,renderSIJPS,addOrDeleteInsProduct,addOrDeleteDiscussedInsProduct,reviewInsProduct} from '../actions/sij_ps_act';

const mapStateToProps = (state) => ({
    goalSolutionDetail: state.sijPS.goalSolutionDetail,
    productSearchResult: state.sijPS.productSearchResult,
    goProductSummaryFlag: state.sijPS.goProductSummaryFlag
    
});

const sijProductSearchContainer = connect(
    mapStateToProps,
    {retrieveGoalSolutionDetailforSIJPS,renderSIJPS,addOrDeleteInsProduct,addOrDeleteDiscussedInsProduct,reviewInsProduct}
)(SIJPS);

export default sijProductSearchContainer;


