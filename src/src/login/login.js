import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {PLATFORM} from 'aurelia-pal-browser'
import AWS from 'AWS';

@inject(HttpClient)
export class Login{
    constructor(http){
        this.http = http;
    };

    heading = 'Login';

    authenticate(name){
        return this.auhttp.fetch(`https://www.facebook.com/v2.9/dialog/oauth?
  client_id=1078560385532336
  &redirect_uri=${PLATFORM.location.origin + '/auth/facebook'}`)
        .then((response)=>{
            console.log("auth response " + response);
            AWS.config.credentials.params.Logins['graph.facebook.com'] = response;
            AWS.config.credentials.params.Logins = {};
            AWS.config.credentials.expired = true;
        });
    }
}
