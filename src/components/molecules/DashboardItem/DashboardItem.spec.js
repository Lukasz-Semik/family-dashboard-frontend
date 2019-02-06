import { shallowMount } from '@vue/test-utils';

import DashboardItem from './DashboardItem.vue';

describe('<DashboardItem />', () => {
  const props = {
    itemTitle: 'itemTitle.path',
    itemDescription: 'itemDescription.path',
    photoSrc: 'some.img',
    destinationRoute: { name: '/some-path' },
  };

  const wrapper = shallowMount(DashboardItem, {
    propsData: { ...props },
    mocks: {
      $t: key => key,
    },
  });

  it('should', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
