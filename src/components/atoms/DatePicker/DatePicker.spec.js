import { mount } from '@vue/test-utils';

import DatePicker from './DatePicker.vue';

// TODO: improve tests

describe('<DatePicker>', () => {
  const wrapper = mount(DatePicker, {
    propsData: {
      name: 'date-picker',
      placeholderTranslationPath: 'placeholder.path',
      labelTranslationPath: 'label.path',
    },
    mocks: {
      $t: key => key,
    },
  });

  it('should emit onChange initially', () => {
    wrapper.setProps({
      value: 'Thu Jan 10 2019 18:24:00 GMT+0100 (czas środkowoeuropejski standardowy)',
    });

    wrapper.find('[data-test="date-picker"]').value =
      'Thu Jan 10 2019 18:24:00 GMT+0100 (czas środkowoeuropejski standardowy)';
    wrapper.vm.$emit('onSelectDate');
  });
});
