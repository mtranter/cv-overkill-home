import {inject} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import {AuthService} from './auth-service'
import {PLATFORM} from 'aurelia-pal'

@inject(AuthService)
export class AuthorizeStep {
  constructor(authService){
    this.authService = authService;
  }
  run(routingContext, next) {
    let isLoggedIn = this.authService.isAuthenticated();
    let loginRoute = 'login';

    if (routingContext.getAllInstructions().some(i => i.config.auth)) {
      if (!isLoggedIn) {
        this.authService.setInitialUrl(PLATFORM.location.href);
        return next.cancel(new Redirect(loginRoute));
      }
    } else if (isLoggedIn && routingContext.getAllInstructions().some(i => i.fragment === loginRoute)) {
      let loginRedirect = this.authService.getLoginRedirect();
      return next.cancel(new Redirect(loginRedirect));
    }

    return next();
  }
}
