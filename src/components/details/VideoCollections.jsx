import React from 'react';
import { inject, observer } from 'mobx-react';

import { Col } from 'react-bootstrap';
import { PARAM_LIMIT_MEDIUM } from '../../constants/API';

import CardCollection from '../Card/CardCollection';

import { ListView } from '../ListView/ListView';
import { SkeletonHorizontal } from '../widgets/Skeletons';

@inject('collections')
@observer
class VideoCollections extends React {
  componentDidMount() {
    this.loadCollections();
  }
  componentWillUnmount() {
    this.props.collections.clearCollection();
  }

  loadCollections(isPrev = false) {
    this.props.collections.getCollections({
      filmId: this.props.filmId,
      _limit: PARAM_LIMIT_MEDIUM,
      // isPrev,
    });
  }

  render() {
    const {
      collections: { collections, loading },
    } = this.props;

    if (!collections.media || !collections.media.length) {
      return null;
    }

    return (
      <ListView
        title="Collections"
        nextEnable={collections.hasMore}
        prevEnable={collections.hasPrev}
        onNext={() => this.loadCollections()}
        onPrev={() => this.loadCollections(true)}
        isLoading={loading}
        skeleton={SkeletonHorizontal}
        itemsInRow={PARAM_LIMIT_MEDIUM}
        isWhite={false}
      >
        {collections.media.map((item, key) => (
          <Col key={key} xs={12} md={3} className="mb-4">
            <CardCollection data={item} transparent full />
          </Col>
        ))}
      </ListView>
    );
  }
}

export default VideoCollections;
