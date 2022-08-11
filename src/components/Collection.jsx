import React from 'react';
import Router from 'next/router';
import { inject, observer } from 'mobx-react';
import { Container, Row, Col } from 'react-bootstrap';

import { getPhoto } from '../utils/pathUtil';
import VideoGrid from './VideoGrid/VideoGrid';
import UserBox from './UserBox/UserBox';
import SubscribeButton from './SubscribeButton/SubscribeButton';

@inject('collection')
@observer
class Collection extends React.Component {
  componentDidMount() {
    this.loadCollection();
  }

  loadCollection() {
    const { id } = Router.query;

    this.props.collection.getCollection(id);
  }

  componentWillUnmount() {
    this.props.collection.clearCollectionData();
  }

  render() {
    const { data = {}, loading = true } = this.props.collection;
    const {
      id = null,
      title = '',
      ownerTitle = '',
      ownerImg = {},
      videos = [],
      subscribe = false,
    } = data;

    return (
      <Container className="py-5 px-5">
        <Row className="mb-3">
          <Col xs="11">
            <span className="text-title">{title}</span>
          </Col>
          <Col>
            <SubscribeButton
              isSubscribed={subscribe}
              id={id}
              type={'collection'}
            />
          </Col>
        </Row>
        <Row className="pl-3">
          <p className="text-select">{`${videos.length} videos`}</p>
        </Row>
        <Row className="pl-3">
          <UserBox avatarUrl={getPhoto(ownerImg)} userName={ownerTitle} />
        </Row>
        <Row className="mt-3">
          <VideoGrid
            data={videos}
            hasContainer={false}
            hasMore={false}
            containerType="full"
            loading={loading}
            cardsInRow={6}
          />
        </Row>
      </Container>
    );
  }
}

export default Collection;
