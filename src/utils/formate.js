import {
  intervalToDuration,
  format,
  formatDistanceToNow,
  differenceInDays,
} from 'date-fns';
import numeral from 'numeral';
import { NEWS } from '../constants/tags';

export const getDate = (date) => {
  return differenceInDays(new Date(), new Date(date)) >= 1
    ? format(new Date(date), 'dd/MM/yyyy')
    : formatDistanceToNow(new Date(date), {
        addSuffix: true,
        includeSeconds: true,
      });
};

export const getTime = (date) => {
  let interval = intervalToDuration({
    start: new Date(),
    end: new Date(date),
  });

  return format(new Date(), 'dd:HH:mm:ss');
};

export const getTags = (tags) => {
  if (Array.isArray(tags)) {
    const array = [...tags];
    if (array[tags.length - 1] === NEWS) {
      array.pop();
      return array.slice(0, 3).join(' / ');
    }
    return array.slice(0, 3).join(' / ');
  }
};

export const getNumber = (value) => {
  return numeral(value).format('0a');
};

export const getVideoLength = (media) => {
  if (media && media.length > 0 && media[0].video_length != null) {
    let length = media[0].video_length;
    return `${length / 60}h ${length % 60}m`;
  } else {
    return `0h 00m`;
  }
};
