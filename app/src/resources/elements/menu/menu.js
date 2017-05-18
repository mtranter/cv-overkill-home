import {inject} from 'aurelia-framework'
import {HomeWidgetsService} from './../../../home/home-widgets-service'

@inject(HomeWidgetsService)
export class MenuCustomElement {
  showMenu = false;
  constructor(widgetsSvc){
    this.widgets = widgetsSvc.widgets;
  }
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
