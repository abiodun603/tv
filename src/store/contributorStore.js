import { action, computed, observable, runInAction } from 'mobx';
import cookies from 'js-cookie';

import { BasicStore } from './BasicStore';
import http from '../api/axiosApi';
import { PATH_URL_SOCIAL } from '../constants/API';

class ContributorStore extends BasicStore {
  @observable profile = null;
  @observable loading = {
    subscribe: false,
  };

  @action
  async getProfile(id) {
    http.setToken(cookies.get('token'));

    const {
      data: { result: profile },
    } = await http.get(`${PATH_URL_SOCIAL}/${id}`);

    runInAction(() => {
      this.profile = profile;
    });
  }

  @action
  async toggleSubscribe() {
    const { social } = this.profile;

    runInAction(() => {
      this.loading.subscribe = true;
    });

    try {
      const isSub = this.isSubscribed;

      await this.rootStore.stores.social.follow(social, isSub);

      await this.getProfile(social.id);
    } catch (e) {
      runInAction(() => {
        this.toast.show({
          message: e.message,
          type: 'warning',
          visible: true,
        });
      });
    } finally {
      runInAction(() => {
        this.loading.subscribe = false;
      });
    }
  }

  @action
  clear() {
    this.profile = null;
    this.loading.subscribe = false;
  }

  @computed
  get isSubscribed() {
    return Boolean(this.profile && this.profile.social.subscribe);
  }
}

export default ContributorStore;
