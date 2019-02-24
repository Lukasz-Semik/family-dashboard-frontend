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
      <TextElement
        translation-path="general.description"
        is-bold
        is-green
      />
      <TextElement
        :translated-text="description"
        is-medium
        is-bold
        is-black
      />
    </div>

    <div :class="[$style['todo-row']]">
      <TextElement
        translation-path="general.deadline"
        is-bold
        is-green
      />
      <TextElement
        :translated-text="deadline"
        is-medium
        is-bold
        is-black
      />
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

import { apiDeleteTodo, apiPatchTodo } from '@/api';
import { TODOS_ROUTE } from '@/constants/routesNames';
import { todoById } from '@/store/todos/getters';
import { getTodos } from '@/store/todos/actions';
import { getFullDeadline, getDate } from '@/helpers/date';
import { getName } from '@/helpers/userNames';

import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import TextElement from '@/components/atoms/TextElement/TextElement.vue';
import ItemUsersDetails from '@/components/molecules/ItemUsersDetails/ItemUsersDetails.vue';
import ActionButtons from '@/components/molecules/ActionButtons/ActionButtons.vue';
import TodoFormModal from '@/components/organisms/TodoFormModal/TodoFormModal.vue';

export default {
  components: {
    TitleElement,
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
      return getName('author', this.currentTodo);
    },
    createdAt() {
      return getDate(this.currentTodo.createdAt);
    },
    updaterName() {
      return getName('updater', this.currentTodo);
    },
    updatedAt() {
      return getDate(this.currentTodo.updatedAt);
    },
    executorName() {
      return this.currentTodo.isDone ? this.getName('executor') : '';
    },
    doneTranslation() {
      return `todos.${this.currentTodo.isDone ? 'unDoneTodo' : 'doneTodo'}`;
    },
    deadline() {
      return getFullDeadline(this.currentTodo.deadline);
    },
    ...mapGetters({ todoById }),
  },
  created() {
    this.getTodos();
  },
  methods: {
    ...mapActions({ getTodos }),
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
