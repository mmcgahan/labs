/**
 * The root level router for the app.
 * Future: load routes dynamically
 * @see {@link https://github.com/rackt/react-router/blob/master/docs/guides/advanced/DynamicRouting.md} for more info
 * @module routes
 **/
import { AppContainer } from 'react-hot-loader';
import Root from './containers/root.jsx';
import Error404 from './components/Error404.jsx';

// Assemble all feature routes here
const routes = {
	path: '/',
	component: Root,
	childRoutes: [
		{
			path: '*',
			component: Error404,
			status: 404
		}
	],
	indexRoute: { component: require('./containers/home').default },
};

/** A complete `routes` object from all features **/
export default routes;

