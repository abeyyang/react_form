import { connect } from 'react-redux';
import Result from '../components/Result';
import {commonUpdateInputValue} from '../actions/fhc_act';
import { Validated, ValidateTypes, ValidationController } from 'CommonUI/validation/index';

const mapStateToProps = (state) => ({
    ...state.fhc.formData.result
});

const ResultCtn = connect(
    mapStateToProps,
    {commonUpdateInputValue}
)(Result);

export default ValidationController(ResultCtn);
