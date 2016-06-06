/**
 * The root level reducer for the app.
 * @module reducer
 **/

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

/**
 * app state starts as an empty object
 * @const
 */
export const DEFAULT_STATE = {};

/**
 * The primary reducer for the app-specific branch of state. It updates the
 * `state.app` sub-tree
 *
 * @param {Object} state
 * @param {ReduxAction} action
 * @return {Object}
 */
export function app(state=DEFAULT_STATE, action={}) {
	return state;
}

const routing = routerReducer;

const reducer = combineReducers({
	app,
	routing
});

export default reducer;

