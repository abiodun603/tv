import React from 'react';

import css from './blur.module.scss';

export const BlurOverlay = ({ children, className }) => {
  return (
    <div className={css.container}>
      <div className={className ? css[className] : css.msg}>Coming soon</div>

      <div className={css.blur}>
        <div className={css.child}>{children}</div>
      </div>
    </div>
  );
};
