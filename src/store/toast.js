import { observable, action, configure } from 'mobx';

configure({ enforceActions: 'always' });

class Toast {
  @observable state = { message: '', type: 'none', visible: false };

  @action show(state) {
    this.state = state;
  }
  @action clear() {
    this.state = { message: '', type: 'none', visible: false };
  }
}

export default Toast;
