import { action, computed, configure, observable, runInAction } from 'mobx';
import cookies from 'js-cookie';

import http from '../api/axiosApi';
import {
  MANAGER,
  PARAM_LIMIT_LARGE,
  PARAM_LIMIT_MEDIUM,
  PATH_URL_COLLECTIONS,
  PATH_URL_RECOMMENDED,
  PATH_URL_VIDEOS,
  TYPE_FILM,
  TYPE_REC,
  TYPE_USER,
  USER,
} from '../constants/API';
import { BasicStore } from './BasicStore';
import { oneByOne } from '../utils/lists/oneByOne';
import { MUSIC, NEWS } from '../constants/tags';
import { RELEASED } from '../constants/types';
import { MUSIC_VIDEO, PODCASTS } from '../constants/genres';
import { tags_not_contains } from '../utils/http/generate/tags_not_contains';

configure({ enforceActions: 'always' });

class HomeStore extends BasicStore {
  @observable video = {
    [TYPE_USER]: {
      start: 0,
      media: [],
      hasMore: true,
      loading: false,
      limit: PARAM_LIMIT_MEDIUM,
    },

    [TYPE_FILM]: {
      start: 0,
      media: [],
      hasMore: true,
      loading: false,
    },

    [TYPE_REC]: {
      start: 0,
      media: [],
      hasMore: true,
      loading: false,
    },
  };

  @observable carousel = {
    media: [],
    loading: false,
  };

  @observable collections = {
    start: 0,
    items: [],
    hasMore: true,
    loading: false,
  };

  @observable contests = {
    start: 0,
    items: this.getContests(),
    hasMore: false,
    loading: false,
  };

  // mock contests
  getContests() {
    return [
      {
        title: 'Show the love for cinema',
        image: {
          url: `/fake_data/contests/more-1.png`,
        },
        description: 'description',
        stop_time: '2020-08-02T16:30:00.000Z',
        count: 100,
      },
      {
        title: '#ILoveYouNewYork',
        image: {
          url: `/fake_data/contests/more-2.png`,
        },
        description: 'description',
        stop_time: '2020-08-02T16:30:00.000Z',
        count: 100,
      },
      {
        title: 'Mother Day Gift',
        image: {
          url: `/fake_data/contests/more-3.png`,
        },
        description: 'description',
        stop_time: '2020-08-02T16:30:00.000Z',
        count: 100,
      },
      {
        title: 'FilmTV Compilation',
        image: {
          url: `/fake_data/contests/more-4.png`,
        },
        description: 'description',
        stop_time: '2020-08-02T16:30:00.000Z',
        count: 100,
      },
    ];
  }

  @action
  async getCarouselMovies() {
    http.setToken(cookies.get('token'));

    if (this.carousel.loading) {
      return;
    }

    if (this.carousel.media.length > 0) {
      return;
    }

    this.carousel.loading = true;

    const popularMovieParams = {
      _where: {
        status: RELEASED,
        creator: MANAGER,
        tags_ncontains: [NEWS],
        ...this.getLanguageFilter(),
      },
      _sort: 'count_like:desc,count_watch:desc',
      _limit: 5,
    };

    const {
      data: { success, result },
    } = await http.get(PATH_URL_VIDEOS, popularMovieParams);

    const videosList = [];

    if (success) {
      const { video: popular } = result;

      videosList.push(popular);

      const ids = popular.map(({ id }) => id);

      const recentMoviesParams = {
        _where: {
          status: RELEASED,
          creator: MANAGER,
          tags_ncontains: [NEWS],
          ...this.getLanguageFilter(),
        },
        id_nin: ids,
        _sort: 'id:desc',
        _limit: 5,
      };

      const { data: recent } = await http.get(
        PATH_URL_VIDEOS,
        recentMoviesParams,
      );

      if (recent.success && recent.result.video.length) {
        videosList.push(recent.result.video);
      }
    }

    runInAction(() => {
      this.carousel.loading = false;
      this.carousel.media = oneByOne(...videosList);
    });
  }

