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
      this.$emit('onSubmit', event);
    },
  },
};
</script>
