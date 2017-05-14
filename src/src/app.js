import {All, inject} from 'aurelia-framework';
@inject(All.of('plugin.route'), FetchConfig)
export class App {
  constructor(routes, fetchCfg) {
    this.pluginRoutes = routes;
    this.fetchCfg = fetchCfg;
  }
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Aurelia';
    let routes = [
      { route: ['', 'home'],       name: 'home',       moduleId: 'home/index' },
      { route: ['admin'],       name: 'admin',       moduleId: 'admin/index' },
      { route: ['login'],       name: 'login',       moduleId: 'login/login' },
      { route: ['auth/facebook'],       name: 'facebook-login',       redirect: 'login/login' }
    ].concat(this.pluginRoutes);

    config.map(routes);
  }
  activate(){
     this.fetchCfg.configure();
   }
}
