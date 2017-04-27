var gulp = require('gulp');
var sass = require('gulp-sass');
gulp.task('hello',function(){
  console.log('Hello ael')
})
gulp.task('sass', function() {

  return gulp.src('./scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
})


gulp.task('watch', function(){
  gulp.watch('./scss/style.scss', ['sass']);
  // Other watchers
})
