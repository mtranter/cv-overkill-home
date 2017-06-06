import {All, inject} from 'aurelia-framework';
import aws from 'AWS'
const widgetOrder = ['profile','experience','skills'];

@inject(All.of('plugin.widget.homepage.component'))
export class HomeWidgetsService {
  constructor(widgets) {
    this.widgets = widgets.slice().sort((a,b) => widgetOrder.indexOf(a.name) - widgetOrder.indexOf(b.name));
  }
  get homeWidget(){

  }
}
