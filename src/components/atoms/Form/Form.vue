<template>
  <form @submit.prevent="handleSubmit" :class="[$style.form]">
    <slot></slot>

    <Button type="submit" translationPath="forms.shared.submit"/>
  </form>
</template>

<script>
import Button from '@/components/atoms/Button/Button.vue';

export default {
  methods: {
    handleSubmit(event) {
      this.$emit('onSubmit', event);
    },
  },
  components: {
    Button,
  },
};
</script>

<style lang="scss" module src="./Form.scss" />
