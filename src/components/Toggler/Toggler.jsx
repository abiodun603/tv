import React from 'react';

import style from './Toggler.module.scss';

export default function Toggler({
  id,
  title,
  onChange,
  checked = false,
  disabled,
}) {
  const titleElem = title && (
    <label className={style.Toggler__Label} htmlFor={id}>
      {title}
    </label>
  );

  return (
    <div className={style.Toggler}>
      {titleElem}
      <div className={style.Toggler__Controller}>
        <input
          type="checkbox"
          className={style.Toggler__Input}
          checked={checked}
          id={id}
          onChange={onChange}
          disabled={disabled}
        />
        <label className={style.Toggler__Marker} htmlFor={id}>
          <span></span>
        </label>
      </div>
    </div>
  );
}
