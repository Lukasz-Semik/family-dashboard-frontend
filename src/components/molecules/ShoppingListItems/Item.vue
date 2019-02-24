<template>
  <button
    :class="[$style['shopping-list-button'], classNames]"
    @click="$emit('clickItem', { itemId: item.id })"
  >
    {{ item.name }}
  </button>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    classNames() {
      const { $style, item } = this;

      return {
        [$style['is-done']]: item.isDone,
      };
    },
  },
};
</script>


<style lang="scss" module src="./ShoppingListItems.scss" />
