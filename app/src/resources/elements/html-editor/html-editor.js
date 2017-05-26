import {
    bindable,
    bindingMode,
    inlineView,
    customElement,
    Container
} from 'aurelia-framework';
import Quill from 'quill';
let defaultConfig = {
        modules: { toolbar: true },
        theme: 'bubble'
    };

@inlineView(`<template>
  <require from="quill/dist/quill.bubble.css"></require>
    <div ref="editor"></div>
</template>`)
@customElement('html-editor')
export class HtmlEditor {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable options; // per instance options

    bind() {
        // merge the global options with any instance options
        this.options = Object.assign({}, defaultConfig, this.options);
    }

    attached() {
        // initialize a new instance of the Quill editor
        // with the supplied options
        this.editor = new Quill(this.editor, this.options);
        if (this.value) {
            this.editor.root.innerHTML = this.value;
        }
        // listen for changes and update the value
        this.editor.on('text-change', this.onTextChanged);
    }

    onTextChanged = () => {
        this.value = this.editor.root.innerHTML;
    }

    detached() {
        // clean up
        this.editor.off('text-change', this.onTextChanged);
        this.editor = null;
    }
}
