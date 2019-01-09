import { shallowMount } from '@vue/test-utils';

import SignInPage from './SignInPage.vue';

describe('<SignInPage/>', () => {
  it('should render properly', () => {
    const wrapper = shallowMount(SignInPage);

    expect(wrapper).toMatchSnapshot();
  });
});
