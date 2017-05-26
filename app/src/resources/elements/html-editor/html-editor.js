import {bindable, bindingMode, inject} from 'aurelia-framework';
import editor from 'bootstrap-wysiwyg'
import css from 'bootstrap-wysiwyg/css/style.css!text'
import {DOM} from 'aurelia-pal'

let stylesLoaded = false;

@inject(Element)
export class HtmlEditorCustomElement {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value = ""
  constructor(element){
    this.element = element;
  }
  bind(){
    let div = this.element.getElementsByTagName('div')[0];
    $(div).wysiwyg();
  }
  attached(){
    if(!stylesLoaded){
      stylesLoaded = true;
      DOM.injectStyles(css);
    }
  }
}
