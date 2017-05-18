import {inject} from 'aurelia-framework'
import {HttpClient} from 'aurelia-fetch-client'
import {AwsRoleManager} from './aws/aws-role-manager'
import AWS from 'AWS';
import {Storage} from './../common/storage'
const token_regex = new RegExp("[\?&#]id_token=([^&]*)");
const access_regex = new RegExp("[\?&#]access_token=([^&]*)");

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

@inject(AwsRoleManager, PopupFactory, Storage, HttpClient)
export class AuthService {
  constructor(roleManager, popupFactory, storage, http){
    this.roleManager = roleManager;
    this.popupFactory = popupFactory;
    this.storage = storage;
    this.http = http;
  }
  authorize(provider){
    return new Promise((resolve,reject) => {
      let cfg = {
        url: `https://marktranter.eu.auth0.com/authorize?scope=openid%20name%20email%20nickname&client_id=k0BkgOePRLeWAr4PoIur8mz0TknuoVQr&response_type=token&connection=${provider}&prompt=consent&redirect_uri=${window.location.origin}`,
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
              let access = access_regex.exec(win.url);
              win.close();
              if( results == null ){
                reject(`No auth token supplied in callback from ${provider}`)
              }
              else{
                this.storage.set('auth.jwt', results[1]);
                let rolePromise = this.roleManager.setToken('marktranter.eu.auth0.com', results[1]);
                var headers = new Headers();
                headers.append('Authorization', `Bearer ${access[1]}`);
                let profilePromise = this.http.fetch('https://marktranter.eu.auth0.com/userinfo', {headers: headers})
                  .then(r => r.json())
                  .then(d => this.storage.set('user.profile',d));
                return Promise.all([rolePromise, profilePromise]).then(resolve);
              }
            }
        } catch(e) {
        }
      }, 100);
    });
  }
  getUserProfile() {
    return this.storage.get('user.profile')
  }
  isAuthenticated() {
    if(!this.roleManager.isAuthenticated()){
      return false;
    }

    let token = this.storage.get('auth.jwt');

    // There's no token, so user is not authenticated.
    if (!token) {
      return false;
    }

    // There is a token, but in a different format. Return true.
    if (token.split('.').length !== 3) {
      return true;
    }

    let exp;
    try {
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      exp = JSON.parse(window.atob(base64)).exp;
    } catch (error) {
      return false;
    }

    if (exp) {
      return Math.round(new Date().getTime() / 1000) <= exp;
    }

    return true;
  }
  setInitialUrl(url) {
    this.initialUrl = url;
  }
  getLoginRedirect() {
   return this.initialUrl || '#/home';
 }
}
