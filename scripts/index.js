const {
    src,
    parallel,
    series
} = require('gulp');
var webserver = require('gulp-webserver');


module.export = {
    serve: series(parallel(
        src('demos')
            .pipe(webserver({
                livereload: true,
                directoryListing: true,
                open: true,
                port: 8811
            }))
    ))
}