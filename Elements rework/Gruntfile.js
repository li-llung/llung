module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      Elements: {
        options: {
          paths: ['css'],
          ieCompat: true
        },
        files: {
          'css/em.css': 'css/less/em.less',
          'css/overlay.css': 'css/less/overlay.less',
          'css/slider.css': 'css/less/slider.less'
        }
      }
    },
    jshint: {
      // define the files to lint
      files: ['gruntfile.js', 'js/em/core/**/*.js', 'js/em/helpers/**/*.js', 'js/em/modules/**/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
          // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          validthis: true,
          console: true,
          module: true
        }
      }
    },
    uglify: {
      Elements: {
        options: {
          beautify: true
        },
        files: {
            'js/elements.min.js': [
            'js/em/thirdparty/jquery-1.7.1.min.js',
            'js/em/thirdparty/modernizr-2-6-2.min.js',
            'js/em/core/em.js',
            'js/em/helpers/debug.js',
            'js/em/helpers/effects.js',
            'js/em/modules/super_overlay_remix.js',
            'js/em/core/em_boot.js'
          ]
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'less', 'jshint']);

};