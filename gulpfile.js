var gulp = require('gulp');
gulp.task('default', function() {
    console.log('Hello Gulp!');
});
var tslint = require('gulp-tslint');

gulp.task("lint", () =>
    gulp.src(['src/source/ts/**/**.ts', , 'src/test/**/**.test.ts'])
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

    return gulp.src('src/source/ts/*.ts')
        .pipe(tsProject())
        .js.pipe(gulp.dest('src/temp/source/js'));
});

var tsTestProject = ts.createProject({
    removeComments: true,
    noImplicitAny: true,
    target: 'ES3',
    module: 'commonjs',
    declarationFiles: false
});
gulp.task('tsc-tests', function() {
    return gulp.src('src/test/ts/**/**.test.ts')
        .pipe(tsTestProject())
        .js.pipe(gulp.dest('src/temp/test/'));
});
//https://csspod.com/advanced-tips-for-using-gulp-js/
var browserify = require('browserify'),
    source = require('vinyl-source-stream'), //转换为vinyl 
    uglify = require('gulp-uglify'), //压缩
    streamify = require('gulp-streamify'),
    sourcemaps = require('gulp-sourcemaps'); //源码转换
// var browserified = transform(function(filename) {
//     var b = browserify({ entries: filename, debug: true });
//     return b.bundle();
// });

// gulp.task('browserify', function() {
//     return browserify('src/temp/source/js/*.js')
//         .bundle()
//         //Pass desired output filename to vinyl-source-stream
//         .pipe(source('bundle.js'))
//         // Start piping stream to tasks!
//         .pipe(gulp.dest('public/build/'));
// });
// gulp.task('bundle-js', ['tsc'], function() {
//     return gulp.src('src/temp/source/js/*.js')
//         .pipe(sourcemaps.init({ loadMaps: true }))
//         .pipe(browserified)
//         .pipe(uglify())
//         .pipe(sourcemaps.write('src'))
//         .pipe(gulp.dest('src/dest/source/js/'));
// });
gulp.task('browserify1', function() {
    console.log(12313);
    return browserify('src/temp/source/js/main.js').bundle()
        .pipe(source('1.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('src/brw/'))
});
// gulp.task('browserify1', function() {
//     console.log(12313);
//     return gulp.src('src/temp/source/js/*.js')
//         .pipe(browserify('src/temp/source/js/main.js')).bundle()
//         .pipe(source('src/temp/source/js/main.js'))
//         .pipe(streamify(uglify()))
//         .pipe(gulp.dest('src/brw/'))
// });
var runSequence = require('run-sequence');
// gulp.task('default', ['lint', 'tsc', 'tsc-tests', 'bundle-js']);
gulp.task('default', function(cb) {
    runSequence(
        'lint', ['tsc', 'tsc-tests'],
        'browserify1'
    );
});