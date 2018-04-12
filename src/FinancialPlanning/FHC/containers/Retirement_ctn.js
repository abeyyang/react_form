import { connect } from 'react-redux';
import Retirement from '../components/Retirement';
import {commonUpdateInputValue,changePostRetireYear,changeTargetRetireAge} from '../actions/fhc_act';

const mapStateToProps = (state) => ({
    ...state.fhc.formData.retirement,
    customerInfo:state.landing.customerInfo
});

const RetirementCtn = connect(
    mapStateToProps,
    {commonUpdateInputValue,changePostRetireYear,changeTargetRetireAge}
)(Retirement);

export default RetirementCtn;