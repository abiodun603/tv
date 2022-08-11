import moment from 'moment';

export function valEmail(text) {
  let re =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(String(text).toLowerCase());
}

export function valPhone(text) {
  let re = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

  return !text || re.test(String(text).toLowerCase());
}

export function valPassword(text) {
  return text != null && text.length >= 6;
}

export function valDate(date) {
  return moment(date, 'yyyy-MM-dd').isValid();
}

export function valText(text) {
  return text != null && text.length > 0;
}

export function valMessage(text) {
  return text != null && text.length > 10;
}
