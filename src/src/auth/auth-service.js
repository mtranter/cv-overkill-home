import {inject} from 'aurelia-framework'
import config from './auth-config'
import {AwsRoleManager} from './aws/aws-role-manager'
import AWS from 'AWS';
const token_regex = new RegExp("[\?&#]id_token=([^&]*)");

//Internal class. Mock in tests
class BrowerPopup {
  constructor(win){
    this.win = win;
  }
  get url(){
    return this.win.document.URL;
  }
  close() {
    this.win.close();
  }
  focus() {
    this.win.focus();
  }
}

export class PopupFactory {
  openPopup(cfg){
    let win = window.open(cfg.url, "Login", `width=${cfg.popupOptions.width}, height=${cfg.popupOptions.height}`);
    return new BrowerPopup(win);
  }
}

@inject(AwsRoleManager, PopupFactory)
export class AuthService {
  constructor(roleManager, popupFactory){
    this.roleManager = roleManager;
    this.popupFactory = popupFactory;
  }
  authorize(provider){
    return new Promise((resolve,reject) => {
      let cfg = {
              //https://marktranter.eu.auth0.com/authorize?scope=openid%20name%20email%20nickname&response_type=token&state=my-custom-state&sso=false&connection=github&client_id=k0BkgOePRLeWAr4PoIur8mz0TknuoVQr&redirect_uri=https%3A%2F%2Fmarktranter.eu.webtask.io%2Fauth0-authentication-api-debugger&auth0Client=eyJuYW1lIjoiYXV0aDAuanMiLCJ2ZXJzaW9uIjoiNi44LjQifQ
        url: `https://marktranter.eu.auth0.com/authorize?scope=openid%20name%20email%20nickname&client_id=k0BkgOePRLeWAr4PoIur8mz0TknuoVQr&response_type=token&connection=${provider}&prompt=consent&redirect_uri=http://www.marktranter.com`,
        popupOptions: {
          width:320,
          height:620
        }
      }
      let win = this.popupFactory.openPopup(cfg);
      win.focus();
      var pollTimer = window.setInterval(() => {
        try {
            if (win.url.indexOf(window.location.origin) != -1) {
              window.clearInterval(pollTimer);
              let results = token_regex.exec(win.url);
              win.close();
              if( results == null ){
                reject(`No auth token supplied in callback from ${provider}`)
              }
              else{
                return this.roleManager.setToken('marktranter.eu.auth0.com', results[1])
              }
            }
        } catch(e) {
        }
      }, 100);
    });
  }
}
