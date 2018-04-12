import { connect } from 'react-redux';
import PageNav from '../components/pageNav';

const mapStateToProps = (state) => ({
    routing: state.routing
});

const mapDispatchToProps = (dispatch) => ({
    // fetchRiskLevel: () => {
    //     dispatch(fetchRiskLevel());
    // },
    // fetchCustomerEligibility: (inputedData) => {
    //     dispatch(fetchCustomerEligibility(inputedData));
    // },
    // updateInvestorCharacterization: () => {
    //     dispatch(updateInvestorCharacterization());
    // }
});

const NavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageNav);

export default NavContainer;
