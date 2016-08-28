module.exports = function(grunt) {

  grunt.initConfig({
    jasmine: {
      test: {
        options: {
          src: 'build/app/app.js',
          specs: 'spec/*.js',
          vendor: [
            'src/vendor/*.js'
          ]
        }
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: 'src/js',
          include: [
            'PubSub.js',
            'SocketApi.js',
            'App.js'
          ],
          out: 'build/app/app.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
};
