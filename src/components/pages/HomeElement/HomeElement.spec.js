import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';

import HomeElement from './HomeElement.vue';

Vue.use(VueRouter);

describe('<HomeElement/>', () => {
  it('should render properly', () => {
    const wrapper = shallowMount(HomeElement);

    expect(wrapper).toMatchSnapshot();
  });
});
