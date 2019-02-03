<template>
  <div :class="[$style['item-wrapper']]">
    <CardElement>
      <div :class="[$style['item-inner-wrapper']]">
        <div :class="[$style['header-group']]">
          <img :src="todoListPhoto">

          <TitleElement tag="h2" translationPath="todos.title" is-orange has-centered-text/>
        </div>

        <div :class="[$style['items-description']]">
          <TextElement translationPath="todos.description" is-medium has-centered-text/>
        </div>

        <div :class="[$style['items-counter']]">
          <TextElement translationPath="dashboard.allItems" is-bold has-centered-text/>
        </div>

        <div :class="[$style['items-counter']]">
          <TextElement translationPath="dashboard.notDoneItems" is-bold has-centered-text/>
        </div>

        <div :class="[$style['link-wrapper']]">
          <Link :to="todosRoute" translation-path="dashboard.nav.goThere" is-x-big/>
        </div>
      </div>
    </CardElement>
  </div>
</template>

<script>
import todoListPhoto from '@/assets/todolist.jpg';
import { TODOS_ROUTE } from '@/constants/routesNames';

import CardElement from '@/components/atoms/CardElement/CardElement.vue';
import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import TextElement from '@/components/atoms/TextElement/TextElement.vue';
import Link from '@/components/atoms/Link/Link.vue';

export default {
  components: {
    CardElement,
    TitleElement,
    TextElement,
    Link,
  },

  data() {
    return {
      todoListPhoto,
      todosRoute: { name: TODOS_ROUTE },
    };
  },
};
</script>

<style lang="scss" module src="./DashboardItem.scss" />
