import React, { useEffect } from 'react';
import Link from 'next/link';
import { Router, useRouter, withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';

import { Col, Container, Row, Spinner } from 'react-bootstrap';

import { toJS } from 'mobx';

import SearchStore from '../../store/searchStore';
import AuthStore from '../../store/authStore';

import { SkeletonHorizontal, SkeletonVertical } from '../widgets/Skeletons';

import CardVideo from '../Card/CardVideo';
import CardUserVideo from '../Card/CardUserVideo';
import { SearchFilter } from './search-filter';
import { ArrowToolbar } from '../ui/arrow-toolbar';

import {
  PARAM_LIMIT_LARGE,
  PARAM_LIMIT_MEDIUM,
  TYPE_FILM,
  TYPE_USER,
} from '../../constants/API';

import * as urlGenerator from '../../lib/url/generator';
import { ListView } from '../ListView/ListView';
import { MockEmptySpace } from '../mock/MockEmptySpace';

const RouterWatcher = ({ searchStore }) => {
  const { query } = useRouter();

  useEffect(() => {
    searchStore.setKeyword(query);

    setTimeout(() => {
      searchStore.apply();
    }, 500);
  }, [query, searchStore]);

  return null;
};

@inject('ui', 'search', 'auth')
@observer
class SearchComponent extends React.Component {
  componentDidMount() {
    this.props.search.setLanguages(
      this.props.auth.profileStore.profile.languages,
    );

    if (this.isFirstMount()) {
      //if this page is mounted for the first time, then updateParams wont request the video because of "if (title_contains !== query) " there, so we request those video ourselves
      this.props.search.getVideo(TYPE_USER);
      this.props.search.getVideo(TYPE_FILM);
    }

    this.updateParams();

    this.props.search.getSearchHistory();
  }

  updateParams() {
    const getQuery = (router) => router.query.query;

    const {
      filter: { title_contains },
    } = this.props.search;
    const query = getQuery(this.props.router);

    if (title_contains !== query) {
      this.props.search.setKeyword(query);

      this.props.search.apply();
    }
  }

  isFirstMount() {
    // this method was created in order not to load videos several times(because updateParams, which is also called in componentDidMount is able to request videos)
    const getQuery = (router) => router.query.query;
    const {
      filter: { title_contains },
    } = this.props.search;

    const query = getQuery(this.props.router);
    if (!title_contains && !query) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps) {
    this.updateParams();
  }

  render() {
    const videos = this.props.search.videos;

    if (this.props.search.filterLoading) {
      return <Spinner animation="border" variant="success" className="mt-4" />;
    }

    const isEmpty = !videos[TYPE_FILM].total && !videos[TYPE_USER].total;

    if (isEmpty) {
      return (
        <Container className="mt-5">
          <SearchFilter />
          <Row className=" mt-5 mb-5 container-size">
            <MockEmptySpace mainText={'Nothing found'} />
          </Row>
        </Container>
      );
    }
    return (
      <Container className="mt-5">
        <SearchFilter />

        <Row className={'mt-5 mb-5'}>
          {this.props.search.videos[TYPE_FILM].total > 0 && (
            <ListView
              title="Movies"
              skeleton={SkeletonVertical}
              titleUrl={urlGenerator.toFilmListVideo({
                params: JSON.stringify(toJS(this.props.search.filter)),
              })}
              isLoading={videos[TYPE_FILM].loading}
              itemsInRow={PARAM_LIMIT_LARGE}
              isOnBoard
              prevEnable={!this.props.search.isPrevAllVideo}
              nextEnable={videos[TYPE_FILM].hasMore}
              onPrev={() => this.props.search.getVideo(TYPE_FILM, false)}
              onNext={() => this.props.search.getVideo(TYPE_FILM, true)}
            >
              {videos[TYPE_FILM].media.map((item, key) => (
                <Col key={item.id} xs="2">
                  <CardVideo video={item} />
                </Col>
              ))}
            </ListView>
          )}
        </Row>
        <Row className={'mt-5 mb-5'}>
          {this.props.search.videos[TYPE_USER].total > 0 && (
            <ListView
              title="Videos"
              skeleton={SkeletonHorizontal}
              titleUrl={urlGenerator.toUserListVideo({
                params: JSON.stringify(toJS(this.props.search.filter)),
              })}
              isLoading={videos[TYPE_USER].loading}
              itemsInRow={PARAM_LIMIT_MEDIUM}
              prevEnable={!this.props.search.isPrevUser}
              isOnBoard
              nextEnable={videos[TYPE_USER].hasMore}
              onPrev={() => this.props.search.getVideo(TYPE_USER, false)}
              onNext={() => this.props.search.getVideo(TYPE_USER, true)}
            >
              {videos[TYPE_USER].media.map((item, key) => (
                <Col key={key} md={6} xl={3} className="mb-4">
                  <CardUserVideo video={item} />
                </Col>
              ))}
            </ListView>
          )}
        </Row>
      </Container>
    );
  }
}

export const Search = withRouter(SearchComponent);
