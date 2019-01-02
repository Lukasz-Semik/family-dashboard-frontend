<template>
  <form @submit.prevent="handleSubmit">
    <Input
      name="email"
      labelTranslationPath="forms.shared.email.label"
      placeholderTranslationPath="forms.shared.email.placeholder"
      :value="email"
      @onChange="onChange"
      hasCenteredText
    />

    <button>Sign In</button>
  </form>
</template>

<script>
import Input from '@/components/atoms/Input/Input.vue';

export default {
  data() {
    return {
      email: '',
    };
  },
  methods: {
    handleSubmit(event) {
      console.log(event);
      console.log(this.email);
    },
    onChange(payload) {
      const { name, value } = payload;

      this[name] = value;
    },
  },
  components: {
    Input,
  },
};
</script>
