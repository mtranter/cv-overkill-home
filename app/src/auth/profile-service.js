import {HttpClient} from 'aurelia-fetch-client'
import {inject} from 'aurelia-framework'

@inject(HttpClient)
export class ProfileService {
  _profile = null
  constructor(http){
    this.http = http
  }
  getProfile(){
    if(_profile) return Promise.resolve(_profile);
    return new Promise((resolve, reject) => {
      this.http.fetch('https://marktranter.eu.auth0.com/userinfo').then(d => {
        resolve(d.json());
      })
    });
  }
}
