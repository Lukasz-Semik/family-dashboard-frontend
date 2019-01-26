import { mount } from '@vue/test-utils';

import FieldControl from './FieldControl.vue';

describe('<FieldControl>', () => {
  it('should render proper without error', () => {
    const wrapper = mount(FieldControl, {
      propsData: {
        name: 'some-input',
        isFocused: false,
        errorMsg: '',
        labelTranslationPath: 'translation.path',
      },
      slots: {
        default: '<div data-test="test-slot">Test slot</div>',
      },
      mocks: {
        $t: key => key,
      },
    });

    expect(wrapper.find('[data-test="label"]').attributes('for')).toBe('some-input');
    expect(wrapper.find('[data-test="error-msg"]').exists()).toBeFalsy();
  });

  it('should render proper with error', () => {
    const wrapper = mount(FieldControl, {
      propsData: {
        name: 'some-input',
        isFocused: false,
        errorMsg: 'someError',
        labelTranslationPath: 'translation.path',
      },
      slots: {
        default: '<div data-test="test-slot">Test slot</div>',
      },
      mocks: {
        $t: key => key,
      },
    });

    expect(wrapper.find('[data-test="label"]').attributes('for')).toBe('some-input');
    expect(wrapper.find('[data-test="error-msg"]').exists()).toBeTruthy();
  });
});
