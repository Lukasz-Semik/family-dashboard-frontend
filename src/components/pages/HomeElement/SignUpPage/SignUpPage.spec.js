import { shallowMount } from '@vue/test-utils';

import SignUpPage from './SignUpPage.vue';

describe('<SignUpPage/>', () => {
  it('should render properly', () => {
    const wrapper = shallowMount(SignUpPage);

    expect(wrapper).toMatchSnapshot();
  });
});
