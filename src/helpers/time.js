import moment from 'moment';
import 'moment/locale/uz';

const time = {
  toYear: timestamp => {
    return moment.unix(timestamp).year();
  },
  current: (format = 'DD.MM.YYYY') => {
    return moment().format(format);
  },
  to: (time, format = 'DD.MM.YYYY') => {
    return moment(time).format(format);
  },
  toTime: (time, format = 'DD.MM.YYYY') => {
    return moment.unix(time).format(format);
  },
  toDate: timestamp => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  },
  toTimestamp: date => {
    return moment(date).unix();
  },
  toChat: timestamp => {
    let format = 'HH:mm';
    if (moment().diff(moment(timestamp), 'year') > 0) {
      format = 'DD.MM.YYYY HH:mm';
    } else if (moment().diff(moment(timestamp), 'day') > 0) {
      format = 'DD.MM.YYYY HH:mm';
    }
    return moment(timestamp).format(format);
  },
};

export default time;
