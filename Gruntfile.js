module.exports = grunt => {

  const webpack = require('./webpack.config');
  const pkg = grunt.file.readJSON('package.json');
  const prettier = grunt.file.readJSON('prettier.json');
  const tslint = grunt.file.readJSON('tslint.json');

  grunt.initConfig({
    pkg,
    webpack,

    'webpack-dev-server': {
      options: {
        webpack: webpack.dev,
        progress: false,
        port: 8000
      },
      default: {
        keepalive: true
      }
    },

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
      client: {
        src: [
          'src/client/**/*.ts',
          'src/client/**/*.tsx',
          'src/client/**/*.js',
          'src/client/**/*.jsx'
        ]
      },
      server: {
        src: [
          'src/server/**/*.ts',
          'src/server/**/*.js',
        ]
      }
    },

    tslint: {
      options: {
        ...tslint
      },
      client: {
        files: {
          src: [
            'src/client/**/*.ts',
            'src/client/**/*.tsx',
            '!src/client/**/*.spec.ts'
          ]
        }
      },
      server: {
        files: {
          src: [
            'src/server/**/*.ts',
            '!src/server/**/*.spec.ts'
          ]
        }
      }
    },

    eslint: {
      options: {
        configFile: 'eslint.json'
      },
      client: {
        files: {
          src: [
            'src/client/**/*.js',
            'src/client/**/*.jsx',
            '!src/client/**/*.spec.js'
          ]
        }
      },
      server: {
        files: {
          src: [
            'src/server/**/*.js',
            '!src/server/**/*.spec.js'
          ]
        }
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
      client: {
        src: ['src/client/**/*.spec.ts', 'src/client/**/*.spec.js']
      },
      server: {
        src: ['src/server/**/*.spec.ts', 'src/server/**/*.spec.ts']
      }
    },
    
    clean: {
      dist: ['dist/**/*']
    }

  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-prettier');

  grunt.registerTask('test:client', [
    'prettier:client',
    'tslint:client',
    'eslint:client',
    'mochaTest:client'
  ]);

  grunt.registerTask('test:server', [
    'prettier:server',
    'tslint:server',
    'eslint:server',
    'mochaTest:server'
  ]);
  
  grunt.registerTask('test', [
    'test:client',
    'test:server'
  ]);

  grunt.registerTask('build:client', [
    'test:client',
    'webpack:dev'
  ]);

  grunt.registerTask('start:client', [
    'test:client',
    'webpack-dev-server'
  ]);

  grunt.registerTask('build:server', [
    'test:server',
    'ts'
  ]);

  grunt.registerTask('build', [
    'test',
    'clean:dist',
    'ts',
    'webpack:dist'
  ]);

};