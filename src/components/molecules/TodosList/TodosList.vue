<template>
  <ul>
    <li :class="[$style['header']]">
      <div :class="[$style['col-title']]">{{ $t('general.title') }}</div>
      <div :class="[$style['col']]">{{ $t('general.createdBy' ) }}</div>
      <div :class="[$style['col']]">{{ $t('general.deadline') }}</div>
    </li>

    <li :class="[$style['item']]" :key="todo.id" v-for="todo in todos">
      <div :class="[$style['col-title'], $style['is-flex']]">
        <div :class="[$style['title-text']]">
          <Link :to="getRoute(todo.id)" :translatedText="todo.title" is-black/>
        </div>

        <div :class="[$style['buttons-wrapper']]">
          <ButtonElement
            translationPath="general.remove"
            :onClick="onRemove(todo.id)"
            has-gray-theme
            is-small
            is-inline
            is-hovered-red
          />

          <ButtonElement
            translationPath="general.done"
            :onClick="onDone(todo.id)"
            has-gray-theme
            is-small
            is-inline
            is-hovered-green
          />
        </div>
      </div>

      <div :class="[$style['col']]">
        <AvatarElement :size="35" :providedUserName="getUserName(todo)" is-flex has-black-text/>
      </div>

      <div :class="[$style['col']]">{{ getDate(todo.deadline) }}</div>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';

import { TODO_ROUTE } from '@/constants/routesNames';
import { getTodos } from '@/store/todos/actions';
import { todos } from '@/store/todos/getters';

import AvatarElement from '@/components/atoms/AvatarElement/AvatarElement.vue';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';
import Link from '@/components/atoms/Link/Link.vue';

export default {
  components: {
    AvatarElement,
    ButtonElement,
    Link,
  },
  created() {
    this.getTodos();
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({ todos }),
  },
  methods: {
    ...mapActions({ getTodos }),
    getUserName(todo) {
      return `${todo.author.firstName} ${todo.author.lastName}`;
    },
    getDate(date) {
      return date ? moment(date).format('DD MMM YYYY') : '-';
    },
    onRemove(id) {
      console.log(id);
    },
    onDone(id) {
      console.log(id);
    },
    getRoute(id) {
      return { name: TODO_ROUTE, params: { todoId: id } };
    },
  },
};
</script>

<style lang="scss" module src="./TodosList.scss" />
