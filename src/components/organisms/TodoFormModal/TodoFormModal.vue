<template>
  <ModalElement
    v-if="showModal"
    :title-translation-path="`todos.${isEditing ? 'edit' : 'create'}`"
    button-translation-path="forms.shared.submit"
    @onMainButtonClick="onSubmit"
    @onClose="onClose"
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
</template>

<script>
import { mapActions } from 'vuex';
import { isEmpty } from 'lodash';

import { apiCreateTodo, apiPatchTodo } from '@/api';

import { showToast } from '@/store/toast/actions';
import { getTodos } from '@/store/todos/actions';

import ModalElement from '@/components/atoms/ModalElement/ModalElement.vue';

import TodoForm from './TodoForm/TodoForm.vue';

export default {
  components: {
    TodoForm,
    ModalElement,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    providedTodo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isEditing: false,
      showModal: false,
      title: '',
      description: '',
      deadline: null,
      isSubmissionFailed: false,
      errors: {},
    };
  },
  watch: {
    isOpen(newVal, oldVal) {
      if (newVal && !oldVal) {
        this.showModal = true;

        if (!isEmpty(this.providedTodo)) {
          this.isEditing = true;
          this.title = this.providedTodo.title;
          this.description = this.providedTodo.description;
          this.deadline = new Date(this.providedTodo.deadline);
        }
      }
    },
  },
  methods: {
    ...mapActions({ showToast, getTodos }),
    onClose() {
      this.showModal = false;
      this.$emit('closeTodoModal');
    },
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

      const todoRequest = this.isEditing
        ? payload => apiPatchTodo(this.providedTodo.id, payload)
        : apiCreateTodo;

      const response = await todoRequest({ title, description, deadline });

      if (response.status === 200) {
        await this.getTodos();
        this.onClose();
        this.showToast({ text: `todos.${this.isEditing ? 'todoEdited' : 'todoCreated'}` });
        this.title = '';
        this.description = '';
        this.deadline = null;
      }
    },
  },
};
</script>
