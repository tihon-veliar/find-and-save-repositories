import RNSecureKeyStore, { ACCESSIBLE } from 'react-native-secure-key-store';
import { applySnapshot, onSnapshot, types as t } from 'mobx-state-tree';
import { connectReduxDevtools } from 'mst-middlewares';
import { Platform } from 'react-native';
import { flow, toJS } from 'mobx';
import _ from 'lodash';

import { restructuringTheRepository } from './dataRestructuring';
import { getRepositoryByName } from './requests';
import { withoutDuplicate } from '../core/utils';
import Repository from './repository';

const storageKey = '@store';

const allowedList = ['favoritesList'];

const RootStore = t
  .model('store', {
    favoritesList: t.optional(t.array(Repository), []),
    repositoryList: t.optional(t.array(Repository), []),
    isLoaded: t.maybeNull(t.boolean, false),
    isFetching: t.maybeNull(t.boolean, false),
    loadePageNumber: t.optional(t.number, 1),
    canLoadeMore: t.optional(t.boolean, true),
    selectedLanguages: t.optional(t.array(t.string), []),
  })
  .actions(self => ({
    afterCreate: () => {
      self.rehydrate();
    },
    rehydrate: async () => {
      try {
        const restored = await RNSecureKeyStore.get(storageKey);
        const snapshot = JSON.parse(restored);
        if (RootStore.is(snapshot)) {
          applySnapshot(self, _.pick(snapshot, allowedList));
        }
      } catch (e) {
        console.warn(e.name, e.message);
      } finally {
        self.loaded();
      }
    },
    loaded: () => {
      self.isLoaded = true;
    },

    toggleSelectedLanguages: languages => {
      let languagesColection = new Set(toJS(self.selectedLanguages));
      if (languagesColection.has(languages)) {
        languagesColection.delete(languages);
      } else {
        languagesColection.add(languages);
      }
      self.selectedLanguages = [...languagesColection];
    },

    deleteUnusedLanguages: () => {
      self.selectedLanguages = self.selectedLanguages.filter(selectedLanguage =>
        self.languages.some(language => selectedLanguage),
      );
    },

    isSelectedLanguges: language => {
      return toJS(self.selectedLanguages).some(
        selected => language === selected,
      );
    },
    fetchRepositorysBeString: flow(function* (searchString) {
      self.toggleFetching(true);
      self.toggleCanLoadeMore(true);
      try {
        const { status, data } = yield getRepositoryByName(searchString);
        if (status === 200) {
          self.setRepositories(data?.items);
          if (self.repositoryList.length === data.total_count) {
            self.toggleCanLoadeMore(false);
          }
        }
      } catch (error) {
        console.warn(error);
        self.setRepositories();
      } finally {
        self.toggleFetching(false);
      }
    }),

    toggleCanLoadeMore: bool => {
      self.canLoadeMore = bool;
    },
    loadeMoreRepositorys: flow(function* (searchString) {
      if (!self.isFetching) {
        self.toggleFetching(true);
        try {
          const { status, data } = yield getRepositoryByName(
            searchString,
            self.loadePageNumber + 1,
          );
          if (status === 200) {
            self.setLoadePageNumber(self.loadePageNumber + 1);
            self.setRepositories(data?.items, { push: true });
            if (self.repositoryList.length === data.total_count) {
              self.toggleCanLoadeMore(false);
            }
          }
        } catch (error) {
          console.warn(error);
          self.setRepositories();
          self.toggleCanLoadeMore(true);
          self.setLoadePageNumber();
        } finally {
          self.toggleFetching(false);
        }
      }
    }),

    setLoadePageNumber: (count = 1) => {
      self.loadePageNumber = count;
    },
    toggleFetching: (boolean = false) => {
      self.isFetching = boolean;
    },
    setRepositories: (repositoryList = [], { push = false } = {}) => {
      try {
        self.repositoryList = push
          ? [
            ...withoutDuplicate([
              ...toJS(self.repositoryList),
              ...restructuringTheRepository(repositoryList),
            ]),
          ]
          : [...withoutDuplicate(restructuringTheRepository(repositoryList))] ||
          [];
      } catch (error) {
        console.warn(error);
        self.repositoryList = [];
      }
    },
    toggleFavorites: id => {
      if (self.favoritesList.some(favorite => favorite.id === id)) {
        self.favoritesList = self.favoritesList.filter(
          favorite => favorite.id !== id,
        );
      } else {
        self.favoritesList = [
          ...toJS(self.favoritesList),
          toJS(self.repositoryList).find(favorite => favorite.id === id),
        ];
      }
    },
  }))
  .views(self => ({
    get repository() {
      // self.isSelectedLanguges(repository.language)

      return toJS(self.repositoryList)
        .map(repository => ({
          ...repository,
          inFavorits: self.favoritesList.some(
            favorites => favorites.id === repository.id,
          ),
        }))
        .filter(repository => {
          return self.selectedLanguages.length > 0
            ? self.isSelectedLanguges(repository.language)
            : true;
        });
    },
    get languages() {
      let categories = new Set();
      toJS(self.repositoryList).forEach(
        repository =>
          repository.language && categories.add(repository.language),
      );
      return [...categories];
    },
    get favorites() {
      return toJS(self.favoritesList).map(repo => ({
        ...repo,
        inFavorits: true,
      }));
    },
  }));

const store: { [key: any]: any } = RootStore.create();

if (Platform.OS === 'ios' && __DEV__) {
  connectReduxDevtools(require('remotedev'), store);
}

const accessible = { accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY };

const persistStoreToStorage = snapshot => {
  try {
    return RNSecureKeyStore.set(
      storageKey,
      JSON.stringify(snapshot),
      accessible,
    );
  } catch (err) {
    console.warn(err);
  }
};

onSnapshot(store, persistStoreToStorage);

export default store;
