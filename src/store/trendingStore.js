import { action, computed, configure, observable, runInAction } from 'mobx';
import cookies from 'js-cookie';

import { BasicStore } from './BasicStore';

import { PARAM_LIMIT_ALL, PATH_URL_VIDEOS, USER } from '../constants/API';
import http from '../api/axiosApi';

configure({ enforceActions: 'always' });

class TrendingStore extends BasicStore {
  @observable start = 0;
  @observable media = [];
  @observable hasMore = true;
  @observable loading = false;

  @action.bound
  getTrending() {
    http.setToken(cookies.get('token'));

    let params = {
      _where: {
        creator: USER,
        ...this.getLanguageFilter(),
      },
      _start: this.start,
      _limit: PARAM_LIMIT_ALL,
    };

    this.loading = true;

    http
      .get(PATH_URL_VIDEOS, params)
      .then((res) => {
        let data = res.data;
        if (data.success) {
          runInAction(() => {
            this.start = data.result.start;
            this.media.push(...data.result.video);
            this.loading = false;
            this.hasMore = data.result.has;
          });
        }
      })
      .catch((e) => {});
  }

  @action.bound
  complaintByVideo(index) {
    http.setToken(cookies.get('token'));
    let video_id = this.media[index].id;
    let complaint = !this.media[index].lib.complaint;
    this.media[index].lib.complaint = complaint;
    this.rootStore.stores.videoItem.complaintByVideo(complaint, video_id);
  }

  @computed
  get isNext() {
    return this.hasMore && !this.loading;
  }
}

export default TrendingStore;
