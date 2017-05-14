import environment from './environment';
import AWS from 'AWS'
import config from './auth-config';
//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'eu-west-1:ed8b4abf-c3e3-4497-a27d-dfa3c548287c'
});
AWS.config.region = 'eu-west-1';


export function configure(aurelia) {
  console.log(aurelia)
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .plugin('aurelia-auth', (baseConfig)=>{
         baseConfig.configure(config);
    })
    .plugin({moduleId: 'experience/plugin', resourcesRelativeTo:['experience',''], config:{}} )
    .plugin({moduleId: 'profile/plugin', resourcesRelativeTo:['profile',''], config:{}});

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
