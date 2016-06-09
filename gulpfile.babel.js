'use strict';
var fs = require("fs");
var gulp = require('gulp');
var browserify = require("browserify");
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

import OclParserGenerator from './lib/parser/oclParserGenerator';

gulp.task('build', () => {
    OclParserGenerator.generate();

    return browserify("./lib/oclEngine.js")
        .transform("babelify")
        .bundle()
        .pipe(source('parse.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename('ocl.min.js'))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('build:examples', () => {
    return browserify("./examples/examples.js")
        .transform("babelify")
        .bundle()
        .pipe(source('parse.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename('examples.min.js'))
        .pipe(gulp.dest('./examples/'))
});