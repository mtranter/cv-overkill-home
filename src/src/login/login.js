import {inject} from 'aurelia-framework';
import {AuthService} from './../auth/auth-service';


@inject(AuthService)
export class Login{
    constructor(auth){
        this.auth = auth;
    };

    heading = 'Login';

    authenticate(name){
        return this.auth.authorize(name);
    }
}
