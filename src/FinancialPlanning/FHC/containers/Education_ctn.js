import { connect } from 'react-redux';
import Education from '../components/Education';
import {commonUpdateInputValue} from '../actions/fhc_act';

const mapStateToProps = (state) => ({
    ...state.fhc.formData.education,
    hasChildUnder18:state.fhc.formData.aboutMe.hasChildUnder18
});

const EducationCtn = connect(
    mapStateToProps,
    {commonUpdateInputValue}
)(Education);

export default EducationCtn;