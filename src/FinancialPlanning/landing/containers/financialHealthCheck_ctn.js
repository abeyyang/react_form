import { connect } from 'react-redux';
import financialHealthCheck from '../components/financialHealthCheck';
import {initFhcSummary} from '../actions/landing_act';
import {fhcInitViewRecordTab,receiveRecordDetial,savePriorityChanges} from '../../FHC/actions/fhc_act';

const mapStateToProps = (state) => ({
    result:state.landing.result,
    overlayData:state.landing.overlayData,
    fhcOverlayData:state.fhc.overlayData,
    financialFHcObj:state.landing.financialFHcObj,
    customerInfo:state.landing.customerInfo
});

const financialHealthCheckContainer = connect(
    mapStateToProps,
    {initFhcSummary,receiveRecordDetial,fhcInitViewRecordTab,savePriorityChanges}
)(financialHealthCheck);

export default financialHealthCheckContainer;
