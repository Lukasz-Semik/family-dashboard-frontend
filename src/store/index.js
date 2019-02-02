import Vue from 'vue';
import Vuex from 'vuex';

import currentUser from './currentUser';
import currentFamily from './currentFamily';
import toast from './toast';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    currentUser,
    currentFamily,
    toast,
  },
});

export default store;
