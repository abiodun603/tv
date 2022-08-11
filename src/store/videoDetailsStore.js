import { action, configure, observable, runInAction } from 'mobx';
import cookies from 'js-cookie';

import { BasicStore } from './BasicStore';

import {
  PARAM_LIMIT_COMMENTS,
  PARAM_LIMIT_ALL,
  PATH_URL_COMMENT_CREATE,
  PATH_URL_COMMENTS,
  PATH_URL_LIB_COMPLAINT,
  PATH_URL_LIB_HISTORY,
  PATH_URL_LIB_WATCH,
  PATH_URL_LIKE_CREATE,
  PATH_URL_LIKE_DELETE,
  PATH_URL_VIDEO,
  PATH_URL_VIDEOS,
  PATH_URL_EPISODES,
} from '../constants/API';
import http from '../api/axiosApi';

import { valMessage } from '../utils/validate';

configure({ enforceActions: 'always' });

class VideoDetailsStore extends BasicStore {
  get libStore() {
    return this.rootStore.stores.lib;
  }

  @observable videoData = {
    social: { profile: {} },
    media: [{ video: { url: '' }, trailer: { url: '' } }],
    allow_comments: false,
    isLike: false,
    lib: {},
    startFrom: 0,
  };

  @observable episodeData = null;

  @observable seriesData = { seasons: [], episodes: [] };

  @observable loading = {
    comments: false,
    message: false,
    video: true,
  };

  @observable comment = {
    validated: true,
    value: '',
  };

  clearData = {
    start: 0,
    end: PARAM_LIMIT_COMMENTS,
    data: [],
    hasMore: true,
    total: PARAM_LIMIT_ALL,
  };

  @observable comments = { ...this.clearData };

  @observable progressVideo = 0;
  @observable duration = 0;

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

  async requestSeries({ url = PATH_URL_VIDEOS, params = {}, method = 'get' }) {
    http.setToken(cookies.get('token'));

    const { data } = await http[method](url, params);

    if (!data) {
      throw new Error('Request did not succeed');
    }

    return data;
  }

