module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        less: {
            development: {
                files: {
                    "src/main/resources/public/css/style.demoLibrary.css": "src/main/less/main.less"
                }
            },
            production: {
                files: {
                    "src/main/resources/public/css/style.demoLibrary.css": "src/main/less/main.less"
                },
                options: {
                    compress: true
                }
            }
        },
        clean: {
            build: {
                src: ['src/main/resources/public/css/style.demoLibrary.css', 'src/main/resources/public/js/app.librarydemo.js']
            }
        },
        run: {
            options: {
                // ...
            },
            npm_webpack_dev: {
                cmd: 'npm',
                args: [
                    'run',
                    'build:dev'
                ]
            },
            npm_webpack_prod: {
                cmd: 'npm',
                args: [
                    'run',
                    'build:prod'
                ]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    //grunt.loadNpmTasks('grunt-contrib-uglify');

    // Load the plugin that provides the "less" task.
    grunt.loadNpmTasks('grunt-contrib-less');

    // Load the plugin that provides the "clean" task.
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Load the plugin that provides the "run" task.
    grunt.loadNpmTasks('grunt-run');

    // Register task for development build of less and js files
    grunt.registerTask('buildDevelopment', ['clean:build', 'less:development', 'run:npm_webpack_dev']);

    // Register task for development build of less and js files
    grunt.registerTask('buildProduction', ['clean:build', 'less:production', 'run:npm_webpack_prod']);

    // Default task(s).
    grunt.registerTask('default', ['less']);

};