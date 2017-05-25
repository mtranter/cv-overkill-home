import {inject} from 'aurelia-framework';
import $ from 'jquery'
import datepicker from 'bootstrap-datepicker'
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css!text'

@inject(Element)
export class DatePickerCustomAttribute {

  constructor(element){
    console.log(datepicker);
    $(element).datepicker({format: "dd/mm/yyyy"});
  }
}
