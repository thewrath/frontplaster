const { src, dest, series } = require('gulp'); 
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const clean = require('gulp-clean'); 

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

function jsMinify(){
    return src('dist/*.js')
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest('dist/'))
}

  
exports.build = build;
exports.minify = series(clear, build, jsBundle, jsMinify);
exports.default = series(clear, build, jsBundle, );