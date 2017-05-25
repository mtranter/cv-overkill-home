export class ShortDateValueConverter {
  format = new Intl.DateTimeFormat(navigator.language);
  toView(value) {
    return format.format(value);
  }
}
