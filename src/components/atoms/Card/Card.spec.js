import { shallowMount } from '@vue/test-utils';

import Card from './Card.vue';

describe('<Card>', () => {
  it('should render proper html', () => {
    const wrapper = shallowMount(Card, {
      slots: {
        default: '<div data-test="test-slot">Test slot</div>',
      },
    });

    const slot = wrapper.find('[data-test="test-slot"]');
    expect(slot.text()).toBe('Test slot');
  });

  it('should provide proper class according to props', () => {
    const wrapper = shallowMount(Card, {
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
