import axios from 'axios';
import { BASE_URL } from '../constants/API';
import qs from 'qs';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

axios.interceptors.request.use((config) => {
  config.paramsSerializer = (params) => {
    return qs.stringify(params);
  };

  return config;
});

const http = {
  isCancel: function (error) {
    return axios.isCancel(error);
  },

  setToken(token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  },
  get: function (url, params) {
    return axios.get(url, { params: params });
  },
  post: function (url, data) {
    return axios.post(url, data);
  },
  delete: function (url, params) {
    return axios.delete(url, { params: { ...params } });
  },

  upload: function (url, data, onUploadProgress, source) {
    const config = {
      onUploadProgress: onUploadProgress,
      cancelToken: source.token,
    };

    return axios.post(url, data, config);
  },

  uploadPhoto: function (url, data) {
    return axios.post(url, data);
  },

  put: function (url, data) {
    return axios.put(url, data);
  },

  getCancelToken: function () {
    const CancelToken = axios.CancelToken;
    return CancelToken.source();
  },
};

export default http;
