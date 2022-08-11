import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

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
import DetailsVideoCommon from './DetailsCommon';
import { DetailsControls } from './DetailsControls/DetailsControls';
import { SeriesControls } from './SeriesControls';
import { SeriesControlsMock } from './SeriesControls/mock';
import ContentDialog from '../dialogs/Content';
import CardVideo from '../Card/CardVideo';
import UserBox from '../UserBox/UserBox';

import { ComeBackButton } from './ComeBackButton/ComeBackButton';
import { MockEmptySpace } from '../mock/MockEmptySpace';

@inject('video', 'social', 'profile', 'ui')
@observer
class FilmVideo extends DetailsVideoCommon {
  constructor(props) {
    super(props);

    this.state = {
      currentFilm: props.video.videoData.media,
      trailerDialog: false,
    };

    this.toggleTrailerDialog = this.toggleTrailerDialog.bind(this);
    this.onSelectSeason = this.onSelectSeason.bind(this);
    this.onSelectEpisode = this.onSelectEpisode.bind(this);
  }

  toggleTrailerDialog() {
    this.setState({
      trailerDialog: !this.state.trailerDialog,
    });
  }

  onSelectSeason({ season, episode }) {
    this.props.video.getSeries(this.props.id, season, episode);
  }

  onSelectEpisode({ episode_id }) {
    this.props.video.getEpisode(episode_id);
  }

  render() {
    const { videoData, anotherVideo, seriesData, episodeData } =
      this.props.video;

    const currentFilm = videoData.media;

    if (!this.props.video.videoData.id && !this.props.video.loading.video) {
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
        <Container fluid className={style.topContainer}>
          <div className={`d-flex align-items-end ${style.topContent}`}>
            <Container>
              <Row className="d-flex align-items-end">
                <Image
                  className={style.posterVertical}
                  src={
                    episodeData
                      ? getPoster(episodeData.poster_vertical)
                      : getPoster(videoData.poster_v)
                  }
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
                          seriesData={seriesData}
                          onSelectEpisode={this.onSelectEpisode}
                          onSelectSeason={this.onSelectSeason}
                          allEpisodes={currentFilm}
                        />
                      ))}
                  </Row>
                </Col>
              </Row>
            </Container>
          </div>
          <Container style={{ marginTop: '10px' }}>
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
              episodeData
                ? getPoster(episodeData.poster_horizontal)
                : getPoster(videoData.poster_h)
            }
          />
        </Container>

        <div className={style['user-video']}>
          <div className={style['user-video-main']}>
            <Container fluid className="mt-5 mb-4">
              <Row className="d-flex justify-content-center">
                <PlayerWithAds
                  onProgress={
                    episodeData
                      ? this.props.video.onProgressEpisode
                      : this.props.video.onProgressVideo
                  }
                  onDuration={
                    episodeData
                      ? this.props.video.onDurationEpisode
                      : this.props.video.onDurationVideo
                  }
                  url={
                    episodeData ? getMedia(episodeData) : getMedia(currentFilm)
                  }
                  startFrom={
                    episodeData ? episodeData.startFrom : videoData.startFrom
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
              setLike={this.props.video.createLike}
              removeLike={this.props.video.deleteLike}
              isLike={videoData.isLike}
              isWatchLater={videoData.lib.watch}
              hasTrailer={getTrailer(currentFilm)}
              openTrailer={this.toggleTrailerDialog}
              video={videoData}
            />

            <ContentDialog
              title={videoData.title}
              opened={this.state.trailerDialog}
              onClose={this.toggleTrailerDialog}
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

            {videoData.allow_comments && <Comments id={this.props.id} />}
          </div>
        </div>

        <Container className="bg-light-gray mb-5 pt-4 pb-4">
          <VideoCollections filmId={this.props.id} />

          {anotherVideo.data && anotherVideo.data.length > 0 && (
            <ListView
              title="You may also like"
              isLoading={anotherVideo.loading}
              itemsInRow={6}
              hasNavigion={false}
            >
              {(anotherVideo.data || []).map((item) => (
                <Col key={item.id} xs="2">
                  <CardVideo video={item} />
                </Col>
              ))}
            </ListView>
          )}
        </Container>
      </div>
    );
  }
}

export default FilmVideo;
