import {inject} from 'aurelia-framework';
import $ from 'jquery'
import datepicker from 'bootstrap-datepicker'
import css from 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css!text'
import {DOM} from 'aurelia-pal'

@inject(Element)
export class DatePickerCustomAttribute {

  constructor(element){
    console.log(datepicker);
    $(element).datepicker({format: "dd/mm/yyyy"});
  }
  attached(){
    DOM.injectStyles(css);
  }
}
