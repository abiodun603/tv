import { action, computed, observable, runInAction } from 'mobx';
import cookies from 'js-cookie';

import http from '../api/axiosApi';
import {
  PARAM_LIMIT_LIB,
  PATH_URL_LIB_HISTORY,
  PATH_URL_LIB_SUBSCIBED_COLLECTIONS,
  PATH_URL_LIB_WATCH,
} from '../constants/API';

import * as TYPES from '../constants/types';

class LibStore {
  @observable video = {
    [TYPES.LIB_HISTORY]: {
      start: 0,
      media: [],
      total: 0,
      hasMore: true,
      loading: false,
    },

    [TYPES.LIB_WATCH]: {
      start: 0,
      media: [],
      total: 0,
      hasMore: true,
      loading: false,
    },

    [TYPES.LIB_RESUME]: {
      currentPage: 1,
      media: [],
      full: [],
      hasMore: false,
    },
    [TYPES.LIB_SUBSCRIBED_COLLECTIONS]: {
      start: 0,
      media: [],
      total: 0,
      hasMore: true,
      loading: false,
    },
  };

  clearVideo = {
    [TYPES.LIB_HISTORY]: {
      start: 0,
      media: [],
      total: 0,
      hasMore: true,
      loading: false,
    },

    [TYPES.LIB_WATCH]: {
      start: 0,
      media: [],
      total: 0,
      hasMore: true,
      loading: false,
    },

    [TYPES.LIB_RESUME]: {
      currentPage: 1,
      media: [],
      full: [],
      hasMore: false,
    },
    [TYPES.LIB_SUBSCRIBED_COLLECTIONS]: {
      start: 0,
      media: [],
      total: 0,
      hasMore: true,
      loading: false,
    },
  };

  @action
  getLib(type: string, firstParams: any = {}) {
    http.setToken(cookies.get('token'));

    const params = {
      _start: this.video[type].start,
      _limit: PARAM_LIMIT_LIB,
      ...firstParams,
    };

    this.video[type].loading = true;

    const url =
      type === TYPES.LIB_HISTORY ? PATH_URL_LIB_HISTORY : PATH_URL_LIB_WATCH;

    http
      .get(url, params)
      .then((res) => {
        const data = res.data;

        if (data.success) {
          runInAction(() => {
            this.video[type] = {
              start: data.result.start,
              loading: false,
              hasMore: data.result.has,
              total: data.result.total,
              media:
                firstParams._start === 0
                  ? data.result.lib
                  : this.video[type].media.concat(...data.result.lib),
            };
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  @action
  updateFullResumeData() {
    this.video[TYPES.LIB_RESUME].full = JSON.parse(
      localStorage.getItem('resume'),
    );
  }

  @action
  getResume(page) {
    const data = this.video[TYPES.LIB_RESUME];
    const fullItems = data.full || [];

    if (page) {
      data.currentPage = page;
    }

    const to = PARAM_LIMIT_LIB * data.currentPage;

    const currentMedia = fullItems.slice(0, to);

    data.currentPage += 1;

    data.hasMore = currentMedia.length < fullItems.length;

    this.video[TYPES.LIB_RESUME].media = currentMedia;
  }

  @action
  getSubscribedCollecions(firstParams: any = {}) {
    http.setToken(cookies.get('token'));

    const params = {
      _start: this.video[TYPES.LIB_SUBSCRIBED_COLLECTIONS].start,
      _limit: PARAM_LIMIT_LIB,
      ...firstParams,
    };

    this.video[TYPES.LIB_SUBSCRIBED_COLLECTIONS].loading = true;

    http
      .get(PATH_URL_LIB_SUBSCIBED_COLLECTIONS, params)
      .then((res) => {
        const data = res.data;

        if (data.success) {
          runInAction(() => {
            this.video[TYPES.LIB_SUBSCRIBED_COLLECTIONS] = {
              start: data.result.start,
              loading: false,
              hasMore: data.result.has,
              total: data.result.total,
              media:
                firstParams._start === 0
                  ? data.result.lib
                  : this.video[TYPES.LIB_SUBSCRIBED_COLLECTIONS].media.concat(
                      data.result.lib,
                    ),
            };
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  @action
  getVideoFromResume(id) {
    return this.video[TYPES.LIB_RESUME].media.find((item) => item.id == id);
  }

  @action
  addToResume(video) {
    const media = this.video[TYPES.LIB_RESUME].media;
    const index = media.findIndex((item) => item.id === video.id);

    if (index === -1) {
      media.push(video);
    } else {
      media[index] = video;
    }

    localStorage.resume = JSON.stringify(media);
  }

  @action
  removeFromResume(id) {
    this.video[TYPES.LIB_RESUME].media = this.video[
      TYPES.LIB_RESUME
    ].media.filter((item) => item.id !== id);

    localStorage.resume = JSON.stringify(this.video[TYPES.LIB_RESUME].media);
  }

  @action
  clearLibData() {
    runInAction(() => {
      this.video = this.clearVideo;
    });
  }

  @computed
  get isNextHistory() {
    return (
      !this.video[TYPES.LIB_HISTORY].loading &&
      this.video[TYPES.LIB_HISTORY].hasMore
    );
  }

  @computed
  get isNextWatch() {
    return (
      !this.video[TYPES.LIB_WATCH].loading &&
      this.video[TYPES.LIB_WATCH].hasMore
    );
  }

  @computed
  get isNextWatchSubscribedCollections() {
    return (
      !this.video[TYPES.LIB_SUBSCRIBED_COLLECTIONS].loading &&
      this.video[TYPES.LIB_SUBSCRIBED_COLLECTIONS].hasMore
    );
  }

  @computed
  get isNextResume() {
    return this.video[TYPES.LIB_RESUME].hasMore;
  }
}

export default LibStore;
