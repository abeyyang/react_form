import {
    CHANGE_ACCOUNT,
    UPDATE_ACCOUNT_LIST,
    DUMMY_LOGIN,
    DUMMY_LOGIN_SUCCESS,
    DUMMY_LOGIN_FAILURE,
    API_CALLING_ERROR,
    API_FATAL_ERROR,
    APP_LOADING,
    APP_NOLOADING
} from 'SFP/common/actions/app';
// import {
//     FETCH_RISK_LEVEL,
//     UPDATE_RISK_LEVEL,
//     FETCH_CUSTOMER_ELIGIBILITY,
//     UPDATE_CUSTOMER_ELIGIBILITY
// } from '../actions/authorization';

const initialState = {
    accounts: {},
    currentInvestmentAccount: null,
    isLoading: false,
    session: null,
    riskLevel: null,
    isApiError: false,
    fatalErrorHide: true,
    errorInfo: null,
    customerEligibility: null
};

const checkAccountExist = (state, account) => {
    const accountList = state.accounts.investmentAccountList;
    if (accountList.length === 0) {
        return false;
    }
    let found = false;
    accountList.forEach((acc) => {
        if (acc.checksum === account) {
            found = true;
            return true;
        }
    });
    return found;
};

export const getValue = (name) => (state) => {
    return state.app[name];
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case APP_LOADING:
            return {...state, isLoading: true};
        case APP_NOLOADING:
            return {...state, isLoading: false};
        case CHANGE_ACCOUNT:
            if (action.hasOwnProperty('account') && checkAccountExist(state, action.account)) {
                return {
                    ...state,
                    currentInvestmentAccount: {
                        checksum: action.account
                    }
                };
            }
            return state;
        case UPDATE_ACCOUNT_LIST:
            if (action.hasOwnProperty('accounts')) {
                return {
                    ...state,
                    accounts: action.accounts,
                    currentInvestmentAccount: (action.accounts.investmentAccountList.length) ? { ...action.accounts.investmentAccountList[0] } : null
                };
            }
            return { ...state };
        case DUMMY_LOGIN:
            return { ...state, isLoading: true };
        case DUMMY_LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                session: {
                    ...action.session
                }
            };
        case DUMMY_LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                session: {}
            };
        // case FETCH_RISK_LEVEL:
        //     return { ...state };
        // case UPDATE_RISK_LEVEL:
        //     return { ...state, riskLevel: action.riskLevel };

        // case FETCH_CUSTOMER_ELIGIBILITY:
        //     return { ...state };

        // case UPDATE_CUSTOMER_ELIGIBILITY:
        //     return { ...state, customerEligibility: action.response.PAYLOAD };
            
        case API_CALLING_ERROR:
            return { ...state, isApiError: action.isApiError, errorInfo: action.errorInfo };
        case API_FATAL_ERROR:
            return { ...state, fatalErrorHide: action.fatalErrorHide, errorInfo: action.errorInfo }
        default:
            return state;
    }
};

export default reducer;
