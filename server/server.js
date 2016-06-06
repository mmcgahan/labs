import Boom from 'boom';
import Hapi from 'hapi';
import Inert from 'inert';

import getRender$ from '../src/server-render';
/**
 * server-starting function
 * @module server
 */
export default function server(config) {
	const server = new Hapi.Server();

	server.connection({
		host: '0.0.0.0',
		port: 1337
	});

	const plugins = [
		Inert,
	];

	server.register(plugins, (err) => {
		if (err) {
			throw err;
		}

		/**
		 * special route for root request for favicon
		 */
		server.route({
			method: 'GET',
			path: '/favicon.ico',
			handler: {
				file: 'assets/favicon.ico'
			}
		});

		/**
		 * Only one wildcard route for all application GET requests - exceptions are
		 * described in the routes above
		 */
		server.route({
			method: 'GET',
			path: '/{wild*}',
			handler: (request, reply) => {
				server.log(['request'], request.path);
				const render$ = getRender$(request, config);
				render$.subscribe(
					({ result, statusCode }) => reply(result).code(statusCode),
					(err) => { reply(Boom.badImplementation(err.message)); }
				);
			}
		});
	});

	server.start(err => {
		if (err) {
			throw err;
		}
		server.log(['start'], `Dev server is listening at ${server.info.uri}`);
	});
};

