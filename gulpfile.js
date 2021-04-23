var gulp = require('gulp'),
  connect = require('gulp-connect');
const del = require('del');
const path = require('path');
 
gulp.task('connect', function() {
  connect.server({
    root:"dist",
    livereload: true,
    port:8000
  });
});
 
gulp.task('html', function () {
 return gulp.src('./demos/**')
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  gulp.watch(['./demos/**'], gulp.series('html'));
});
 
gulp.task('default', gulp.series(() =>
del([path.resolve('./dist')], {
  force: true
}),gulp.parallel('connect', 'html', 'watch')));