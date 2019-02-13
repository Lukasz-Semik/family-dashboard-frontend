<template>
  <div>
    <ButtonElement
      @onClick="showModal = true"
      translationPath="todos.edit"
      is-hovered-green
      has-gray-theme
      is-inline
      is-small
    />

    <div :class="[$style['title-wrapper']]">
      <TitleElement tag="h2" :translatedText="currentTodo.title" :is-crossed="currentTodo.isDone" is-black/>
    </div>

    <div :class="[$style['todo-row']]">
      <TextElement translationPath="general.description" is-bold is-green/>
      <TextElement :translatedText="this.description" is-medium is-bold is-black/>
    </div>

    <div :class="[$style['todo-row']]">
      <TextElement translationPath="general.deadline" is-bold is-green/>
      <TextElement :translatedText="this.deadline" is-medium is-bold is-black/>
    </div>

    <ItemUsersDetails
      :author-name="authorName"
      :created-at="createdAt"
      :updater-name="updaterName"
      :updated-at="updatedAt"
      :execturo-name="execturoName"
    />

    <ModalElement
      v-if="showModal"
      @onClose="showModal = false"
      title-translated-text="Example Title"
      button-translated-text="Button"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { isEmpty } from 'lodash';
import moment from 'moment';

import { todoById } from '@/store/todos/getters';
import { getTodos } from '@/store/todos/actions';

import ModalElement from '@/components/atoms/ModalElement/ModalElement.vue';
import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';
import TextElement from '@/components/atoms/TextElement/TextElement.vue';
import ItemUsersDetails from '@/components/molecules/ItemUsersDetails/ItemUsersDetails.vue';

export default {
  components: {
    TitleElement,
    ModalElement,
    ButtonElement,
    TextElement,
    ItemUsersDetails,
  },
  created() {
    this.getTodos();
  },
  methods: {
    ...mapActions({ getTodos }),
    getName(role) {
      if (isEmpty(this.currentTodo) || isEmpty(this.currentTodo[role])) return '';

      const { firstName, lastName } = this.currentTodo[role];

      return `${firstName} ${lastName}`;
    },
    getDate(date) {
      return date ? moment(date).format('DD MMM YYYY') : '-';
    },
  },
  data() {
    return {
      newTitleText: '',
      showModal: false,
    };
  },
  computed: {
    todoId() {
      return Number(this.$route.params.todoId);
    },
    description() {
      const { description } = this.currentTodo;

      return !isEmpty(description) ? description : this.$t('todos.noTodoDescription');
    },
    currentTodo() {
      const currentTodo = this.todoById(this.todoId);

      return isEmpty(currentTodo) ? {} : currentTodo;
    },
    authorName() {
      return this.getName('author');
    },
    createdAt() {
      return this.getDate(this.currentTodo.createdAt);
    },
    updaterName() {
      return this.getName('updater');
    },
    updatedAt() {
      return this.getDate(this.currentTodo.updatedAt);
    },
    execturoName() {
      return this.getName('executor');
    },
    deadline() {
      const { deadline } = this.currentTodo;

      return deadline
        ? `${moment(deadline).format('DD MMM YYYY')} - ${moment(deadline).fromNow()}`
        : '-';
    },
    ...mapGetters({ todoById }),
  },
};
</script>

<style lang="scss" module src="./TodoPage.scss" />
