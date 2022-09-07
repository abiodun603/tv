import React, { useState, useEffect } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useMediaQuery } from '@material-ui/core';
import { inject, observer } from 'mobx-react';

import { PlayerWithAds } from '../player-with-ads/PlayerWithAds';
import VideoCollections from './VideoCollections';
import { ListView } from '../ListView/ListView';
import { Comments } from '../Comments/Comments';

import {
  getMedia,
  getPoster,
  getTrailer,
  getPhoto,
} from '../../utils/pathUtil';

import { getTags } from '../../utils/formate';
import { SERIES } from '../../constants/types';

import style from '../../../styles/detailsVideo.module.scss';
import { DetailsControls } from './DetailsControls/DetailsControls';
import { SeriesControls } from './SeriesControls';
import { SeriesControlsMock } from './SeriesControls/mock';
import ContentDialog from '../dialogs/Content';
import CardVideo from '../Card/CardVideo';
import UserBox from '../UserBox/UserBox';
import { MANAGER } from '../../constants/API';
import { ThreeDotsLoader } from '../ui/spiner';

import { ComeBackButton } from './ComeBackButton/ComeBackButton';
import { MockEmptySpace } from '../mock/MockEmptySpace';

const FilmVideo = inject(
  'video',
  'social',
  'profile',
  'ui',
)(
  observer((props) => {
    const { videoData, anotherVideo, seriesData, episodeData, loading } =
      props.video;

    const [trailerDialog, setTrailerDialog] = useState(false);
    const isMobile = useMediaQuery('(max-width:767px)');

    const [currentSeason, setCurrentSeason] = useState(1);
    const [currentEpisode, setCurrentEpisode] = useState({ series: 1 });

    useEffect(() => {
      if (props.id > 0) {
        props.video.getVideo(props.id, {}, MANAGER);
      }
    }, [props.id]);

    useEffect(() => {
      if (seriesData) {
        const season = seriesData?.seasons[0]?.season;
        const episode = seriesData?.episodes[0];

        if (season && episode) {
          setCurrentSeason(season);
          setCurrentEpisode(episode);
        }
      }
    }, [seriesData]);

    const onSelectSeason = (season) => {
      setCurrentSeason(season);
      props.video.getSeries(props.id, season);
    };

    const onSelectEpisode = (episode) => {
      setCurrentEpisode(episode);
      props.video.getEpisode(episode.id);
    };

    const currentFilm = videoData.media;

    if (loading.video) {
      return (
        <div className={style['loading-wrapper']}>
          <ThreeDotsLoader />
        </div>
      );
    }

    if (videoData.id && Number(videoData.id) !== Number(props.id)) {
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
      <div>
        {isMobile ? (
          <div className="m-3 mb-0">
            <p className="text-title mb-0">{videoData.title}</p>
            <p className="mb-3">
              {videoData.year} · {getTags(videoData.tags)}
            </p>
            <Row>
              {videoData.type === SERIES &&
                (seriesData.episodes.length === 0 ||
                seriesData.seasons.length === 0 ? (
                  <SeriesControlsMock />
                ) : (
                  <SeriesControls
                    currentSeason={currentSeason}
                    currentEpisode={currentEpisode}
                    seasons={seriesData.seasons}
                    episodes={seriesData.episodes}
                    onSelectEpisode={onSelectEpisode}
                    onSelectSeason={onSelectSeason}
                  />
                ))}
            </Row>
          </div>
        ) : (
          <Container fluid className={style.topContainer}>
            <div className={`d-flex align-items-end ${style.topContent}`}>
              <Container>
                <Row className="d-flex align-items-end">
                  <Image
                    className={style.posterVertical}
                    src={
                      episodeData && videoData.type === 'series'
                        ? getPoster(episodeData.poster_vertical)
                        : getPoster(videoData.poster_v)
                    }
                    alt="Movie Overview"
                  />
                  <Col className="ml-5">
                    <Row className="mt-3">
                      <p className="text-title">{videoData.title}</p>
                    </Row>
                    <Row>
                      <p>
                        {videoData.year} · {getTags(videoData.tags)}
                      </p>
                    </Row>
                    <Row>
                      {videoData.type === SERIES &&
                        (seriesData.episodes.length === 0 ||
                        seriesData.seasons.length === 0 ? (
                          <SeriesControlsMock />
                        ) : (
                          <SeriesControls
                            currentSeason={currentSeason}
                            currentEpisode={currentEpisode}
                            seasons={seriesData.seasons}
                            episodes={seriesData.episodes}
                            onSelectEpisode={onSelectEpisode}
                            onSelectSeason={onSelectSeason}
                          />
                        ))}
                    </Row>
                  </Col>
                </Row>
              </Container>
            </div>
            <Container
              style={{ marginTop: '10px' }}
              className="position-relative"
            >
              <Row className="d-flex align-items-end">
                <Col>
                  <ComeBackButton />
                </Col>
              </Row>
            </Container>

            <Image
              fluid
              className={style.posterBackground}
              src={
                episodeData && videoData.type === 'series'
                  ? getPoster(episodeData.poster_horizontal)
                  : getPoster(videoData.poster_h)
              }
              alt="Poster"
            />
          </Container>
        )}

        <div className={style['user-video']}>
          <div className={style['user-video-main']}>
            <Container fluid className="mt-5 mb-4">
              <Row className="d-flex justify-content-center">
                <PlayerWithAds
                  onProgress={
                    episodeData && videoData.type === 'series'
                      ? props.video.onProgressEpisode
                      : props.video.onProgressVideo
                  }
                  onDuration={
                    episodeData && videoData.type === 'series'
                      ? props.video.onDurationEpisode
                      : props.video.onDurationVideo
                  }
                  url={
                    episodeData && videoData.type === 'series'
                      ? getMedia(episodeData)
                      : getMedia(currentFilm)
                  }
                  startFrom={
                    episodeData && videoData.type === 'series'
                      ? episodeData.startFrom
                      : videoData.startFrom
                  }
                  videojsOptions={{
                    height: 400,
                    width: 'auto',
                  }}
                />
              </Row>
            </Container>

            <DetailsControls
              viewsCount={videoData.count_watch}
              likesCount={videoData.count_like}
              setLike={props.video.createLike}
              removeLike={props.video.deleteLike}
              isLike={videoData.isLike}
              isWatchLater={videoData.lib.watch}
              hasTrailer={getTrailer(currentFilm)}
              openTrailer={() => setTrailerDialog(!trailerDialog)}
              video={videoData}
              isMobile={isMobile}
            />

            <ContentDialog
              title={videoData.title}
              opened={trailerDialog}
              onClose={() => setTrailerDialog(!trailerDialog)}
            >
              <PlayerWithAds
                url={getTrailer(currentFilm)}
                videojsOptions={{
                  height: 400,
                  width: 'auto',
                }}
              />
            </ContentDialog>
            <hr />
            <Row className="my-3 mt-3">
              <Col className="my-auto">
                <Container>
                  <Row>
                    <UserBox
                      avatarUrl={getPhoto(videoData?.user?.photo)}
                      userName={videoData?.user?.username}
                      nickName={videoData?.user?.username}
                    />
                  </Row>
                </Container>
              </Col>
            </Row>

            <div className="bg-light-gray py-3">
              <Container className="px-0">
                <h5 className="text-dark mb-3">Overview</h5>
                <p>{videoData.description}</p>
              </Container>
            </div>

            {videoData.allow_comments && (
              <Comments id={props.id} isMobile={isMobile} />
            )}
          </div>
        </div>

        <Container className="bg-light-gray mb-5 pt-4 pb-4">
          <VideoCollections filmId={props.id} />

          {anotherVideo.data && anotherVideo.data.length > 0 && (
            <ListView
              title="You may also like"
              isLoading={anotherVideo.loading}
              itemsInRow={6}
              hasNavigion={false}
            >
              {(anotherVideo.data || []).map((item) => (
                <Col key={item.id} xs={6} xl={3}>
                  <CardVideo video={item} />
                </Col>
              ))}
            </ListView>
          )}
        </Container>
      </div>
    );
  }),
);

export default FilmVideo;
