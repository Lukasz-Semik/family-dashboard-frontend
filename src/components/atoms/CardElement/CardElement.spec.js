import { shallowMount } from '@vue/test-utils';

import CardElement from './CardElement.vue';

describe('<CardElement>', () => {
  it('should render proper html', () => {
    const wrapper = shallowMount(CardElement, {
      slots: {
        default: '<div data-test="test-slot">Test slot</div>',
      },
    });

    const slot = wrapper.find('[data-test="test-slot"]');
    expect(slot.text()).toBe('Test slot');
  });

  it('should provide proper class according to props', () => {
    const wrapper = shallowMount(CardElement, {
      propsData: {
        isHoverable: true,
      },
      slots: {
        default: 'Test',
      },
    });

    expect(wrapper.classes()).toContain('is-hoverable');
  });
});
