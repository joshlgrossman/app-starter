module.exports = grunt => {

  const webpack = require('./webpack.config');
  const pkg = grunt.file.readJSON('package.json');
  const prettier = grunt.file.readJSON('prettier.json');
  const tslint = grunt.file.readJSON('tslint.json');

  grunt.initConfig({
    pkg,
    webpack,

    ts: {
      default: {
        src: ['src/server/**/*.ts', 'src/server/**/*.js'],
        outDir: 'dist/server',
        tsconfig: 'tsconfig.server.json'
      }
    },

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
    
    clean: {
      dist: ['dist/**/*']
    },

  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-ts');
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
    'ts',
    'webpack:dev'
  ]);

  grunt.registerTask('build', [
    'test',
    'clean:dist',
    'ts',
    'webpack:dist'
  ]);

};