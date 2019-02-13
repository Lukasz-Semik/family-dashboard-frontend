import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export const state = {
  todos: [],
  isFetching: false,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
