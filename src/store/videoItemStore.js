import { action, configure } from 'mobx';

import http from '../api/axiosApi';
import { PATH_URL_LIB_COMPLAINT } from '../constants/API';

configure({ enforceActions: 'always' });

class VideoItemStore {
  @action
  complaintByVideo(complaint, video_id) {
    if (!complaint) {
      http
        .post(PATH_URL_LIB_COMPLAINT, { video_id: video_id })
        .then((res) => {});
    } else {
      http
        .delete(PATH_URL_LIB_COMPLAINT, { video_id: video_id })
        .then((res) => {});
    }
  }
}

export default VideoItemStore;
