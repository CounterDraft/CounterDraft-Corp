module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            build: {
                cwd: 'js',
                scr: ['**'],
                dest: 'build',
                expand: true

            }
        },

        clean: {
            build: {
                src: ['build']
            }
        },


        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                options: {
                    mangle: true
                },

                files: [{
                    src: ['node_modules/jquery/dist/jquery.js',
                        'node_modules/underscore/underscore.js',
                        'node_modules/backbone/backbone.js',
                        'node_modules/bootstrap/dist/js/bootstrap.js'
                    ],
                    dest: 'build/js/<%= pkg.name %>.min.js'
                },
                {
                    src: ['node_modules/requirejs/*js'],
                    dest: 'build/js/require.min.js'
                }],
            }
        },

        less: {
            compileCore: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: '<%= pkg.name %>.css.map',
                    sourceMapFilename: 'build/css/<%= pkg.name %>.css.map'
                },
                src: 'css/counter-main.less',
                dest: 'build/css/<%= pkg.name %>.min.css'
            }
        }
    });
    // load the copy plugin
    // grunt.loadNpmTasks('grunt-contrib-copy');
    // load the clean plugin
    // grunt.loadNpmTasks('grunt-contrib-clean');
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Load the plugin that provides the "less" task.
    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'clean', 'uglify', 'less']);
    grunt.registerTask('default', ['uglify', 'less']);

};
