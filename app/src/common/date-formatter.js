class DateFormatter {
  format = new Intl.DateTimeFormat(navigator.language);
  toView(value) {
    return this.format.format(Date.parse(value));
  }
  fromView(value) {
    return new Date(Date.parse(value));
  }
}

export default new DateFormatter();
