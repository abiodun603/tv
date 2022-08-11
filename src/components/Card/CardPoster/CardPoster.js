import React, { FC } from 'react';
import classNames from 'classnames';
import { Image } from 'react-bootstrap';
import AspectRatio from 'react-aspect-ratio';

import style from './CardPoster.module.scss';

const CardPoster = ({
  imgUrl,
  maxWidth,
  ratio,
  children,
  hasPlay,
}) => {
  if (!imgUrl) {
    return null;
  }

  return (
    <div className={style.poster}>
      <AspectRatio
        className={style.ratio}
        ratio={ratio}
        style={{
          maxWidth: maxWidth ? `${maxWidth}px` : 'none',
        }}
      >
        <div
          className={classNames(style.wrapper, {
            [style.wrapper_withInfo]: Boolean(children),
          })}
        >
          <Image className={style.image} src={imgUrl} />
          {hasPlay ? <div className={style.play} /> : null}
          {children}
        </div>
      </AspectRatio>
    </div>
  );
};

export default CardPoster;
