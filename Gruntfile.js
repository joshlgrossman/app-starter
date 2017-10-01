module.exports = grunt => {

  const package = grunt.file.readJSON('package.json');
  const tsconfig = grunt.file.readJSON('tsconfig.json');

  grunt.initConfig({
    pkg: package,
    
    tslint: {
      options: {
        configuration: 'tslint.json'
      },
      files: {
        src: [
          'src/**/*.ts'
        ]
      }
    },

    ts: {
      options: tsconfig.compilerOptions,
      build: {
        src: ['src/**/*.ts'],
        outDir: 'dist/'
      }
    },


    browserify: {
      build: {
        files: {
          'dist/bundle.js': 'dist/main.js'
        }
      }
    },

    clean: {
      build: ['dist/**/*.js', '!dist/bundle.js']
    },

    uglify: {
      build: {
        files: {
          'dist/bundle.js': 'dist/bundle.js'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', [
    'tslint',
    'ts',
    'browserify',
    'clean',
    'uglify'
  ]);

};