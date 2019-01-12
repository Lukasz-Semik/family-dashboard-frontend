<template>
  <form @submit.prevent="onSubmit">
    <slot name="fields-group"/>

    <slot name="button-group"/>
  </form>
</template>

<script>
export default {
  methods: {
    onSubmit(event) {
      console.log('onSubmit form');
      this.$emit('onSubmit', event);
    },
  },
};
</script>
