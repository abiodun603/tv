import { action, computed, configure, observable, runInAction } from 'mobx';
import cookies from 'js-cookie';

import { BasicStore } from './BasicStore';

import {
  PARAM_LIMIT_LARGE,
  PATH_URL_VIDEOS,
  PATH_URL_VIDEO,
  PATH_URL_LIKE_DELETE,
  PATH_URL_LIKE_CREATE,
  MANAGER,
} from '../constants/API';

import http from '../api/axiosApi';

configure({ enforceActions: 'always' });

class ComingStore extends BasicStore {
  @observable video = {
    all: {
      start: 0,
      media: [],
      hasMore: true,
      total: PARAM_LIMIT_LARGE,
      loading: false,
    },
  };
  @observable comings = {
    start: 0,
    media: [],
    end: PARAM_LIMIT_LARGE,
    total: PARAM_LIMIT_LARGE,
    hasMore: false,
    loading: false,
  };

  @observable videoData = {
    result: {
      social: { profile: {} },
      media: [{ video: { url: '' }, trailer: { url: '' } }],
      poster_v: null,
      allow_comments: false,
      isLike: false,
      lib: {},
      startFrom: 0,
      user: {},
    },
    loading: false,
  };

  @observable anotherVideo = {
    loading: false,
    data: [],
  };

  async request({ url = PATH_URL_VIDEOS, params = {}, method = 'get' }) {
    http.setToken(cookies.get('token'));

    const { data } = await http[method](url, params);

    if (!data || !data.success) {
      throw new Error('Request did not succeed');
    }

    return data.result;
  }

  @action
  async getAnotherVideo(id) {
    try {
      this.anotherVideo.loading = true;

      const { video } = await this.request({
        params: {
          _start: 0,
          _sort: 'id:DESC',
          _limit: 4,
          id_nin: id,
          _where: {
            creator: MANAGER,
            tags_contains: this.videoData.tags,
          },
        },
      });

      runInAction(() => {
        this.anotherVideo.data = video;
        this.anotherVideo.loading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.anotherVideo.loading = false;
      });
    }
  }

  @action
  getVideo(isNext, firstParams = {}) {
    http.setToken(cookies.get('token'));

    // if (this.comings.loading) {
    //   return;
    // }

    const params = this.applyLanguageFilter({
      _where: { status: 'coming_soon' },
      _sort: 'id:DESC',
      // _limit: PARAM_LIMIT_LARGE,
    });

    const start = isNext
      ? this.comings.start + PARAM_LIMIT_LARGE
      : this.comings.start;

    if (
      isNext &&
      !this.comings.hasMore
      // || (!isNext && this.comings.start - params._limit <= 0)
    ) {
      return;
    }

    this.comings.loading = true;

    http
      .get(PATH_URL_VIDEOS, {
        ...firstParams,
        _start: start,
        ...params,
      })
      .then((res) => {
        const data = res.data;
        if (data.success) {
          runInAction(() => {
            this.comings = {
              start: data.result.start,
              end: data.result.end,
              media: this.comings.media.concat(data.result.video),
              hasMore: data.result.has,
              total: data.result.total,
              loading: false,
            };
          });
        }
      })
      .catch((e) => {});
  }

  @action
  getSingleVideo(id, firstParams = {}) {
    http.setToken(cookies.get('token'));

    // if (this.videoData.loading) {
    //   return;
    // }

    this.videoData.loading = true;

    http
      .get(PATH_URL_VIDEO + id, {
        ...firstParams,
      })
      .then((res) => {
        const data = res.data;
        if (data.success) {
          runInAction(() => {
            this.videoData = data;
            this.getAnotherVideo(id);
          });
        }
        runInAction(() => {
          this.videoData.loading = false;
        });
      })
      .catch((e) => {});
  }

  @action
  clearComingData() {
    runInAction(() => {
      this.videoData = {
        result: {
          social: { profile: {} },
          media: [{ video: { url: '' }, trailer: { url: '' } }],
          poster_v: null,
          allow_comments: false,
          isLike: false,
          lib: {},
          startFrom: 0,
        },
      };
      this.comings = {
        start: 0,
        media: [],
        end: PARAM_LIMIT_LARGE,
        total: PARAM_LIMIT_LARGE,
        hasMore: false,
        loading: false,
      };
      this.anotherVideo = {
        loading: false,
        data: [],
      };
    });
  }
  @action.bound
  createLike() {
    this.videoData.result.isLike = !this.videoData.result.isLike;
    ++this.videoData.result.count_like;

    let video_id = this.videoData.result.id;

    http
      .post(PATH_URL_LIKE_CREATE, { video_id: video_id })
      .then((res) => {
        let data = res.data;

        runInAction(() => {
          if (!data.success) {
            this.toast.show({
              message: 'something went wrong',
              type: 'warning',
              visible: true,
            });
          }
        });
      })
      .catch((e) => {
        runInAction(() => {
          this.toast.show({
            message: e.message,
            type: 'warning',
            visible: true,
          });
        });
      });
  }

  @action.bound
  deleteLike() {
    this.videoData.result.isLike = !this.videoData.result.isLike;
    --this.videoData.result.count_like;
    let video_id = this.videoData.result.id;

    http
      .delete(PATH_URL_LIKE_DELETE, { video_id: video_id })
      .then((res) => {
        let data = res.data;

        runInAction(() => {
          if (!data.success) {
            this.toast.show({
              message: 'something went wrong',
              type: 'warning',
              visible: true,
            });
          }
        });
      })
      .catch((e) => {
        runInAction(() => {
          this.toast.show({
            message: e.message,
            type: 'warning',
            visible: true,
          });
        });
      });
  }

  @computed get isPrevAllVideo() {
    const start = this.video.all.start - PARAM_LIMIT_LARGE;
    return start <= 0;
  }
}

export default ComingStore;
