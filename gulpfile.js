var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');

gulp.task('mapbox-js', function () {
  return gulp.src([
    'node_modules/mapbox-gl/dist/mapbox-gl.js',
    'node_modules/@turf/turf/turf.min.js',
    '_vendor/topojson.js',
    '_vendor/chroma.min.js'
  ])
  .pipe(concat('mapbox-bundle.js'))
  .pipe(minify())
  // .pipe(uglify())
  .pipe(gulp.dest('public/assets/build/js'));
});

gulp.task('mapbox-css', function () {
  return gulp.src([
    'node_modules/mapbox-gl/dist/mapbox-gl.css',
    '_vendor/xcode.css'
  ])
  .pipe(concat('mapbox-style.css'))
  .pipe(cleanCss())
  .pipe(gulp.dest('public/assets/build/css'));
});

gulp.task('mapbox', ['mapbox-css', 'mapbox-js']);
