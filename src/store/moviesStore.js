import { action, configure, observable, runInAction } from 'mobx';
import cookies from 'js-cookie';

import { PARAM_LIMIT_L, PATH_URL_VIDEOS, MANAGER } from '../constants/API';
import http from '../api/axiosApi';

configure({ enforceActions: 'always' });

import { BasicStore } from './BasicStore';

import * as TYPES from '../constants/types';
import * as TAGS from '../constants/tags';
import * as GENRES from '../constants/genres';

import getVideoParams from '../utils/getVideoParams';
import { NEWS } from '../constants/tags';

class MoviesStore extends BasicStore {
  @observable data = {};

  @action
  clearData() {
    this.data = {};
  }

  @action
  loadVideos(videoType, tag, params = {}, isNext = null) {
    const type = this.getDataKey(videoType, tag);

    http.setToken(cookies.get('token'));

    const { start, limit, hasMore, hasPrev, loading } = this.getTypeData(type);
    const _start = isNext ? start : start === limit ? 0 : start - limit * 2;

    let options = this.applyLanguageFilter({
      ...getVideoParams(videoType, tag),
      _sort: 'id:DESC',
      _start: _start < 0 ? 0 : _start,
      _limit: limit,
      ...params,
    });

    if (tag === 'movies') {
      options = {
        type: [TYPES.SINGLE_VIDEO, TYPES.SERIES],
        status: TYPES.RELEASED,
        creator: MANAGER,
        _where: [
          {
            tags_ncontains: [TAGS.NEWS],
          },
          {
            tags_ncontains: [GENRES.TV],
          },
          {
            tags_ncontains: [GENRES.KIDS],
          },
          {
            tags_ncontains: [GENRES.ANIMATION],
          },
          {
            tags_ncontains: [GENRES.MUSIC],
          },
          {
            tags_ncontains: [GENRES.PODCASTS],
          },
        ],
        _sort: 'id:DESC',
        _start: _start < 0 ? 0 : _start,
        _limit: limit,
        ...params,
      };
    }

    if (loading) {
      return;
    }

    if (isNext !== null) {
      if (!hasMore && isNext) {
        return;
      }

      if (!hasPrev && !isNext) {
        return;
      }
    }

    runInAction(() => {
      this.data[type].loading = true;
    });

    http
      .get(PATH_URL_VIDEOS, options)
      .then(({ data }) => {
        if (data.success) {
          runInAction(() => {
            const state = this.data[type];

            state.media = data.result.video;
            state.start = data.result.start;
            state.hasMore = data.result.has;
            state.hasPrev = state.start - state.limit > 0;
            state.loading = false;
          });
        }
      })
      .catch(() => {
        runInAction(() => {
          this.data[type].loading = false;
        });
      });
  }

  getTypeData(type) {
    const data = this.data[type];

    if (data) {
      return data;
    }

    const defaultValues = {
      start: PARAM_LIMIT_L,
      limit: PARAM_LIMIT_L,
      media: [],
      hasMore: false,
      hasPrev: false,
      loading: false,
    };

    runInAction(() => {
      this.data[type] = defaultValues;
    });

    return defaultValues;
  }

  getDataKey(videoType, tag) {
    return `${videoType}_${tag}`;
  }
}

export default MoviesStore;
