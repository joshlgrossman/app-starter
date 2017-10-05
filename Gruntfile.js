module.exports = grunt => {

  const package = grunt.file.readJSON('package.json');
  const tsconfig = grunt.file.readJSON('tsconfig.json');

  grunt.initConfig({
    pkg: package,
    
    tslint: {
      options: {
        configuration: 'tslint.json',
        fix: true
      },
      files: {
        src: [
          'src/**/*.ts',
          '!src**/*.spec.ts'
        ]
      }
    },

    mochaTest: {
      build: {
        options: {
          reporter: 'spec',
          require: 'ts-node/register'
        },
        src: ['src/**/*.spec.ts']
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
          'dist/bundle.js': 'dist/index.js'
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

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('test', [
    'tslint',
    'mochaTest'
  ]);

  grunt.registerTask('make', [
    'ts',
    'browserify',
    'clean'
  ]);

  grunt.registerTask('build', [
    'test',
    'make',
    'uglify'
  ]);

};