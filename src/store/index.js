import Vue from 'vue';
import Vuex from 'vuex';

import currentFamily from './currentFamily';
import currentUser from './currentUser';
import toast from './toast';
import todos from './todos';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    currentFamily,
    currentUser,
    toast,
    todos,
  },
});

export default store;
