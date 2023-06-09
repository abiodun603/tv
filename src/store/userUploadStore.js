import { action, configure, observable, toJS, runInAction } from 'mobx';
import cookies from 'js-cookie';

import { BasicStore } from './BasicStore';

import http from '../api/axiosApi';
import {
  PATH_URL_UPLOAD,
  PATH_URL_VIDEOS,
  PARAM_LIMIT_ALL,
} from '../constants/API';

import listTag from '../utils/lists/listTag';
import { valText } from '../utils/validate';
import { NEWS } from '../constants/tags';

configure({ enforceActions: 'always' });

class UserUploadStore extends BasicStore {
  /**
   * Reference to the AuthStore
   *
   * @returns {AuthStore}
   */
  get auth() {
    return this.rootStore.stores.auth;
  }

  @observable loading = false;
  @observable cancelToken;
  @observable progress = 0;
  @observable file = null;
  @observable dataVideo = {
    tags: [],
    title: '',
    description: '',
    languages: [],
    allow_comments: true,
    allow_download: true,
  };

  @observable validated = {
    title: true,
    description: true,
  };

  @observable tagsVideo = listTag;

  // TODO: Debug this
  // @observable languages = this.auth.profileStore.profile.languages || [];
  @observable languages = [];

  currentSocialId = null;

  newUploads = {
    data: [],
    hasMore: false,
    start: 0,
    limit: PARAM_LIMIT_ALL,
  };

  @observable allUploads = {
    data: [],
    hasMore: false,
    start: 0,
    limit: PARAM_LIMIT_ALL,
  };
  @observable allNews = {
    data: [],
    hasMore: false,
    start: 0,
    limit: PARAM_LIMIT_ALL,
  };

  @action
  clearUploads() {
    runInAction(() => {
      this.allUploads = { ...this.newUploads };
      this.allNews = { ...this.newUploads };
    });
  }

  @action
  setFile(files) {
    if (files.length > 1) {
      this.toast.show({
        message: 'only single file',
        type: 'warning',
        visible: true,
      });
    } else if (files.length === 1) {
      this.file = files[0];
    } else {
      this.toast.show({
        message: 'wrong format',
        type: 'warning',
        visible: true,
      });
    }
  }

  @action.bound
  removeFile() {
    this.file = null;
  }

  @action
  setDataVideo(value, type) {
    if (type === 'title') {
      this.validated.title = true;
    } else if (type === 'description') {
      this.validated.description = true;
    }

    this.dataVideo[type] = value;
  }

  @action
  setEnabledTag(key, enabled) {
    this.tagsVideo[key].enabled = enabled;
  }

  @action.bound
  setProgress(progress) {
    this.progress = Math.round((progress.loaded / progress.total) * 100);
  }

  @action
  setLanguages(languages) {
    this.languages = languages;
  }
  //for user videos
  @action
  async getAllUploads(params) {
    const { social } = params;

    if (
      (social && social !== this.currentSocialId) ||
      !this.allUploads.data.length
    ) {
      this.clearUploads();
      this.currentSocialId = social;
    }

    http.setToken(cookies.get('token'));

    const { data } = await http.get(PATH_URL_VIDEOS, {
      ...params,
      _sort: 'id:DESC',
      _start: Number(this.allUploads.start),
      _limit: this.allUploads.limit,
    });

    if (!data || !data.success) {
      this.toast.show({
        message: 'Request did not succeed',
        type: 'error',
        visible: true,
      });

      throw new Error('Request did not succeed');
    }

    runInAction(() => {
      this.allUploads = {
        ...this.allUploads,
        data: this.allUploads.data.concat(data.result.video),
        start: data.result.start,
        hasMore: data.result.has,
      };
    });
  }

  @action
  async getUserNews(params) {
    const { social } = params;

    if (
      (social && social !== this.currentSocialId) ||
      !this.allUploads.data.length
    ) {
      this.clearUploads();
      this.currentSocialId = social;
    }

    http.setToken(cookies.get('token'));

    const { data } = await http.get(PATH_URL_VIDEOS, {
      ...params,
      _sort: 'id:DESC',
      _start: Number(this.allNews.start),
      _limit: this.allNews.limit,
      _where: { tags_contains: [NEWS] },
    });

    if (!data || !data.success) {
      this.toast.show({
        message: 'Request did not succeed',
        type: 'error',
        visible: true,
      });

      throw new Error('Request did not succeed');
    }

    runInAction(() => {
      this.allNews = {
        ...this.allNews,
        data: this.allNews.data.concat(data.result.video),
        start: data.result.start,
        hasMore: data.result.has,
      };
    });
  }

  removeItemFromUploads(id) {
    runInAction(() => {
      this.allUploads.data = this.allUploads.data.filter(
        (item) => item.id !== id
      );
      this.allNews.data = this.allNews.data.filter((item) => item.id !== id);
    });
  }

  @action.bound
  uploadVideo(type) {
    if (this.file === null) {
      this.toast.show({
        message: 'select a file...',
        type: 'warning',
        visible: true,
      });
      return;
    }

    if (!valText(this.dataVideo.title)) {
      this.validated.title = false;
      return;
    }
    if (!valText(this.dataVideo.description)) {
      this.validated.description = false;
      return;
    }

    let tags = this.tagsVideo.flatMap((tag) => {
      if (tag.enabled) {
        return tag.label;
      }
      return [];
    });

    if (tags.length === 0) {
      this.toast.show({
        message: 'select tags',
        type: 'warning',
        visible: true,
      });
      return;
    }

    this.loading = true;

    let fd = new FormData();
    fd.append('path', 'video');
    fd.append('files', toJS(this.file));

    const data = toJS(this.dataVideo);

    data.type = type;
    data.tags = tags;
    data.languages = this.languages;

    fd.append('data', JSON.stringify(data));

    this.cancelToken = http.getCancelToken();
    this.progress = 0;

    http.upload(PATH_URL_UPLOAD, fd, this.setProgress, this.cancelToken).then(
      action('successUploadVideo', (res) => {
        let data = res.data;

        if (Array.isArray(data) && data.length > 0 && data[0].success) {
          this.toast.show({
            message: 'successfully uploaded',
            type: 'success',
            visible: true,
          });
          this.resetVideo();
        } else {
          this.toast.show({
            message: data.message,
            type: 'warning',
            visible: true,
          });
        }
        this.loading = false;
      }),
      action('errorUploadVideo', (error) => {
        if (http.isCancel(error)) {
          console.log('Request cancelled...');
        } else {
          this.toast.show({
            message: error.message,
            type: 'warning',
            visible: true,
          });
        }
        this.loading = false;
      })
    );
  }

  @action resetVideo = () => {
    this.loading = false;
    this.file = null;
    this.dataVideo = {
      tags: [],
      title: '',
      description: '',
      languages: [],
      allow_comments: true,
      allow_download: true,
    };
    this.progress = 0;
    this.tagsVideo = listTag;
  };

  @action cancel = () => {
    this.cancelToken.cancel();
  };
}

export default UserUploadStore;
