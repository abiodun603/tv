import { useStaticRendering } from 'mobx-react';

import { RootStore } from './RootStore';

const isServer = typeof window === 'undefined';

useStaticRendering(isServer);

let store = null;

function createStore() {
  const rootStore = new RootStore();

  return rootStore.getStores();
}

export default function initializeStore() {
  if (isServer) {
    // always create new store
    return createStore();
  }

  if (store === null) {
    store = createStore();
  }

  return { ...store };
}
