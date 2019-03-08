const { src, dest, series, parallel } = require('gulp'); 
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const clean = require('gulp-clean'); 
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const log = require('gulplog');
const insert = require('gulp-insert');


function clear(){
    return src('dist/')
        .pipe(clean());
}

function build(){
    return src('src/**/*.js')
        .pipe(babel())
        .pipe(dest('dist/part/'))
}

function jsBundle(){
    return src('dist/part/**/*.js')
        .pipe(concat('frontplaster.js'))
        .pipe(dest('dist/'))
}

function jsTestBundle(){
    return src('dist/frontplaster.js')
        .pipe(dest('test/dist'))
        .pipe(insert.append('\n exports.FrontPlaster = FrontPlaster;'))
        .pipe(dest('test/'))
}

function jsMinify(){
    return src('dist/*.js')
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest('dist/'))
}

function mochaTest() {
    return gulp.src(['test/*.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', log.error);
}

function watchMochaTest() {
    gulp.watch(['test/**'], gulp.series(mochaTest));
}

function watchMochaSrc(){
    gulp.watch(['src/**'], gulp.series(clear, build, jsBundle, jsTestBundle)); 
}

  
exports.build = build;
exports.minify = series(clear, build, jsBundle, jsMinify);
exports.test = series(mochaTest);
exports.watch = parallel(watchMochaTest, watchMochaSrc);
exports.default = series(clear, build, jsBundle);