<template>
  <div>
    <TitleElement translation-path="shoppingLists.title" is-black is-big/>
    <ShoppingLists/>
  </div>
</template>

<script>
import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import ShoppingLists from '@/components/molecules/ShoppingLists/ShoppingLists.vue';

export default {
  components: {
    TitleElement,
    ShoppingLists,
  },
};
</script>
