// BUILT UP FROM: https://markgoodyear.com/2014/01/getting-started-with-gulp/

// npm install webpack-stream gulp-babel babel-preset-es2015 es6-promise gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev

// Install LiveReload Browser plugin
 
// DIRECTORY STRUCTURE:
// /.
// /src/html
// /src/scripts
// /src/
// /src/styles/main.scss
// /src/testing/*.json
// /dist/assets/css
// /dist/assets/js/main.js
// /dist/testing-data/*.json

require('es6-promise').polyfill();

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    server = require('gulp-connect'),
    browserify = require('gulp-browserify'),    
    babel = require('gulp-babel');

// Move source html
gulp.task('move-html', function() {
 return gulp.src('src/html/*')
    .pipe(gulp.dest('dist'))
    .pipe(server.reload());
});

gulp.task('move-testing', function() {
 return gulp.src('src/testing/*')
    .pipe(gulp.dest('dist/testing-data'))
    .pipe(server.reload());
});

gulp.task('move', ['move-html', 'move-testing']);

// Sass compiling
gulp.task('styles', function() {
  return sass('src/styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/assets/css'))
    //.pipe(notify({ message: 'Styles task complete' }))
    .pipe(server.reload());
});

// JSHint, Concat, minify
gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.js')
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    //.pipe(concat('main.js'))
    //.pipe(babel({
    //  presets: ['es2015']
    //}))
    .pipe(browserify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    //.pipe(notify({ message: 'Scripts task complete' }))
    .pipe(server.reload());
});

// Compress images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({ message: 'Images task complete' }))
    .pipe(server.reload());
});

// Clean up before deploy
gulp.task('clean', function() {
    return del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img']);
});

// Launch server
gulp.task('serve', function() {
  server.server({
    root: 'dist',
    livereload: true
  });
});

// Watching
gulp.task('watch', function() {
  // Watch html files
  gulp.watch('src/html/**/*.html', ['move']);

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/scripts/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);
});

// Default, run by $gulp
gulp.task('default', ['clean', 'styles', 'scripts', 'images', 'move', 'serve'], function() {
    gulp.start('watch');
});
