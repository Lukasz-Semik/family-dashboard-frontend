import { shallowMount } from '@vue/test-utils';

import Title from './Title';

describe('<Title>', () => {
  it('should render correctly as h1 with provided translated text', () => {
    const wrapper = shallowMount(Title, {
      propsData: {
        translatedText: 'some-title',
      },
      mocks: {
        $t: key => key,
      },
    });

    expect(wrapper.is('h1')).toBe(true);
    expect(wrapper.text()).toBe('some-title');
  });

  it('should render correctly as tag given in props with provided translation path', () => {
    const wrapper = shallowMount(Title, {
      propsData: {
        translationPath: 'translation.path',
        tag: 'h3',
      },
      mocks: {
        $t: key => key,
      },
    });

    expect(wrapper.is('h3')).toBe(true);
    expect(wrapper.text()).toBe('translation.path');
  });

  it('should provide proper class according to props', () => {
    const wrapper = shallowMount(Title, {
      propsData: {
        translatedText: 'some-title',
        isOrange: true,
      },
      mocks: {
        $t: key => key,
      },
    });

    expect(wrapper.classes()).toContain('is-orange');
    expect(wrapper.text()).toBe('some-title');
  });
});
