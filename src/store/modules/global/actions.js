import debounce from 'lodash/debounce';
import helloWorldAPI from '@/services/api/internal/helloWorldAPI';

/**
 * Debounce delay before a search is actually triggered
 */
const SEARCH_DEBOUNCE_DELAY = 1000;

// TODO Put your real search in a service
function searchFor(searchQuery) {
  // eslint-disable-next-line no-console
  console.log(`Start of search for ${searchQuery}`);

  return new Promise((resolve, reject) => {
    const result = {
      searchQuery,
      items: ['First search result', 'Second search result', 'Third search result'],
    };
    const error = new Error(`Don't worry, this is a sample error thrown while searching with the query "${searchQuery}"`);
    error.searchQuery = searchQuery;

    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log(`End of search for ${searchQuery}`);
      if (Math.random() > 0.5) resolve(result);
      else reject(error);
    }, 2000);
  });
}

export default {
  setUser({ commit }, user) {
    commit('SET_USER', user);
  },
  async initHelloWorldMessage({ commit }) {
    commit('SET_HELLO_WORLD_MESSAGE', 'Calling the API...');
    return helloWorldAPI
      .getHelloWorldMessage()
      .then((message) => commit('SET_HELLO_WORLD_MESSAGE', message))
      .catch((error) => commit('SET_HELLO_WORLD_MESSAGE', JSON.stringify(error)));
  },
  searchFor: debounce(({ commit }, searchQuery) => {
    commit('START_SEARCH', searchQuery);
    searchFor(searchQuery)
      .then((searchResults) => commit('END_SEARCH', searchResults))
      .catch((error) => commit('END_SEARCH_ERROR', error));
  }, SEARCH_DEBOUNCE_DELAY),
};
