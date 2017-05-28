import {
    bindable,
    bindingMode,
    inlineView,
    customElement,
    Container,
    inject,
    BindingEngine
} from 'aurelia-framework';
import Quill from 'quill';
let defaultConfig = {
        modules: { toolbar: true },
        theme: 'snow'
    };

@inlineView(`<template>
  <require from="quill/dist/quill.snow.css"></require>
    <div ref="editorEl"></div>
</template>`)
@customElement('html-editor')
@inject(BindingEngine)
export class HtmlEditor {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable options; // per instance options
    subscription = () => {}
    constructor(bindingEngine){
      this.bindingEngine = bindingEngine;
      this.subscription = bindingEngine.propertyObserver(this, 'value')
      .subscribe((newValue, oldValue) => this.editor.root.innerHTML = this.value);
    }
    bind() {
        // merge the global options with any instance options
        this.options = Object.assign({}, defaultConfig, this.options);
    }

    attached() {
        // initialize a new instance of the Quill editor
        // with the supplied options
        this.editor = new Quill(this.editorEl, this.options);
        if (this.value) {
            this.editor.root.innerHTML = this.value;
        }
        // listen for changes and update the value
        this.editor.on('text-change', (this.onTextChanged));
    }

    onTextChanged = () => {
        this.value = this.editor.root.innerHTML;
    }

    detached() {
        // clean up
        this.subscription.dispose();
        this.editor.off('text-change', this.onTextChanged);
        this.editor = null;
    }
}
