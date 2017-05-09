import {All, inject} from 'aurelia-framework';

@inject(All.of('plugin.route'), All.of('plugin.widget.homepage.component'))
export class Index {
  constructor(widgets) {
    this.widgets = widgets;
  }
}
