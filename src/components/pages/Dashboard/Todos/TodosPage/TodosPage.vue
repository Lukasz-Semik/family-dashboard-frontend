<template>
  <div :class="[$style['wrapper']]">
    <TitleElement translation-path="todos.title" is-black is-big/>

    <ButtonElement
      translation-path="todos.create"
      has-blue-theme
      @onClick="isCreateTodoModalOpen = true"
    />

    <div v-if="todos.length > 0" :class="[$style['remove-all-button-wrapper']]">
      <ButtonElement
        translation-path="todos.removeAll"
        @onClick="isRemoveAllModalOpen = true"
        is-hovered-red
        has-gray-theme
        is-inline
      />
    </div>

    <TodosList/>

    <ModalElement
      v-if="isCreateTodoModalOpen"
      title-translation-path="todos.create"
      button-translation-path="forms.shared.submit"
      @onMainButtonClick="onSubmit"
      @onClose="isCreateTodoModalOpen = false"
    >
      <template slot="body">
        <TodoForm
          :description-value="description"
          :title-value="title"
          :deadline-value="deadline"
          :is-submission-failed="isSubmissionFailed"
          @onChange="handleFieldChange"
        />
      </template>
    </ModalElement>

    <ModalElement
      v-if="isRemoveAllModalOpen"
      title-translation-path="todos.confirmationMessage"
      button-translation-path="general.confirm"
      @onClose="isRemoveAllModalOpen = false"
      @onMainButtonClick="onRemoveAll"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { apiCreateTodo, apiDeleteAllTodos } from '@/api';
import { showToast } from '@/store/toast/actions';
import { getTodos } from '@/store/todos/actions';
import { todos } from '@/store/todos/getters';

import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';
import ModalElement from '@/components/atoms/ModalElement/ModalElement.vue';
import TodosList from '@/components/molecules/TodosList/TodosList.vue';
import TodoForm from '@/components/organisms/TodoForm/TodoForm.vue';

export default {
  components: {
    TodoForm,
    TodosList,
    TitleElement,
    ButtonElement,
    ModalElement,
  },
  computed: {
    ...mapGetters({ todos }),
  },
  data() {
    return {
      isCreateTodoModalOpen: false,
      isRemoveAllModalOpen: false,
      title: '',
      description: '',
      deadline: null,
      isSubmissionFailed: false,
      errors: {},
    };
  },
  methods: {
    ...mapActions({ showToast, getTodos }),
    handleFieldChange(payload) {
      const { value, name, isValid } = payload;

      this[name] = value;
      this.errors[name] = !isValid;
    },
    async onSubmit() {
      const { title, description, deadline } = this;
      this.isSubmissionFailed = false;

      if (this.errors.title) {
        this.isSubmissionFailed = true;
        return;
      }

      const response = await apiCreateTodo({ title, description, deadline });

      if (response.status === 200) {
        await this.getTodos();
        this.isCreateTodoModalOpen = false;
        this.showToast({ text: 'todos.todoCreated' });
        this.title = '';
        this.description = '';
        this.deadline = null;
      }
    },
    async onRemoveAll() {
      const response = await apiDeleteAllTodos();

      if (response.status === 200) {
        await this.getTodos();
        this.isRemoveAllModalOpen = false;
        this.showToast({ text: 'todos.allremoved' });
      }
    },
  },
};
</script>

<style lang="scss" module src="./TodosPage.scss" />
