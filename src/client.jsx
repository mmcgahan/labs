import React from 'react';
import ReactDOM from 'react-dom';
import {
	Router,
	browserHistory,
	match
} from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
import createStore from './store/createStore';
import reducer from './reducer';
import { syncHistoryWithStore } from 'react-router-redux';

const initialState = window.INITIAL_STATE;
const store = createStore(reducer, initialState);
const history = syncHistoryWithStore(browserHistory, store);

match({ history, routes }, (error, redirectLocation, renderProps) => {
	ReactDOM.render(
		<Provider store={store}>
			<Router {...renderProps } />
		</Provider>,
		document.getElementById('outlet')
	);
});

