import {
  action,
  computed,
  configure,
  observable,
  runInAction,
  toJS,
} from 'mobx';
import cookies from 'js-cookie';

import { BasicStore } from './BasicStore';

import {
  PARAM_LIMIT_LARGE,
  PARAM_LIMIT_MEDIUM,
  PATH_URL_VIDEOS,
  TYPE_FILM,
  TYPE_USER,
  USER,
  MANAGER,
  PATH_URL_SEARCH_HISTORY_MY_LIST,
} from '../constants/API';

import http from '../api/axiosApi';
import listTag from '../utils/lists/listTag';
import { NEWS } from '../constants/types';

configure({ enforceActions: 'always' });

class SearchStore extends BasicStore {
  /**
   * Reference to the AuthStore
   *
   * @returns {AuthStore}
   */
  get auth() {
    return this.rootStore.stores.auth;
  }

  @observable videos = {
    [TYPE_USER]: {
      start: 0,
      media: [],
      hasMore: true,
      loading: false,
      total: 1,
    },

    [TYPE_FILM]: {
      start: 0,
      media: [],
      hasMore: true,
      loading: false,
      total: 1,
    },
  };

  @observable filter = {
    title_contains: '',
    tags_contains: [],
    allow_download: undefined,
    year_gte: 0,
    year_lte: new Date().getFullYear(),
  };

  @observable searchHistory = [];

  @observable filterEnabled = false;
  @observable filterLoading = false;

  @observable searchWord = '';
  @observable tagsVideo = listTag;
  @observable allow_download = false;
  @observable from_year = 1950;
  @observable to_year = 2020;
  @observable languages = [];

  @action.bound
  search() {
    this.addSearchHistoryItem();
    this.filterEnabled = true;
    this.getVideo(TYPE_USER);
    this.getVideo(TYPE_FILM);
  }

  @action
  getVideo(type, isNext = null) {
    http.setToken(cookies.get('token'));

    if (this.videos[type].loading) {
      return;
    }

    let start = 0;
    const limit = type === TYPE_USER ? PARAM_LIMIT_MEDIUM : PARAM_LIMIT_LARGE;

    if (isNext != null) {
      if (
        (isNext && !this.videos[type].hasMore) ||
        (!isNext && this.videos[type].start - limit <= 0)
      ) {
        return;
      }

      start = isNext
        ? this.videos[type].start
        : this.videos[type].start === 6
        ? 0
        : this.videos[type].start - limit * 2;
    }

    const paramFilter = this.filterEnabled ? toJS(this.filter) : {};
    const params = this.applyLanguageFilter({
      _sort: 'id:DESC',
      _where: {
        tags_ncontains: [NEWS],
        creator: type === TYPE_USER ? USER : MANAGER,
      },

      _limit: limit,
    });

    if (type === TYPE_USER) {
      delete paramFilter.year_gte;
      delete paramFilter.year_lte;
    }

    this.videos[type].loading = true;

    this.searchWord = this.filter.title_contains;

    http
      .get(PATH_URL_VIDEOS, {
        _start: start,
        ...params,
        ...paramFilter,
      })
      .then((res) => {
        const data = res.data;
        if (data.success) {
          runInAction(() => {
            this.videos[type] = {
              start: data.result.start,
              end: data.result.end,
              media: data.result.video,
              total: data.result.total,
              hasMore: data.result.total === 0 ? true : data.result.has,
              loading: false,
            };
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }
  @action
  addSearchHistoryItem() {
    if (this.rootStore.stores.profile.profile.search_history_enabled) {
      return;
    }
    http.setToken(cookies.get('token'));

    let start = 0;

    const paramFilter = toJS(this.filter);

    http
      .get(PATH_URL_VIDEOS, {
        _start: start,
        __history: 1,
        ...paramFilter,
      })
      .then(() => {
        this.getSearchHistory();
      })
      .catch((e) => {
        console.error(e);
      });
  }

  @action
  getSearchHistory() {
    http.setToken(cookies.get('token'));

    const params = {
      _sort: 'created:DESC',
    };

    http
      .get(PATH_URL_SEARCH_HISTORY_MY_LIST, params)
      .then((res) => {
        const data = res.data;
        if (data) {
          runInAction(() => {
            this.searchHistory = data;
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  @action
  setKeyword(keyword) {
    this.filter.title_contains = keyword;
  }

  @action
  setFromYear(year) {
    this.from_year = year;
  }

  @action
  setToYear(year) {
    this.to_year = year;
  }

  @action
  setEnabledTag(key, enabled) {
    this.tagsVideo[key].enabled = enabled;
  }

  @action
  setDownloadVideo(value) {
    this.allow_download = value;
  }

  @action
  setLanguages(languages) {
    this.languages = languages || [];
  }

  @action
  apply() {
    const tags = [];
    this.tagsVideo.forEach((e) => {
      if (e.enabled) {
        tags.push(e.label);
      }
    });

    this.filter.allow_download = this.allow_download
      ? this.allow_download
      : undefined;

    this.filter.year_gte = this.from_year;
    this.filter.year_lte = this.to_year;

    this.filter.tags_contains = tags;

    this.search();
  }

  @action
  reset() {
    this.filterEnabled = false;
    this.searchWord = '';
    this.tagsVideo = listTag;
    this.from_year = 1950;
    this.to_year = 2020;
    this.languages = [];

    this.filter = {
      title_contains: '',
      tags_contains: [],
      allow_download: undefined,
      year_gte: 0,
      year_lte: new Date().getFullYear(),
    };
    this.getVideo(TYPE_USER);
    this.getVideo(TYPE_FILM);
  }

  @computed get isPrevUser() {
    const start = this.videos[TYPE_USER].start - PARAM_LIMIT_MEDIUM;
    return start <= 0;
  }

  @computed get isPrevAllVideo() {
    const start = this.videos[TYPE_FILM].start - PARAM_LIMIT_LARGE;
    return start <= 0;
  }

  /**
   * Get languages list for the language filter
   *
   * @returns {[]|*[]}
   */
  getLanguages() {
    if (this.languages.length) {
      return this.languages;
    }

    return super.getLanguages();
  }
}

export default SearchStore;
