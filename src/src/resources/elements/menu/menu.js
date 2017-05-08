import {inject} from 'aurelia-framework'
import {LayoutService} from './../../../layout-service'
@inject(LayoutService)
export class MenuCustomElement {
  constructor(layoutService){
    this.layoutService = layoutService;
  }
  toggleMenu() {
    this.layoutService.toggleMenu();
  }
}
