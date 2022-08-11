import React from 'react';

import { Col } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';

import {
  PARAM_LIMIT_LARGE,
  PARAM_LIMIT_MEDIUM,
  TYPE_FILM,
  TYPE_REC,
  TYPE_USER,
} from '../constants/API';

import {
  SkeletonHorizontal,
  SkeletonHorizontalCollection,
  SkeletonVertical,
} from './widgets/Skeletons';
import CardUserVideo from './Card/CardUserVideo';
import CardVideo from './Card/CardVideo';
import CardCollection from './Card/CardCollection';
import { CardContest } from './cards/CardContest';

import * as urlGenerator from '../lib/url/generator';

import { MoviesCarousel } from './home/movies-carousel';

import { ListView } from './ListView/ListView';

@inject('home')
@observer
class Home extends React.Component {
  componentDidMount() {
    this.props.home.getVideo(TYPE_USER, true, { _start: 0 });
    this.props.home.getVideo(TYPE_FILM, true, { _start: 0 });
    this.props.home.getCollections(true, { _start: 0 });
    this.props.home.getVideoRec(true, { _start: 0 });
  }

  render() {
    const {
      home: { video: videos },
    } = this.props;
    return (
      <>
        <MoviesCarousel />

        <div className="bg-light-gray py-3 ">
          <ListView
            title="Videos"
            titleUrl={urlGenerator.toListVideo()}
            isLoading={videos[TYPE_USER].loading}
            itemsInRow={videos[TYPE_USER].limit}
            prevEnable={!this.props.home.isPrevUser}
            nextEnable={videos[TYPE_USER].hasMore}
            onNext={() => this.props.home.getVideo(TYPE_USER, true)}
            onPrev={() => this.props.home.getVideo(TYPE_USER, false)}
            skeleton={SkeletonHorizontal}
          >
            {videos[TYPE_USER].media.map((item, key) => (
              <Col key={key} md={6} xl={3} className="mb-4">
                <CardUserVideo video={item} />
              </Col>
            ))}
          </ListView>
        </div>
        <ListView
          title="Movies/TV/Series"
          titleUrl={urlGenerator.toMovies()}
          content={videos[TYPE_FILM]}
          nextEnable={videos[TYPE_FILM].hasMore}
          prevEnable={!this.props.home.isPrevAllVideo}
          onNext={() => this.props.home.getVideo(TYPE_FILM, true)}
          onPrev={() => this.props.home.getVideo(TYPE_FILM, false)}
          isLoading={videos[TYPE_FILM].loading}
          skeleton={SkeletonVertical}
          itemsInRow={PARAM_LIMIT_LARGE}
          isWhite
        >
          {videos[TYPE_FILM].media.map((item, key) => (
            <Col key={key} xs="2">
              <CardVideo video={item} full />
            </Col>
          ))}
        </ListView>

        <div className="bg-light-gray py-3">
          <ListView
            title="Collections"
            titleUrl={urlGenerator.toCollections()}
            content={videos[TYPE_FILM]}
            nextEnable={this.props.home.collections.hasMore}
            prevEnable={!this.props.home.isPrevCollection}
            onNext={() => this.props.home.getCollections(true)}
            onPrev={() => this.props.home.getCollections(false)}
            isLoading={this.props.home.collections.loading}
            skeleton={SkeletonHorizontalCollection}
            itemsInRow={PARAM_LIMIT_MEDIUM}
            isWhite={false}
          >
            {this.props.home.collections.items.map((item, key) => (
              <Col xs={12} md={3} key={key} className="mb-4">
                <CardCollection data={item} transparent full />
              </Col>
            ))}
          </ListView>
        </div>

        <ListView
          title="Recommended for you"
          titleUrl={urlGenerator.toRecListVideo()}
          content={videos[TYPE_REC]}
          nextEnable={videos[TYPE_REC].hasMore}
          prevEnable={!this.props.home.isPrevRec}
          onNext={() => this.props.home.getVideoRec(true)}
          onPrev={() => this.props.home.getVideoRec(false)}
          isLoading={videos[TYPE_REC].loading}
          skeleton={SkeletonVertical}
          itemsInRow={PARAM_LIMIT_LARGE}
          isWhite
        >
          {videos[TYPE_REC].media.map((item, key) => (
            <Col key={key} xs="2">
              <CardVideo video={item} full />
            </Col>
          ))}
        </ListView>

        <div className="bg-light-gray py-3 ">
          <ListView
            title="Contests"
            titleUrl={urlGenerator.toContests()}
            content={videos[TYPE_FILM]}
            nextEnable={false}
            prevEnable={false}
            isLoading={this.props.home.contests.loading}
            skeleton={SkeletonHorizontal}
            itemsInRow={PARAM_LIMIT_MEDIUM}
            isWhite={false}
            isCommingSoon
          >
            {this.props.home.contests.items.map((item, key) => (
              <CardContest key={key} item={item} />
            ))}
          </ListView>
        </div>
      </>
    );
  }
}

export default Home;
