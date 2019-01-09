import { shallowMount } from '@vue/test-utils';

import Button from './Button.vue';

describe('<Button/>', () => {
  it('should properly handle click and render translated text', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        translatedText: 'test-text',
      },
    });

    const $button = wrapper.find('[data-test="button"]');
    expect($button.text()).toBe('test-text');

    $button.trigger('click');
    expect(wrapper.emitted().onClick).toBeTruthy();
  });

  it('should assign theme and render translation path', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        translationPath: 'translation.path',
        hasBlueTheme: true,
      },
      mocks: {
        $t: key => key,
      },
    });

    expect(wrapper.classes()).toContain('has-blue-theme');
    expect(wrapper.text()).toBe('translation.path');
  });
});
