import {All, inject} from 'aurelia-framework';

@inject(All.of('plugin.route'), All.of('plugin.widget.homepage.component'))
export class App {
  constructor(routes, widgets) {
    this.message = 'Hello World!';
    this.pluginRoutes = routes
    this.widgets = widgets;
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
