var gulp = require('gulp'),
	hint = require('gulp-jshint'),
	// uglify = require('gulp-uglify'),
	del = require('del'),
	vpaths = require('vinyl-paths'),
  	connect = require('gulp-connect'),
	webpack = require('gulp-webpack'),
	//webpack = require('webpack'),
	// WebpackServer = require('webpack-dev-server'),
	webpackConfig = require('./webpack.config.js');

gulp.task('reload', function() {
	gulp.src(['test/**/*.html', 'test/**/*.js'])
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch(['src/mune.js'], ['reload']);
	gulp.watch(['test/**/*.html', 'test/**/*.js'], ['reload']);
});

gulp.task('connect', function() {
	connect.server({port: 8000, root: 'test', livereload: true});
});

gulp.task('default', ['connect', 'watch']);

gulp.task('clean', function() {
	gulp.src('build/**/*.*', {read: false})
		.pipe(vpaths(del));
});

gulp.task('build', ['clean'], function() {
	return gulp.src('src/entry.js')
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest('build'))
		.on('end', function() {
			gulp.src('build/tsuka.js')
				.pipe(hint())
				.pipe(gulp.dest('test/js'));
		});
});