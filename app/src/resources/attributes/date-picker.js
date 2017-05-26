import {inject} from 'aurelia-framework';
import $ from 'jquery'
import datepicker from 'bootstrap-datepicker'
import css from 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css!text'
import {DOM} from 'aurelia-pal'

let stylesLoaded = false;

@inject(Element)
export class DatePickerCustomAttribute {
  format = new Intl.DateTimeFormat(navigator.language);
  constructor(element){
    $(element).datepicker({format: {
        toDisplay: function (date, format, language) {
              return this.format.format(Date.parse(value));
          },
          toValue: function (date, format, language) {
              let [d,m,y] = data.split('/');
              return new Date(y,m + 1,d);
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
