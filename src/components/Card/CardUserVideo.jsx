import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { Col, Row } from 'react-bootstrap';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';

import CardPoster from './CardPoster/CardPoster';
import CardStats from './CardStats/CardStats';
import CardTitle from './CardTitle/CardTitle';
import CardMeta from './CardMeta/CardMeta';
import Card from './Card';

import { TYPE_USER } from '../../constants/API';

import UserBox from '../UserBox/UserBox';
import { Complaint } from '../Complaint/Complaint';

import { getPhoto, getPreview, getPoster } from '../../utils/pathUtil';
import { getTags } from '../../utils/formate';

import styles from './RemoveItem.module.scss';
import * as url from '../../lib/url/generator';

@observer
export default class CardUserVideo extends Component {
  render() {
    let {
      className,
      video = {},
      withProfile = true,
      withInfo = true,
      withTitle = false,
      withTags = false,
      removeVideo = () => {},
      manageble = { isManageble: false, removingNeedsApprove: false },
      isMobile,
    } = this.props;

    if (video.video) {
      video = video.video;
    }

    const { social = {}, lib = {} } = video;
    const profile = social
      ? social.profile
      : { last_name: 'dash', name: 'board', username: 'dashboard' };

    const titleContainer = withTitle && (
      <div className="mt-3">
        <CardTitle title={video.title} />
      </div>
    );

    const tagsContainer = withTags && (
      <div className="mt-2">
        <CardMeta content={[video.year, getTags(video.tags)]} />
      </div>
    );

    const statsContainer = withInfo && (
      <CardStats
        comments={video.count_comments}
        views={video.count_watch}
        likes={video.count_like}
      />
    );

    const profileContainer = withProfile && profile && (
      <Row className="mt-3 justify-content-space-between">
        <Col>
          <UserBox
            avatarUrl={getPhoto(profile.photo)}
            url={social ? url.toContributor(social.id) : ''}
            userName={[profile.name, profile.last_name]
              .filter(Boolean)
              .join(' ')}
          />
        </Col>
        <Col className="my-auto d-flex justify-content-end" md={2}>
          <Complaint id={video.id} hasComplaint={lib.complaint} />
        </Col>
      </Row>
    );

    return (
      <Card className={className} url={`/details/${TYPE_USER}?id=${video.id}`}>
        <CardPoster
          ratio={isMobile ? 16 / 13 : 16 / 9}
          imgUrl={
            video.preview_url
              ? getPreview(video.preview_url)
              : getPoster(video.poster_h)
          }
          hasPlay
        >
          {statsContainer}
        </CardPoster>
        {!isMobile && profileContainer}
        {!isMobile && titleContainer}
        {!isMobile && tagsContainer}
        {manageble.isManageble && (
          <div
            onClick={(event) => {
              event.stopPropagation();
              removeVideo();
            }}
            className={styles.card__removeItem}
          >
            {manageble.removingNeedsApprove.includes(video.id) ? (
              <CheckIcon />
            ) : (
              <ClearIcon />
            )}
          </div>
        )}
      </Card>
    );
  }
}
