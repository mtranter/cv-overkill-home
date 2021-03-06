module.exports = {
  "bundles": {
    "dist/app-build": {
      "includes": [
        "[**/*.js]",
        "**/*.html!text",
        "**/*.css!text"
      ],
      "excludes":[
        "aws-sdk-2.50.0.min.js"
      ],
      "options": {
        "inject": true,
        "minify": true,
        "depCache": true,
        "rev": false
      }
    },
    "dist/vendor": {
      "includes":[
        "bootstrap",
        "bootstrap/css/bootstrap.css!text",
        "fetch",
        "cferdinandi/smooth-scroll",
        "bootstrap-slider",
        "bootstrap-slider/dist/css/bootstrap-slider.min.css!text",
        "bootstrap-datepicker",
        "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css!text",
        "quill",
        "quill/dist/quill.snow.css!text",
        "moment"
      ],
      "options": {
        "inject": true,
        "minify": true,
        "depCache": true,
        "rev": false
      }
    },
    "dist/aurelia": {
      "includes": [
        "aurelia-framework",
        "aurelia-bootstrapper",
        "aurelia-fetch-client",
        "aurelia-router",
        "aurelia-animator-css",
        "aurelia-templating-binding",
        "aurelia-pal",
        "aurelia-pal-browser",
        "aurelia-polyfills",
        "aurelia-templating-resources",
        "aurelia-templating-router",
        "aurelia-loader-default",
        "aurelia-history-browser",
        "aurelia-logging-console"
      ],
      "options": {
        "inject": true,
        "minify": true,
        "depCache": false,
        "rev": false
      }
    }
  }
};
