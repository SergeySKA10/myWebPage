'use strict';

const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    htmlmin = require('gulp-htmlmin'),
    webpack = require('webpack-stream');

const dist = './dist';

gulp.task('styles', function () {
    return gulp
        .src('src/assets/sass/**/*.scss')
        .pipe(sass({ style: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest(dist + '/assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('html', function () {
    return gulp
        .src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.stream());
});

gulp.task('icons', function () {
    return gulp
        .src('src/assets/icons/**/*')
        .pipe(gulp.dest(dist + '/assets/icons'))
        .pipe(browserSync.stream());
});

gulp.task('mailer', function () {
    return gulp.src('src/mailer/**/*').pipe(gulp.dest('dist/mailer'));
});

gulp.task('build-js', () => {
    return gulp
        .src('./src/js/index.js')
        .pipe(
            webpack({
                mode: 'development',
                output: {
                    filename: 'script.js',
                },
                watch: false,
                devtool: 'source-map',
                module: {
                    rules: [
                        {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                                loader: 'babel-loader',
                                options: {
                                    presets: [
                                        [
                                            '@babel/preset-env',
                                            {
                                                debug: true,
                                                corejs: 3,
                                                useBuiltIns: 'usage',
                                            },
                                        ],
                                    ],
                                },
                            },
                        },
                    ],
                },
            })
        )
        .pipe(gulp.dest(dist + '/js'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    browserSync.init({
        server: dist,
        port: 4000,
        notify: true,
    });

    gulp.watch('src/assets/sass/**/*.+(scss|css)', gulp.parallel('styles'));
    gulp.watch('src/*.html').on('change', gulp.parallel('html'));
    gulp.watch('src/assets/icons/**/*').on('all', gulp.parallel('icons'));
    // gulp.watch('src/assets/img/**/*').on('all', gulp.parallel('images'));
    gulp.watch('src/js/**/*').on('all', gulp.parallel('build'));
    gulp.watch('src/mailer/**/*').on('all', gulp.parallel('mailer'));
});

gulp.task(
    'build',
    gulp.parallel('build-js', 'styles', 'html', 'icons', 'mailer')
);

gulp.task('prod', () => {
    gulp.src('./src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(dist));
    gulp.src('./src/mailer/**/*').pipe(gulp.dest(dist + '/mailer'));
    gulp.src('./src/assets/icons/**/*.*').pipe(
        gulp.dest(dist + '/assets/icons')
    );

    gulp.src('./src/js/index.js')
        .pipe(
            webpack({
                mode: 'production',
                output: {
                    filename: 'script.js',
                },
                module: {
                    rules: [
                        {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                                loader: 'babel-loader',
                                options: {
                                    presets: [
                                        [
                                            '@babel/preset-env',
                                            {
                                                debug: false,
                                                corejs: 3,
                                                useBuiltIns: 'usage',
                                            },
                                        ],
                                    ],
                                },
                            },
                        },
                    ],
                },
            })
        )
        .pipe(gulp.dest(dist + '/js'));

    return gulp
        .src('src/assets/sass/style.scss')
        .pipe(sass({ style: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest(dist + '/assets/css'));
});

gulp.task('default', gulp.parallel('watch'));
