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
    return gulp.src('./source/ts/**/**.ts')
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest('./temp/source/js'));
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
        .pipe(ts(tsTestProject))
        .js.pipe(gulp.dest('./temp/test/'));
});
gulp.task('default', ['lint', 'tsc', 'tsc-tests']);