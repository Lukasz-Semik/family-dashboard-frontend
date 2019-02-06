import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import FamilyHeader from './FamilyHeader.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('<FamilyHeader', () => {
  let actions;
  let store;
  let getters;

  beforeEach(() => {
    getters = {
      currentFamily: () => ({ users: [{ firstName: 'John' }, { firstName: 'Jane' }] }),
    };
    store = new Vuex.Store({
      state: {},
      actions,
      getters,
    });
  });

  it('should render proper header', () => {
    const wrapper = shallowMount(FamilyHeader, {
      mocks: {
        $t: key => key,
      },
      store,
      localVue,
    });

    expect(wrapper).toMatchSnapshot();
  });
});
