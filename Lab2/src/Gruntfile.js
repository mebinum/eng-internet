'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function(connect, dir) {
	return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
	// Project configuration.
	// configurable paths
	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var projectConfig = {
		app: './',
		dist: '../www'
	};
	grunt.initConfig({
		projConf: projectConfig,
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			scripts: {
				files: ['js/{,*/}*.js'],
				tasks: ['jshint']
			},
			css: {
				files: ['css/{,*/}*.css']
			},
			livereload: {
				files: [
						'<%= projConf.app %>/{,*/}*.html',
						'{.tmp,<%= projConf.app %>}/css/{,*/}*.css',
						'{.tmp,<%= projConf.app %>}/font/{,*/}*.{eot,svg,ttf,woff}',
						'{.tmp,<%= projConf.app %>}/js/{,*/}*.js',
						'<%= projConf.app %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
					],
					tasks: ['livereload']
				}
			},
			connect: {
				options: {
					port: 35729,
					// Change this to '0.0.0.0' to access the server from outside.
					hostname: 'localhost'
				},
				livereload: {
					options: {
						middleware: function(connect) {
							return [
								lrSnippet,
								mountFolder(connect, '.tmp'),
								mountFolder(connect, projectConfig.app)
							];
						}
					}
				}
			},
			open: {
				server: {
					url: 'http://localhost:<%= connect.options.port %>'
				}
			},
			jshint: {
				options: {
					jshintrc: '.jshintrc'
				},
				all: ['Gruntfile.js', 'js/{,*/}*.js']
			},
			compass: {
				options: {
					sassDir: '<%= projConf.app %>/css',
					cssDir: '.tmp/css',
					imagesDir: '<%= projConf.app %>/img',
					javascriptsDir: '<%= projConf.app %>/js',
					fontsDir: '<%= projConf.app %>/fonts',
					importPath: '<%= projConf.app %>/components',
					relativeAssets: true
				},
				dist: {},
				server: {
					options: {
						debugInfo: true
					}
				}
			},
			clean: {
				dist: {
					options: {
						//set to force to true to allow grunt to delete files not in current workind dir
						force: true
					},
					files: [{
							dot: true,
							src: ['.tmp', '<%= projConf.dist %>/*', '!<%= projConf.dist %>/.git*']
						}
					]
				  },
				  server: '.tmp'
			  },
			  copy: {
					dist: {
						files: [{
							expand: true,
							dot: true,
							cwd: '<%= projConf.app %>',
							dest: '<%= projConf.dist %>',
							src: [
								'*.{ico,txt,xml,html}',
								'!components/**/*',
								'js/**/*.js',
								'img/{,*/}*.{gif,webp,png,svg}',
								'!css/font-awesome.css',
								'css/{,*/}*.css',
								'font/*'
							]
						}
				 ]}
				},
				useminPrepare: {
					html: '<%= projConf.app %>/index.html',
					options: {
						dest: '<%= projConf.dist %>'
					}
				},
				usemin: {
					html: ['<%= projConf.dist %>/{,*/}*.html'],
					css: ['<%= projConf.dist %>/css/{,*/}*.css'],
					options: {
						dirs: ['<%= projConf.dist %>']
					}
				},
				zip: {
					build: {
						src: ['<%= yeoman.dist %>/{,*/}*'],
						dest: '<%= pkg.name %>_<%= Date.now()%>.zip',
						zlib: {
							level: 2
						}
					}
				}
			});
	grunt.registerTask('server', [
		'clean:server',
		'livereload-start',
		'connect:livereload',
		'open',
		'watch'
	]);

	grunt.registerTask('build', [
		'jshint',
		'clean:dist',
		'useminPrepare',
		'concat',
		'copy',
		'usemin'
		//'zip:build'
	]);

	// Load the plugin that provides the "uglify" task.

	// Default task(s).
	grunt.registerTask('default', ['server']);
	//grunt.loadNpmTasks('grunt-zipstream');

};