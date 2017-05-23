import {inject} from 'aurelia-framework';
import $ from 'jquery'
import datepicker from 'bootstrap-datepicker'

@inject(Element)
export class DatePickerCustomAttribute {

  constructor(element){
    console.log(datepicker);
    $(element).datepicker({format: "dd/mm/yyyy"});
  }
}
