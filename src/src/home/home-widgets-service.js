import {All, inject} from 'aurelia-framework';

const widgetOrder = ['profile','experience'];

@inject(All.of('plugin.widget.homepage.component'))
export class HomeWidgetsService {
  constructor(widgets) {
    this.widgets = widgets.slice().sort((a,b) => widgetOrder.indexOf(a.name) - widgetOrder.indexOf(b.name));
  }
  get homeWidget(){
    
  }
}
