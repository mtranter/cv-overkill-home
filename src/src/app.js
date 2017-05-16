import {All, inject} from 'aurelia-framework';
import {AuthorizeStep} from './auth/authorize-step'
@inject(All.of('plugin.route'))
export class App {
  constructor(routes, fetchCfg) {
    this.pluginRoutes = routes;
  }
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Aurelia';
    config.addPipelineStep('authorize', AuthorizeStep);
    let routes = [
      { route: ['', 'home'],       name: 'home',       moduleId: 'home/index' },
      { route: ['admin'],       name: 'admin',       moduleId: 'admin/index', auth:true  },
      { route: ['login'],       name: 'login',       moduleId: 'login/login' },
      { route: ['auth/facebook'],       name: 'facebook-login',       moduleId: 'login/login' }
    ].concat(this.pluginRoutes);

    config.map(routes);
  }
}
