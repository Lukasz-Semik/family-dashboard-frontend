<template>
  <div>
    <TitleElement
      translation-path="todos.title"
      is-black
      is-big
    />

    <ButtonElement
      translation-path="todos.create"
      has-blue-theme
      @onClick="isModalOpen = true"
    />

    <TodosList />

    <ModalElement
      v-if="isModalOpen"
      title-translation-path="todos.create"
      button-translation-path="forms.shared.submit"
      @onMainButtonClick="onSubmit"
      @onClose="isModalOpen = false"
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
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import { apiCreateTodo } from '@/api';
import { showToast } from '@/store/toast/actions';
import { getTodos } from '@/store/todos/actions';

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
  data() {
    return {
      isModalOpen: false,
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
        this.isModalOpen = false;
        this.showToast({ text: 'todos.todoCreated' });
      }
    },
  },
};
</script>
