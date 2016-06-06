import Rx from 'rx';
import Boom from 'boom';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import { observableFromStore } from 'redux-rx';

import * as serverUtils from '../server/serverUtils';
import routes from './routes';
import createStore from './store/createStore';
import reducer from './reducer';
import Dom from './components/dom';

/**
 * An async module that renders the full app markup for a particular URL/location
 * using [ReactDOMServer]{@link https://facebook.github.io/react/docs/top-level-api.html#reactdomserver}
 *
 * @module ServerRender
 */
const match$ = Rx.Observable.fromNodeCallback(match);

/**
 * Using the current route information and Redux store, render the app to an
 * HTML string and server response code.
 *
 * There are three parts to the render:
 *
 * 1. `appMarkup`, which corresponds to the markup that will be rendered
 * on the client by React. This string is built before the full markup because
 * it sets the data needed by other parts of the DOM, such as `<head>`.
 * 2. `htmlMarkup`, which wraps `appMarkup` with the remaining DOM markup.
 * 3. `doctype`, which is just the doctype element that is a sibling of `<html>`
 *
 * @param {Object} renderProps
 * @param {ReduxStore} store the store containing the initial state of the app
 * @return {Object} the statusCode and result used by Hapi's `reply` API
 *   {@link http://hapijs.com/api#replyerr-result}
 */
function renderAppResult(renderProps, store) {
	// pre-render the app-specific markup, this is the string of markup that will
	// be managed by React on the client.
	//
	// **IMPORTANT**: this string is built separately from `<Dom />` because it
	// initializes page-specific state that `<Dom />` needs to render, e.g.
	// `<head>` contents
	const initialState = store.getState();
	const appMarkup = ReactDOMServer.renderToString(
		<Provider store={store}>
			<RouterContext {...renderProps} />
		</Provider>
	);

	// all the data for the full `<html>` element has been initialized by the app
	// so go ahead and assemble the full response body
	const doctype = '<!DOCTYPE html>';
	const htmlMarkup = ReactDOMServer.renderToString(
		<Dom initialState={initialState} appMarkup={appMarkup} CONFIG={global.CONFIG}/>
	);
	const result = `${doctype}${htmlMarkup}`;
	const statusCode = renderProps.routes.pop().statusCode || 200;

	return {
		statusCode,
		result
	};
}

/**
 * From the renderProps provided by React Router's `match`, return an observable
 * that will deliver the rendered app as an HTML string and server response code
 *
 * @param matchCallbackArgs {Array} redirectLocation(ignored) and renderProps
 * @return {Observable}
 */
const renderRequest$ = request => {
	const {
		url,
		info,
		server,
	} = request;
	const location = url.path;
	const store = createStore(reducer);

	return match$({ location, routes })
		.do(([redirectLocation, renderProps]) => {
			if (!redirectLocation && !renderProps) {
				throw Boom.notFound();
			}
		})
		.map(([redirectLocation, renderProps]) =>
			renderAppResult(renderProps, store)
		);
};

/**
 * for the given location, return an observable that will deliver the rendered
 * HTML string
 */
export default function getRender$(request, config) {
	const request$ = Rx.Observable.just(request);
	return request$
		.flatMap(renderRequest$);
}

