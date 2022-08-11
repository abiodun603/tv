import { action, computed, configure, observable, runInAction } from 'mobx';
import cookies from 'js-cookie';

import { BasicStore } from './BasicStore';

import {
  PARAM_LIMIT_LARGE,
  PATH_URL_LIB_HISTORY,
  PATH_URL_VIDEOS,
} from '../constants/API';
import http from '../api/axiosApi';
import {
  SINGLE_VIDEO,
  SERIES,
  RELEASED,
  MANAGER,
  MUSIC_RECENT,
} from '../constants/types';
import { MUSIC, MUSIC_VIDEO } from '../constants/genres';
import { NEWS } from '../constants/tags';

configure({ enforceActions: 'always' });

class MusicStore extends BasicStore {
  @observable list = {
    new: {
      start: 0,
      media: [],
      hasMore: true,
      total: PARAM_LIMIT_LARGE,
      loading: false,
    },
    trending: {
      start: 0,
      media: [],
      hasMore: true,
      total: PARAM_LIMIT_LARGE,
      loading: false,
    },
    popular: {
      start: 0,
      media: [],
      hasMore: true,
      total: PARAM_LIMIT_LARGE,
      loading: false,
    },
    recent: {
      start: 0,
      media: [],
      hasMore: true,
      total: PARAM_LIMIT_LARGE,
      loading: false,
    },
    musicVideo: {
      start: 0,
      media: [],
      hasMore: true,
      total: PARAM_LIMIT_LARGE,
      loading: false,
    },
  };

  canBack(type) {
    const start = this.list[type].start - PARAM_LIMIT_LARGE;

    return start > 0;
  }

  getParams(type, isBack = false) {
    let params = {
      _limit: PARAM_LIMIT_LARGE,
      _where: {
        status: RELEASED,
        creator: MANAGER,
        type: [SINGLE_VIDEO, SERIES],
        tags_contains: [MUSIC],
        tags_ncontains: [NEWS],
      },
      _start: this.list[type].start,
    };

    if (isBack && params._start >= PARAM_LIMIT_LARGE) {
      params._start -= PARAM_LIMIT_LARGE;
    }

    switch (type) {
      case 'new': {
        params['_sort'] = 'id:DESC';
        return params;
      }
      case 'popular': {
        params['_sort'] = 'count_like:desc';
        return params;
      }
      case 'trending': {
        params['_sort'] = 'count_like:desc';
        return params;
      }
      case 'recent': {
        return {
          _start: this.list[type].start,
          _limit: PARAM_LIMIT_LARGE,
          'video.creator': MANAGER,
          'video.tags_contains': MUSIC,
        };
      }
      case 'musicVideo': {
        params['_sort'] = 'count_like:DESC';
        params['_where'].tags_contains = [MUSIC_VIDEO];
        return params;
      }
      default: {
        params['_sort'] = 'id:DESC';
        return params;
      }
    }
  }

  @action
  getTrending(isBack = false) {
    return this.getList('trending', isBack);
  }

  @action
  getNewList(isBack = false) {
    return this.getList('new', isBack);
  }

  @action
  getFavouriteList(isBack = false) {
    return this.getList('favorite', isBack);
  }

  @action
  getList(type, isBack = false, firstParams = {}) {
    http.setToken(cookies.get('token'));

    const getParamsType = (type) => {
      if (type === MUSIC_RECENT) {
        return { ...this.getParams(type, isBack), ...firstParams };
      }
      return this.applyLanguageFilter({
        ...this.getParams(type, isBack),
        ...firstParams,
      });
    };
    const params = getParamsType(type);

    if (!this.list[type]) {
      this.list[type] = {
        start: 0,
        media: [],
        hasMore: true,
        total: params._limit,
        loading: false,
      };
    }

    if (!this.list[type].hasMore && this.list[type].loading) {
      return;
    }

    this.list[type].loading = true;

    const requestURL =
      type === MUSIC_RECENT ? PATH_URL_LIB_HISTORY : PATH_URL_VIDEOS;

    http
      .get(requestURL, params)
      .then(({ data }) => {
        if (data.success) {
          runInAction(() => {
            this.list[type].media =
              type === MUSIC_RECENT
                ? this.list[type].media.concat(...data.result.lib)
                : this.list[type].media.concat(...data.result.video);
            this.list[type].start = data.result.start;
            this.list[type].hasMore = data.result.has;
            this.list[type].loading = false;
          });
        }
      })
      .catch((e) => {
        console.log(e);
        runInAction(() => {
          this.list[type].loading = false;
        });
      });
  }
}

export default MusicStore;
