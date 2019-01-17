import { mount } from '@vue/test-utils';

import InputElement from './InputElement.vue';

describe('<InputElement/>', () => {
  it('should render correctly with translated props', () => {
    const wrapper = mount(InputElement, {
      propsData: {
        name: 'test-name',
        value: 'test-value',
        type: 'button',
        placeholderTranslatedText: 'test-placeholder',
        labelTranslatedText: 'test-label',
        hasCenteredText: true,
      },
    });

    const $label = wrapper.find('[data-test="label"');
    expect($label.attributes('for')).toBe('test-name');
    expect($label.text()).toBe('test-label');

    const $input = wrapper.find('[data-test="input"]');
    expect($input.attributes('name')).toBe('test-name');
    expect($input.attributes('id')).toBe('test-name');
    expect($input.attributes('name')).toBe('test-name');
    expect($input.attributes('placeholder')).toBe('test-placeholder');
    expect($input.attributes('type')).toBe('button');
    expect($input.attributes('value')).toBe('test-value');
  });

  it('should render correctly with translation paths as props', () => {
    const wrapper = mount(InputElement, {
      propsData: {
        name: 'test-name',
        value: 'test-value',
        type: 'button',
        placeholderTranslationPath: 'placeholder.translation.path',
        labelTranslationPath: 'label.translation.path',
        hasCenteredText: true,
      },
      mocks: {
        $t: key => key,
      },
    });

    const $label = wrapper.find('[data-test="label"');
    expect($label.attributes('for')).toBe('test-name');
    expect($label.text()).toBe('label.translation.path');

    const $input = wrapper.find('[data-test="input"]');
    expect($input.attributes('name')).toBe('test-name');
    expect($input.attributes('id')).toBe('test-name');
    expect($input.attributes('name')).toBe('test-name');
    expect($input.attributes('placeholder')).toBe('placeholder.translation.path');
    expect($input.attributes('type')).toBe('button');
    expect($input.attributes('value')).toBe('test-value');
  });

  it('should handle on input event properly', () => {
    const wrapper = mount(InputElement, {
      propsData: {
        name: 'test-name',
        value: 'test-value',
        type: 'button',
        placeholderTranslatedText: 'test-placeholder',
        labelTranslatedText: 'test-label',
        hasCenteredText: true,
      },
    });

    const $input = wrapper.find('[data-test="input"]');

    $input.element.value = 'some-value';
    $input.trigger('input');

    expect(wrapper.emitted().onChange).toBeTruthy();
    expect(wrapper.emitted().onChange[0][0]).toMatchObject({
      value: 'some-value',
      name: 'test-name',
    });
  });
});
