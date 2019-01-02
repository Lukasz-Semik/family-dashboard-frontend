<template>
  <form @submit.prevent="handleSubmit" :class="[$style.form]">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'Form',
  methods: {
    handleSubmit(event) {
      this.$emit('onSubmit', event);
    },
  },
};
</script>

<style lang="scss" module src="./Form.scss" />
