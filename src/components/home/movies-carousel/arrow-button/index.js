import React from 'react';
import classNames from 'classnames';

import css from './arrow-button.module.scss';

import Arrow from '../../../../../public/icon/arrow.svg';

export const ArrowButton = ({
  children,
  position = null,
  type = 'button',
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      className={classNames(css.arrow, className, {
        [css.left]: position === 'left',
        [css.right]: position === 'right',
      })}
    >
      <Arrow />
    </button>
  );
};
