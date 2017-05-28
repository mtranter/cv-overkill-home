import {All, inject} from 'aurelia-framework';
import {AuthorizeStep} from './auth/authorize-step'
import {FetchConfig} from './auth/auth-fetch-config';

@inject(All.of('plugin.route'), FetchConfig)
export class App {
  constructor(routes, fetchCfg) {
    this.pluginRoutes = routes;
    this.fetchCfg = fetchCfg;
  }
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Mark';
    config.addPipelineStep('authorize', AuthorizeStep);
    let routes = [
      { route: ['', 'home'],       name: 'home',       moduleId: 'home/index' },
      { route: ['admin'],       name: 'admin',       moduleId: 'admin/index', auth:true  },
      { route: ['login'],       name: 'login',       moduleId: 'login/login' },
      { route: ['auth/facebook'],       name: 'facebook-login',       moduleId: 'login/login' }
    ].concat(this.pluginRoutes);

    config.map(routes);
  }
  activate(){
   this.fetchCfg.configure();
  }
}
