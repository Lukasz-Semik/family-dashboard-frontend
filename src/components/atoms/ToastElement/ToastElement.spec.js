import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import ToastElement from './ToastElement.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('<ToastElement/>', () => {
  let actions;
  let store;
  let getters;

  beforeEach(() => {
    getters = {
      isMessageVisible: () => true,
      toastType: () => 'success',
      translatedText: () => '',
      translationPath: () => 'translation.path',
    };
    store = new Vuex.Store({
      state: {},
      actions,
      getters,
    });
  });

  it('should properly handle click and render translated text', () => {
    const wrapper = shallowMount(ToastElement, {
      mocks: {
        $t: key => key,
      },
      store,
      localVue,
    });

    const $text = wrapper.find('[data-test="toast-element"]');
    expect($text.text()).toBe('translation.path');
  });
});
