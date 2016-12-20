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
        less: {
            development: {
                options: {
                    paths: ["./css/"],
                    compress: false
                },
                files: {
                    "./css/counter-main.css": "./css/counter-main.less"
                }
            }
        },
        watch: {
            files: ["./css/*"],
            tasks: ["less"],
            options: {
                nospawn: true
            }
        }
    });

    //load all tasks;
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['clean:pre', 'less', 'watch']);
};
