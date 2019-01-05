import { getIsLoggedIn } from './names';

const state = {
  isLoggedIn: true,
};

const getters = {
  [getIsLoggedIn]: state => state.isLoggedIn,
};

const mutations = {};

const actions = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
