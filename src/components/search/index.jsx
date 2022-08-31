import React, { useEffect } from 'react';
import Link from 'next/link';
import { Router, useRouter, withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';

import { Col, Container, Row, Spinner } from 'react-bootstrap';

import { toJS } from 'mobx';

import { SkeletonHorizontal, SkeletonVertical } from '../widgets/Skeletons';

import CardVideo from '../Card/CardVideo';
import CardUserVideo from '../Card/CardUserVideo';
import { SearchFilter } from './search-filter';

import {
  PARAM_LIMIT_L,
  PARAM_LIMIT_M,
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

const SearchComponent = inject(
  'ui',
  'search',
  'auth',
)(
  observer((props) => {
    useEffect(() => {
      props.search.setLanguages(props.auth.profileStore.profile.languages);

      loadInitialVideos();

      updateParams();

      props.search.getSearchHistory();
    }, []);

    const loadInitialVideos = () => {
      // this method was created in order not to load videos several times(because updateParams, which is also called in componentDidMount is able to request videos)
      const getQuery = (router) => router.query.query;
      const {
        filter: { title_contains },
      } = props.search;

      const query = getQuery(props.router);
      if (!title_contains && !query) {
        props.search.getVideo(TYPE_USER);
        props.search.getVideo(TYPE_FILM);
      }
    };

    const updateParams = () => {
      const getQuery = (router) => router.query.query;

      const {
        filter: { title_contains },
      } = props.search;
      const query = getQuery(props.router);

      if (title_contains !== query) {
        props.search.setKeyword(query);

        props.search.apply();
      }
    };

    const videos = props.search.videos;

    if (props.search.filterLoading) {
      return <Spinner animation="border" variant="success" className="mt-4" />;
    }

    const isEmpty = !videos[TYPE_FILM].total && !videos[TYPE_USER].total;

    if (isEmpty) {
      return (
        <Container className={props.isMobile ? 'mt-3' : 'mt-5'}>
          <SearchFilter search={props.search} ui={props.ui} />
          <Row className=" mt-5 mb-5 container-size">
            <MockEmptySpace mainText={'Nothing found'} />
          </Row>
        </Container>
      );
    }
    return (
      <Container className={props.isMobile ? 'mt-3' : 'mt-5'}>
        <SearchFilter search={props.search} ui={props.ui} />

        <Row className={'mt-5 mb-5'}>
          {props.search.videos[TYPE_FILM].total > 0 && (
            <ListView
              title="Movies"
              skeleton={SkeletonVertical}
              titleUrl={urlGenerator.toFilmListVideo({
                params: JSON.stringify(toJS(props.search.filter)),
              })}
              isLoading={videos[TYPE_FILM].loading}
              itemsInRow={PARAM_LIMIT_L}
              isOnBoard
              prevEnable={!props.search.isPrevAllVideo}
              nextEnable={videos[TYPE_FILM].hasMore}
              onPrev={() => props.search.getVideo(TYPE_FILM, false)}
              onNext={() => props.search.getVideo(TYPE_FILM, true)}
            >
              {videos[TYPE_FILM].media.map((item, key) => (
                <Col key={item.id} xs={6} xl={2}>
                  <CardVideo video={item} />
                </Col>
              ))}
            </ListView>
          )}
        </Row>
        <Row className={'mt-5 mb-5'}>
          {props.search.videos[TYPE_USER].total > 0 && (
            <ListView
              title="Videos"
              skeleton={SkeletonHorizontal}
              titleUrl={urlGenerator.toUserListVideo({
                params: JSON.stringify(toJS(props.search.filter)),
              })}
              isLoading={videos[TYPE_USER].loading}
              itemsInRow={PARAM_LIMIT_M}
              prevEnable={!props.search.isPrevUser}
              isOnBoard
              nextEnable={videos[TYPE_USER].hasMore}
              onPrev={() => props.search.getVideo(TYPE_USER, false)}
              onNext={() => props.search.getVideo(TYPE_USER, true)}
            >
              {videos[TYPE_USER].media.map((item, key) => (
                <Col key={key} xs={6} xl={3} className="mb-4">
                  <CardUserVideo video={item} isMobile={props.isMobile} />
                </Col>
              ))}
            </ListView>
          )}
        </Row>
      </Container>
    );
  }),
);
export const Search = withRouter(SearchComponent);
