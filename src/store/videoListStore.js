import { action, configure, observable, runInAction } from 'mobx';
import cookies from 'js-cookie';

import {
  PARAM_LIMIT_ALL,
  PATH_URL_RECOMMENDED,
  PATH_URL_VIDEOS,
  PATH_URL_SUBSCRIPTIONS,
  MANAGER,
  USER,
} from '../constants/API';

import http from '../api/axiosApi';

configure({ enforceActions: 'always' });

import { BasicStore } from './BasicStore';

import * as TYPES from '../constants/types';
import * as TAGS from '../constants/tags';
import * as GENRES from '../constants/genres';

import getVideoParams from '../utils/getVideoParams';
import { REC, RECOMMENDED } from '../constants/types';
import { FAVORITE_USER } from '../constants/tags';

class VideoListStore extends BasicStore {
  @observable start = 0;
  @observable tag = '';

  @observable video_type = '';
  @observable video_tag = '';

  @observable media = [];
  @observable hasMore = false;
  @observable loading = false;

  @observable removingNeedsApprove = [];

  @action
  clearData(tag = '') {
    this.tag = tag;
    this.media = [];
    this.start = 0;
    this.hasMore = false;
  }

  getAPIroute = (type, tag) => {
    if (type === REC || tag === RECOMMENDED) {
      return PATH_URL_RECOMMENDED;
    }
    if (tag === FAVORITE_USER) {
      return PATH_URL_SUBSCRIPTIONS;
    }
    return PATH_URL_VIDEOS;
  };

  @action
  getVideo(type, tag, params = {}) {
    http.setToken(cookies.get('token'));

    // if (this.tag !== tag) {
    //   this.clearData(tag);
    // }

    let options = this.applyLanguageFilter({
      ...getVideoParams(type, tag),
      _sort: 'id:DESC',
      _start: this.start,
      _limit: PARAM_LIMIT_ALL,
      ...params,
    });

    if (tag === 'movies' || type === 'movies') {
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
        _start: this.start,
        _limit: PARAM_LIMIT_ALL,
        ...params,
      };
    }

    if (!this.hasMore && this.loading) {
      return;
    }

    this.loading = true;

    const route = this.getAPIroute(type, tag);

    http
      .get(route, options)
      .then((res) => {
        let data = res.data;
        if (data.success) {
          runInAction(() => {
            this.media = this.media.concat(data.result.video);
            this.start = data.result.start;
            this.hasMore = data.result.has;
            this.loading = false;
            this.video_type = type;
            this.video_tag = tag;
          });
        }
      })
      .catch((e) => {
        runInAction(() => {
          this.loading = false;
        });
      });
  }

  @action
  async removeVideo(id) {
    http.setToken(cookies.get('token'));

    if (!this.removingNeedsApprove.includes(id)) {
      this.removingNeedsApprove = [...this.removingNeedsApprove, id];
      return;
    }

    http.post(`video/remove_my/${id}`, {}).then(() => {
      runInAction(() => {
        this.removingNeedsApprove = this.removingNeedsApprove.filter(
          (value) => value !== id
        );
        this.toast.show({
          message: 'Your video has been successfully deleted!',
          type: 'success',
          visible: true,
        });
      });
    });
  }
}

export default VideoListStore;
