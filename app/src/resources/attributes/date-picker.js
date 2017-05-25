import {inject} from 'aurelia-framework';
import $ from 'jquery'
import datepicker from 'bootstrap-datepicker'
import css from 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css!text'
import {DOM} from 'aurelia-pal'

let stylesLoaded = false;

@inject(Element)
export class DatePickerCustomAttribute {
  constructor(element){
    console.log(datepicker);
    $(element).datepicker({format: "dd/mm/yyyy"});
  }
  attached(){
    if(!stylesLoaded){
      stylesLoaded = true;
      DOM.injectStyles(css);
    }
  }
}
