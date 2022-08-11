import React from 'react';
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

@inject('videos', 'userUpload', 'profile', 'auth')
@observer
export default class VideoGrid extends React.Component {
  constructor(props) {
    super(props);
    this.manageble = this.props.manageble || false;
    this.loadData = this.props.loadData || function () {};
    this.clearData = this.props.clearData || function () {};
    this.isUpload = this.props.isUpload || false;
    this.isFromALlUploads = this.props.isFromALlUploads || false;
    this.profileId = this.props.profileId || null;
  }

  componentDidMount() {
    if (!this.props.data || !this.props.data.length || this.props.needRefresh) {
      this.loadData();
    }
  }

  componentWillUnmount() {
    this.clearData();
  }

  getCardType(item) {
    const type = item.video ? item.video.type : item.type;

    const isNews = item.video
      ? item.video.tags.includes(NEWS)
      : item.tags
      ? item.tags.includes(NEWS)
      : false;

    const creator = item.video ? item.video.creator : item.creator;

    const isYourOwnVideo = () => {
      if (this.props.profile?.profile?.social?.id == item?.social?.id) {
        return true;
      }
      return false;
    };

    const removeVideo = async () => {
      if (this.props.videos.removingNeedsApprove.includes(item.id)) {
        await this.props.videos.removeVideo(item.id);
        await this.props.userUpload.removeItemFromUploads(item.id);
        await this.props.auth.startListener();
        return;
      }
      this.props.videos.removeVideo(item.id);
    };

    const status = item.video
      ? item.video.status
        ? item.video.status
        : RELEASED
      : RELEASED;
    if (item.count_video >= 0) {
      return <CardCollection data={item} />;
    }
    if (isNews && !this.isFromALlUploads) {
      if (this.isUpload) {
        return (
          <CardNewsUploads
            item={item}
            removeVideo={removeVideo}
            manageble={{
              isManageble: this.props.manageble && isYourOwnVideo(),
              removingNeedsApprove: this.props.videos.removingNeedsApprove,
            }}
          />
        );
      }
      return (
        <CardNews
          item={item}
          manageble={{
            isManageble: this.props.manageble && isYourOwnVideo(),
            removingNeedsApprove: this.props.videos.removingNeedsApprove,
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
            isManageble: this.props.manageble && isYourOwnVideo(),
            removingNeedsApprove: this.props.videos.removingNeedsApprove,
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
          isManageble: this.props.manageble && isYourOwnVideo(),
          removingNeedsApprove: this.props.videos.removingNeedsApprove,
        }}
        withTags
      />
    );
  }

  render() {
    const {
      data,
      title,
      className,
      loading = false,
      hasMore = false,
      hasContainer = true,
      containerType,
    } = this.props;

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
      <ButtonTextGreen onClick={() => this.loadData()}>
        Show more
      </ButtonTextGreen>
    );

    const cardsInRow = this.props.cardsInRow || 4;

    const content = (
      <>
        {titleElem}

        {Boolean(data.length) && (
          <div className={style.grid}>
            {data.map((item) => {
              const id = item.video ? item.video.id : item.id; // if the video is removed from DB but left in "libs" table, we'll need to make this video not to appear
              if (!id) {
                return null;
              }
              return (
                <div
                  key={item.id}
                  className={classNames(
                    style['grid-item'],
                    style[`grid-item_${cardsInRow}`],
                  )}
                >
                  {this.getCardType(item)}
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
  }
}
