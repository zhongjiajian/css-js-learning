var gulp = require('gulp'),
  connect = require('gulp-connect');
const del = require('del');
const path = require('path');
const {
  exec
} = require('child_process');
const { stdout } = require('process');
gulp.task('connect', function() {
  connect.server({
    root:"dist",
    livereload: true,
    host:"::",
    port:8000,
    // https: true
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

exec("open http://localhost:8000",(err,stdout,stderr)=>{
  if(err) console.log(err);
  stdout && console.log('stdout:',stdout);
  stderr && console.log('stderr:',stderr);
})



