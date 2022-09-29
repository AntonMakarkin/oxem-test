const gulp = require('gulp');
const clean = require('gulp-clean');
const less = require('gulp-less');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const browsersync = require('browser-sync');

const paths = {
    html: {
        src: './src/*.html',
        dest: './dist'
    },
    styles: {
        src: './src/styles/**/*.less',
        dest: './dist/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: './dist/js/'
    },
    fonts: {
        src: './src/fonts/**/*.*',
        dest: './dist/fonts/'
    }
};

gulp.task('cleanFolder', () => {
    return gulp.src('dist', { read: false })
        .pipe(clean())
});

gulp.task('htmlCompress', () => {
    return gulp.src(paths.html.src)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.html.dest))
        .on('end', browsersync.reload)
});

gulp.task('copy-fonts', () => {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
        .on('end', browsersync.reload)
})

gulp.task('styles', () => {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(concat('main.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest))
        .on('end', browsersync.reload)
});

gulp.task('scripts', () => {
    return gulp.src(paths.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scripts.dest))
        .on('end', browsersync.reload)
});

gulp.task('watch', () => {
    browsersync.init({
        server: {
            baseDir: './dist/',
            serverStaticOptions: {
                extension: ['html']
            }
        },
    port: 4000,
    notify: true
    })

    gulp.watch(paths.styles.src, gulp.parallel('styles'));
    gulp.watch(paths.scripts.src, gulp.parallel('scripts'));
    gulp.watch(paths.html.src, gulp.parallel('htmlCompress'));
    gulp.watch(paths.fonts.src, gulp.parallel('copy-fonts'));
});

const build = gulp.series('cleanFolder', 'htmlCompress', gulp.parallel('styles', 'scripts', 'copy-fonts'), 'watch');

exports.build = build;
exports.default = build;