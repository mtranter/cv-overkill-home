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
    let mySlider = new Slider(this.el, this.opts);

    mySlider.on('change', o => this.value = o.newValue);
  }
}
