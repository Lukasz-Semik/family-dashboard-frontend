import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';

import Link from './Link';

Vue.use(VueRouter);

const URL = {
  name: 'url',
  path: '/url',
};

describe('<Link />', () => {
  it('shuld render properly with translated text', () => {
    const wrapper = shallowMount(Link, {
      propsData: {
        to: URL,
        translatedText: 'translated-text',
      },
    });

    expect(wrapper.text()).toBe('translated-text');
  });

  it('shuld render properly with translated text', () => {
    const wrapper = shallowMount(Link, {
      propsData: {
        to: URL,
        translationPath: 'translation.path',
      },
      mocks: {
        $t: key => key,
      },
    });

    expect(wrapper.text()).toBe('translation.path');
  });
});
