import { mount } from '@vue/test-utils';

import UserSign from './UserSign';

describe('<UserSign>', () => {
  it('should render proper html elements', () => {
    const wrapper = mount(UserSign, {
      propsData: {
        titleTranslationPath: 'translation.path',
      },
      slots: {
        default: '<div data-test="test-slot">Test slot</div>',
      },
      mocks: {
        $t: key => key,
      },
    });

    const title = wrapper.find('[data-test="user-sign-title"]');
    const slot = wrapper.find('[data-test="test-slot"]');

    expect(title.text()).toBe('translation.path');
    expect(slot.text()).toBe('Test slot');
  });
});
