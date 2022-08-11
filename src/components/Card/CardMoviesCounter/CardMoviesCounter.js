import React, { FC } from 'react';

import style from './CardMoviesCounter.module.scss';

const CardMoviesCounter = ({ count = 0 }) => {
  return <span className={style.counter}>{count} movies</span>;
};

export default CardMoviesCounter;
