import {All, inject} from 'aurelia-framework';

@inject(All.of('plugin.admin.route'))
export class Index {
  constructor(routes) {
    this.pluginRoutes = routes
  }
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Admin';
    let routes = [
      { route: ['admin', 'admin/home'],       name: 'admin-home',       moduleId: 'admin/home/index' }
    ].concat(this.pluginRoutes);

    config.map(this.routes);
  }
}
