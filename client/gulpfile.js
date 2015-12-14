var gulp = require("gulp");
var concat = require("gulp-concat");
var clean = require("gulp-clean");

var paths = {
    "dist": "../build",
    "vendor": [ 'bower_components/angular/angular.js' ],
    "scripts": ['app/**/*.js'],
    "fonts": ['app-data/fonts/*.*'],
    "templates": ['app/**/*.html'],
    "styles": ['app/**/*.scss','vendor/angular-bootstrap-colorpicker/css/*.css']
}

gulp.task("watch", function () {
    gulp.watch('app/**/*.js', ['scripts']);
    gulp.watch('app/**/*.html', ['scripts'])
    gulp.watch('app/**/*.scss', ['styles']);
})

gulp.task("default", ["clean"], function () {
    gulp.start("scripts", "vendor", "styles", "fonts");
})

gulp.task("clean", function () {
    return gulp.src(paths.dist, {read: false})
        .pipe(clean({force: true}));
})

gulp.task("vendor", function () {
    gulp.src(paths.vendor)
        .pipe(concat("vendor.js"))
        .pipe(gulp.dest(paths.dist + "js/"));
});

gulp.task("scripts", function () {
});

gulp.task("styles", function () {
    gulp.src(paths.styles)
        .pipe(concat("base.css"))
        .pipe(gulp.dest(paths.dist + "css/"))
})

gulp.task("fonts", function () {
    gulp.src(paths.fonts).
        pipe(gulp.dest(paths.dist + "fonts/"))
})
