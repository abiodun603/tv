import { action, configure, observable, runInAction } from 'mobx';
import cookies from 'js-cookie';

import {
  PARAM_LIMIT_M,
  PATH_URL_VIDEOS,
  PATH_URL_MY_UPLOADS,
  PATH_URL_RECOMMENDED,
} from '../constants/API';
import http from '../api/axiosApi';

configure({ enforceActions: 'always' });

import { BasicStore } from './BasicStore';
import * as TAGS from '../constants/tags';
import * as urlGenerator from '../lib/url/generator';
import getVideoParams from '../utils/getVideoParams';

const collectionQueryParams = {
  popular: {
    _sort: 'popular:DESC',
    _limit: PARAM_LIMIT_M,
    tags_ncontains: [TAGS.NEWS],
    ...getVideoParams(undefined, TAGS.POPULAR),
  },
  favorite: {
    _sort: 'id:DESC',
    _limit: PARAM_LIMIT_M,
    tags_ncontains: [TAGS.NEWS],
    ...getVideoParams(undefined, TAGS.FAVORITE_USER),
  },
  recommended: {
    _sort: 'id:DESC',
    _limit: PARAM_LIMIT_M,
    tags_ncontains: [TAGS.NEWS],
    ...getVideoParams(undefined, TAGS.RECOMMENDED),
  },
};

const initialCollectionState = {
  loading: false,
  start: 0,
  hasMore: true,
  hasPrev: false,
  data: [],
  _limit: PARAM_LIMIT_M,
};

export class UserVideosStore extends BasicStore {
  @observable popular = {
    name: 'popular',
    url: urlGenerator.toUserListVideo({ tag: TAGS.POPULAR }),
    ...initialCollectionState,
  };
  @observable favorite = {
    name: 'favorite',
    url: urlGenerator.toUserListVideo({ tag: TAGS.FAVORITE_USER }),
    ...initialCollectionState,
  };
  @observable recommended = {
    name: 'recommended',
    url: urlGenerator.toUserListVideo({ tag: TAGS.RECOMMENDED }),
    ...initialCollectionState,
  };

  @action
  clearData() {
    this.popular = {
      ...this.popular,
      ...initialCollectionState,
    };
    this.favorite = {
      ...this.favorite,
      ...initialCollectionState,
    };
    this.recommended = {
      ...this.recommended,
      ...initialCollectionState,
    };
  }

  @action.bound
  async loadAllVideos() {
    const requests = [
      this.loadVideoToCollection('popular', {
        ...collectionQueryParams.popular,
        // _start: this.popular.start,
      }),
      this.loadVideoToCollection('favorite', {
        ...collectionQueryParams.favorite,
        // _start: this.favorite.start,
      }),
      this.loadVideoToCollection('recommended', {
        ...collectionQueryParams.recommended,
        // _start: this.recommended.start,
      }),
    ];

    await Promise.all(requests);
  }

  @action
  async loadVideoToCollection(collection, params) {
    try {
      this[collection].loading = true;

      const { video, start, has } = await this.getQuery(collection, params);
      runInAction(() => {
        this[collection].data = video;
        this[collection].start = start;
        this[collection].hasMore = has;
        this[collection].hasPrev = this[collection].start > PARAM_LIMIT_M;
        this[collection].loading = false;
      });
    } catch (e) {
      runInAction(() => {
        this[collection].loading = false;
      });
    }
  }

  async getQuery(collection, params) {
    if (collection === 'favorite') {
      return this.loadFavorites(params);
    }
    if (collection === 'recommended') {
      return this.loadRec(params);
    }
    return this.loadVideo(params);
  }

  async loadNext(collection) {
    this.loadVideoToCollection(collection, {
      _start: this[collection].start,
      ...collectionQueryParams[collection],
    });
  }

  async loadPrev(collection) {
    const start =
      this[collection].start === PARAM_LIMIT_M
        ? 0
        : this[collection].start - PARAM_LIMIT_M * 2;

    this.loadVideoToCollection(collection, {
      _start: start,
      ...collectionQueryParams[collection],
    });
  }

  async getMyUploads(params = {}) {
    http.setToken(cookies.get('token'));

    const { data } = await http.get(PATH_URL_MY_UPLOADS, params);

    if (!data || !data.success) {
      throw new Error('Request did not succeed');
    }

    return data.result;
  }

  async loadVideo(params = {}) {
    http.setToken(cookies.get('token'));

    const { data } = await http.get(PATH_URL_VIDEOS, params);

    if (!data || !data.success) {
      throw new Error('Request did not succeed');
    }

    return data.result;
  }

  async loadFavorites(params) {
    http.setToken(cookies.get('token'));

    const { data } = await http.get(`${'video'}/subscriptions`, params);

    if (!data || !data.success) {
      throw new Error('Request did not succeed');
    }

    return data.result;
  }

  async loadRec(params) {
    http.setToken(cookies.get('token'));

    const { data } = await http.get(PATH_URL_RECOMMENDED, params);

    if (!data || !data.success) {
      throw new Error('Request did not succeed');
    }

    return data.result;
  }
}
