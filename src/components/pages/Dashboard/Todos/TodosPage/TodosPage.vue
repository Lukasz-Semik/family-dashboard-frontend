<template>
  <div>
    <TitleElement translation-path="todos.title" is-black is-big/>

    <ButtonElement @onClick="isModalOpen = true" translationPath="todos.create" has-blue-theme/>

    <TodosList/>

    <ModalElement
      v-if="isModalOpen"
      title-translation-path="todos.create"
      button-translation-path="forms.shared.submit"
      @onMainButtonClick="onSubmit"
      @onClose="isModalOpen = false"
    >
      <template slot="body">
        <TodoForm
          :description-value="todoDescription"
          :title-value="todoTitle"
          :deadlineValue="todoDeadline"
          @onChange="handleFieldChange"
        />
      </template>
    </ModalElement>
  </div>
</template>

<script>
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
      todoTitle: '',
      todoDescription: '',
      todoDeadline: null,
    };
  },
  methods: {
    handleFieldChange(payload) {
      const { value, name } = payload;

      this[name] = value;
    },
    onSubmit() {
      const { todoTitle, todoDescription, todoDeadline } = this;
    },
  },
};
</script>
