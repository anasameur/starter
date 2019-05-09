/* State module specific to the boilerplate. Typically, there is no need to change this. */

// App module store contains all states that manage application
import locale from 'locale2';

// Mutations and Actions
import mutations from './mutations';
import actions from './actions';

// Boilerplate local storage keys
export const LOCAL_STORAGE_KEY_LANGUAGE = 'boilerplate-language';
export const LOCAL_STORAGE_KEY_DARK_THEME_ENABLED = 'boilerplate-darkThemeEnabled';

const boilerplate = {
  namespaced: true,
  state: {
    sidebar: {
      opened: false,
    },
    language: locale.split('-')[0] || 'fr',
    authenticated: true,
    darkThemeEnabled: false,
  },
  getters: {
    sidebar: (state) => state.sidebar,
    language: (state) => state.language,
    authenticated: (state) => state.authenticated,
    darkThemeEnabled: (state) => state.darkThemeEnabled,
  },
  mutations,
  actions,
};

export default boilerplate;
