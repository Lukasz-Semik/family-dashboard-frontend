import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  isMessageVisible: false,
  translationPath: '',
  translatedText: '',
  type: '',
};

export default {
  state,
  getters,
  actions,
  mutations,
};
