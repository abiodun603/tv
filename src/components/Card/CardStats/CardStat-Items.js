import { IoIosThumbsUp, IoIosEye } from 'react-icons/io';
import { MdComment } from 'react-icons/md';
import { getNumber } from '../../../utils/formate';

export function CardStatsViews({ value }) {
  return (
    <div>
      <IoIosEye />
      <span className="m-1">{getNumber(value)}</span>
    </div>
  );
}

export function CardStatsLike({ value }) {
  return (
    <div>
      <IoIosThumbsUp />
      <span className="m-1">{getNumber(value)}</span>
    </div>
  );
}

export function CardStatsComment({ value }) {
  return (
    <div>
      <MdComment />
      <span className="m-1">{getNumber(value)}</span>
    </div>
  );
}
