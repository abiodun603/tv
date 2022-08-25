import { observable, action, configure, runInAction } from 'mobx';

configure({ enforceActions: 'always' });

class Toast {
  @observable state = { message: '', type: 'none', visible: false };

  @action show(state) {
    this.state = state;

    setTimeout(() => {
      runInAction(() => {
        this.state = { message: '', type: 'none', visible: false };
      });
    }, 100);
  }
  @action clear() {
    this.state = { message: '', type: 'none', visible: false };
  }
}

export default Toast;
