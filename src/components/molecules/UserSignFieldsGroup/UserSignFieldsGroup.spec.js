import { mount } from '@vue/test-utils';

import UserSignFieldsGroup from './UserSignFieldsGroup.vue';

describe('<UserSignFieldsGroup />', () => {
  const fields = [
    {
      name: 'input',
      type: 'text',
      fieldType: 'input',
      labelTranslationPath: 'input.label',
      placeholderTranslationPath: 'placeholder.placeholder',
    },
    {
      name: 'datePicker',
      type: 'text',
      fieldType: 'datePicker',
      labelTranslationPath: 'datePicker.label',
      placeholderTranslationPath: 'datePicker.placeholder',
    },
    {
      name: 'dropdown',
      type: 'text',
      fieldType: 'dropdown',
      labelTranslationPath: 'dropdown.label',
      placeholderTranslationPath: 'dropdown.placeholder',
    },
  ];

  const wrapper = mount(UserSignFieldsGroup, {
    propsData: {
      fields,
      isSubmissionFailed: false,
    },
    mocks: {
      $t: key => key,
    },
  });

  it('should emit initial onChange events for each component', () => {
    expect(wrapper.emitted('onChange')[0][0]).toEqual({ name: 'input', value: '', isValid: false });
    expect(wrapper.emitted('onChange')[1][0]).toEqual({
      name: 'datePicker',
      value: null,
      isValid: false,
    });
    expect(wrapper.emitted('onChange')[2][0]).toEqual({
      name: 'dropdown',
      value: null,
      isValid: false,
    });
  });

  it('should emit onChange when input triggers on change', () => {
    const $input = wrapper.find('[data-test="input-element"]').find('input');

    $input.element.value = 'some-value';
    $input.trigger('input');

    expect(wrapper.emitted('onChange')[3][0]).toEqual({
      name: 'input',
      value: 'some-value',
      isValid: true,
    });
  });
});
