import {inject} from 'aurelia-framework';
import $ from 'jquery'
import datepicker from 'bootstrap-datepicker'
import css from 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css!text'
import {DOM} from 'aurelia-pal'
import dateFormatter from './../../common/date-formatter'

let stylesLoaded = false;

@inject(Element)
export class DatePickerCustomAttribute {
  constructor(element){
    this.element = element;
  }
  bind(){
    $(this.element).datepicker({format: {
        toDisplay:  (date, format, language) => {
              return dateFormatter.toView(date);
          },
          toValue:  (date, format, language) => {
              return dateFormatter.fromView(date);
          }
        }
      });
  }
  attached(){
    if(!stylesLoaded){
      stylesLoaded = true;
      DOM.injectStyles(css);
    }
  }
}
