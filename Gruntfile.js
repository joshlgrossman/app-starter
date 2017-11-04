module.exports = grunt => {

  const webpack = require('./webpack.config');
  const package = grunt.file.readJSON('package.json');
  const prettier = grunt.file.readJSON('prettier.json');
  const tslint = grunt.file.readJSON('tslint.json');

  grunt.initConfig({
    pkg: package,

    prettier: {
      options: {
        ...prettier
      },
      files: {
        src: ['src/**/*.ts', 'src/**/*.tsx','src/**/*.js', 'src/**/*.jsx']
      }
    },

    tslint: {
      options: {
        ...tslint
      },
      files: {
        src: [
          'src/**/*.ts',
          'src/**/*.tsx',
          '!src/**/*.spec.ts'
        ]
      }
    },

    eslint: {
      options: {
        configFile: 'eslint.json'
      },
      files: { 
        src: [
          'src/**/*.js',
          'src/**/*.jsx',
          '!src/**/*.spec.js'
        ] 
      }
    },

    mochaTest: {
      options: {
        reporter: 'spec',
        require: [
          'ts-node/register',
          'reflect-metadata'
        ]
      },
      src: ['src/**/*.spec.ts']
    },

    webpack: {
      dev: webpack.dev,
      dist: webpack.dist
    },

    clean: {
      dist: ['dist/**/*']
    },

  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-prettier');

  grunt.registerTask('test', [
    'prettier',
    'tslint',
    'eslint',
    'mochaTest'
  ]);

  grunt.registerTask('build:dev', [
    'test',
    'webpack:dev'
  ]);

  grunt.registerTask('build', [
    'test',
    'clean:dist',
    'webpack:dist'
  ]);

};