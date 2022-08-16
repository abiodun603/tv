import React from 'react';

import CardPoster from './CardPoster/CardPoster';
import CardStats from './CardStats/CardStats';
import CardTitle from './CardTitle/CardTitle';
import CardMeta from './CardMeta/CardMeta';
import Card from './Card';

import { getPoster } from '../../utils/pathUtil';
import { getTags } from '../../utils/formate';
import { TYPE_FILM } from '../../constants/API';

const BannerCard = ({ video = {}, className = '', maxWidthImage, full }) => {
  if (video.video) {
    video = video.video;
  }
  return (
    <Card
      className={className}
      full={full}
      url={`/details/${TYPE_FILM}?id=${video.id}`}
    >
      <CardPoster
        ratio={1}
        imgUrl={getPoster(video.poster_v)}
        maxWidth={maxWidthImage}
      />
      <div
        className="mt-3"
        style={{
          textOverflow: 'ellipsis',
          maxHeight: '1.25rem',
          whiteSpace: 'nowrap',
        }}
      >
        <CardTitle title={video.title} isWhite />
      </div>
      <div className="mt-3">
        <CardMeta content={[video.year, getTags(video.tags)]} />
      </div>
    </Card>
  );
};

export default BannerCard;
