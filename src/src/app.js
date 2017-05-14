import {All, inject} from 'aurelia-framework';
import {FetchConfig} from 'aurelia-auth';
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
      { route: ['admin'],       name: 'admin',       moduleId: 'admin/index' }
    ].concat(this.pluginRoutes);

    config.map(routes);
  }
  activate(){
     this.fetchConfig.configure();
   }
}
