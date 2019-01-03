<template>
  <div :class="[$style['card'], classNames]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    isHoverable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classNames() {
      const { $style, isHoverable } = this;

      return {
        [$style['is-hoverable']]: isHoverable,
      };
    },
  },
};
</script>


<style lang="scss" module src="./Card.scss" />
