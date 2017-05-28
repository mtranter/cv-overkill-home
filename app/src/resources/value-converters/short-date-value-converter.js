import moment from 'moment'

export class DateValueConverter {
  toView(format) {
    return moment(value).format(format);
  }
}
