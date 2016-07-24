/*jshint node:true */
/*global require*/

var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    babel       = require('babelify'),
    watchify    = require('watchify'),
    buffer      = require('vinyl-buffer'),
    sourcemaps  = require('gulp-sourcemaps'),
    sass        = require('gulp-sass');


gulp.task('browserify', function () {
    "use strict";

    var bundler;

    bundler = watchify(
        browserify(
            './index.js',
            {debug: true}
        )
        .transform(babel)
    );

    return bundler.bundle()
        .on('error', function(err) { console.error(err); this.emit('end'); })
          .pipe(source('build.js'))
          .pipe(buffer())
          .pipe(sourcemaps.init({ loadMaps: true }))
          .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest('./build'));
});


gulp.task('sass', function () {
    return gulp.src('./sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('default', ['browserify', 'sass']);

gulp.task('watch', function () {
    "use strict";

    gulp.watch('*.js', ['browserify']);
    gulp.watch('sass/*.scss', ['sass']);
} );
