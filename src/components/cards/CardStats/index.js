import { IoIosThumbsUp, IoIosEye } from 'react-icons/io';
import { MdComment } from 'react-icons/md';
import { getNumber } from '../../../utils/formate';

export default function CardStats({ value, type }) {
  return (
    <div>
      <IoIosEye />
      <span className="m-1">{getNumber(value)}</span>
    </div>
  );
}

export function CardStatsWatch({ value }) {
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

export function CardStatsWatchDetails({ value }) {
  return (
    <div>
      <IoIosEye fill="#2b3331" />
      <span className="m-1 text-dark">{getNumber(value)}</span>
    </div>
  );
}

export function CardStatsLikeDetails({ value, enabled }) {
  return (
    <div>
      <IoIosThumbsUp fill={enabled ? '#2DBD58' : '#2b3331'} />
      <span className="m-1 text-dark">{getNumber(value)}</span>
    </div>
  );
}

export function CardStatsComment({ value, type }) {
  return (
    <div>
      <MdComment />
      <span className="m-1">{getNumber(value)}</span>
    </div>
  );
}
