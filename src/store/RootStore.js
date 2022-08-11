import HomeStore from './homeStore';
import ProfileStore from './profileStore';
import AuthStore from './authStore';
import Toast from './toast';
import VideoItemStore from './videoItemStore';

import TrendingStore from './trendingStore';
import SearchStore from './searchStore';

import CollectionsStore from './collectionsStore';
import CollectionStore from './collectionStore';

import ContestsStore from './contestsStore';
import ReleaseStore from './releaseStore';
import ComingStore from './comingStore';

import MusicStore from './musicStore';
import NewsStore from './newsStore';
import VideoListStore from './videoListStore';
import CountriesStore from './countriesStore';

import UIStore from './uiStore';
import SocialStore from './socialStore';
import LibStore from './libStore';
import VideoDetailsStore from './videoDetailsStore';

import UploadStore from './uploadStore';
import UploadNewsStore from './uploadNewsStore';
import LanguagesStore from './languagesStore';
import ContributorStore from './contributorStore';

import MoviesStore from './moviesStore';
import { UserVideosStore } from './userVideosStore';
import UserUploadStore from './userUploadStore';

export class RootStore {
  stores = {};

  constructor() {
    this.stores = this.initiateStores();
  }

  refreshStore() {
    this.stores = this.initiateStores();
  }

  getStores() {
    return {
      ...this.stores,
      rootStore: this,
    };
  }

  initiateStores() {
    return {
      profile: new ProfileStore(this),
      countries: new CountriesStore(this),
      home: new HomeStore(this),
      trending: new TrendingStore(this),
      search: new SearchStore(this),
      languages: new LanguagesStore(this),
      social: new SocialStore(this),
      upload: new UploadStore(this),
      userUpload: new UserUploadStore(this),
      uploadNews: new UploadNewsStore(this),
      auth: new AuthStore(this),
      release: new ReleaseStore(this),
      coming: new ComingStore(this),
      music: new MusicStore(this),
      news: new NewsStore(this),
      contributor: new ContributorStore(this),
      movies: new MoviesStore(this),
      userVideos: new UserVideosStore(this),
      collection: new CollectionStore(this),
      collections: new CollectionsStore(),
      contests: new ContestsStore(),
      ui: new UIStore(),
      lib: new LibStore(),
      video: new VideoDetailsStore(this),
      videos: new VideoListStore(this),
      videoItem: new VideoItemStore(),
      toast: new Toast(),
    };
  }
}
