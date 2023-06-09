import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';

import { inject, observer } from 'mobx-react';

import * as TYPES from '../constants/types';
import * as TAGS from '../constants/tags';

import CardVideo from './Card/CardVideo';
import { SkeletonVertical } from './widgets/Skeletons';

import * as urlGenerator from '../lib/url/generator';

import { ListView } from './ListView/ListView';

const mapping = [
  {
    title: 'Movies',
    type: TYPES.FILM,
    tag: TAGS.MOVIES,
  },
  {
    title: 'Kids/Animations',
    type: TYPES.FILM,
    tag: TAGS.KIDS,
  },
  {
    title: 'Documentaries',
    type: TYPES.FILM,
    tag: TAGS.DOC,
  },
  {
    title: 'TV',
    type: TYPES.FILM,
    tag: TAGS.TV,
  },
];

const Movies = inject('movies')(
  observer((props) => {
    useEffect(() => {
      mapping.map((params) => {
        props.movies.loadVideos(params.type, params.tag);
      });
    }, []);

    const renderListView = ({ title, type, tag }, idx) => {
      const { movies } = props;

      const data = movies.data[movies.getDataKey(type, tag)];

      if (!data) {
        return null;
      }

      return (
        <ListView
          title={title}
          titleUrl={urlGenerator.toVideoGrid(type, tag, { title })}
          content={data.media}
          nextEnable={data.hasMore}
          prevEnable={data.hasPrev}
          onNext={() => movies.loadVideos(type, tag, {}, true)}
          onPrev={() => movies.loadVideos(type, tag, {}, false)}
          isLoading={data.loading}
          skeleton={SkeletonVertical}
          itemsInRow={data.limit}
          isWhite={idx % 2 !== 0}
        >
          {data.media.map((item, key) => (
            <Col key={key} xs={6} xl={2} className="mb-4">
              <CardVideo video={item} full />
            </Col>
          ))}
        </ListView>
      );
    };

    return (
      <>
        {mapping.map((map, idx) => {
          return <div key={idx.toString()}>{renderListView(map, idx)}</div>;
        })}
        <div className="mt-4" />
      </>
    );
  }),
);

export default Movies;
