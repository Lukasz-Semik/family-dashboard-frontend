<template>
  <DashboardItem
    item-title="todos.title"
    item-description="todos.description"
    :destination-route="todosRoute"
    :photo-src="todoListPhoto"
    :all-items-qty="todos.length"
    :not-done-items-qty="notDoneItemsQty"
  />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import todoListPhoto from '@/assets/todolist.jpg';
import { TODOS_ROUTE } from '@/constants/routesNames';
import { getTodos } from '@/store/todos/actions';
import { todos } from '@/store/todos/getters';

import DashboardItem from './DashboardItem.vue';

export default {
  components: {
    DashboardItem,
  },
  created() {
    this.getTodos();
  },
  data() {
    return {
      todosRoute: { name: TODOS_ROUTE },
      todoListPhoto,
    };
  },
  computed: {
    notDoneItemsQty() {
      return this.todos.filter(todo => !todo.isDone).length;
    },
    ...mapGetters({ todos }),
  },
  methods: {
    ...mapActions({ getTodos }),
  },
};
</script>
