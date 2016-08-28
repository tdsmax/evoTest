module.exports = function(grunt) {

  grunt.initConfig({
    jasmine: {
      test: {
        src: 'build/app/bundle.js',
        options: {
          specs: 'spec/*.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
};
