import { action, configure, observable, runInAction } from 'mobx';
import cookies from 'js-cookie';

import { BasicStore } from './BasicStore';

import { PATH_URL_LANGUAGES, ALL_LANGUAGES_ID } from '../constants/API';
import http from '../api/axiosApi';

configure({ enforceActions: 'always' });

class LanguagesStore extends BasicStore {
  @observable loading = false;
  @observable items = [];

  @action
  load() {
    const token = cookies.get('token');

    http.setToken(token);

    this.loading = true;

    http
      .get(PATH_URL_LANGUAGES, {
        id_ne: ALL_LANGUAGES_ID,
      })
      .then((res) => {
        const data = res.data;
        runInAction(() => {
          this.items = data || [];
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
}

export default LanguagesStore;
