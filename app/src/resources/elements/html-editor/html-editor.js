import {bindable, bindingMode, inject} from 'aurelia-framework';
import bs from 'bootstrap'
import summernote from 'summernote'
import css from 'summernote/dist/summernote.css!text'
import {DOM} from 'aurelia-pal'

let stylesLoaded = false;
let isNodeRegex

@inject(Element)
export class HtmlEditorCustomElement {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value = ""
  constructor(element){
    this.element = element;
  }
  bind(){
    let div = this.element.getElementsByTagName('div')[0];
    $(div).summernote({
      callbacks: {
        onChange: (contents, $editable) => {
          this.value = contents;
        }
      }
    });
    if(this.value) $(div).summernote('insertNode', $(`<div>${this.value}</div>`)[0]);
  }
  attached(){
    if(!stylesLoaded){
      stylesLoaded = true;
      DOM.injectStyles(css);
    }
  }
}
