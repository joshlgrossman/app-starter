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
      options: {
        reporter: 'spec',
        require: 'ts-node/register'
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
          ... tsconfig.compilerOptions, 
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
        banner: 'require(\'core-js/library/es6\');'
      },
      dist: {
        src: ['dist/index.js'],
        dest: 'dist/index.js'
      },
      dev: {
        src: ['dist/index.js'],
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

  grunt.registerTask('test', [
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