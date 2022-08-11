// don't allow state modifications outside actions
import { action, configure, observable } from 'mobx';

configure({ enforceActions: 'always' });

class UIStore {
  @observable isOpenDialog = false;
  @observable isOpenOverlay = false;

  @action.bound
  closeDialog() {
    this.isOpenDialog = false;
  }

  @action.bound
  openDialog() {
    this.isOpenDialog = true;
  }

  @action.bound
  changeOverlay() {
    this.isOpenOverlay = !this.isOpenOverlay;
  }
}

export default UIStore;
