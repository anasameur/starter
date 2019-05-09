// import app module (the vue instance)
import App from '@/main';

import { LOCAL_STORAGE_KEY_LANGUAGE, LOCAL_STORAGE_KEY_DARK_THEME_ENABLED } from './index';

export default {
  SET_SIDEBAR_OPENED: (state, opened) => {
    state.sidebar.opened = opened;
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language;
    App.$i18n.locale = language;
    window.localStorage.setItem(LOCAL_STORAGE_KEY_LANGUAGE, language);
  },
  SET_AUTHENTICATED: (state, authenticated) => {
    state.authenticated = authenticated;
  },
  SET_DARK_THEME: (state, darkThemeEnabled) => {
    state.darkThemeEnabled = darkThemeEnabled;
    window.localStorage.setItem(LOCAL_STORAGE_KEY_DARK_THEME_ENABLED, JSON.stringify(darkThemeEnabled));
  },
};
