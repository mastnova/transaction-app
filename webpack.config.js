const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	context: __dirname + "/app",
	entry: {
		main: './app.js',
	},
	output: {
		path: __dirname + "/dist",
		filename: "[name].js"
	},

	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /\/node_modules\//,
			loader: 'babel?presets[]=es2015'
		}, {
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
		}
		],
	},

	plugins: [
		new ExtractTextPlugin("[name].css")
	]
};

