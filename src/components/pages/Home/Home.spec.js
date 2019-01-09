import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './Home';

Vue.use(VueRouter);

describe('<Home/>', () => {
  it('should render properly', () => {
    const wrapper = shallowMount(Home);

    expect(wrapper).toMatchSnapshot();
  });
});
