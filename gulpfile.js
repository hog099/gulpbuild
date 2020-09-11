const gulp = require('gulp')
const browserSync = require('browser-sync')

const minify = require("gulp-minify");
const minifyCSS = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const concat = require('gulp-concat');

// BUILDAR PROJETO   
gulp.task('build', async function () {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'))

    gulp.src('./src/**/*.js', { allowEmpty: true })
        .pipe(minify({ noSource: true }))
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest('./dist/assets/js'))

    gulp.src(['./src/assets/images'])
        .pipe(gulp.dest('./dist/assets'));

    gulp.src(['./src/assets/**/*.css'])
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/assets/css'))
});


// HOT RELOAD OBSERVABLE
gulp.task('watch', function () {
    gulp.watch('src/*.html', ['./dist']);
});



// RODAR SERVER
gulp.task('server', function () {
    browserSync({
        server: {
            baseDir: './dist'
        }
    });
})

gulp.task('browser-sync', function () {
    var files = [
        'app/*.html',
        'app/*.css',
        'app/*.png',
        'app/*.js'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './dist'
        }
    });
});


