export function configure(config) {
  config.globalResources([
    './elements/menu/menu',
    './elements/date-picker/date-picker',
    './elements/html-editor/html-editor',
    './value-converters/short-date-value-converter.js',
    './value-converters/sort.js']);
}