  @action
  async getAnotherVideo(id, creator) {
    try {
      this.anotherVideo.loading = true;

      const { video } = await this.request({
        params: {
          _start: 0,
          _sort: 'id:DESC',
          _limit: 4,
          id_ne: id,
          _where: {
            creator: creator,
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
  async getVideo(id, params, type) {
    try {
      this.loading.video = true;
      const dataFromResume = this.libStore.getVideoFromResume(id);
      let data;

      if (dataFromResume) {
        data = dataFromResume;
      } else {
        data = await this.request({
          url: PATH_URL_VIDEO + id,
          params,
        });
      }

      runInAction(() => {
        this.loading.video = false;
        this.videoData = data;

        this.videoData.startFrom = data.resumeTime || 0;
        this.videoData.lib.resumed = Boolean(data.resumeTime);

        this.getAnotherVideo(id, type);
      });
    } catch (e) {
      runInAction(() => {
        this.loading.video = false;
      });
    }
  }

  @action
  async getSeries(id, season_number, params, type) {
    try {
      this.loading.video = true;
      const dataFromResume = this.libStore.getVideoFromResume(id);
      let data = { seasons: [], episodes: [] };

      if (dataFromResume) {
        data = dataFromResume;
      } else {
        data.seasons = await this.requestSeries({
          url: PATH_URL_VIDEOS + '/' + id + '/seasons',
          params,
        });
        data.episodes = await this.requestSeries({
          url: `/${PATH_URL_EPISODES}?season=${season_number}&info=${id}`,
          params,
        });
      }

      if (!data.episodes.length) {
        return;
      }

      runInAction(() => {
        this.loading.video = false;
        this.seriesData.seasons = data.seasons;
        this.seriesData.episodes = data.episodes;

        this.getAnotherVideo(id, type);
      });
    } catch (e) {
      runInAction(() => {
        this.loading.video = false;
      });
    }
  }

  @action
  async getEpisode(id, params, type) {
    try {
      this.loading.video = true;
      const dataFromResume = this.libStore.getVideoFromResume(id);
      let data;

      if (dataFromResume) {
        data = dataFromResume;
      } else {
        data = await this.requestSeries({
          url: PATH_URL_EPISODES + '/' + id,
          params,
        });
      }

      runInAction(() => {
        this.loading.video = false;
        this.episodeData = data;

        this.episodeData.startFrom = data.resumeTime || 0;
        this.episodeData.lib.resumed = Boolean(data.resumeTime);

        this.getAnotherVideo(id, type);
      });
    } catch (e) {
      runInAction(() => {
        this.loading.video = false;
      });
    }
  }

  @action.bound
  setComment(comment) {
    this.comment.validated = true;
    this.comment.value = comment;
  }

  @action
  getComments(video_id) {
    let token = cookies.get('token');

    http.setToken(token);

    if (this.loading.comments || !this.comments.hasMore) {
      return;
    }

    this.loading.comments = true;

    http
      .get(`${PATH_URL_COMMENTS}${video_id}`, {
        _start: this.comments.start,
        _limit: PARAM_LIMIT_COMMENTS,
        _sort: 'created_at:desc',
      })
      .then((res) => {
        let data = res.data;
        runInAction(() => {
          if (data.success) {
            this.loading.comments = false;

            this.comments.data.push(...data.result.comments);

            this.comments = Object.assign(this.comments, {
              start: data.result.start,
              end: data.result.end,
              // result.has is incorrected when request returns last items
              hasMore: data.result.has && data.result.start < data.result.total,
              total: data.result.total,
            });
          } else {
            this.toast.show({
              message: data.message,
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
          this.loading.comments = false;
        });
      });
  }

  @action
  updateRec(id) {
    let token = cookies.get('token');

    http.setToken(token);
    http.post(`video/events/view/${id}`, {});
  }

  @action
  clearSeries() {
    this.episodeData = null;
    this.seriesData = { seasons: [], episodes: [] };
  }

  @action
  clearVideoData() {
    runInAction(() => {
      this.loading.video = false;
      this.videoData = {
        social: { profile: {} },
        media: [{ video: { url: '' }, trailer: { url: '' } }],
        allow_comments: false,
        isLike: false,
        lib: {},
        startFrom: 0,
      };
      this.episodeData = null;
      this.anotherVideo = {
        loading: false,
        data: [],
      };
    });
  }

  @action
  clearComments() {
    this.comments = { ...this.clearData };
  }

  refreshComments(video_id) {
    this.comments = { ...this.clearData };
    this.getComments(video_id);
  }

  @action.bound
  createComment(profile, video_id = this.videoData.id) {
    if (!valMessage(this.comment.value)) {
      this.comment.validated = false;
      return;
    }

    if (this.loading.message) {
      return;
    }

    let message = this.comment.value;

    let token = cookies.get('token');

    http.setToken(token);

    this.loading.message = true;

    http
      .post(PATH_URL_COMMENT_CREATE, {
        message: message,
        video_id: Number(video_id),
      })
      .then((res) => {
        let data = res.data;

        runInAction(() => {
          this.comment.value = '';
          if (data.success) {
            this.refreshComments(video_id);
          } else {
            this.toast.show({
              message: data.message,
              type: 'warning',
              visible: true,
            });
          }
          this.loading.message = false;
        });
      })
      .catch((e) => {
        runInAction(() => {
          this.comment.value = '';
          this.loading.message = false;
          this.toast.show({
            message: e.message,
            type: 'warning',
            visible: true,
          });
        });
      });
  }

  @action.bound
  createLike() {
    this.videoData.isLike = !this.videoData.isLike;
    ++this.videoData.count_like;
    let video_id = this.videoData.id;

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
    this.videoData.isLike = !this.videoData.isLike;
    --this.videoData.count_like;
    let video_id = this.videoData.id;

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

  @action.bound
  addWatchLater() {
    let token = cookies.get('token');
    http.setToken(token);

    this.videoData.lib.watch = !this.videoData.lib.watch;
    let video_id = this.videoData.id;

    let res = this.videoData.lib.watch
      ? http.post(PATH_URL_LIB_WATCH, { video_id: video_id })
      : http.delete(PATH_URL_LIB_WATCH, { video_id: video_id });

    res
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
  complaintByVideo() {
    let token = cookies.get('token');
    http.setToken(token);

    let complaint = !this.videoData.lib.complaint;
    let video_id = this.videoData.id;

    this.videoData.lib.complaint = complaint;

    if (complaint) {
      http
        .post(PATH_URL_LIB_COMPLAINT, { video_id: video_id })
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
    } else {
      http
        .delete(PATH_URL_LIB_COMPLAINT, { video_id: video_id })
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
  }

  @action.bound
  onProgressVideo(e, currentTime) {
    const duration = this.duration;

    if (!duration || !currentTime) {
      return;
    }

    if (!this.videoData.lib.history && currentTime / duration > 0.95) {
      this.setVideoToHistory();
    }

    this.videoData.resumeTime = currentTime;

    if (currentTime / duration >= 0.05 && currentTime / duration <= 0.95) {
      this.videoData.lib.resumed = true;
      this.setVideoToResume();
    } else if (
      this.videoData.lib.resumed &&
      (currentTime / duration < 0.05 || currentTime / duration > 0.95)
    ) {
      this.videoData.lib.resumed = false;
      this.removeVideoFromResume();
    }
  }

  @action.bound
  onProgressEpisode(e, currentTime) {
    const duration = this.duration;

    if (!duration || !currentTime) {
      return;
    }

    if (!this.videoData.lib.history && currentTime / duration > 0.95) {
      this.setVideoToHistory();
    }

    this.videoData.resumeTime = currentTime;

    if (currentTime / duration >= 0.05 && currentTime / duration <= 0.95) {
      this.videoData.lib.resumed = true;
      this.setVideoToResume();
    } else if (
      this.videoData.lib.resumed &&
      (currentTime / duration < 0.05 || currentTime / duration > 0.95)
    ) {
      this.videoData.lib.resumed = false;
      this.removeVideoFromResume();
    }
  }

  setVideoToResume() {
    this.libStore.addToResume(this.videoData);
  }

  removeVideoFromResume() {
    this.libStore.removeFromResume(this.videoData.id);
  }

  //95 % watching – history
  setVideoToHistory() {
    let video_id = this.videoData.id;

    http
      .post(PATH_URL_LIB_HISTORY, { video_id: video_id })
      .then((res) => {
        let data = res.data;

        runInAction(() => {
          if (!data.success) {
          } else {
            this.videoData.lib.history = true;
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  @action.bound
  onDurationVideo(duration) {
    this.duration = duration;
  }

  @action.bound
  onDurationEpisode(duration) {
    this.duration = duration;
  }
}

export default VideoDetailsStore;
