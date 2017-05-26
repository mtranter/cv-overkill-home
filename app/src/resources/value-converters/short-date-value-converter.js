import dateFormatter from './../../common/date-formatter'

export class ShortDateValueConverter {
  format = new Intl.DateTimeFormat(navigator.language);
  toView(value) {
    return dateFormatter.toView(value);
  }
  fromView(value) {
    return dateFormatter.fromView(value);
  }
}
