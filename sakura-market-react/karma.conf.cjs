module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      { pattern: 'src/assets/img/**/*.*', included: false, served: true },
      { pattern: 'src/data/db.js', type: 'module', included: false, served: true },
      { pattern: 'tests/db.spec.js', type: 'module' }
    ],
    proxies: {
      '/src/': '/base/src/'
    },
    exclude: [],
    preprocessors: {},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity
  });
};