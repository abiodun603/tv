import { BasicStore } from './BasicStore';

import { action, configure, observable, runInAction } from 'mobx';

import cookies from 'js-cookie';

import http from '../api/axiosApi';
import { PARAM_LIMIT_ALL, PATH_URL_VIDEOS, TYPE_NEWS } from '../constants/API';
import getVideoParams from '../utils/getVideoParams';

configure({ enforceActions: 'always' });
class NewsStore extends BasicStore {
  start = 0;
  tag = '';

  @observable media = [];
  @observable hasMore = false;
  @observable loading = false;

  @action
  clearData(tag = '') {
    this.tag = tag;
    this.media = [];
    this.start = 0;
    this.hasMore = false;
  }

  @action
  getNews(tag = TYPE_NEWS, params = {}, shouldReload = true) {
    http.setToken(cookies.get('token'));

    if (this.tag !== tag) {
      this.clearData(tag);
    }

    const options = this.applyLanguageFilter({
      _sort: 'id:DESC',
      _start: shouldReload ? 0 : this.start,
      _limit: PARAM_LIMIT_ALL,
      ...params,
    });

    if (!this.hasMore && this.loading) {
      return;
    }

    this.loading = true;

    http
      .get(PATH_URL_VIDEOS, options)
      .then((res) => {
        let data = res.data;
        if (data.success) {
          runInAction(() => {
            const videos = data.result.video.filter(v => !!v.tags.includes('news'));
            this.media = shouldReload ? videos : this.media.concat(videos); // thats how "show more" adds cards in media(it conctas all of the new data with the previous banch of data)
            this.start = data.result.start;
            this.hasMore = data.result.has;
            this.loading = false;
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
  searchNews(tag = TYPE_NEWS, params = {}) {
    http.setToken(cookies.get('token'));

    this.clearData(tag);

    const options = this.applyLanguageFilter({
      _sort: 'id:DESC',
      _start: 0,
      _limit: PARAM_LIMIT_ALL,
      ...params,
    });

    if (!this.hasMore && this.loading) {
      return;
    }

    this.loading = true;

    http
      .get(PATH_URL_VIDEOS, options)
      .then((res) => {
        let data = res.data;
        if (data.success) {
          runInAction(() => {
            this.media = this.media.concat(data.result.video); // thats how "show more" adds cards in media(it conctas all of the new data with the previous banch of data)
            this.start = data.result.start;
            this.hasMore = data.result.has;
            this.loading = false;
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
  resetNews(tag = TYPE_NEWS, params = {}) {
    http.setToken(cookies.get('token'));

    const options = this.applyLanguageFilter({
      _sort: 'id:DESC',
      _start: 0,
      _limit: PARAM_LIMIT_ALL,
      ...params,
    });

    if (!this.hasMore && this.loading) {
      return;
    }

    this.loading = true;

    http
      .get(PATH_URL_VIDEOS, options)
      .then((res) => {
        let data = res.data;
        if (data.success) {
          runInAction(() => {
            this.media = data.result.video; // thats how "show more" adds cards in media(it conctas all of the new data with the previous banch of data)
            this.start = data.result.start;
            this.hasMore = data.result.has;
            this.loading = false;
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
  categoryCheck = (categoriesItem, activeFilters) => {
    let includes = false;
    categoriesItem.forEach((category) => {
      if (activeFilters.includes(category)) {
        includes = true;
      }
    });
    return includes;
  };
}

export default NewsStore;
