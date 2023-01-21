const path = require('path');
const webpack = require('webpack');
const devMode = process.env.NODE_ENV !== "production";

const libName = "VECTOR2";

const DEFAULT = {
	resolve: {
		extensions: ['*', '.js'],
		fallback: {
			"fs": false,
			"url": false,
			"tls": false,
			"net": false,
			"path": false,
			"zlib": false,
			"http": false,
			"https": false,
			"stream": false,
			"crypto": false,
			"assert": false,
			"os": false,
		},
	},
	entry: {
		"cjs/index": "./lib/cjs/index.js",
		"esm/index": "./lib/esm/index.js",
		"min/esm/index.min": "./lib/esm/index.mjs",
		"min/cjs/index.min": "./lib/cjs/index.js",
	},
	output:{
		path: path.resolve(__dirname, './lib/dist'),
		publicPath: '/',
		filename: "[name].js",
		globalObject: 'this',
		library: {
			name: libName,
			type: "umd"
		},
	},	
	mode: "production",
	module:{
		rules:[
			{
				test:/\.(js|jsx|mjs)/, 
				exclude: /node_modules/, 
				use:{ loader:"babel-loader" } 
			},
		],
	},
	plugins: [],
};


var configDev = {
	resolve: DEFAULT.resolve,
	entry: {
	"index": "./lib/cjs/index.js",
	// "cjs/index": "./lib/cjs/index.js",
	// "esm/index": "./lib/esm/index.mjs",
	},
	output:{
		path: path.resolve(__dirname, './lib/umd'),
		publicPath: '/',
		filename: "[name].dev.js",
		globalObject: 'this',
		library: {
			name: libName,
			type: "umd"
		},
	},	
	mode: "development",
	module: DEFAULT.module,
	plugins: DEFAULT.plugins,
};

var configMin = {
	resolve: DEFAULT.resolve,
	entry: {
		"index": "./lib/cjs/index.js",
	// "cjs/index": "./lib/cjs/index.js",
	// "esm/index": "./lib/esm/index.mjs",
	},
	output:{
		path: path.resolve(__dirname, './lib/umd'),
		publicPath: '/',
		filename: "[name].min.js",
		globalObject: 'this',
		library: {
			name: libName,
			type: "umd"
		},
	},	
	mode: "production",
	module: DEFAULT.module,
	plugins: DEFAULT.plugins,
};

module.exports = [
	configDev, configMin
];