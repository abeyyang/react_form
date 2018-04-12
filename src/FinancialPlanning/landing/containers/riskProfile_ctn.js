import { connect } from 'react-redux';
import riskProfile from '../components/riskProfile';
import {initDashboardData,updateDashboardFNAData,initDashboardFNAData,initInvolvedPartyDetail,initAssetsMix} from '../actions/landing_act';

const mapStateToProps = (state) => ({
    rtqResult: state.landing.rtqResult,
    fnaResult: state.landing.fnaResult,
    keResult: state.landing.keResult,
    keQuestionaire : state.landing.keQuestionaire,
    lastDateTime:state.landing.lastDateTime,
    customerInfo:state.landing.customerInfo,
    depositeConstentCode:state.landing.depositeConstentCode,
    session:state.session,
    assetsMixResult:state.landing.assetsMixResult,
    invHoldingsResult:state.landing.invHoldingsResult
});

const riskProfileContainer = connect(
    mapStateToProps,
    {initDashboardData,updateDashboardFNAData,initDashboardFNAData,initInvolvedPartyDetail,initAssetsMix}
)(riskProfile);

export default riskProfileContainer;
