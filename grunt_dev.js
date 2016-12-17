module.exports = function(grunt) {
    console.log("herer wer are");
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
        }
    });

    //load all tasks;
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task(s).
    grunt.registerTask('default', [
        'clean:pre'
    ]);
};
