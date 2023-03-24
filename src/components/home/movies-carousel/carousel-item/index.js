import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import { ThreeDotsLoader } from '../../../ui/spiner';
import { getPoster } from '../../../../utils/pathUtil';
import { getTags } from '../../../../utils/formate';

import css from './carousel-item.module.scss';

import * as url from '../../../../lib/url/generator';
import Image from 'next/image';

const formatSubText = (...args) => args.filter(Boolean).join(' - ');

export const CarouselItem = ({ video, active = false }) => {
  return (
    <Link href={url.toFilmDetails(video.id)}>
      <div
        className={classNames(
          css.element,
          active && css.active,
          'cursor-pointer',
        )}
      >
        <Image src={getPoster(video.poster_h)} alt="" />

        <span className={css.text}>
          <Link href={url.toFilmDetails(video.id)}>
            {video.title}
          </Link>
          <br />
          <span className={css.subText}>
            {formatSubText(video.year, getTags(video.tags))}
          </span>
        </span>
      </div>
    </Link>
  );
};

export const LoadingCarousel = () => (
  <div className={classNames(css.element, 'd-flex align-items-center')}>
    <ThreeDotsLoader />
  </div>
);
