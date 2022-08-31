import React, { useEffect } from 'react';

import { Col, Container, Row, Image } from 'react-bootstrap';

import CardVideo from '../Card/CardVideo';
import CardUserVideo from '../Card/CardUserVideo';
import CardNews from '../cards/CardNews';
import { ButtonTextGreen } from '../widgets/Button';
import { ThreeDotsLoader } from '../ui/spiner';

import CardComing from '../Card/CardComing';
import { COMING_SOON, RELEASED } from '../../constants/types';
import { NEWS } from '../../constants/tags';
import { MANAGER, USER, SINGLE_VIDEO, SERIES } from '../../constants/types';
import { NewsCard } from '../cards/_html/NewsCard';

import CardCollection from '../Card/CardCollection';

const getCardsByType = (data) => {
  const collections = [];
  const news = [];
  const userVideos = [];
  const managerVideos = [];
  const comingSoon = [];

  data.forEach((item) => {
    const type = item.video ? item.video.type : item.type;
    const isNews = item.video
      ? item.video.tags.includes(NEWS)
      : item.tags
      ? item.tags.includes(NEWS)
      : false;

    const creator = item.video ? item.video.creator : item.creator;
    const status = item.video
      ? item.video.status
        ? item.video.status
        : RELEASED
      : RELEASED;

    if (isNews) {
      const nidx = news.findIndex((c) => c.id === item.id);
      if (nidx < 0) {
        news.push(item);
      }
    } else if (item.count_video >= 0) {
      collections.push(item);
    } else if (creator === MANAGER) {
      if (item.video) {
        const midx = managerVideos.findIndex((c) => c.id === item.video.id);
        if (midx < 0) {
          managerVideos.push(item.video);
        }
      } else {
        managerVideos.push(item);
      }
    } else if (creator === USER) {
      if (item.video) {
        const uidx = userVideos.findIndex((c) => c.id === item.video.id);
        if (uidx < 0) {
          userVideos.push(item.video);
        }
      } else {
        userVideos.push(item);
      }
    } else if (status === COMING_SOON) {
      const cidx = comingSoon.findIndex((c) => c.id === item.id);
      if (cidx < 0) {
        comingSoon.push(item);
      }
    } else if (type === SINGLE_VIDEO || type === SERIES) {
      if (item.video) {
        const midx = managerVideos.findIndex((c) => c.id === item.video.id);
        if (midx < 0) {
          managerVideos.push(item.video);
        }
      } else {
        managerVideos.push(item);
      }
    } else {
      if (item.video) {
        const uidx = userVideos.findIndex((c) => c.id === item.video.id);
        if (uidx < 0) {
          userVideos.push(item.video);
        }
      } else {
        userVideos.push(item);
      }
    }
  });

  return { news, collections, userVideos, managerVideos, comingSoon };
};

const VideoCardGrid = (props) => {
  const { data, loading, hasMore } = props;
  const { news, collections, userVideos, managerVideos, comingSoon } =
    getCardsByType(data);

  useEffect(() => {
    if (!data.length && data.length === 0) {
      props.loadData();
    }
  }, []);

  const renderUserVideos = () => {
    if (userVideos.length === 0) {
      return null;
    }
    return (
      <>
        <div className="h5 mb-2">User Videos</div>
        <Row>
          {userVideos.map((item, index) => (
            <Col key={`user_video_${index}`} md={6} xl={3} className="mb-4">
              <CardUserVideo video={item} withTitle withInfo={false} withTags />
            </Col>
          ))}
        </Row>
      </>
    );
  };

  const renderManagerVideos = () => {
    if (managerVideos.length === 0) {
      return null;
    }
    return (
      <>
        <div className="h5 mb-2">Contents</div>
        <Row>
          {managerVideos.map((item, index) => (
            <Col key={`manager_video_${index}`} md={6} xl={3} className="mb-4">
              <CardVideo centered video={item} />
            </Col>
          ))}
        </Row>
      </>
    );
  };

  const renderNews = () => {
    if (news.length === 0) {
      return null;
    }
    return (
      <>
        <div className="h5 mb-2">News</div>
        <Row>
          {news.map((item, index) => (
            <Col key={`news_${index}`} md={6} xl={3} className="mb-4">
              <CardNews item={item} />
            </Col>
          ))}
        </Row>
      </>
    );
  };

  const renderCollections = () => {
    if (collections.length === 0) {
      return null;
    }
    return (
      <>
        <div className="h5 mb-2">Collections</div>
        <Row>
          {collections.map((item, index) => (
            <Col key={`collection_${index}`} md={6} xl={3} className="mb-4">
              <CardCollection data={item} />
            </Col>
          ))}
        </Row>
      </>
    );
  };

  const renderComingSoon = () => {
    if (comingSoon.length === 0) {
      return null;
    }
    return (
      <>
        <div className="h5 mb-2">Coming Soon</div>
        <Row>
          {comingSoon.map((item, index) => (
            <Col key={`coming_soon_${index}`} md={6} xl={3} className="mb-4">
              <CardComing centered video={item} maxWidthImage="170" />
            </Col>
          ))}
        </Row>
      </>
    );
  };

  return (
    <Container>
      {loading ? (
        <Row
          className="d-flex justify-content-center mt-5 align-items-center w-100"
          style={{ minHeight: `${!data.length ? '330' : '20'}px` }}
        >
          <ThreeDotsLoader />
        </Row>
      ) : (
        <>
          {!data.length && !loading ? (
            <Row>
              <Col sm="auto" className="mx-auto">
                <Image width={300} src="image/img_no_find.png" />
                <p className="text-title text-center mt-4">Nothing Here</p>
                <p className="text-subtitle text-center mt-2">
                  There is no media yet :(
                </p>
              </Col>
            </Row>
          ) : (
            <>
              {renderUserVideos()}
              {renderManagerVideos()}
              {renderNews()}
              {renderCollections()}
              {renderComingSoon()}
            </>
          )}

          <Row>
            <Col className="text-center my-5">
              {hasMore && (
                <ButtonTextGreen onClick={() => props.loadData()}>
                  Show more
                </ButtonTextGreen>
              )}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default VideoCardGrid;
