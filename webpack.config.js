const path = require('path');
const APP_PATH = path.resolve(__dirname, 'src');

const config = {
	entry: {
		// client-side assets *only*
		client: [path.resolve(APP_PATH, 'client.jsx')]
	},
	devtool: 'source-map',
	module: {
		loaders: [{
			test: /\.jsx?$/,
			include: [APP_PATH],
			loader: 'babel'
		}]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']  // module name extensions
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',  // map the `entry` key name to the output file
		publicPath: '//0.0.0.0:1338/'
	}
};

module.exports = config;
