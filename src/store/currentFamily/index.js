import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  currentFamily: {},
  isFetching: false,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
