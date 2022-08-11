import { action, configure, observable, runInAction } from 'mobx';
import cookies from 'js-cookie';

import { BasicStore } from './BasicStore';

import getVideoParams from '../utils/getVideoParams';

import {
  MANAGER,
  USER,
  PARAM_LIMIT_LARGE,
  PARAM_LIMIT_MEDIUM,
  PARAM_LIMIT_SMALL,
  PATH_URL_VIDEOS,
} from '../constants/API';

import * as TYPES from '../constants/types';
import * as TAGS from '../constants/tags';
import * as GENRES from '../constants/genres';
import http from '../api/axiosApi';

configure({ enforceActions: 'always' });

class ReleaseStore extends BasicStore {
  baseStore = {
    start: 0,
    media: [],
    hasMore: true,
    limit: PARAM_LIMIT_LARGE,
    total: PARAM_LIMIT_LARGE,
    loading: false,
  };
  @observable video = {
    [TAGS.FAVORITE_USER]: {
      ...this.baseStore,
      creator: USER,
      limit: PARAM_LIMIT_MEDIUM,
      total: PARAM_LIMIT_SMALL,
    },

    [TAGS.ALL]: {
      creator: MANAGER,
      ...this.baseStore,
    },

    [TAGS.KIDS]: {
      creator: MANAGER,
      ...this.baseStore,
    },

    [TAGS.MUSIC]: {
      creator: MANAGER,
      ...this.baseStore,
    },
    [TAGS.PODCASTS]: {
      creator: MANAGER,
      ...this.baseStore,
    },

    [TAGS.DOC]: {
      creator: MANAGER,
      ...this.baseStore,
    },

    [TAGS.TV]: {
      creator: MANAGER,
      ...this.baseStore,
    },

    [TYPES.NEWS]: {
      ...this.baseStore,
      creator: MANAGER,
      hasMore: false,
      total: PARAM_LIMIT_SMALL,
    },
  };

  @action
  getNews() {
    //test
    this.video.news.media = Array(3).fill({
      allow_comments: true,
      allow_download: true,
      count_comments: '1',
      count_like: '0',
      count_watch: '0',
      description: 'The short story of a cat',
      id: 98,
      lib: { watch: false, history: false, complaint: true },
      preview_url:
        'https://d2pvw7djt6urpd.cloudfront.net/users/b2m1uG56dVObZJIyRdBm9R9PjE33/video/43b9baf7a118aa687753/posters/trim_3_FDFF_1_D3_3387_48_FF_9_EE_3_03_D154_A92_A93_96c497898e.0000000.jpg',
      social: {
        profile: {
          last_name: 'Dev',
          name: 'Alex',
          photo: {
            url:
              'https://d2pvw7djt6urpd.cloudfront.net/users/b2m1uG…4_E23_16096_0000193_FA_7_F1_E7_A9_c8c9228d67.jpeg',
          },
          username: 'altenaar',
        },
        id: 55,
      },
      tags: ['Action', 'Drama'],
      title: 'Thinking cat',
      type: 'user',
    });
  }

  @action
  getVideo(tag, isNext, params = {}) {
    http.setToken(cookies.get('token'));

    if (this.video[tag].loading) {
      return;
    }

    if (isNext && !this.video[tag].hasMore) {
      return;
    }

    let options = this.applyLanguageFilter(getVideoParams('', tag));

    if (tag === 'all') {
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
      };
    }

    if (!isNext && this.video[tag].start <= this.video[tag].limit) {
      return;
    }

    this.video[tag].loading = true;

    const start = isNext
      ? this.video[tag].start
      : this.video[tag].start === 6
      ? 0
      : this.video[tag].start - this.video[tag].limit * 2;

    if (tag === 'favorite_user') {
      http
        .get(`${'video'}/subscriptions`, {
          status: TYPES.RELEASED,
          _start: start,
          _sort: 'id:DESC',
          _limit: this.video[tag].limit,
          tags_ncontains: [TAGS.NEWS],
          ...options,
          ...params,
        })
        .then((res) => {
          const data = res.data;
          if (data.success) {
            runInAction(() => {
              this.video[tag] = {
                ...this.video[tag],
                start: data.result.start,
                end: data.result.end,
                media: data.result.video,
                hasMore: data.result.has,
                hasPrev: this.hasPrev(tag, data.result.start),
                total: data.result.total,
                loading: false,
              };
            });
          }
        })
        .catch((e) => {});
      return;
    }
    http
      .get(PATH_URL_VIDEOS, {
        status: TYPES.RELEASED,
        _start: start,
        _sort: 'id:DESC',
        _limit: this.video[tag].limit,
        ...options,
        ...params,
      })
      .then((res) => {
        const data = res.data;
        if (data.success) {
          runInAction(() => {
            this.video[tag] = {
              ...this.video[tag],
              start: data.result.start,
              end: data.result.end,
              media: data.result.video,
              hasMore: data.result.has,
              hasPrev: this.hasPrev(tag, data.result.start),
              total: data.result.total,
              loading: false,
            };
          });
        }
      })
      .catch((e) => {});
  }

  hasPrev(tag, start = this.video[tag].start) {
    return start > this.video[tag].limit;
  }
}

export default ReleaseStore;
