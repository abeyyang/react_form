import { connect } from 'react-redux';
import affordabilityCpn from '../components/affordability_cpn';
import {initAffordabilityData} from '../actions/affordability_act.js';
import {cleanError} from '../../../common/actions/nav';
//import {getRiskProfileResult} from '../actions/riskProfileQuest_act';
const mapStateToProps = (state) => ({
    affResult: state.affordability.affResult,
    session: state.session,
});

const riskProfileCpnContainer = connect(
    mapStateToProps,
    {initAffordabilityData,cleanError}
)(affordabilityCpn);

export default riskProfileCpnContainer;
