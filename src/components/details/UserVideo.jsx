import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import { useMediaQuery } from '@material-ui/core';

import * as url from '../../lib/url/generator';

import { getMedia, getPhoto } from '../../utils/pathUtil';
import { getTags } from '../../utils/formate';

import { PlayerWithAds } from '../player-with-ads/PlayerWithAds';
import { Comments } from '../Comments/Comments';
import { ListView } from '../ListView/ListView';
import { DetailsControls } from './DetailsControls/DetailsControls';
import CardUserVideo from '../Card/CardUserVideo';
import CardNewsVideo from '../Card/CardNewsVideo';
import UserBox from '../UserBox/UserBox';
import SubscribeButton from '../SubscribeButton/SubscribeButton';

import { TYPE_NEWS, USER } from '../../constants/API';

import { ComeBackButton } from './ComeBackButton/ComeBackButton';
import { MockEmptySpace } from '../mock/MockEmptySpace';

import style from '../../../styles/detailsVideo.module.scss';

const UserVideo = inject(
  'video',
  'profile',
)(
  observer((props) => {
    const { videoData, anotherVideo } = props.video;
    const profileStore = props.profile;
    const videoDataSocial = videoData.social;
    const isMobile = useMediaQuery('(max-width:768px)');

    useEffect(() => {
      if (props.id > 0) {
        props.video.getVideo(props.id, {}, USER);
      }
    }, [props.id]);

    if (!props.video.videoData.id && !props.video.loading.video) {
      return (
        <Container className={'mt-5 mb-5'}>
          <Row>
            <MockEmptySpace
              mainText={'Page not found'}
              secondaryText={'Your link is not valid anymore :('}
            />
          </Row>
        </Container>
      );
    }

    return (
      <div className={`${isMobile ? 'my-3' : 'my-5'}`}>
        <div className={style['user-video-main']}>
          <Row className="d-flex justify-content-center">
            <PlayerWithAds
              onProgress={props.video.onProgressVideo}
              onDuration={props.video.onDurationVideo}
              url={getMedia(props.video.videoData.media)}
              startFrom={props.video.videoData.startFrom}
              videojsOptions={{
                height: 400,
                width: 'auto',
              }}
            />
          </Row>

          <Row className="my-3 px-0">
            <h6 className="text-select">
              {getTags(props.video.videoData.tags)}
            </h6>
            <h4 className="mt-3">{props.video.videoData.title}</h4>
          </Row>
          <DetailsControls
            viewsCount={videoData.count_watch}
            likesCount={videoData.count_like}
            setLike={props.video.createLike}
            removeLike={props.video.deleteLike}
            isLike={videoData.isLike}
            isWatchLater={videoData.lib.watch}
            video={videoData}
            isMobile={isMobile}
          />
          <div>
            <hr />
            <Row className="my-3 mt-3">
              <Col className="my-auto">
                <UserBox
                  avatarUrl={getPhoto(videoDataSocial.profile.photo)}
                  url={url.toContributor(videoDataSocial?.id)}
                  userName={[
                    videoDataSocial.profile.name,
                    videoDataSocial.profile.last_name,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  nickName={videoDataSocial?.profile?.username}
                />
              </Col>

              <Col className="d-flex justify-content-end">
                {profileStore.profile.social !== videoDataSocial?.id && (
                  <SubscribeButton
                    id={videoDataSocial?.id}
                    isSubscribed={videoDataSocial?.subscribe}
                  />
                )}
              </Col>
            </Row>
          </div>

          <div className="bg-light-gray py-3">
            <h5 className="text-dark mb-3">Overview</h5>
            <p>{props.video.videoData.description}</p>
          </div>

          {props.video.videoData.allow_comments && (
            <Comments id={props.id} isMobile={isMobile} />
          )}
          <ComeBackButton />
        </div>
        {anotherVideo.data && anotherVideo.data.length > 0 && (
          <ListView
            title="You may also like"
            isLoading={anotherVideo.loading}
            itemsInRow={4}
            hasNavigion={false}
          >
            {(anotherVideo.data || []).map((item) => (
              <Col key={item.id} md={6} xl={3}>
                {videoData.type == TYPE_NEWS ? (
                  <CardNewsVideo video={item} />
                ) : (
                  <CardUserVideo video={item} />
                )}
              </Col>
            ))}
          </ListView>
        )}
      </div>
    );
  }),
);

export default UserVideo;
