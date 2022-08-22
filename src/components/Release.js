import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Col } from 'react-bootstrap';

import { ListView } from './ListView/ListView';

import CardVideo from './Card/CardVideo';
import CardUserVideo from './Card/CardUserVideo';

import { PARAM_LIMIT_LARGE } from '../constants/API';

import * as TAGS from '../constants/tags';

import * as urlGenerator from '../lib/url/generator';
import { SkeletonHorizontal, SkeletonVertical } from './widgets/Skeletons';

const Release = inject('release')(
  observer((props) => {
    useEffect(() => {
      [
        TAGS.FAVORITE_USER,
        TAGS.ALL,
        TAGS.TV,
        TAGS.KIDS,
        TAGS.MUSIC,
        TAGS.PODCASTS,
        TAGS.DOC,
      ].forEach((tag) => props.release.getVideo(tag, true, { _start: 0 }));
    }, []);

    const { release } = props;
    const { video: videos } = release;

    return (
      <>
        <ListView
          title="Your favorite users"
          skeleton={SkeletonHorizontal}
          titleUrl={urlGenerator.toUserListVideo({ tag: TAGS.FAVORITE_USER })}
          isLoading={videos[TAGS.FAVORITE_USER].loading}
          itemsInRow={videos[TAGS.FAVORITE_USER].limit}
          prevEnable={videos[TAGS.FAVORITE_USER].hasPrev}
          nextEnable={videos[TAGS.FAVORITE_USER].hasMore}
          onPrev={() => release.getVideo(TAGS.FAVORITE_USER, false)}
          onNext={() => release.getVideo(TAGS.FAVORITE_USER, true)}
        >
          {videos[TAGS.FAVORITE_USER].media.map((item, key) => (
            <Col key={key} md={6} xl={3} className="mb-4">
              <CardUserVideo video={item} />
            </Col>
          ))}
        </ListView>

        <ListView
          title="Movies"
          skeleton={SkeletonVertical}
          titleUrl={urlGenerator.toUserListVideo({ tag: TAGS.ALL })}
          isLoading={videos[TAGS.ALL].loading}
          itemsInRow={PARAM_LIMIT_LARGE}
          prevEnable={videos[TAGS.ALL].hasPrev}
          nextEnable={videos[TAGS.ALL].hasMore}
          onPrev={() => release.getVideo(TAGS.ALL, false)}
          onNext={() => release.getVideo(TAGS.ALL, true)}
        >
          {videos[TAGS.ALL].media.map((item) => (
            <Col key={item.id} md={6} xl={2}>
              <CardVideo video={item} full />
            </Col>
          ))}
        </ListView>

        <ListView
          title="Music"
          skeleton={SkeletonVertical}
          titleUrl={urlGenerator.toMusic()}
          isLoading={videos[TAGS.MUSIC].loading}
          itemsInRow={PARAM_LIMIT_LARGE}
          prevEnable={videos[TAGS.MUSIC].hasPrev}
          nextEnable={videos[TAGS.MUSIC].hasMore}
          onPrev={() => release.getVideo(TAGS.MUSIC, false)}
          onNext={() => release.getVideo(TAGS.MUSIC, true)}
        >
          {videos[TAGS.MUSIC].media.map((item) => (
            <Col key={item.id} md={6} xl={2}>
              <CardVideo video={item} full />
            </Col>
          ))}
        </ListView>

        <ListView
          title="Podcasts"
          skeleton={SkeletonVertical}
          titleUrl={urlGenerator.toPodcasts()}
          isLoading={videos[TAGS.PODCASTS].loading}
          itemsInRow={PARAM_LIMIT_LARGE}
          prevEnable={videos[TAGS.PODCASTS].hasPrev}
          nextEnable={videos[TAGS.PODCASTS].hasMore}
          onPrev={() => release.getVideo(TAGS.PODCASTS, false)}
          onNext={() => release.getVideo(TAGS.PODCASTS, true)}
        >
          {videos[TAGS.PODCASTS].media.map((item) => (
            <Col key={item.id} md={6} xl={2}>
              <CardVideo video={item} full />
            </Col>
          ))}
        </ListView>

        <ListView
          title="Kids/Animations"
          skeleton={SkeletonVertical}
          titleUrl={urlGenerator.toUserListVideo({ tag: TAGS.KIDS })}
          isLoading={videos[TAGS.KIDS].loading}
          itemsInRow={PARAM_LIMIT_LARGE}
          prevEnable={videos[TAGS.KIDS].hasPrev}
          nextEnable={videos[TAGS.KIDS].hasMore}
          onPrev={() => release.getVideo(TAGS.KIDS, false)}
          onNext={() => release.getVideo(TAGS.KIDS, true)}
        >
          {videos[TAGS.KIDS].media.map((item) => (
            <Col key={item.id} md={6} xl={2}>
              <CardVideo video={item} full />
            </Col>
          ))}
        </ListView>

        <ListView
          title="Documentaries"
          skeleton={SkeletonVertical}
          titleUrl={urlGenerator.toUserListVideo({ tag: TAGS.DOC })}
          isLoading={videos[TAGS.DOC].loading}
          itemsInRow={PARAM_LIMIT_LARGE}
          prevEnable={videos[TAGS.DOC].hasPrev}
          nextEnable={videos[TAGS.DOC].hasMore}
          onPrev={() => release.getVideo(TAGS.DOC, false)}
          onNext={() => release.getVideo(TAGS.DOC, true)}
        >
          {videos[TAGS.DOC].media.map((item) => (
            <Col key={item.id} md={6} xl={2}>
              <CardVideo video={item} full />
            </Col>
          ))}
        </ListView>

        <ListView
          title="TV"
          skeleton={SkeletonVertical}
          titleUrl={urlGenerator.toUserListVideo({ tag: TAGS.TV })}
          isLoading={videos[TAGS.TV].loading}
          itemsInRow={PARAM_LIMIT_LARGE}
          prevEnable={release.isPrevTV}
          nextEnable={videos[TAGS.TV].hasMore}
          onPrev={() => release.getVideo(TAGS.TV, false)}
          onNext={() => release.getVideo(TAGS.TV, true)}
        >
          {videos[TAGS.TV].media.map((item) => (
            <Col key={item.id} md={6} xl={2}>
              <CardVideo video={item} full />
            </Col>
          ))}
        </ListView>
      </>
    );
  }),
);

export default Release;
