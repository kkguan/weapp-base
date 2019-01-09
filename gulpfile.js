const gulp = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const base64 = require('gulp-base64');
const watch = require('gulp-watch');

const folders = [
    './pages/**/*.less',
    './components/**/*.less'
];

gulp.task('compile-less', () => {
    return gulp.src(folders)
        .pipe(watch(folders))
        .pipe(less())
        .pipe(base64({
            extensions: ['svg', 'png', /\.jpg#datauri$/i],
        }))
        .pipe(rename((path) => {
            path.extname = '.wxss';
        }))
        .pipe(gulp.dest((file) => { return file.base }))
})

gulp.task('default', () => {
    gulp.watch(folders, ['compile-less'], () => {
        console.log('watch is running');
    })
})

