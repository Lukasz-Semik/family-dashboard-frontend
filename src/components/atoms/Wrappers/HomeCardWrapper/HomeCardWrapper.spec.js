import { shallowMount } from '@vue/test-utils';

import HomeCardWrapper from './HomeCardWrapper.vue';

describe('<HomeCardWrapper>', () => {
  it('should render proper html', () => {
    const wrapper = shallowMount(HomeCardWrapper, {
      slots: {
        default: '<div data-test="test-slot">Test slot</div>',
      },
    });

    const slot = wrapper.find('[data-test="test-slot"]');
    expect(slot.text()).toBe('Test slot');
  });
});
