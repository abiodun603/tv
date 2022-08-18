import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import { Col, Container, Row, Image } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import classNames from 'classnames';

import CardVideo from '../Card/CardVideo';
import CardUserVideo from '../Card/CardUserVideo';
import CardNews from '../cards/CardNews';
import CardNewsUploads from '../cards/CardNewsUploads';
import { ButtonTextGreen } from '../widgets/Button';

import style from './VideoGrid.module.css';
import CardComing from '../Card/CardComing';
import { COMING_SOON, RELEASED } from '../../constants/types';
import { NEWS } from '../../constants/tags';
import { MANAGER, USER, SINGLE_VIDEO, SERIES } from '../../constants/types';

import CardCollection from '../Card/CardCollection';

const VideoGrid = inject(
  'videos',
  'userUpload',
  'profile',
  'auth',
)(
  observer((props) => {
    const isUpload = props.isUpload || false;
    const isFromALlUploads = props.isFromALlUploads || false;

    useEffect(() => {
      if (!props.data || !props.data.length || props.needRefresh) {
        props.loadData();
      }

      return () => props.clearData();
    }, []);

    const getCardType = (item) => {
      const type = item.video ? item.video.type : item.type;

      const isNews = item.video
        ? item.video.tags.includes(NEWS)
        : item.tags
        ? item.tags.includes(NEWS)
        : false;

      const creator = item.video ? item.video.creator : item.creator;

      const isYourOwnVideo = () => {
        if (props.profile?.profile?.social?.id == item?.social?.id) {
          return true;
        }
        return false;
      };

      const removeVideo = async () => {
        if (props.videos.removingNeedsApprove.includes(item.id)) {
          await props.videos.removeVideo(item.id);
          await props.userUpload.removeItemFromUploads(item.id);
          await props.auth.startListener();
          return;
        }
        props.videos.removeVideo(item.id);
      };

      const status = item.video
        ? item.video.status
          ? item.video.status
          : RELEASED
        : RELEASED;
      if (item.count_video >= 0) {
        return <CardCollection data={item} />;
      }
      if (isNews && !isFromALlUploads) {
        if (isUpload) {
          return (
            <CardNewsUploads
              item={item}
              removeVideo={removeVideo}
              manageble={{
                isManageble: props.manageble && isYourOwnVideo(),
                removingNeedsApprove: props.videos.removingNeedsApprove,
              }}
            />
          );
        }
        return (
          <CardNews
            item={item}
            manageble={{
              isManageble: props.manageble && isYourOwnVideo(),
              removingNeedsApprove: props.videos.removingNeedsApprove,
            }}
          />
        );
      }

      if (creator === MANAGER) {
        return <CardVideo centered video={item} maxWidthImage="170" />;
      }

      if (creator === USER) {
        return (
          <CardUserVideo
            video={item}
            withProfile={false}
            withTitle
            withInfo={false}
            removeVideo={removeVideo}
            manageble={{
              isManageble: props.manageble && isYourOwnVideo(),
              removingNeedsApprove: props.videos.removingNeedsApprove,
            }}
            withTags
          />
        );
      }

      if (status === COMING_SOON) {
        return <CardComing centered video={item} maxWidthImage="170" />;
      }
      if ((type === SINGLE_VIDEO || type === SERIES) && !isNews) {
        return <CardVideo centered video={item} maxWidthImage="170" />;
      }

      return (
        <CardUserVideo
          video={item}
          withProfile={false}
          withTitle
          withInfo={false}
          manageble={{
            isManageble: props.manageble && isYourOwnVideo(),
            removingNeedsApprove: props.videos.removingNeedsApprove,
          }}
          withTags
        />
      );
    };

    const {
      data,
      title,
      className,
      loading = false,
      hasMore = false,
      hasContainer = true,
      containerType,
    } = props;

    const nothingElem = (
      <Row>
        <Col sm="auto" className="mx-auto">
          <Image width={300} src="image/img_no_find.png" />
          <p className="text-title text-center mt-4">Nothing Here</p>
          <p className="text-subtitle text-center mt-2">
            There is no media yet :(
          </p>
        </Col>
      </Row>
    );

    const titleElem = title && (
      <Row>
        <Col className="mb-4">
          <span className="text-title">{title}</span>
        </Col>
      </Row>
    );

    const spinner = (
      <Row
        className="d-flex justify-content-center mt-5 align-items-center"
        style={{ minHeight: `${!data.length ? '330' : '20'}px` }}
      >
        <Spinner animation="border" variant="success" />
      </Row>
    );

    const buttonShowMore = (
      <ButtonTextGreen onClick={() => props.loadData()}>
        Show more
      </ButtonTextGreen>
    );

    const cardsInRow = props.cardsInRow || 4;

    const content = (
      <>
        {titleElem}

        {Boolean(data.length) && (
          <div className={style.grid}>
            {data.map((item, index) => {
              const id = item.video ? item.video.id : item.id; // if the video is removed from DB but left in "libs" table, we'll need to make this video not to appear
              if (!id) {
                return null;
              }
              return (
                <div
                  key={index}
                  className={classNames(
                    style['grid-item'],
                    style[`grid-item_${cardsInRow}`],
                  )}
                >
                  {getCardType(item)}
                </div>
              );
            })}
          </div>
        )}

        {!data.length && !loading && nothingElem}

        {loading && spinner}

        <Row>
          <Col className="text-center my-5">{hasMore && buttonShowMore}</Col>
        </Row>
      </>
    );

    if (!hasContainer) {
      return (
        <div className={style['grid-container_' + containerType]}>
          {content}
        </div>
      );
    }

    return <Container className={className}>{content}</Container>;
  }),
);
export default VideoGrid;
