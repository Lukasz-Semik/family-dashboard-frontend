<template>
  <div>
    <ActionButtons
      edit-translation-path="todos.edit"
      remove-translation-path="todos.remove"
      :done-translation-path="doneTranslation"
      @openModal="showModal = true"
      @toggleDone="onToggleDone"
      @remove="onRemove"
    />

    <div :class="[$style['title-wrapper']]">
      <TitleElement
        tag="h2"
        :translated-text="currentTodo.title"
        :is-crossed="currentTodo.isDone"
        is-black
      />
    </div>

    <div :class="[$style['todo-row']]">
      <TextElement translation-path="general.description" is-bold is-green/>
      <TextElement :translated-text="description" is-medium is-bold is-black/>
    </div>

    <div :class="[$style['todo-row']]">
      <TextElement translation-path="general.deadline" is-bold is-green/>
      <TextElement :translated-text="deadline" is-medium is-bold is-black/>
    </div>

    <ItemUsersDetails
      :author-name="authorName"
      :created-at="createdAt"
      :updater-name="updaterName"
      :updated-at="updatedAt"
      :executor-name="executorName"
    />

    <TodoFormModal
      :provided-todo="currentTodo"
      :is-open="showModal"
      @closeTodoModal="showModal = false"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { isEmpty } from 'lodash';
import moment from 'moment';

import { apiDeleteTodo, apiPatchTodo } from '@/api';
import { TODOS_ROUTE } from '@/constants/routesNames';
import { todoById } from '@/store/todos/getters';
import { getTodos } from '@/store/todos/actions';

import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';
import TextElement from '@/components/atoms/TextElement/TextElement.vue';
import ItemUsersDetails from '@/components/molecules/ItemUsersDetails/ItemUsersDetails.vue';
import ActionButtons from '@/components/molecules/ActionButtons/ActionButtons.vue';
import TodoFormModal from '@/components/organisms/TodoFormModal/TodoFormModal.vue';

export default {
  components: {
    TitleElement,
    ButtonElement,
    TextElement,
    ItemUsersDetails,
    ActionButtons,
    TodoFormModal,
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
    executorName() {
      return this.currentTodo.isDone ? this.getName('executor') : '';
    },
    doneTranslation() {
      return `todos.${this.currentTodo.isDone ? 'unDoneTodo' : 'doneTodo'}`;
    },
    deadline() {
      const { deadline } = this.currentTodo;

      return deadline
        ? `${moment(deadline).format('DD MMM YYYY')} - ${moment(deadline).fromNow()}`
        : '-';
    },
    ...mapGetters({ todoById }),
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
    async onToggleDone() {
      const response = await apiPatchTodo(this.currentTodo.id, {
        isDone: !this.currentTodo.isDone,
      });

      if (response.status === 200) {
        this.getTodos();
      }
    },
    async onRemove() {
      const response = await apiDeleteTodo(this.currentTodo.id);

      if (response.status === 200) {
        this.$router.push({ name: TODOS_ROUTE });
      }
    },
  },
};
</script>

<style lang="scss" module src="./TodoPage.scss" />
