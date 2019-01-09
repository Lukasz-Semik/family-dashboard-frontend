<template>
  <div :class="[$style['form-wrapper']]">
    <FormGroup @onSubmit="handleSubmit">
      <template slot="fields-group">
        <EmailPasswordGroup :on-change="onChange" :email="email" :password="password"/>
      </template>

      <template slot="button-group">
        <div :class="[$style['button-container']]">
          <ButtonElement type="submit" translation-path="forms.shared.submit" has-blue-theme/>
        </div>
      </template>
    </FormGroup>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import { DASHBOARD_ROUTE } from '@/constants/routesNames';
import { signIn } from '@/store/currentUser/actions';
import FormGroup from '@/components/atoms/Form/FormGroup.vue';
import EmailPasswordGroup from '@/components/molecules/EmailPasswordGroup/EmailPasswordGroup.vue';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';

export default {
  components: {
    FormGroup,
    EmailPasswordGroup,
    ButtonElement,
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

<style lang="scss" module src="./SignUpForm.scss" />
