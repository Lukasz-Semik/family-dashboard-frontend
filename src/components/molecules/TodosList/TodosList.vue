<template>
  <div>
    <ul v-if="sortedTodos.length > 0">
      <li :class="[$style['header']]">
        <div :class="[$style['col-title']]">
          {{ $t('general.title') }}
        </div>
        <div :class="[$style['col']]">
          {{ $t('general.createdBy' ) }}
        </div>
        <div :class="[$style['col']]">
          {{ $t('general.deadline') }}
        </div>
      </li>

      <li
        v-for="todo in sortedTodos"
        :key="todo.id"
        :class="[$style['item']]"
      >
        <div :class="[$style['col-title'], $style['is-flex']]">
          <div :class="[$style['title-text']]">
            <Link
              :to="getRoute(todo.id)"
              :translated-text="todo.title"
              :is-crossed="todo.isDone"
              is-black
            />
          </div>

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
        </div>

        <div :class="[$style['col']]">
          <AvatarElement
            :size="35"
            :provided-user-name="getUserName(todo)"
            is-flex
            has-black-text
          />
        </div>

        <div :class="[$style['col']]">
          {{ getDate(todo.deadline) }}
        </div>
      </li>
    </ul>
    <div v-else>
      <TextElement
        translation-path="todos.noTodos"
        is-bold
        is-green
        has-centered-text
        is-big
      />
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

export default {
  components: {
    AvatarElement,
    ButtonElement,
    TextElement,
    Link,
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
