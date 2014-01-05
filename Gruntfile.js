// Gruntfile with the configuration
module.exports = function(grunt) {

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Configure Grunt 
  grunt.initConfig({

    // grunt-express will serve the files from the folders listed in `bases`
    // on specified `port` and `hostname`
    express: {
      options: {
        hostname: '0.0.0.0'
      },
      dev: {
        options: {
          port: 4090,
          bases: [__dirname + '/build']
        },
        livereload: true
      },
      prod: {
        options: {
          port: 4091,
          bases: [__dirname + '/bin']
        }
      }
    },

    // grunt-open will open your browser at the project's URL
    open: {
      dev: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.dev.options.port%>'
      },
      prod: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.prod.options.port%>'
      }
    }
  });

  // Creates the `server` task
  grunt.registerTask('server', [
    'express:dev',
    'open:dev',
    'express-keepalive'
  ]);
};