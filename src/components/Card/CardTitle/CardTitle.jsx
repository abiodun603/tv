import React, { FC } from 'react';
import classNames from 'classnames';
import { Card } from 'react-bootstrap';

import style from './CardTitle.module.scss';

import getFontSizeForCardTitle from '../../../lib/hooks/useFontSIzeForTitle';

const CardTitle = ({ title, isWhite = false }) => {
  if (!title) {
    return null;
  }

  return (
    <Card.Title
      className={classNames(
        isWhite ? style.cardTitleWhite : style.cardTitle,
        'mb-0',
      )}
      style={{
        fontSize: `${getFontSizeForCardTitle(title)}px`,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      {title}
    </Card.Title>
  );
};

export default CardTitle;
