var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');/*https://www.npmjs.com/package/gulp-concat/*/

gulp.task('scripts', function() {
  return gulp.src('./public/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('hello',function(){
  console.log('Gulp initialize...')
})

gulp.task('sass', function() {

  return gulp.src('./scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
})


gulp.task('watch',['hello','sass','scripts'], function(){
  gulp.watch('./scss/style.scss', ['sass']);
  // Other watchers
})
