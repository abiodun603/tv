import { action, configure, observable, runInAction } from 'mobx';
import cookies from 'js-cookie';

import {
  PARAM_LIMIT_ALL,
  PATH_URL_COLLECTIONS,
  PARAM_LIMIT_MEDIUM,
} from '../constants/API';
import http from '../api/axiosApi';

configure({ enforceActions: 'always' });

class CollectionsStore {
  @observable isAllCollections = true;

  emptyCollections = {
    isAllCollections: true,
    start: 0,
    media: [],
    hasMore: false,
    hasPrev: false,
    total: PARAM_LIMIT_ALL,
    loading: false,
  };

  @observable collections = { ...this.emptyCollections };

  @action
  getCollections(firstParams = {}) {
    if (firstParams.filmId && this.isAllCollections) {
      this.isAllCollections = false;
      this.collections = { ...this.emptyCollections };
    } else if (!firstParams.filmId && !this.isAllCollections) {
      this.isAllCollections = true;
      this.collections = { ...this.emptyCollections };
    }

    http.setToken(cookies.get('token'));

    const params = {
      _start: firstParams.isPrev
        ? this.collections.start - PARAM_LIMIT_MEDIUM * 2
        : this.collections.start,
      _limit: firstParams.limit || PARAM_LIMIT_ALL,
      _sort: 'last_video_update:DESC',
      ...firstParams,
    };

    if (!this.collections.hasMore && this.collections.loading) {
      return;
    }

    this.collections.loading = true;

    http
      .get(PATH_URL_COLLECTIONS, params)
      .then(({ data }) => {
        if (data.success) {
          runInAction(() => {
            this.collections = {
              start: data.result.start,
              end: data.result.end,
              media: this.collections.media.concat(
                data.result.collections ? data.result.collections : [],
              ),
              hasMore: data.result.has,
              hasPrev:
                data.result.start - (firstParams.limit || PARAM_LIMIT_ALL) > 0,
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
  @action
  clearCollection() {
    runInAction(() => {
      this.collections = this.emptyCollections;
    });
  }
}

export default CollectionsStore;
