var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean');


var concat = require('gulp-concat');/*https://www.npmjs.com/package/gulp-concat/*/

gulp.task('clean', function () {
  console.log('script deleted')
    return gulp.src('.public/js/all.js', {read: false})
        .pipe(clean());

})
gulp.task('scripts', function() {
  return gulp.src('./public/js/*.js')
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

gulp.task('sass2', function() {

  return gulp.src('./scss2/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
})



gulp.task('watch',['sass','sass2','clean','scripts'], function(){
  gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./public/js/*.js', ['clean','scripts']);
  // Other watchers
})
