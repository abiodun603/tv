import cookies from 'js-cookie';

import http from '../../api/axiosApi';

import { PATH_URL_LIB_WATCH } from '../../constants/API';

export const toggleWatchLater = (watched, videoId) => {
  let token = cookies.get('token');

  http.setToken(token);

  return watched
    ? http.delete(`${PATH_URL_LIB_WATCH}?video_id=${videoId}`)
    : http.post(PATH_URL_LIB_WATCH, { video_id: videoId });
};
