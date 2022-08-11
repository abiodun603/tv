import React from 'react';
import classNames from 'classnames';

export const Tag = ({ title, active = false, onClick }) => {
  return (
    <div
      className={classNames(
        'upload-tag mr-3 mb-3',
        active && 'upload-tag_active'
      )}
      onClick={onClick}
    >
      {title}
    </div>
  );
};
