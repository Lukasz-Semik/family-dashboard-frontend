import Vue from 'vue';
import Vuex from 'vuex';

import currentUser from './currentUser';
import toast from './toast';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    currentUser,
    toast,
  },
});

export default store;
