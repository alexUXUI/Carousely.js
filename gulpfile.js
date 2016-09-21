`use strict`

const gulp = require('gulp')
const babel = require('gulp-babel')
constrequire("babel-polyfill");

gulp.task('default', () => {
  return gulp.src('./carousely.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'))
})
