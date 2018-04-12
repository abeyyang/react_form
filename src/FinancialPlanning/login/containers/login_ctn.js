import { connect } from 'react-redux';
import login from '../components/login';
import { sfpLogin } from '../../../common/actions/session';

const mapStateToProps = (state) => ({
});

const loginContainer = connect(
    mapStateToProps,
    {sfpLogin}
)(login);

export default loginContainer;