  @action
  getVideoRec(isNext, firstParams = {}) {
    http.setToken(cookies.get('token'));

    if (this.video[TYPE_REC].loading) {
      return;
    }

    if (isNext && !this.video[TYPE_REC].hasMore) {
      return;
    }

    const params = {
      _sort: 'id:DESC',
      _where: {
        status: RELEASED,
        creator: MANAGER,
        tags_ncontains: [NEWS],
        ...this.getLanguageFilter(),
      },
      _limit: PARAM_LIMIT_LARGE,
    };

    if (!isNext && this.video[TYPE_REC].start - params._limit <= 0) {
      return;
    }

    this.video[TYPE_REC].loading = true;

    const start = isNext
      ? this.video[TYPE_REC].start
      : this.video[TYPE_REC].start === 6
      ? 0
      : this.video[TYPE_REC].start - params._limit * 2;

    http
      .get(PATH_URL_RECOMMENDED, {
        _start: start,
        ...params,
        ...firstParams,
      })
      .then((res) => {
        const data = res.data;
        if (data.success) {
          runInAction(() => {
            this.video[TYPE_REC] = {
              start: data.result.start,
              end: data.result.end,
              media: data.result.video,
              hasMore: Boolean(data.result.has),
              loading: false,
            };
          });
        }
      })
      .catch((e) => {});
  }

  @action
  getVideo(type, isNext, firstParams = {}) {
    http.setToken(cookies.get('token'));
    if (this.video[type].loading) {
      return;
    }

    if (isNext && !this.video[type].hasMore) {
      return;
    }

    const { limit = PARAM_LIMIT_LARGE } = this.video[type];

    const params = {
      _sort: 'id:DESC',
      status: RELEASED,
      creator: type === TYPE_USER ? USER : MANAGER,
      _where:
        type != TYPE_USER
          ? { ...tags_not_contains([NEWS, MUSIC, MUSIC_VIDEO, PODCASTS]) }
          : { ...tags_not_contains([NEWS]) },
      ...this.getLanguageFilter(),
      _limit: limit,
    };

    if (!isNext && this.video[type].start - params._limit <= 0) {
      return;
    }

    this.video[type].loading = true;

    const start = isNext
      ? this.video[type].start
      : this.video[type].start === 6
      ? 0
      : this.video[type].start - params._limit * 2;

    http
      .get(PATH_URL_VIDEOS, {
        _start: start,
        ...params,
        ...firstParams,
      })
      .then((res) => {
        const data = res.data;
        if (data.success) {
          runInAction(() => {
            this.video[type] = {
              ...this.video[type],
              start: data.result.start,
              end: data.result.end,
              media: data.result.video,
              hasMore: data.result.has,
              loading: false,
            };
          });
        }
      })
      .catch((e) => {});
  }

  @action
  getCollections(isNext, firstParams = {}) {
    http.setToken(cookies.get('token'));

    if (
      this.collections.loading ||
      (isNext && !this.collections.hasMore) ||
      (!isNext && this.isPrevCollection)
    ) {
      return;
    }

    this.collections.loading = true;

    const start = isNext
      ? this.collections.start
      : this.collections.start - PARAM_LIMIT_MEDIUM * 2;

    const params = {
      _sort: 'last_video_update:DESC',
      _start: start,
      _limit: PARAM_LIMIT_MEDIUM,
      ...firstParams,
    };

    http
      .get(PATH_URL_COLLECTIONS, params)
      .then(({ data }) => {
        if (data.success) {
          runInAction(() => {
            this.collections = {
              start: data.result.start,
              end: data.result.end,
              items: data.result.collections ? data.result.collections : [],
              hasMore: data.result.has,
              total: data.result.total,
              loading: false,
            };
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  @computed get sliderMovies() {
    return this.carousel.media;
  }

  @computed get isPrevCollection() {
    const start = this.collections.start - PARAM_LIMIT_MEDIUM;
    return start <= 0;
  }

  @computed get isPrevUser() {
    const start = this.video[TYPE_USER].start - this.video[TYPE_USER].limit;
    return start <= 0;
  }

  @computed get isPrevAllVideo() {
    const start = this.video[TYPE_FILM].start - PARAM_LIMIT_LARGE;
    return start <= 0;
  }

  @computed get isPrevRec() {
    const start = this.video[TYPE_REC].start - PARAM_LIMIT_LARGE;
    return start <= 0;
  }
}

export default HomeStore;
