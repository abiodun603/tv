import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import { ListView } from './ListView/ListView';
import CardMusic from './cards/CardMusic';

import { PARAM_LIMIT_L } from '../constants/API';

import * as urlGenerator from '../lib/url/generator';
import { SkeletonVertical } from './widgets/Skeletons';
import { MUSIC_RECENT } from '../constants/types';

const types = ['trending', 'new', 'popular', 'recent', 'musicVideo'];

const titles = {
  trending: 'Trending Music',
  new: 'Latest Music',
  popular: 'Popular Music',
  recent: 'Recently Played',
  musicVideo: 'Music Videos',
};

const Music = inject('music')(
  observer((props) => {
    const { music } = props;
    const { list: videos } = music;

    useEffect(() => {
      types.forEach((type) => music.getList(type));
    }, []);

    const getCardType = (type, item, key) => {
      switch (type) {
        case MUSIC_RECENT: {
          return <CardMusic key={key} video={item.video} />;
        }
        default: {
          return <CardMusic key={key} video={item} />;
        }
      }
    };

    return (
      <>
        {types.map((type) => (
          <ListView
            key={type}
            title={titles[type]}
            titleUrl={urlGenerator.toMusicListVideo()}
            itemsInRow={PARAM_LIMIT_L}
            skeleton={SkeletonVertical}
            isLoading={videos[type].loading}
            prevEnable={music.canBack(type)}
            nextEnable={videos[type].hasMore}
            onPrev={() => music.getList(type, false)}
            onNext={() => music.getList(type, true)}
          >
            {videos[type].media.map((item, key) =>
              getCardType(type, item, key),
            )}
          </ListView>
        ))}
      </>
    );
  }),
);

export default Music;
