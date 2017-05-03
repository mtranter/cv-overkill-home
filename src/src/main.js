import environment from './environment';
//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});



export function configure(aurelia) {
  console.log(aurelia)
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .plugin('experience/plugin');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
