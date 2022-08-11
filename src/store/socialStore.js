import { action, configure, observable, runInAction } from 'mobx';
import cookies from 'js-cookie';

import { BasicStore } from './BasicStore';

import http from '../api/axiosApi';
import { PATH_URL_SUBSCRIBE, PATH_URL_UNSUBSCRIBE } from '../constants/API';

configure({ enforceActions: 'always' });

class SocialStore extends BasicStore {
  @observable subscribe = false;
  @observable loading = { subscribe: false };

  @action
  follow(social, isSubscribed = null) {
    const token = cookies.get('token');

    http.setToken(token);

    this.loading.subscribe = true;

    const isAlreadySubscribed =
      isSubscribed !== null ? isSubscribed : this.subscribe;

    const req = isAlreadySubscribed
      ? http.delete(`${PATH_URL_UNSUBSCRIBE}${social.id}`)
      : http.post(`${PATH_URL_SUBSCRIBE}${social.id}`);

    return req
      .then((res) => {
        const data = res.data;

        runInAction(() => {
          if (data.success) {
            this.subscribe = !this.subscribe;
          } else {
            this.toast.show({
              message: data.message,
              type: 'warning',
              visible: true,
            });
          }
          this.loading.subscribe = false;
        });
      })
      .catch((e) => {
        runInAction(() => {
          this.toast.show({
            message: e.message,
            type: 'warning',
            visible: true,
          });
          this.loading.subscribe = false;
        });
      });
  }

  @action
  setSubscribe(sub) {
    this.subscribe = sub;
  }
}

export default SocialStore;
