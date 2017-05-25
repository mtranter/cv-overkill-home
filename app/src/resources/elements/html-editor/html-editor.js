import {bindable, bindingMode, inject} from 'aurelia-framework';
import $ from 'jquery'
import bootstrap from 'bootstrap'
import summernote from 'summernote'
import css from 'summernote/dist/summernote.css!text'
import {DOM} from 'aurelia-pal'

let stylesLoaded = false;

@inject(Element)
export class HtmlEditorCustomElement {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value = ""
  constructor(element){
    $(element).summernote();
  }
  attached(){
    if(!stylesLoaded){
      stylesLoaded = true;
      DOM.injectStyles(css);
    }
  }
}
