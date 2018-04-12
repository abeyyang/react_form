import React from 'react';
import 'babel-polyfill';
import 'whatwg-fetch';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, hashHistory } from 'react-router';
import { supportsHistory } from 'history/lib/DOMUtils';
import { syncHistoryWithStore } from 'react-router-redux';
import { addLocaleData } from 'react-intl';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';
import configureStore from './store';
import createRoutes from './routes';
import IntlProvider from './common/containers/IntlProvider';
import 'wealth/lib/web/styles/common.scss';
import './common/styles/gsp.css';
import './common/styles/reset.css';
import './common/styles/common.css';
import { ValidationProvider } from './common/components/validation';
import { persistStore, autoRehydrate } from 'redux-persist'
import { asyncSessionStorage } from "redux-persist/storages"
import { LAUNCH_PARAM_STR } from './constant';

console.log(ValidationProvider, '=======================');
function handRouteUpdate () {
    window.scrollTo(0, 0);
}
const launchParamStr = window.location.search.substr("?".length)
if (launchParamStr) {
    console.log("++++Test: launchParamStr=", launchParamStr);
    sessionStorage.clear()
    sessionStorage.setItem(LAUNCH_PARAM_STR, launchParamStr)
} else {
    console.log("++++Test: launchParamStr is null.");
}

function runApp () {
    const target = document.getElementById('app');

    const initialState = {};
    
    const historyStrategy = supportsHistory() ? browserHistory : hashHistory;

    const store = configureStore(initialState, historyStrategy);

    const history = syncHistoryWithStore(historyStrategy, store);

    addLocaleData([...zh,...en]);
	
    const app = (
        <Provider store={store}>
            <ValidationProvider>
                <IntlProvider>
                    <Router history={history} routes={createRoutes(store)} onUpdate={handRouteUpdate} />
                </IntlProvider>
            </ValidationProvider>
        </Provider>
    );
    persistStore(store, {
        storage: asyncSessionStorage,
        // whitelist: ["session"]
        blacklist: ["errors"]
    }, ()=>{
        render(app, target);
    })
}

if (!global.Intl) {
    require.ensure([
        'intl'
    ], (require) => {
        require('intl');
        runApp();
    });
} else {
    runApp();
}
