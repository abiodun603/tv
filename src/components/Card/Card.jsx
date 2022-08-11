import React, { FC } from 'react';
import classNames from 'classnames';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import style from './Card.module.scss';

const CardElement = ({ url, className, children, full, transparent }) => {
  return (
    <Card
      style={{ cursor: 'pointer' }}
      className={classNames(
        style.card,
        { [style.cardTransparent]: transparent },
        className
      )}
    >
      <Link href={url}>
        <Card.Body className={full ? 'p-0' : ''}>{children}</Card.Body>
      </Link>
    </Card>
  );
};

export default CardElement;
