import dateFormatter from './../../common/date-formatter'

export class ShortDateValueConverter {
  format = new Intl.DateTimeFormat(navigator.language);
  toView(value) {
    return value ? dateFormatter.toView(value) : null;
  }
  fromView(value) {
    return value ? dateFormatter.fromView(value) : null;
  }
}
