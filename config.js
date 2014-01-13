var path    = require('path');

var exports = {};

/*
 * Source
 */
exports.source = {
  path: {
    root:     'src',
    scripts:  'src/scripts',
    styles:   'src/styles',
    views:    'src/views'
  }
};

exports.source.path.scripts  = path.join(exports.source.path.root, 'scripts');
exports.source.path.styles   = path.join(exports.source.path.root, 'styles');
exports.source.path.views    = path.join(exports.source.path.root, 'views');

exports.source.files = {
  js:   path.join(exports.source.path.scripts, '**/*.js'),
  less: path.join(exports.source.path.styles, '**/*.less'),
  css:  path.join(exports.source.path.styles, '**/*.css'),
  jade: path.join(exports.source.path.views, '**/*.jade'),
  html: path.join(exports.source.path.views, '**/*.html')
};

/*
 * Development
 */
exports.dev = {
  title: 'Kaishular',
  description: 'The perfect toolkit for AngularJS developers.',

  googleAnalytics: {
    id:     'UA-31448413-6',
    domain: 'yrezgui.com'
  },

  path: {
    root: 'lib'
  }
};

exports.dev.path.js   = path.join(exports.dev.path.root, 'js');
exports.dev.path.css  = path.join(exports.dev.path.root, 'css');
exports.dev.path.tpl  = path.join(exports.dev.path.root, 'tpl');

exports.dev.files = {
  js:   path.join(exports.dev.path.js, '**/*.js'),
  css: path.join(exports.dev.path.css, '**/*.css'),
  tpl:  path.join(exports.dev.path.tpl, '**/*.html')
};

/*
 * Production
 */
exports.prod = {
  path: 'build'
};


module.exports = exports;