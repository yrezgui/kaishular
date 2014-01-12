var path    = require('path');

var exports = {};

/*
 * Source
 */
exports.source = {
  path: 'src'
};

exports.source.files = {
  js:   path.join(exports.source.path, 'scripts/**/*.js'),
  less: path.join(exports.source.path, 'styles/**/*.less'),
  css:  path.join(exports.source.path, 'styles/**/*.css'),
  jade: path.join(exports.source.path, 'views/**/*.jade'),
  html: path.join(exports.source.path, 'views/**/*.html')
};

/*
 * Development
 */
exports.dev = {
  path: 'lib'
};

exports.source.files = {
  js:  path.join(exports.dev.path, 'js/**/*.js'),
  css: path.join(exports.dev.path, 'css/**/*.less'),
  tpl: path.join(exports.dev.path, 'tpl/**/*.html')
};

/*
 * Production
 */
exports.prod = {
  path: 'build'
};


exports = module.exports;