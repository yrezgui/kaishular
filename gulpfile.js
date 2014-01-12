// Load packages
var util      = require('util');
var path      = require('path');
var gulp      = require('gulp');
var gutil     = require('gulp-util');
var concat    = require('gulp-concat');
var refresh   = require('gulp-livereload');
var template  = require('gulp-template');
var coffee    = require('gulp-coffee');
var less      = require('gulp-less');
var jade      = require('gulp-jade');
var lr        = require('tiny-lr');
var es        = require('event-stream');

// Load configuration
var config = require('./config.js');

// Start instances
var server = lr();

// List of source files
var templateData = {
  scripts: [],
  styles: []
};


gulp.task('compile:scripts', function() {

  return es.concat(
    gulp.src([path.join(config.source.path, 'scripts/**/*.js')]),

    gulp.src([path.join(config.source.path, 'scripts/**/*.coffee')])
        .pipe(coffee({ bare: true }).on('error', gutil.log))

  ).pipe(gulp.dest(path.join(config.dev.path, 'js')));
});


gulp.task('compile:styles', function() {

  return es.concat(
    gulp.src([path.join(config.source.path, 'styles/**/*.css')]),

    gulp.src([path.join(config.source.path, 'styles/**/*.less')])
        .pipe(less())

  ).pipe(gulp.dest(path.join(config.dev.path, 'css')));
});


gulp.task('compile:views', function() {

  return es.concat(
    gulp.src([path.join(config.source.path, 'views/**/*.html')]),

    gulp.src([path.join(config.source.path, 'scripts/**/*.jade')])
        .pipe(jade())

  ).pipe(gulp.dest(path.join(config.dev.path, 'tpl')));
});


gulp.task('list:scripts', ['compile:scripts'], function (cb) {

  var directory = new RegExp('^' + path.join(__dirname, config.dev.path), 'g');

  gulp.src(path.join(config.dev.path, 'js/**/*.js'), {read: false})
      .on('data', function (file) {
        // Remove absolute path
        templateData.scripts.push(file.path.replace(directory, ''));
      })
      .on('end', function () {
        cb();
      });
});


gulp.task('list:styles', ['compile:styles'], function (cb) {

  var directory = new RegExp('^' + path.join(__dirname, config.dev.path), 'g');

  gulp.src(path.join(config.dev.path, 'css/**/*.css'), {read: false})
      .on('data', function (file) {
      // Remove absolute path
        console.log(file.path);
        templateData.styles.push(file.path.replace(directory, ''));
      })
      .on('end', function () {
        cb();
      });
});


gulp.task('index', ['list:styles', 'list:scripts'], function () {

  return gulp.src(path.join(config.source.path, 'index.html'))
      .pipe(template(templateData))
      .pipe(gulp.dest(config.dev.path));
});


gulp.task('lr-server', function() {
  server.listen(35729, function(err) {
    if(err)
      return console.log(err);
  });
});


gulp.task('default', function() {
  gulp.run('lr-server', 'scripts');

  gulp.watch('src/js/**', function(event) {
    gulp.run('scripts');
  });
});