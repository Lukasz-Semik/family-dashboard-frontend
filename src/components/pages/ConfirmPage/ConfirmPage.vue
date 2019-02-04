<template>
  <div :class="[$style['confirm-wrapper']]">
    <div :class="[$style['app-title-wrapper']]">
      <TitleElement translation-path="general.appTitle" />
    </div>

    <div :class="[$style['message-wrapper']]">
      <TitleElement
        tag="h2"
        :translation-path="msg"
        has-centered-text
        is-black
      />
    </div>

    <ButtonElement
      :is-disabled="isConfirming"
      translation-path="general.signIn"
      has-blue-theme
      @onClick="goToSignIn"
    />
  </div>
</template>

<script>
import { get } from 'lodash';

import { apiConfirmAccount } from '@/api';
import { SIGN_IN_ROUTE } from '@/constants/routesNames';

import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';
import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';

export default {
  components: {
    ButtonElement,
    TitleElement,
  },
  data() {
    return {
      msg: 'general.underConfirmation',
    };
  },
  created() {
    this.confirmAccount();
  },
  methods: {
    async confirmAccount() {
      try {
        const res = await apiConfirmAccount(this.$route.query.token);

        if (get(res, 'data.account') === 'account-confirmed') {
          this.msg = 'general.signUpThx';
        } else {
          this.msg = 'general.confirmationFail';
        }
      } catch (err) {
        this.msg = 'general.confirmationFail';
      }
    },
    goToSignIn() {
      this.$router.push({ name: SIGN_IN_ROUTE });
    },
  },
};
</script>

<style lang="scss" module src="./ConfirmPage.scss" />
