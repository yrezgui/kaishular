// Load packages
var path      = require('path');
var Q         = require('q');
var lodash    = require('lodash');
var gulp      = require('gulp');
var less      = require('gulp-less');
var jade      = require('gulp-jade');
var es        = require('event-stream');

// Load configuration
var settings = require('./config.js');

function compileScripts() {
  return gulp.src(settings.source.files.js);
}

function compileStyles() {
  return es.concat(
    gulp.src(settings.source.files.css),
    gulp.src(settings.source.files.less).pipe(less())
  );
}

function compileViews() {
  return es.concat(
    gulp.src(settings.source.files.html),
    gulp.src(settings.source.files.jade).pipe(jade({pretty: true, data: settings.dev}))
  );
}

function getFiles(config) {
  var directory = new RegExp('^' + path.join(__dirname, config.exclude), 'g');
  var list = [];

  var deferred = Q.defer();

  gulp.src(config.pattern, {read: false})
    .on('data', function (file) {
      // Remove absolute path
      list.push(file.path.replace(directory, ''));
    })
    .on('end', function () {
      deferred.resolve(list);
    });

  return deferred.promise;
}

function refreshFilesList() {

  var files = {
    css: [],
    js:  []
  };

  return Q.all([
    getFiles({ pattern: settings.dev.files.css, exclude: settings.dev.path.root }),
    getFiles({ pattern: settings.dev.files.js, exclude: settings.dev.path.root })
  ]).then(function (results) {
    files.css = results[0];
    files.js  = results[1];

    settings.dev.filesList = files;

    return gulp.src(path.join(settings.source.path.root, 'index.jade'))
               .pipe(jade({pretty: true, data: settings.dev}))
               .pipe(gulp.dest(settings.dev.path.root));
  });
}


gulp.task('gulpfile.js', function() {
  Q.all(
    compileScripts().pipe(gulp.dest(settings.dev.path.js)),
    compileStyles().pipe(gulp.dest(settings.dev.path.css))

  ).then(refreshFilesList);

  gulp.watch(settings.source.files.js, function(event) {

    compileScripts().pipe(gulp.dest(settings.dev.path.js));

    if(event.type !== 'changed') {
      refreshFilesList();
    }
  });

  gulp.watch([settings.source.files.css, settings.source.files.less], function(event) {
    
    compileStyles().pipe(gulp.dest(settings.dev.path.css));

    if(event.type !== 'changed') {
      refreshFilesList();
    }
  });

  gulp.watch([settings.source.files.html, settings.source.files.jade], function() {
    
    compileViews().pipe(gulp.dest(settings.dev.path.tpl));
  });
});