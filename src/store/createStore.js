/**
 * A createStore function with middleware and other store enhancers applied
 * @module createStore
 */
import {
	applyMiddleware,
	createStore,
	compose
} from 'redux';

/**
 * **All** middleware gets added here
 * @const
 */
const appliedMiddleware = applyMiddleware(
	// middleware
);

/**
 * the `createStore` function that will inject all middleware for the app
 */
const finalCreateStore = compose(
	appliedMiddleware,
	typeof window !== 'undefined' && window.devToolsExtension ?
		window.devToolsExtension() : f => f
)(createStore);

export default finalCreateStore;

