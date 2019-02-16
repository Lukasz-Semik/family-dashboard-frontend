<template>
  <div :class="[$style['wrapper']]">
    <TitleElement translation-path="todos.title" is-black is-big/>

    <ButtonElement
      translation-path="todos.create"
      has-blue-theme
      @onClick="isCreateModalOpen = true"
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

    <TodoFormModal :is-open="isCreateModalOpen" @closeTodoModal="isCreateModalOpen = false"/>

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

import { apiDeleteAllTodos } from '@/api';
import { showToast } from '@/store/toast/actions';
import { getTodos } from '@/store/todos/actions';
import { todos } from '@/store/todos/getters';

import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';
import ModalElement from '@/components/atoms/ModalElement/ModalElement.vue';
import TodosList from '@/components/molecules/TodosList/TodosList.vue';
import TodoFormModal from '@/components/organisms/TodoFormModal/TodoFormModal.vue';

export default {
  components: {
    TodoFormModal,
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
      isRemoveAllModalOpen: false,
      isCreateModalOpen: false,
    };
  },
  methods: {
    ...mapActions({ showToast, getTodos }),
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
