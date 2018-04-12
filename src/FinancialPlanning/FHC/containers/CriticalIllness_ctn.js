import { connect } from 'react-redux';
import CriticalIllness from '../components/CriticalIllness';
import {commonUpdateInputValue} from '../actions/fhc_act';

const mapStateToProps = (state) => ({
    ...state.fhc.formData.criticalIllness
});

const CriticalIllnessCtn = connect(
    mapStateToProps,
    {commonUpdateInputValue}
)(CriticalIllness);

export default CriticalIllnessCtn;