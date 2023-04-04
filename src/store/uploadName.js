import { observable, action } from 'mobx';

class MyStore {
  @observable uploadName = '';

  @action
  nameupload(uploadName) {
    this.uploadName = uploadName;
  }
}

const myStore = new MyStore();
export default myStore;