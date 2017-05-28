import moment from 'moment'

export class DateValueConverter {
  toView(value, format) {
    return moment().format(value, format);
  }
}
