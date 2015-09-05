module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'js/counter.js',
                dest: 'build/js/counterDraft.min.js'
            }
        },
        less: {
            development: {
                options: {
                    paths: ["assets/css"],
                    cleancss: true,
                    compress: true
                },
                files: {
                    "build/css/counter-draft-main.min.css": "css/counter-main.less"
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Load the plugin that provides the "less" task.
    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'less']);
};
