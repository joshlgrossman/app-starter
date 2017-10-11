module.exports = grunt => {

  const package = grunt.file.readJSON('package.json');
  const tsconfig = grunt.file.readJSON('tsconfig.json');
  const prettier = grunt.file.readJSON('prettier.json');
  const tslint = grunt.file.readJSON('tslint.json');

  grunt.initConfig({
    pkg: package,

    prettier: {
      options: {
        ...prettier
      },
      files: {
        src: ['src/**/*.ts']
      }
    },

    tslint: {
      options: {
        ...tslint
      },
      files: {
        src: [
          'src/**/*.ts',
          '!src**/*.spec.ts'
        ]
      }
    },

    mochaTest: {
      options: {
        reporter: 'spec',
        require: [
          'ts-node/register',
          './polyfills.js'
        ]
      },
      src: ['src/**/*.spec.ts']
    },

    ts: {
      dist: {
        options: tsconfig.compilerOptions,
        src: ['src/**/*.ts'],
        outDir: 'dist/'
      },
      dev: {
        options: { 
          ...tsconfig.compilerOptions, 
          inlineSourceMap: true,
          inlineSources: true
        },
        src: ['src/**/*.ts'],
        outDir: 'dist/',
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['./polyfills.js','dist/index.js'],
        dest: 'dist/index.js'
      },
      dev: {
        src: ['./polyfills.js','dist/index.js'],
        dest: 'dist/index.js'
      },
    },

    browserify: {
      dist: {
        files: {
          'dist/bundle.js': 'dist/index.js'
        }
      },
      dev: {
        files: {
          'dist/bundle.js': 'dist/index.js'
        },
        debug: true
      }
    },

    clean: {
      dist: ['dist/**/*.js', '!dist/bundle.js']
    },

    uglify: {
      dist: {
        files: {
          'dist/bundle.js': 'dist/bundle.js'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-prettier');

  grunt.registerTask('test', [
    'prettier',
    'tslint',
    'mochaTest'
  ]);

  grunt.registerTask('build:dev', [
    'test',
    'ts:dev',
    'concat:dev',
    'browserify:dev'
  ]);

  grunt.registerTask('build', [
    'test',
    'ts:dist',
    'concat:dist',
    'browserify:dist',
    'clean:dist',
    'uglify:dist'
  ]);

};