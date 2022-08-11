import React from 'react';
import { inject, observer } from 'mobx-react';

import { Col, Container, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

import * as TAGS from '../constants/tags';
import * as TYPES from '../constants/types';

import CardVideo from './Card/CardVideo';
import CardUserVideo from './Card/CardUserVideo';
import { ButtonTextGreen } from './widgets/Button';

const typeParams = {
  [TYPES.FILM]: {
    title: 'Movies/TV/Series',
  },
  [TYPES.REC]: {
    title: 'Recommended for you',
  },
  [TYPES.PODCAST]: {
    title: 'Podcasts',
  },
  [TYPES.MUSIC]: {
    title: 'Music',
  },
};

const TITLES = {
  [TAGS.FAVORITE_USER]: {
    title: 'Your favorite users',
  },
  [TAGS.ALL]: {
    title: 'Movies',
  },
  [TAGS.MUSIC]: {
    title: 'Music & Podcasts',
  },
  [TAGS.KIDS]: {
    title: 'Kids/Animations',
  },
  [TAGS.DOC]: {
    title: 'Documentaries',
  },
  [TAGS.TV]: {
    title: 'TV',
  },
  [TAGS.POPULAR]: {
    title: 'Popular',
  },
  [TAGS.RECOMMENDED]: {
    title: 'Recommended for you',
  },
};

@inject('videos')
@observer
class VideoList extends React.Component {
  componentDidUpdate(prevProps) {
    if (
      prevProps.type !== this.props.type ||
      prevProps.tag !== this.props.tag
    ) {
      this.props.videos.clearData();
      this.loadVideo();
    }
  }

  componentDidMount() {
    this.loadVideo();
  }

  componentWillUnmount() {
    this.props.videos.clearData();
  }

  loadVideo() {
    const { tag, params, type } = this.props;

    const filters = typeof params === 'object' ? params : {};

    this.props.videos.getVideo(type, tag, filters);
  }

  getCardType(item) {
    const { tag, size = 3 } = this.props;

    if (
      tag === TAGS.FAVORITE_USER ||
      tag === TAGS.POPULAR ||
      tag === TAGS.RECOMMENDED
    ) {
      return (
        <Col key={item.id} xs={size} className="mb-3">
          <CardUserVideo video={item} />
        </Col>
      );
    }

    return (
      <Col key={item.id} xs={2} className="mb-3">
        <CardVideo video={item} />
      </Col>
    );
  }

  renderTitle() {
    const {
      showTitle = false,
      title: originalTitle = null,
      type,
      tag,
    } = this.props;

    if (!showTitle) {
      return null;
    }

    const { title: typeTitle } = typeParams[type] || {};
    const { title: tagTitle } = TITLES[tag] || {};

    const title = originalTitle || typeTitle || tagTitle;

    if (!title) {
      return null;
    }
    return (
      <Row>
        <Col className="mb-4">
          <span className="text-title">{title}</span>
        </Col>
      </Row>
    );
  }

  render() {
    const {
      videos: { media, loading, hasMore },
      className,
    } = this.props;

    return (
      <Container className={className}>
        {this.renderTitle()}

        <Row>{media.map((item) => this.getCardType(item))}</Row>

        {loading && (
          <Row className="d-flex justify-content-center mt-5">
            <Spinner animation="border" variant="success" />
          </Row>
        )}

        <Row>
          <Col className="text-center my-5">
            {hasMore && (
              <ButtonTextGreen onClick={() => this.loadVideo()}>
                Show more
              </ButtonTextGreen>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default VideoList;
