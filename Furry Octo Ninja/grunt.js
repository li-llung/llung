/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    //, '<file_strip_banner:src/<%= pkg.name %>.js>'
    concat: {
      dist: {
        src: ['<banner:meta.banner>', 'src/**/*.js'],
        dest: 'js/<%= pkg.name %>.js'
      }
    },
    //, '<config:concat.dist.dest>'
    min: {
      dist: {
        src: ['<banner:meta.banner>', 'src/**/*.js'],
        dest: 'js/<%= pkg.name %>.min.js'
      }
    },
    //qunit: {
    //  files: ['test/**/*.html']
    //},
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: ['<config:lint.files>', 'src/**/*.js'],
      tasks: 'lint concat min'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        devel: true
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint concat min');
  grunt.registerTask('reload', 'default connect watch:reload');
};