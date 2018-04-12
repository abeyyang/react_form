import { connect } from 'react-redux';

import {
    changeAccount,
    fetchAccountList,
    updateAccountList,
    showApiCallingError,
    showApiFatalError
} from 'SFP/common/actions/app';
import { sfpLogin, updateSession, gatewayLogin, gatewayLogout } from 'SFP/common/actions/session';
import { navigate } from 'SFP/common/actions/nav';
import App from 'SFP/common/components/app';

const mapStateToProps = (state) => ({
    // accounts: state.app.accounts,
    isLoading: state.app.isLoading,
    session: state.session,
    sessionA: state.app.session,
    stickyHeight: state.nav.height,
    isApiError:state.app.isApiError,
    errorInfo:state.app.errorInfo,
    fatalErrorHide: state.app.fatalErrorHide
});

const AppContainer = connect(
    mapStateToProps,
    { changeAccount, fetchAccountList, updateAccountList,showApiCallingError, showApiFatalError, 
        sfpLogin, updateSession, gatewayLogin, gatewayLogout, navigate }
)(App);

export default AppContainer;
