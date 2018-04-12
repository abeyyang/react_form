import { connect } from 'react-redux';
import CurrencySelect from '../components/currencySelect';
import {retrieveFxrateByCurrency} from '../actions/financialProfile_act';

const mapStateToProps = (state) => ({
    routing: state.routing
});

const mapDispatchToProps = (dispatch) => ({

});

const financialProfileContainer = connect(
  mapStateToProps,
 {retrieveFxrateByCurrency}
)(CurrencySelect);

export default financialProfileContainer;
