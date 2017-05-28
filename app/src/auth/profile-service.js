import {HttpClient} from 'aurelia-fetch-client'
import {inject} from 'aurelia-framework'

@inject(HttpClient)
export class ProfileService {
  _profile = null
  constructor(http){
    this.http = http
  }
  getProfile(){
    if(this._profile) return Promise.resolve(this._profile);
    return new Promise((resolve, reject) => {
      this.http.fetch('https://marktranter.eu.auth0.com/userinfo').then(d => {
        _profile = d.json();
        resolve(_profile);
      })
    });
  }
}
