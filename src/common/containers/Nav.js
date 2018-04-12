import { connect } from 'react-redux';
import Nav from '../components/nav';
import {
    updateStickyHeight
} from '../actions/nav';

const mapStateToProps = (state) => ({
    children: state.nav.children,
    errors:state.nav.errors,
    stickyHeight: state.nav.height
});

const mapDispatchToProps = (dispatch) => ({
    updateStickyHeight: (height) => {
        dispatch(updateStickyHeight(height));
    }
});

const NavContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Nav);

export default NavContainer;
