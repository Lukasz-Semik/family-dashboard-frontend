import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  isSignedIn: false,
  currentUser: {},
  isFetching: false,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
