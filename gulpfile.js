// Load packages
var util      = require('util');
var path      = require('path');
var Q         = require('q');
var lodash    = require('lodash');
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
var settings = require('./config.js');

// Start instances
var server = lr();


function compileScripts() {
  return gulp.src(settings.source.files.js);
}

function compileStyles() {
  return es.concat(
    gulp.src(settings.source.files.css),
    gulp.src(settings.source.files.less).pipe(less())
  );
}

function compileViews(config) {
  return es.concat(
    gulp.src(settings.source.files.html),
    gulp.src(settings.source.files.jade).pipe(jade({pretty: true, data: settings}))
  );
}

function getFiles(config) {
  var directory = new RegExp('^' + path.join(__dirname, config.exclude), 'g');
  var list = [];

  gulp.src(config.pattern, {read: false})
    .on('data', function (file) {
      // Remove absolute path
      list.push(file.path.replace(directory, ''));
    })
    .on('end', function () {
      deferred.resolve(list);
    });
}

function refreshFilesList() {

  var files = {
    css: [],
    js:  []
  };

  return Q.all(
    getFiles({ pattern: settings.dev.files.css, exclude: settings.dev.path.root }),
    getFiles({ pattern: settings.dev.files.js, exclude: settings.dev.path.root })
  ).then(function (results) {
    files.css = results[0];
    files.js  = results[1];

    settings.files = files;

    return gulp.src(path.join(settings.source.path.root, 'index.jade'))
               .pipe(jade({pretty: true, data: settings}))
               .pipe(gulp.dest(settings.dev.path.root));
  });
}


gulp.task('default', function() {
  compileScripts().pipe(gulp.dest(settings.dev.path.js));
  compileStyles().pipe(gulp.dest(settings.dev.path.css));

  gulp.watch(settings.source.files.js, function(event) {

    var files = compileScripts()
                .pipe(gulp.dest(settings.dev.path.js));

    if(event.type !== 'changed') {
      refreshFilesList();
    }
  });

  gulp.watch([settings.source.files.css, settings.source.files.less], function(event) {
    
    var files = compileStyles()
                .pipe(gulp.dest(settings.dev.path.css));

    if(event.type !== 'changed') {
      refreshFilesList();
    }
  });

  gulp.watch([settings.source.files.html, settings.source.files.jade], function(event) {
    
    compileViews().pipe(gulp.dest(settings.dev.path.tpl));
  });
});