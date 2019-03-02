<template>
  <div>
    <TitleElement
      translation-path="shoppingLists.title"
      is-black
      is-big
    />

    <ButtonElement
      :translation-path="isCreating ? 'general.back' : 'shoppingLists.create'"
      has-previous-theme
      is-inline
      :is-arrow-hidden="!isCreating"
      @onClick="isCreating=!isCreating"
    />

    <CreateShoppingList
      v-if="isCreating"
      @finishCreating="isCreating = false"
    />

    <ShoppingLists v-else />
  </div>
</template>

<script>
import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';
import ShoppingLists from '@/components/molecules/ShoppingLists/ShoppingLists.vue';
import CreateShoppingList from '@/components/organisms/CreateShoppingListForm/CreateShoppingListForm.vue';

export default {
  components: {
    TitleElement,
    ShoppingLists,
    ButtonElement,
    CreateShoppingList,
  },
  data() {
    return {
      isCreating: false,
    };
  },
};
</script>
