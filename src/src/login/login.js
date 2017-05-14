import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import AWS from 'AWS';

@inject(AuthService)
export class Login{
    constructor(auth){
        this.auth = auth;
    };

    heading = 'Login';

    authenticate(name){
        return this.auth.authenticate(name, false, null)
        .then((response)=>{
            console.log("auth response " + response);
            AWS.config.credentials.params.Logins['graph.facebook.com'] = response;
            AWS.config.credentials.params.Logins = {};
            AWS.config.credentials.expired = true;
        });
    }
}
