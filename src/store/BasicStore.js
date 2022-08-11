/**
 * Used to create a reference for the RootStore
 */
import { RootStore } from './RootStore';
import { ALL_LANGUAGES_ID } from '../constants/API';

export class BasicStore {
  /**
   * Reference to the RootStore
   *
   * @type {RootStore}
   */
  rootStore = null;

  /**
   * Reference to Toast store
   * @type {Toast}
   */
  get toast() {
    return this.rootStore.stores.toast;
  }

  constructor(...args) {
    const [rootStore] = args;

    if (!(rootStore instanceof RootStore)) {
      console.warn(
        'Please, pass instance of the RootStore class to the BasicStore'
      );
    }

    // save reference to the RootStore
    this.rootStore = rootStore;
  }

  /**
   * Add language filter to `_where` property
   *
   * @param params
   * @returns {{}|{_where: {'fragments.languages': []}}}
   */
  applyLanguageFilter(params = {}) {
    const { _where = {}, ...restParams } = params;

    // add language filter
    return {
      ...restParams,
      _where: {
        ..._where,
        ...this.getLanguageFilter(),
      },
    };
  }

  /**
   * Get language filter
   *
   * @returns {{}|{'fragments.languages': []}}
   */
  getLanguageFilter() {
    const languages = this.getLanguages();

    if (languages.length === 0) {
      return {};
    }

    return {
      'fragments.languages':
        languages && languages.length > 0
          ? [ALL_LANGUAGES_ID, ...languages]
          : [],
    };
  }

  /**
   * Get languages list for the language filter
   *
   * @returns {[]}
   */
  getLanguages() {
    const {
      profile: { languages = [] },
    } = this.rootStore.stores.profile;

    return languages;
  }
}
