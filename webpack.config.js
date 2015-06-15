var webpack = require('gulp-webpack');
var version = require('./package.json').version;

module.exports = {
	entry: './src/tsuka',
	output: {
		path: __dirname + '/build',
		filename: 'tsuka.js',
		library: 'tsuka',
		libraryTarget: 'umd'
	}
};