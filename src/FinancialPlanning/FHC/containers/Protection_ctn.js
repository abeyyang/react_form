import { connect } from 'react-redux';
import Protection from '../components/Protection';
import {commonUpdateInputValue} from '../actions/fhc_act';

const mapStateToProps = (state) => ({
    ...state.fhc.formData.protection
});

const ProtectionCtn = connect(
    mapStateToProps,
    {commonUpdateInputValue}
)(Protection);

export default ProtectionCtn;