import React, { useEffect } from 'react';
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

const VideoList = inject('videos')(
  observer((props) => {
    useEffect(() => {
      props.videos.clearData();
    }, [props.type, props.tag]);

    useEffect(() => {
      loadVideo();

      return () => props.videos.clearData();
    }, []);

    const loadVideo = () => {
      const { tag, params, type } = props;

      const filters = typeof params === 'object' ? params : {};

      props.videos.getVideo(type, tag, filters);
    };

    const getCardType = (item) => {
      const { tag, size = 3 } = props;

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
        <Col key={item.id} md={6} xl={2} className="mb-3">
          <CardVideo video={item} />
        </Col>
      );
    };

    const renderTitle = () => {
      const {
        showTitle = false,
        title: originalTitle = null,
        type,
        tag,
      } = props;

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
    };

    const {
      videos: { media, loading, hasMore },
      className,
    } = props;

    return (
      <Container className={className}>
        {renderTitle()}

        <Row>{media.map((item) => getCardType(item))}</Row>

        {loading && (
          <Row className="d-flex justify-content-center mt-5">
            <Spinner animation="border" variant="success" />
          </Row>
        )}

        <Row>
          <Col className="text-center my-5">
            {hasMore && (
              <ButtonTextGreen onClick={() => loadVideo()}>
                Show more
              </ButtonTextGreen>
            )}
          </Col>
        </Row>
      </Container>
    );
  }),
);

export default VideoList;
