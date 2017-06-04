var gulp = require('gulp');
gulp.task('default', function() {
    console.log('Hello Gulp!');
});
var tslint = require('gulp-tslint');

gulp.task("lint", () =>
    gulp.src(['./source/ts/**/**.ts', , './test/**/**.test.ts'])
    .pipe(tslint({
        formatter: "verbose"
    }))
    .pipe(tslint.report())
);

var ts = require('gulp-typescript');
var tsProject = ts.createProject({
    removeComments: true,
    noImplicitAny: true,
    target: 'ES3',
    module: 'commonjs',
    declarationFiles: false
});
gulp.task('tsc', function() {

    return gulp.src('src/source/**/*.ts')
        .pipe(tsProject())
        .js.pipe(gulp.dest('temp/source/js/'));
});
gulp.task('tsc2', function() {
    return gulp.src('src/source/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'output.js'
        }))
        .pipe(gulp.dest('temp/source/js/'));
});
var tsTestProject = ts.createProject({
    removeComments: true,
    noImplicitAny: true,
    target: 'ES3',
    module: 'commonjs',
    declarationFiles: false
});
gulp.task('tsc-tests', function() {
    return gulp.src('./test/ts/**/**.test.ts')
        .pipe(tsTestProject())
        .js.pipe(gulp.dest('./temp/test/'));
});
var browserify = require('browserify'),
    transform = require('vinyl-transform'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');
var browserified = transform(function(filename) {
    var b = browserify({ entries: filename, debug: true });
    return b.bundle();
});
gulp.task('bundle-js', function() {
    return gulp.src('./temp/source/js/main.js')
        .pipe(browserified)
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dest/source/js/'));
});
gulp.task('default', ['lint', 'tsc', 'tsc2', 'tsc-tests']);