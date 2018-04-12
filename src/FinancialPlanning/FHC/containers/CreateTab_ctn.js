import { connect } from 'react-redux';
import CreateTab from '../components/CreateTab';
import {fhcCalculate, fhcSaveAndContinue,createFormExpandAll} from '../actions/fhc_act';
import { Validated, ValidateTypes, ValidationController } from 'CommonUI/validation/index';

const mapStateToProps = (state) => ({
    alreadyCalculated:state.fhc.formData.alreadyCalculated,
    hasChildUnder18:state.fhc.formData.aboutMe.hasChildUnder18
});

const CreateTab_ctn = connect(
    mapStateToProps,
    {fhcCalculate, fhcSaveAndContinue,createFormExpandAll}
)(CreateTab);

export default ValidationController(CreateTab_ctn);
