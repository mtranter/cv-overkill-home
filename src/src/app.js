import {All, inject} from 'aurelia-framework';
import {LayoutService} from './layout-service'

@inject(All.of('plugin.route'), All.of('plugin.widget.homepage.component'), LayoutService)
export class App {
  constructor(routes, widgets, layoutService) {
    this.message = 'Hello World!';
    this.pluginRoutes = routes
    this.widgets = widgets;
    this.layoutService = layoutService;
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
