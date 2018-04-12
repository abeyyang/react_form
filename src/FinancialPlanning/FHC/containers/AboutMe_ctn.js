import { connect } from 'react-redux';
import AboutMe from '../components/AboutMe';
import {changeChildrenNo,commonUpdateInputValue,changeChildrenAge,changeHasChildUnder18,changeUniversityCountryCde,fhcCalculate} from '../actions/fhc_act';
import { Validated, ValidateTypes, ValidationController } from 'CommonUI/validation/index';

const mapStateToProps = (state) => ({
    ...state.fhc.formData.aboutMe,
    customerInfo:state.landing.customerInfo
});

const AboutMe_ctn = connect(
    mapStateToProps,
    {changeChildrenNo,commonUpdateInputValue,changeChildrenAge,changeHasChildUnder18,changeUniversityCountryCde}
)(AboutMe);

export default ValidationController(AboutMe_ctn);
