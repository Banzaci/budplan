import React from 'react';
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from './reducers/';

const rootReducer = combineReducers({
    reducers
});

const configureStore = () => createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default configureStore;
