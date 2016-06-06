/**
 * Webpack configuration for server files, target: `node`
 *
 * This file does not get transpiled - use syntax supported natively by NodeJS
 */
const fs = require('fs');
const path = require('path');
const APP_PATH = path.resolve(__dirname, 'src');
const SERVER_PATH = path.resolve(__dirname, 'server');

const { resolve, output } = require('./webpack.config');

var nodeModules = {};
fs.readdirSync('node_modules')
	.filter(filename => ['.bin'].indexOf(filename) === -1)
	.forEach(filename => {
		nodeModules[filename] = `commonjs ${filename}`;
	});

const serverConfig = {
	entry: {
		index: [path.resolve(__dirname, 'index.js')]
	},
	devtool: 'source-map',
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel',
		}]
	},
	target: 'node',
	externals: nodeModules,
	resolve,
	output,
};

module.exports = serverConfig;

