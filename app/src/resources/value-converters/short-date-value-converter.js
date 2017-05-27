import moment from 'moment'

export class DateValueConverter {
  format = new Intl.DateTimeFormat(navigator.language);
  toView(value, format) {
    return moment().format(format);
  }
}
