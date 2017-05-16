import {inject} from 'aurelia-framework';
import {AuthService} from './../auth/auth-service';
import {Router} from 'aurelia-router';

@inject(AuthService, Router)
export class Login{
    constructor(auth, route){
        this.auth = auth;
        this.route = route;
    };

    heading = 'Login';

    authenticate(name){
        return this.auth.authorize(name)
          .then(() => this.doRedirect());
    }
    activate(){
      if(this.auth.isAuthenticated()){
        this.doRedirect()
      }
    }
    doRedirect(){
      this.route.navigate(this.auth.getLoginRedirect());
    }
}
