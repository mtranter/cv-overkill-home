import environment from './environment';
import AWS from 'AWS'
import {initialize} from 'aurelia-pal-browser'
import {PLATFORM} from 'aurelia-pal'
import {AuthService} from './auth/auth-service'
//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});


AWS.config.region = 'eu-west-1';


export function configure(aurelia) {
  console.log(aurelia)

  initialize();
  let cfg = aurelia.use
    .standardConfiguration()
    .feature('resources');


  if(PLATFORM.location.origin.indexOf('http://localhost') === -1){
    cfg
    .plugin({moduleId: 'experience/plugin', resourcesRelativeTo:['experience',''], config:{}} )
    .plugin({moduleId: 'profile/plugin', resourcesRelativeTo:['profile',''], config:{}});
  }

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }


  AuthService.initialize().then(() =>
  aurelia.start().then(() => {
    aurelia.setRoot()
  }));
}
