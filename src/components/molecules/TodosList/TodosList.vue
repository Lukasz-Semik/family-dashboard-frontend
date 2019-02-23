<template>
  <div>
    <ul v-if="sortedTodos.length > 0">
      <ListHeader>
        <ColMain>{{ $t('general.title') }}</ColMain>
        <ColSecondary>{{ $t('general.createdBy' ) }}</ColSecondary>
        <ColSecondary>{{ $t('general.deadline') }}</ColSecondary>
      </ListHeader>

      <ListItem v-for="todo in sortedTodos" :key="todo.id">
        <ColMain>
          <TitleText>
            <Link
              :to="getRoute(todo.id)"
              :translated-text="todo.title"
              :is-crossed="todo.isDone"
              is-black
            />
          </TitleText>

          <div :class="[$style['buttons-wrapper']]">
            <ButtonElement
              translation-path="general.remove"
              has-gray-theme
              is-small
              is-inline
              is-hovered-red
              @onClick="onRemove(todo.id)"
            />

            <ButtonElement
              :translation-path="`general.${todo.isDone ? 'undone' : 'done'}`"
              has-gray-theme
              is-small
              is-inline
              is-hovered-green
              @onClick="onToggleDone(todo.id, todo.isDone)"
            />
          </div>
        </ColMain>

        <ColSecondary>
          <AvatarElement :size="35" :provided-user-name="getUserName(todo)" is-flex has-black-text/>
        </ColSecondary>

        <ColSecondary>{{ getDate(todo.deadline) }}</ColSecondary>
      </ListItem>
    </ul>
    <div v-else>
      <TextElement translation-path="todos.noTodos" is-bold is-green has-centered-text is-big/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';

import { apiDeleteTodo, apiPatchTodo } from '@/api';
import { TODO_ROUTE } from '@/constants/routesNames';
import { getTodos } from '@/store/todos/actions';
import { sortedTodos } from '@/store/todos/getters';
import { showToast } from '@/store/toast/actions';

import AvatarElement from '@/components/atoms/AvatarElement/AvatarElement.vue';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';
import Link from '@/components/atoms/Link/Link.vue';
import TextElement from '@/components/atoms/TextElement/TextElement.vue';
import ListHeader from '@/components/atoms/ItemsList/ListHeader.vue';
import ListItem from '@/components/atoms/ItemsList/ListItem.vue';
import ColMain from '@/components/atoms/ItemsList/ColMain.vue';
import ColSecondary from '@/components/atoms/ItemsList/ColSecondary.vue';
import TitleText from '@/components/atoms/ItemsList/TitleText.vue';

export default {
  components: {
    AvatarElement,
    ButtonElement,
    TextElement,
    Link,
    ListHeader,
    ListItem,
    ColMain,
    ColSecondary,
    TitleText,
  },
  computed: {
    ...mapGetters({ sortedTodos }),
  },
  created() {
    this.getTodos();
  },
  methods: {
    ...mapActions({ getTodos, showToast }),
    getUserName(todo) {
      return `${todo.author.firstName} ${todo.author.lastName}`;
    },
    getDate(date) {
      return date ? moment(date).format('DD MMM YYYY') : '-';
    },
    async onRemove(id) {
      const response = await apiDeleteTodo(id);

      if (response.status === 200) {
        this.getTodos();
      }
    },
    async onToggleDone(id, isDone) {
      const response = await apiPatchTodo(id, { isDone: !isDone });

      if (response.status === 200) {
        this.getTodos();
      }
    },
    getRoute(id) {
      return { name: TODO_ROUTE, params: { todoId: id } };
    },
  },
};
</script>

<style lang="scss" module src="./TodosList.scss" />
