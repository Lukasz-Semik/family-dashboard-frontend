<template>
  <DashboardItem
    item-title="todos.title"
    item-description="todos.description"
    :destination-route="todosRoute"
    :photo-src="todoListPhoto"
  />
</template>

<script>
import todoListPhoto from '@/assets/todolist.jpg';
import { TODOS_ROUTE } from '@/constants/routesNames';

import DashboardItem from './DashboardItem.vue';

export default {
  components: {
    DashboardItem,
  },
  data() {
    return {
      todosRoute: { name: TODOS_ROUTE },
      todoListPhoto,
    };
  },
};
</script>
