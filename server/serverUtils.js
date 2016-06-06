import Rx from 'rx';
import colors from 'colors';

/**
 * general Node-side utilities
 */

/**
 * utility to log errors and return a curried fallback value
 */
export const catchAndReturn$ = errorResponse => e => {
	console.log(colors.red(`Error: ${e.message}`));
	console.log(e.stack);
	return Rx.Observable.just(errorResponse || { error: e });
};
export function log(message, source) {
	console.log(colors.blue(`${source || 'message'}: ${message}`));
}

