import {inject, bindable, bindingMode,inlineView, viewResources} from 'aurelia-framework';
import $ from 'jquery'
import datepicker from 'bootstrap-datepicker'
import {DOM} from 'aurelia-pal'
import dateFormatter from './../../../common/date-formatter'


@inlineView(`<template>
    <input ref="editor" placeholder.bind="placeholder" class.bind="cssClass"></input>
</template>`)
@viewResources('bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css')
@inject(Element)
export class DatePickerCustomElement {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable placeholder;
  @bindable cssClass;
  bind(){
    $(this.editor).datepicker({
      format: {
          toDisplay:  (date, format, language) => {
              return dateFormatter.toView(date);
          },
          toValue:  (date, format, language) => {
              return dateFormatter.fromView(date);
          }
        }
      }).on('changeDate', d => {
        this.value = d.date.toISOString();
      });
      $(this.editor).datepicker('setDate', new Date(Date.parse(this.value)));
  }
}
