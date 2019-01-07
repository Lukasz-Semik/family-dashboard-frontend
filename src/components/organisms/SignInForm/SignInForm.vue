<template>
  <form
    :class="[$style['form']]"
    @submit.prevent="handleSubmit"
  >
    <div :class="[$style['form-row']]">
      <Input
        name="email"
        type="email"
        label-translation-path="forms.shared.email.label"
        placeholder-translation-path="forms.shared.email.placeholder"
        :value="email"
        has-centered-text
        @onChange="onChange"
      />
    </div>

    <div :class="[$style['form-row']]">
      <Input
        name="password"
        type="password"
        label-translation-path="forms.shared.password.label"
        placeholder-translation-path="forms.shared.password.placeholder"
        :value="password"
        has-centered-text
        @onChange="onChange"
      />
    </div>

    <div :class="[$style['button-container']]">
      <Button
        type="submit"
        translation-path="forms.shared.submit"
        has-blue-theme
      />
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

import { DASHBOARD_ROUTE } from '@/constants/routesNames';
import { signIn } from '@/store/currentUser/actions';
import Input from '@/components/atoms/Input/Input.vue';
import Button from '@/components/atoms/Button/Button.vue';

export default {
  components: {
    Input,
    Button,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleSubmit() {
      const { email, password } = this;

      const { isAuthorized } = await this.signIn({ email, password });

      if (isAuthorized) return this.$router.push({ name: DASHBOARD_ROUTE });
    },
    onChange(payload) {
      const { name, value } = payload;

      this[name] = value;
    },
    ...mapActions({
      signIn,
    }),
  },
};
</script>

<style lang="scss" module src="./SignInForm.scss" />
