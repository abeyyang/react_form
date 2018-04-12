import { connect } from 'react-redux';
import login from '../components/login';

const mapStateToProps = (state) => ({
});

const loginContainer = connect(
    mapStateToProps,
    {}
)(login);

export default loginContainer;
