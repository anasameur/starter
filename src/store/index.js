import Vue from 'vue';
import Vuex from 'vuex';
import boilerplate from './modules/boilerplate';
import global from './modules/global';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  modules: {
    boilerplate,
    global,
  },
});

export default store;
