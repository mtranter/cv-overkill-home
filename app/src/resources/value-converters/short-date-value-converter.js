export class ShortDateValueConverter {
  format = new Intl.DateTimeFormat(navigator.language);
  toView(value) {
    return this.format.format(Date.parse(value));
  }
}
