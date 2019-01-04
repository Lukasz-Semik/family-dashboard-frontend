<template>
  <form @submit.prevent="handleSubmit" :class="[$style['form']]">
    <div :class="[$style['form-row']]">
      <Input
        name="email"
        type="email"
        labelTranslationPath="forms.shared.email.label"
        placeholderTranslationPath="forms.shared.email.placeholder"
        :value="email"
        @onChange="onChange"
        hasCenteredText
      />
    </div>

    <div :class="[$style['form-row']]">
      <Input
        name="password"
        type="password"
        labelTranslationPath="forms.shared.password.label"
        placeholderTranslationPath="forms.shared.password.placeholder"
        :value="password"
        @onChange="onChange"
        hasCenteredText
      />
    </div>

    <div :class="[$style['button-container']]">
      <Button type="submit" translationPath="forms.shared.submit" hasBlueTheme/>
    </div>
  </form>
</template>

<script>
import Input from '@/components/atoms/Input/Input.vue';
import Button from '@/components/atoms/Button/Button.vue';

export default {
  data() {
    return {
      email: '',
      password: '',
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
    Button,
  },
};
</script>

<style lang="scss" module src="./SignInForm.scss" />
