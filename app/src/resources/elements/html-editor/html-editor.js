import {bindable, bindingMode, inject} from 'aurelia-framework';
import summernote from 'summernote'
import css from 'summernote/dist/summernote.css!text'
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
    $(div).summernote();
  }
  attached(){
    if(!stylesLoaded){
      stylesLoaded = true;
      DOM.injectStyles(css);
    }
  }
}
