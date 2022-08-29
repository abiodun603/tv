import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import { ListView } from './ListView/ListView';
import { Col } from 'react-bootstrap';
import { PARAM_LIMIT_M } from '../constants/API';
import CardUserVideo from './Card/CardUserVideo';

const CollectionGlossary = (key, isMobile) => {
  const collections = {
    popular: 'Popular',
    recommended: isMobile ? 'Recommended' : 'Recommended for you',
    favorite: isMobile ? 'Favorite users' : 'Your favorite users',
  };

  return collections[key];
};

const UserVideos = inject('userVideos')(
  observer((props) => {
    const { isMobile } = props;

    useEffect(() => {
      props.userVideos.loadAllVideos();

      return () => {
        props.userVideos.clearData();
      };
    }, []);

    const getCardType = (item) => {
      return (
        <Col key={item.id} xs={6} xl={3} className="mb-4">
          <CardUserVideo
            key={item.id}
            video={item}
            isMobile={isMobile}
            className="card-user-video"
          />
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
              title={CollectionGlossary(item.name, isMobile)}
              titleUrl={item.url}
              isLoading={item.loading}
              itemsInRow={PARAM_LIMIT_M}
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
