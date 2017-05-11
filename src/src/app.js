import {All, inject} from 'aurelia-framework';

@inject(All.of('plugin.route'))
export class App {
  constructor(routes) {
    this.message = 'Hello World!';
    this.pluginRoutes = routes
  }
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Aurelia';
    let routes = [
      { route: ['', 'home'],       name: 'home',       moduleId: 'home/index' },
      { route: ['me'],       name: 'me',       moduleId: 'me/index' }
    ].concat(this.pluginRoutes);

    config.map(routes);
  }
}
