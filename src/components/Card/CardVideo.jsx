import React, { FC } from 'react';
import { useMediaQuery } from '@material-ui/core';

import CardPoster from './CardPoster/CardPoster';
import CardStats from './CardStats/CardStats';
import CardTitle from './CardTitle/CardTitle';
import CardMeta from './CardMeta/CardMeta';
import Card from './Card';

import { getPoster } from '../../utils/pathUtil';
import { getTags } from '../../utils/formate';
import { TYPE_FILM } from '../../constants/API';

const CardVideo = ({ video = {}, className = '', maxWidthImage, full }) => {
  const isSmallWidth = useMediaQuery('(max-width:1199px)');

  if (video.video) {
    video = video.video;
  }

  // const originFontSize = 18;
  // const maxDisplayCharInLine = 20;

  // const fontSize = Math.min(
  //   originFontSize,
  //   originFontSize / (video.title.length / maxDisplayCharInLine),
  // );

  const ratio = isSmallWidth ? 1.2 : 0.8;
  return (
    <Card
      className={className}
      full={full}
      url={`/details/${TYPE_FILM}?id=${video.id}`}
    >
      <CardPoster
        ratio={ratio}
        imgUrl={getPoster(video.poster_v)}
        maxWidth={maxWidthImage}
      >
        <CardStats
          disableComments
          views={video.count_watch}
          likes={video.count_like}
        />
      </CardPoster>
      <div
        className="mt-3"
        style={{
          textOverflow: 'ellipsis',
          maxHeight: '1.25rem',
          whiteSpace: 'nowrap',
        }}
      >
        <CardTitle title={video.title} />
      </div>
      <div className="mt-3">
        <CardMeta content={[video.year, getTags(video.tags)]} />
      </div>
    </Card>
  );
};

export default CardVideo;
