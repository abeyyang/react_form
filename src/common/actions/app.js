export const CHANGE_ACCOUNT = 'CHANGE_ACCOUNT';
export const UPDATE_ACCOUNT_LIST = 'UPDATE_ACCOUNT_LIST';
export const API_CALLING_ERROR = 'API_CALLING_ERROR';
export const API_FATAL_ERROR = 'API_FATAL_ERROR';
export const APP_LOADING = 'APP_LOADING';
export const APP_NOLOADING = 'APP_NOLOADING';

export const changeAccount = (account) => ({
    type: CHANGE_ACCOUNT,
    account
});

export const updateAccountList = () => ({
    type: UPDATE_ACCOUNT_LIST
});

export const showApiCallingError=(isApiError, errorInfo)=>({
    type: API_CALLING_ERROR,
    isApiError,
    errorInfo
})

export const showApiFatalError=(fatalErrorHide, errorInfo)=>({
    type: API_FATAL_ERROR,
    fatalErrorHide,
    errorInfo
})

export const showLoading = () => ({
    type: APP_LOADING
});

export const hideLoading = () => ({
    type: APP_NOLOADING
});

// Dummy logon
export const DUMMY_LOGIN = 'DUMMY_LOGIN';
export const DUMMY_LOGIN_SUCCESS = 'DUMMY_LOGIN_SUCCESS';
export const DUMMY_LOGIN_FAILURE = 'DUMMY_LOGIN_FAILURE';

export const dummyLogin = (account) => ({
    type: DUMMY_LOGIN,
    account
});
