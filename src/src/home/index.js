import {inject} from 'aurelia-framework';
import {HomeWidgetsService} from './home-widgets-service';
import smoothScroll from 'cferdinandi/smooth-scroll'

const widgetOrder = ['profile','experience'];

@inject(HomeWidgetsService)
export class Index {
  constructor(widgetService) {
    this.widgets = widgetService.widgets
  }
  attached() {
    smoothScroll.init();
  }
}
