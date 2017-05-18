import {inject} from 'aurelia-framework';
import {HomeWidgetsService} from './home-widgets-service';
import smoothScroll from 'cferdinandi/smooth-scroll'
import aws from 'AWS'
const widgetOrder = ['profile','experience'];

@inject(HomeWidgetsService)
export class Index {
  constructor(widgetService) {
    console.log(aws)
    this.widgets = widgetService.widgets
  }
  attached() {
    smoothScroll.init();
  }
}
