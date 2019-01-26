import { shallowMount } from '@vue/test-utils';

import TextElement from './TextElement.vue';

describe('<TextElement/>', () => {
  it('should properly handle click and render translated text', () => {
    const wrapper = shallowMount(TextElement, {
      propsData: {
        translatedText: 'test-text',
      },
    });

    const $text = wrapper.find('[data-test="text-element"]');
    expect($text.text()).toBe('test-text');
  });

  it('should assign theme and render translation path', () => {
    const wrapper = shallowMount(TextElement, {
      propsData: {
        translationPath: 'translation.path',
        hasCenteredText: true,
      },
      mocks: {
        $t: key => key,
      },
    });

    expect(wrapper.classes()).toContain('has-centered-text');
    expect(wrapper.text()).toBe('translation.path');
  });
});
