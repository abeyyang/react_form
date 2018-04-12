import { connect } from 'react-redux';
import meetingSummary from '../components/meetingSummary/meetingSummary_cpn';
import {initInvolvedPartyDetail,getHistoricalRecords,meetingSummaryFNAData,retrieveGoalList,retrieveGoalDetail} from '../actions/meetingSummy_act';

const mapStateToProps = (state) => ({
    session:state.session,
    customerInfo:state.meetingSummy.customerInfo,
    historyRecords:state.meetingSummy.historyRecords,
    fnaResult:state.meetingSummy.fnaResult,
    meetingSummaryRetrieveGoalSummarylist:state.meetingSummy.meetingSummaryRetrieveGoalSummarylist,
    meetingSummaryretrieveGoalDetails:state.meetingSummy.meetingSummaryretrieveGoalDetails,
    
});

const meetingSummaryContainer = connect(
    mapStateToProps,
    {initInvolvedPartyDetail,getHistoricalRecords,meetingSummaryFNAData,retrieveGoalList,retrieveGoalDetail}
)(meetingSummary);

export default meetingSummaryContainer;

