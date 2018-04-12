import { connect } from 'react-redux';
import landingPanel from '../components/index';
import {recordBaseSIJGoal} from '../actions/sij_act';
import {fhcInitCreateTab} from '../../FHC/actions/fhc_act';

const mapStateToProps = (state) => ({
    fnaResult: state.landing.fnaResult,
});

const landingContainer = connect(
    mapStateToProps,
    {recordBaseSIJGoal,fhcInitCreateTab}
)(landingPanel);

export default landingContainer;
