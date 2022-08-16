import React, { useEffect } from 'react';

import { Col } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';

import {
  PARAM_LIMIT_LARGE,
  PARAM_LIMIT_MEDIUM,
  TYPE_FILM,
  TYPE_REC,
  TYPE_USER,
} from '../constants/API';

import {
  SkeletonHorizontal,
  SkeletonHorizontalCollection,
  SkeletonVertical,
} from './widgets/Skeletons';
import CardUserVideo from './Card/CardUserVideo';
import CardVideo from './Card/CardVideo';
import CardCollection from './Card/CardCollection';
import { CardContest } from './cards/CardContest';

import * as urlGenerator from '../lib/url/generator';

import { MoviesCarousel } from './home/movies-carousel';

import { ListView } from './ListView/ListView';

const Home = inject('home')(
  observer((props) => {
    const { home: homeStore } = props;
    const { video: videoList } = homeStore;

    useEffect(() => {
      homeStore.getVideo(TYPE_USER, true, { _start: 0 });
      homeStore.getVideo(TYPE_FILM, true, { _start: 0 });
      homeStore.getCollections(true, { _start: 0 });
      homeStore.getVideoRec(true, { _start: 0 });
    }, []);

    return (
      <>
        <MoviesCarousel />

        <div className="bg-light-gray py-3 ">
          <ListView
            title="Videos"
            titleUrl={urlGenerator.toListVideo()}
            isLoading={videoList[TYPE_USER].loading}
            itemsInRow={videoList[TYPE_USER].limit}
            prevEnable={!homeStore.isPrevUser}
            nextEnable={videoList[TYPE_USER].hasMore}
            onNext={() => homeStore.getVideo(TYPE_USER, true)}
            onPrev={() => homeStore.getVideo(TYPE_USER, false)}
            skeleton={SkeletonHorizontal}
          >
            {videoList[TYPE_USER].media.map((item, key) => (
              <Col key={key} md={6} xl={3} className="mb-4">
                <CardUserVideo video={item} />
              </Col>
            ))}
          </ListView>
        </div>
        <div className="bg-white">
          <ListView
            title="Movies/TV/Series"
            titleUrl={urlGenerator.toMovies()}
            content={videoList[TYPE_FILM]}
            nextEnable={videoList[TYPE_FILM].hasMore}
            prevEnable={!homeStore.isPrevAllVideo}
            onNext={() => homeStore.getVideo(TYPE_FILM, true)}
            onPrev={() => homeStore.getVideo(TYPE_FILM, false)}
            isLoading={videoList[TYPE_FILM].loading}
            skeleton={SkeletonVertical}
            itemsInRow={PARAM_LIMIT_LARGE}
            isWhite
          >
            {videoList[TYPE_FILM].media.map((item, key) => (
              <Col key={key} md={6} xl={2} className="mb-4">
                <CardVideo video={item} full />
              </Col>
            ))}
          </ListView>
        </div>

        <div className="bg-light-gray py-3">
          <ListView
            title="Collections"
            titleUrl={urlGenerator.toCollections()}
            content={videoList[TYPE_FILM]}
            nextEnable={homeStore.collections.hasMore}
            prevEnable={!homeStore.isPrevCollection}
            onNext={() => homeStore.getCollections(true)}
            onPrev={() => homeStore.getCollections(false)}
            isLoading={homeStore.collections.loading}
            skeleton={SkeletonHorizontalCollection}
            itemsInRow={PARAM_LIMIT_MEDIUM}
            isWhite={false}
          >
            {homeStore.collections.items.map((item, key) => (
              <Col key={key} md={6} xl={3} className="mb-4">
                <CardCollection data={item} transparent full />
              </Col>
            ))}
          </ListView>
        </div>

        <div className="bg-white">
          <ListView
            title="Recommended for you"
            titleUrl={urlGenerator.toRecListVideo()}
            content={videoList[TYPE_REC]}
            nextEnable={videoList[TYPE_REC].hasMore}
            prevEnable={!homeStore.isPrevRec}
            onNext={() => homeStore.getVideoRec(true)}
            onPrev={() => homeStore.getVideoRec(false)}
            isLoading={videoList[TYPE_REC].loading}
            skeleton={SkeletonVertical}
            itemsInRow={PARAM_LIMIT_LARGE}
            isWhite
          >
            {videoList[TYPE_REC].media.map((item, key) => (
              <Col key={key} md={6} xl={2} className="mb-4">
                <CardVideo video={item} full />
              </Col>
            ))}
          </ListView>
        </div>

        <div className="bg-light-gray py-3">
          <ListView
            title="Contests"
            titleUrl={urlGenerator.toContests()}
            content={videoList[TYPE_FILM]}
            nextEnable={false}
            prevEnable={false}
            isLoading={homeStore.contests.loading}
            skeleton={SkeletonHorizontal}
            itemsInRow={PARAM_LIMIT_MEDIUM}
            isWhite={false}
            isCommingSoon
          >
            {homeStore.contests.items.map((item, key) => (
              <CardContest key={key} item={item} />
            ))}
          </ListView>
        </div>
      </>
    );
  }),
);

export default Home;
