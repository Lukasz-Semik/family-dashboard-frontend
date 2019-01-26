import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  isMessageVisible: false,
  translationPath: '',
  translatedText: '',
  toastType: '',
};

export default {
  state,
  getters,
  actions,
  mutations,
};
