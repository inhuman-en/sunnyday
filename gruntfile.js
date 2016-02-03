//TODO: add lib files to build
//TODO: injector task to refer single minfied js from index
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        lib: 'lib',

        src: {
            root: 'src',
            js: 'src/js',
            css: 'src/css'
        },

        dest: {
            root: 'build',
            js: 'build/js',
            css: 'build/css'
        },

        clean: ["<%= dest.root %>"],

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['<%= lib %>**/*.js', '<%= src.js %>/**/*.js'],
                //src: ['<%= src.js %>/**/*.js'],
                dest: '<%= dest.js %>/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    '<%= dest.js %>/<%= pkg.name %>-<%= pkg.version %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        cssmin: {
            add_banner: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
                },
                files: {
                    '<%= dest.css %>/<%= pkg.name %>-<%= pkg.version %>.min.css': ['src/css/**/*.css']
                }
            }
        },

        injector: {
            options: {
                ignorePath: "<%= dest.root %>/",
                addRootSlash: false
            },
            local_dependencies: {
                files: {
                    '<%= dest.root %>/index.html': [
                        '<%= dest.js %>/<%= pkg.name %>-<%= pkg.version %>.min.js',
                        '<%= dest.css %>**/*.css'
                    ]
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: false,
                    collapseWhitespace: true
                },
                files: {
                    '<%= dest.root %>/index.html': 'src/index.html'
                }
            }
        },

        watch: {
            scripts: {
                files: ['<%= src.js %>**/*.js', '<%= src.css %>**/*.css', '<%= src.root %>*.html'],
                tasks: [],
                options: {
                  livereload: true
                }
              }
        },

        markdown: {
            all: {
                files: [{
                    expand: true,
                    src: 'README.md',
                    dest: '',
                    ext: '.html'
                }]
            },
            options: {
                markdownOptions: {
                    gfm: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-markdown');

    //TODO: add tests
    grunt.registerTask('build', ['clean', 'concat', 'uglify', 'cssmin', 'htmlmin', 'injector']);
    grunt.registerTask('default', ['build']);

};
