import {inject} from 'aurelia-framework'
import {HttpClient} from 'aurelia-fetch-client'
import {AwsRoleManager} from './aws/aws-role-manager'
import AWS from 'AWS';
import {Storage} from './../common/storage'
import jwt from './jwt'

const token_regex = new RegExp("[\?&#]id_token=([^&]*)");
const access_regex = new RegExp("[\?&#]access_token=([^&]*)");
const token_storage_key = 'auth0.jwt';

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

function parseJwt(token){
  if (!token.split('.').length !== 3) {
    throw 'Invalid JWT';
  }

  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}

@inject(AwsRoleManager, PopupFactory, Storage, HttpClient)
export class AuthService {
  static initialize() {
    let storage = new Storage();
    let authCreds = storage.get(token_storage_key);
    let creds;
    if(authCreds && !jwt.tokenExpired(authCreds)) {
      creds = {}
      creds['marktranter.eu.auth0.com'] = authCreds;
    }
    return AwsRoleManager.initialize(creds);
  }
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
              console.log(access[1])
              win.close();
              if( results == null ){
                reject(`No auth token supplied in callback from ${provider}`)
              }
              else {
                this.storage.set(token_storage_key, results[1]);
                resolve(this.roleManager.setToken('marktranter.eu.auth0.com', results[1]));
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
  get tokenInterceptor() {
    let storage = this.storage;
    let auth = this;
    return {
      request(request) {
        if (auth.isAuthenticated()) {
          let token = storage.get(token_storage_key);
          token = `Bearer ${token}`;
          request.headers.set('Authorization', token);
        }
        return request;
      }
    };
  }
  isAuthenticated() {
    if(!this.roleManager.isAuthenticated()){
      return false;
    }
    let token = this.storage.get(token_storage_key);
    return token && !jwt.tokenExpired(token);
  }
  setInitialUrl(url) {
    this.initialUrl = url;
  }
  getLoginRedirect() {
   return this.initialUrl || '#/home';
 }
}
