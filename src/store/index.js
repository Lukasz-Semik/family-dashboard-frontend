import Vue from 'vue';
import Vuex from 'vuex';

import currentUser from './currentUser/currentUser';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    currentUser,
  },
});

export default store;
