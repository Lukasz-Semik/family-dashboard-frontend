<template>
  <DashboardItem
    item-title="shoppingLists.title"
    item-description="shoppingLists.description"
    :destination-route="shoppingListsRoute"
    :photo-src="shoppingListPhoto"
  />
</template>

<script>
import shoppingListPhoto from '@/assets/shoppinglist.png';
import { SHOPPING_LISTS_ROUTE } from '@/constants/routesNames';

import DashboardItem from './DashboardItem.vue';

export default {
  components: {
    DashboardItem,
  },
  data() {
    return {
      shoppingListsRoute: { name: SHOPPING_LISTS_ROUTE },
      shoppingListPhoto,
    };
  },
};
</script>
