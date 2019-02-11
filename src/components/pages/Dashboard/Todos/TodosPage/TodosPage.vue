<template>
  <div>
    <TitleElement translationPath="todos.title" is-black is-big/>

    <TodosList/>
  </div>
</template>

<script>
import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import TodosList from '@/components/molecules/TodosList/TodosList.vue';

export default {
  components: {
    TodosList,
    TitleElement,
  },
};
</script>
