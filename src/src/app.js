import {All, inject} from 'aurelia-framework';

@inject(All.of('plugin.route'))
export class App {
  constructor(routes) {
    this.pluginRoutes = routes
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
}
