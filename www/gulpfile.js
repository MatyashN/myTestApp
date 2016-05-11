var gulp = require('gulp'),
  wiredep = require('wiredep').stream,
  useref = require('gulp-useref'),
  gulpif = require('gulp-if'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-minify-css'),
  merge = require('gulp-merge-json'),
  less = require('gulp-less'),
  connect = require('gulp-connect');

// connect
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

// bower
gulp.task('bower', function () {
  return gulp.src('./app/index.html')
    .pipe(wiredep({
      directory : "app/bower_components"
    }))
    .pipe(gulp.dest('./app'));
});

//less
gulp.task('less' ,function(){
  return gulp.src('app/less/style.less')
    .pipe(less())
    .pipe(gulp.dest('app/css/'));
});

// build
gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

// json
gulp.task('json', function(){
  return gulp.src('app/*.json')
    .pipe(merge('data.json'))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

// watch
gulp.task('watch', function(){
  gulp.watch('app/less/*.less', ['less']);
  gulp.watch('app/css/*.css', ['html']);
  gulp.watch('app/js/*.js', ['html']);
  gulp.watch('app/*.html', ['html']);
  gulp.watch('app/*.json', ['json']);
});

// default
gulp.task('default', ['connect', 'less', 'html', 'json',  'watch']);


