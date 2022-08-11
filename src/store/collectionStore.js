import cookies from 'js-cookie';
import { action, configure, observable, runInAction } from 'mobx';

import { PATH_URL_COLLECTIONS } from '../constants/API';

import http from '../api/axiosApi';

import { BasicStore } from './BasicStore';

configure({ enforceActions: 'always' });

class CollectionStore extends BasicStore {
  clearData = {
    id: null,
    title: '',
    countVideo: 0,
    ownerTitle: '',
    ownerImg: null,
    videos: [],
    poster: null,
    subscribe: false,
  };

  @observable data = {
    id: null,
    title: '',
    countVideo: 0,
    ownerTitle: '',
    ownerImg: null,
    videos: [],
    poster: null,
    subscribe: false,
  };

  @observable loading = false;

  @action
  getCollection(id) {
    http.setToken(cookies.get('token'));

    if (this.loading) {
      return;
    }

    this.loading = true;

    http
      .get(PATH_URL_COLLECTIONS + id, {})
      .then((res) => {
        const data = res.data;

        runInAction(() => {
          if (data.success) {
            const result = data.result;

            this.data = {
              id: result.id,
              title: result.title,
              videos: result.videos || [],
              countVideo: result.count_video,
              poster: result.poster,
              ownerTitle: result?.owner?.username || 'Dashboard',
              ownerImg: result?.owner?.photo || '',
              subscribe: result.subscribe || false,
            };
          } else {
            this.toast.show({
              message: 'Failed to load collection',
              type: 'warning',
              visible: true,
            });
          }
          this.loading = false;
        });
      })
      .catch((e) => {
        runInAction(() => {
          this.toast.show({
            message: e.message,
            type: 'warning',
            visible: true,
          });
          this.loading = false;
        });
      });
  }

  @action
  clearCollectionData() {
    runInAction(() => {
      this.data = this.clearData;
    });
  }
}

export default CollectionStore;
