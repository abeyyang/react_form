import { connect } from 'react-redux';
import demoPanel from '../components/demoPanel';
import {initDemoFlowData } from '../actions/flowDemo_act';

const mapStateToProps = (state) => ({
    rtqResult: state.demoFlow.rtqResult,
    // templateNumber: state.demoFlow.templateNumber,
    errorCodes: state.demoFlow.errorCodes
});

const flowDemeContainer = connect(
    mapStateToProps,
    {initDemoFlowData}
)(demoPanel);

export default flowDemeContainer;
