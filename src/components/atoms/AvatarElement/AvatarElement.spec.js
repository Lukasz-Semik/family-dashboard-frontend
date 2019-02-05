import Vuex from 'vuex';

import { shallowMount, createLocalVue } from '@vue/test-utils';

import AvatarElement from './AvatarElement.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('<AvatarElement/>', () => {
  let store;
  let getters;

  beforeEach(() => {
    getters = {
      currentUser: () => ({
        firstName: 'John',
        lastName: 'Doe',
        isFamilyHead: true,
      }),
    };
    store = new Vuex.Store({
      state: {},
      getters,
    });
  });

  it('should properly handle click and render translated text', () => {
    const wrapper = shallowMount(AvatarElement, {
      mocks: {
        $t: key => key,
      },
      store,
      localVue,
    });

    expect(wrapper.find('[data-test="avatar-label"]').text()).toBe('John Doe');
  });
});
