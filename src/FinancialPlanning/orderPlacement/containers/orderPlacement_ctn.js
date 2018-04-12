import {connect} from 'react-redux';
import {initOrderPlacementPage} from '../actions/orderPlacement_act';
import orderPlacementPage from '../components/orderPlacement';

const mapStateToProps = (state) => ({
     orderPlacementList: state.orderPlacement.orderPlacementList
});

const orderPlacementContainer = connect(
    mapStateToProps,
    {initOrderPlacementPage}
)(orderPlacementPage);

export default orderPlacementContainer;