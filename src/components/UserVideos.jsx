import React from 'react';
import { inject, observer } from 'mobx-react';

import { ListView } from './ListView/ListView';
import { Collection, UserVideosStore } from '../store/userVideosStore';
import { Col } from 'react-bootstrap';
import { PARAM_LIMIT_MEDIUM } from '../constants/API';
import CardUserVideo from './Card/CardUserVideo';

const CollectionGlossary = {
  popular: 'Popular',
  recommended: 'Recommended for you',
  favorite: 'Your favorite users',
};

@inject('userVideos')
@observer
export class UserVideos extends React.Component {
  componentDidMount() {
    this.props.userVideos.loadAllVideos();
  }

  componentWillUnmount() {
    this.props.userVideos.clearData();
  }

  getCardType(item) {
    return (
      <Col key={item.id} xs={3}>
        <CardUserVideo key={item.id} video={item} />
      </Col>
    );
  }

  render() {
    const { favorite, popular, recommended } = this.props.userVideos;

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
                this.props.userVideos.loadNext(item.name);
              }}
              onPrev={() => {
                this.props.userVideos.loadPrev(item.name);
              }}
            >
              {item.data.map((item) => this.getCardType(item))}
            </ListView>
          );
        })}
      </>
    );
  }
}
