import {inject} from 'aurelia-framework';
import {HomeWidgetsService} from './home-widgets-service';
import smoothScroll from 'cferdinandi/smooth-scroll'
import aws from 'AWS'

@inject(HomeWidgetsService)
export class Index {
  constructor(widgetService) {
    this.widgets = widgetService.widgets
  }
  attached() {
    smoothScroll.init();
  }
}
