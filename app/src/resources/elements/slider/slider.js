import {inject, bindable, bindingMode} from 'aurelia-framework';
import Slider from 'bootstrap-slider'

@inject(Element)
export class SliderCustomElement {
  // https://github.com/seiyria/bootstrap-slider#user-content-options
  @bindable opts = { }
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value = 0;
  constructor(el) {
    this.el = el
  }
  bind() {
    let slider = new Slider(this.el, this.opts);
    slider.on('change', o => this.value = o.newValue);
    slider.setValue(this.value);
  }
}
