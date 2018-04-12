import { connect } from 'react-redux';
import GrowYourWealth from '../components/GrowYourWealth';
import {commonUpdateInputValue} from '../actions/fhc_act';

const mapStateToProps = (state) => ({
    ...state.fhc.formData.growYourWealth
});

const GrowYourWealthCtn = connect(
    mapStateToProps,
    {commonUpdateInputValue}
)(GrowYourWealth);

export default GrowYourWealthCtn;
