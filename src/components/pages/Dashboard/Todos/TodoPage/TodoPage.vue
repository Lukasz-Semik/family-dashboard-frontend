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
      <TitleElement tag="h2" :translatedText="currentTodo.title" is-black/>
    </div>

    <div :class="[$style['todo-row']]">
      <TextElement translationPath="general.description" is-bold is-green/>
      <TextElement :translatedText="this.description" is-medium is-bold is-black/>
    </div>

    <div :class="[$style['todo-row']]">
      <TextElement translationPath="general.deadline" is-bold is-green/>
      <TextElement :translatedText="this.deadline" is-medium is-bold is-black/>
    </div>

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

export default {
  components: {
    TitleElement,
    ModalElement,
    ButtonElement,
    TextElement,
  },
  created() {
    this.getTodos();
  },
  methods: {
    ...mapActions({ getTodos }),
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
