import React, { FC } from 'react';
import classNames from 'classnames';
import { Card } from 'react-bootstrap';

import style from './CardMeta.module.scss';

const CardMeta = ({ content }) => {
  if (!content || !content.length) {
    return null;
  }

  return (
    <Card.Text className={classNames(style.meta)}>
      {content.filter(Boolean).join(' · ')}
    </Card.Text>
  );
};

export default CardMeta;
