var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    htmlReplace = require('gulp-html-replace'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    cssmin = require('gulp-cssmin'),
    browserSync = require('browser-sync').create(),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass');

gulp.task('default', ['copy'], function () {
    gulp.start('build-img', 'usemin');
});

gulp.task('copy', ['clean'], function () {
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(clean());
});

gulp.task('build-img', function () {

    return gulp.src('dist/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('usemin', function () {
    return gulp.src('dist/**/*.html')
        .pipe(usemin({
            js: [uglify],
            css: [autoprefixer]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });
    gulp.watch('src/sass/**/*scss',['sass']);
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('sass',function(){
    return gulp.src('src/sass/estilos.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});