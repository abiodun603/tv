import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import { ListView } from './ListView/ListView';
import { Col } from 'react-bootstrap';
import { PARAM_LIMIT_MEDIUM } from '../constants/API';
import CardUserVideo from './Card/CardUserVideo';

const CollectionGlossary = {
  popular: 'Popular',
  recommended: 'Recommended for you',
  favorite: 'Your favorite users',
};

const UserVideos = inject('userVideos')(
  observer((props) => {
    useEffect(() => {
      props.userVideos.loadAllVideos();

      return () => props.userVideos.clearData();
    }, []);

    const getCardType = (item) => {
      return (
        <Col key={item.id} md={6} xl={3}>
          <CardUserVideo key={item.id} video={item} />
        </Col>
      );
    };

    const { favorite, popular, recommended } = props.userVideos;

    return (
      <>
        {[favorite, popular, recommended].map((item, index) => {
          return (
            <ListView
              key={index}
              title={CollectionGlossary[item.name]}
              titleUrl={item.url}
              isLoading={item.loading}
              itemsInRow={PARAM_LIMIT_MEDIUM}
              nextEnable={item.hasMore}
              prevEnable={item.hasPrev}
              onNext={() => {
                props.userVideos.loadNext(item.name);
              }}
              onPrev={() => {
                props.userVideos.loadPrev(item.name);
              }}
            >
              {item.data.map((item) => getCardType(item))}
            </ListView>
          );
        })}
      </>
    );
  }),
);

export default UserVideos;
