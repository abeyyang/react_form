import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { autoRehydrate } from 'redux-persist';
import RootSaga from './sagas';
import createReducer from './common/reducers';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore (initialState = {}) {
    const store = createStore(
        createReducer(),
        initialState,
       
        compose(
            applyMiddleware(sagaMiddleware),
            autoRehydrate(),
             //for Redux Dev Tool plugin in chrome
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
    sagaMiddleware.run(RootSaga);
    store.asyncReducers = {};
    return store;
}
