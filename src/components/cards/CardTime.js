import { getTime } from '../../utils/formate';

export function CardTime({ value }) {
  return (
    <div>
      <span className="ml-1">ENDS IN: {getTime(value)}</span>
    </div>
  );
}
