import config from './auth-config'
import AWS from 'AWS';
const token_regex = new RegExp("[\?&#]access_token=([^&]*)");

export class AuthService {
  authorize(provider){
    return new Promise((resolve,reject) => {
      let cfg = config.providers[provider];
      if(!cfg) {
        reject(`No config found for provider ${provider}`);
        return;
      }
      let win = window.open(`${cfg.authorizationEndpoint}/?response_type=token&client_id=1078560385532336&redirect_uri=${window.location.origin}`, "Login", `width=${cfg.popupOptions.width}, height=${cfg.popupOptions.height}`);
      win.focus();
      var pollTimer = window.setInterval(() => {
        try {
            if (win.document.URL.indexOf(window.location.origin) != -1) {
              window.clearInterval(pollTimer);
              let results = token_regex.exec(win.document.URL);
              win.close();
              if( results == null ){
                reject(`No auth token supplied in callback from ${provider}`)
              }
              else{
                AWS.config.credentials.params.Logins = {};
                AWS.config.credentials.params.Logins['graph.facebook.com'] = results[1];
                AWS.config.credentials.expired = true;
                AWS.config.credentials.refresh(() => {
                  var id = AWS.config.credentials._identityId;
                  var logins = AWS.config.credentials.params.Logins;
                  var params = {IdentityId: id, Logins: logins};
                  AWS.config.credentials.cognito.getOpenIdToken(params, (e,d) => {
                    console.log(d);
                  })
                });
              }
            }
        } catch(e) {
        }
      }, 100);
    });
  }
}
