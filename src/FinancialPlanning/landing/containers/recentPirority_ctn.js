import { connect } from 'react-redux';
import recentPlanMain from '../components/recentPlan/recentPlanMain/recentPlanMain_cpn';
import {retrieveGoalList,retrieveGoalDetail,recordGoalDetail,deleteGoalInformation} from '../actions/recentPirority_act';

const mapStateToProps = (state) => ({
    retrieveGoalSummarylist : state.recentPirority.retrieveGoalSummarylist,
    retrieveGoalDetailsView : state.recentPirority.retrieveGoalDetailsView,
    // recordGoalDetailsResponseView : state.recentPirority.recordGoalDetailsResponseView
    deleteGoalInformationResponseView : state.recentPirority.deleteGoalInformationResponseView
});

const recentPirorityContainer = connect(
    mapStateToProps,
    {retrieveGoalList,retrieveGoalDetail,recordGoalDetail,deleteGoalInformation}
)(recentPlanMain);

export default recentPirorityContainer;


