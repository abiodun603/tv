import { action, configure, observable, runInAction } from 'mobx';
import cookies from 'js-cookie';

import { BasicStore } from './BasicStore';

import { PATH_URL_COUNTRIES } from '../constants/API';
import http from '../api/axiosApi';

configure({ enforceActions: 'always' });

class CountriesStore extends BasicStore {
  @observable loading = false;
  @observable list = [];

  @action
  load() {
    const token = cookies.get('token');
    console.log(token);

    http.setToken(token);

    this.loading = true;

    http
      .get(PATH_URL_COUNTRIES)
      .then((res) => {
        const data = res.data;
        debugger;
        console.log(data);
        runInAction(() => {
          this.list = data || [];
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

export default CountriesStore;
