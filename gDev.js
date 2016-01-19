module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            pre: ['build'],
            post: ['build/js/main',
                'build/js/services',
                'build/js/*js',
                'build/css/*less'
            ]
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            js: {
                files: [{
                    src: 'build/js/<%= pkg.name %>.js',
                    dest: 'build/js/min/<%= pkg.name %>.min.js'
                }]
            }
        },

        concat: {
            libsJS: {
                src: [
                    //libs NOTE- If we add more libs there need to be added to the build here;
                    'node_modules/angular/angular.js',
                    'node_modules/jquery/dist/jquery.js',
                    'build/js/CounterDraft-common.js',
                    'node_modules/bootstrap/dist/js/bootstrap.js',
                    //pages
                    'build/js/main/*'
                ],
                dest: 'build/js/<%= pkg.name %>.js'
            }
        },

        copy: {
            js: {
                expand: true,
                src: ['js/*', 'js/*/*', 'js/*/*/*', 'js/*/*/*/*'],
                dest: 'build/'
            },

            css: {
                src: 'css/*less',
                dest: 'build/'
            }
        },

        less: {
            compile: {
                options: {
                    compress: true,
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: '<%= pkg.name %>.css.map',
                    sourceMapFilename: 'build/css/min/<%= pkg.name %>.css.map'
                },
                files: {
                    'build/css/min/<%= pkg.name %>.min.css': 'css/counter-main.less'
                }
            }
        }
    });

    //load all tasks;
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task(s).
    grunt.registerTask('default', [
        'clean:pre'
    ]);
};
