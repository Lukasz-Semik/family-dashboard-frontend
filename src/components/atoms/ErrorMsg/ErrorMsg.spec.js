import { shallowMount } from '@vue/test-utils';

import ErrorMsg from './ErrorMsg.vue';

describe('<ErrorMsg/>', () => {
  it('should properly handle click and render translated text', () => {
    const wrapper = shallowMount(ErrorMsg, {
      propsData: {
        translatedText: 'test-text',
      },
    });

    const $msg = wrapper.find('[data-test="error-msg"]');
    expect($msg.text()).toBe('test-text');
  });

  it('should assign theme and render translation path', () => {
    const wrapper = shallowMount(ErrorMsg, {
      propsData: {
        translationPath: 'translation.path',
      },
      mocks: {
        $t: key => key,
      },
    });

    expect(wrapper.text()).toBe('translation.path');
  });
});
