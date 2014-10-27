/*global module:false*/
module.exports = function(grunt) {   
	require('time-grunt')(grunt);

	var
	stylish = require('jshint-stylish'),
	path = require('path'),
	siteRoot = __dirname,
	sourceMapDestination = path.join(__dirname, 'source_maps'),
	sourceMapRoot = grunt.option('sourceMapRoot') || 'source_maps',
	lessSrc = 'z/css',
	lessDest = 'z/dist/css';

	/*Project configuration.*/
	grunt.initConfig({
		/*DO NOT commit output files*/
		pkg: grunt.file.readJSON('package.json'),
		jade: {
          compile: {
            options: {
              data: {
                debug: false
              }
            },
            files: {
              "z.html": ["z/templates/*.jade"]
            }
          }
        },
        less: {
			/*For all custom LESS files; minified now*/
			CustomLess: {
				options: {
					paths: [lessSrc],
					yuicompress: true,
					ieCompat: true
				},
				files: [{
					expand: true,
					cwd: lessSrc,
					src: "*.less",
					dest: lessDest,
					ext: ".min.css"
				}]
			}
		},
		uglify: {
			ModernMaster: {
				files: {
					'z/dist/js/3rdparty.js': [
						"3rdparty/*.js"
					],
					'z/dist/js/helpers.js': [
						"z/js/helpers/*.js"
					],
					'z/dist/js/modules.js': [
						"z/js/modules/*.js"
					],
				}
			}
		},
		cssmin: {
			ModernMaster: {
				cwd:siteRoot,
				src: [
					"z/dist/css/*.css"
				],
				dest: 'z/dist/css/z.css'
			},
			minify: {
				expand: true,
				cwd: siteRoot,
				src: [
					'**/*.css',
					'!node_modules/**/*.css' /*except node modules*/
				],
				dest: siteRoot
			}
		},
		/*Make sure code styles are up to par and there are no obvious mistakes*/
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: stylish
			},
			all: ['z/js/*.js']
		},

		watch: {
			defaults:{
				files: ['z/**/*.js', '!**/*.min.js', 'z/styles/*.less', 'z/styles/less/*.less', 'z/**/*.css', '!**/*.min.css', 'z/templates/*.jade'],
				tasks: ['default'],
				options: {
					livereload: true,
				}
			}
		},

		karma: {
		    unit: {
		        configFile: 'karma.conf.js'
		    }
		}
	});

	/*Default task.*/
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('customless', ['less:CustomLess']);
	grunt.registerTask('mastersmodern', ['cssmin:ModernMaster', 'uglify:ModernMaster']);
	
	grunt.registerTask('test', ['karma']);

	grunt.registerTask('default', ['customless', 'mastersmodern', 'jshint', 'jade']);
};
