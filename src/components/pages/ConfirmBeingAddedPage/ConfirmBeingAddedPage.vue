<template>
  <ConfirmPageWrapper
    :is-confirming="isConfirming"
    @onClick="goToSignIn"
  >
    <TitleElement
      tag="h2"
      :translation-path="msg"
      has-centered-text
      is-black
    />
  </ConfirmPageWrapper>
</template>

<script>
import { get } from 'lodash';

import { apiConfirmInvited } from '@/api';
import { SIGN_IN_ROUTE } from '@/constants/routesNames';

import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import ConfirmPageWrapper from '@/components/atoms/Wrappers/ConfirmPageWrapper/ConfirmPageWrapper.vue';

export default {
  components: {
    TitleElement,
    ConfirmPageWrapper,
  },
  data() {
    return {
      msg: 'general.haveBeenAdded',
      isConfirming: true,
    };
  },
  created() {
    this.confirmAccount();
  },
  methods: {
    async confirmAccount() {
      try {
        const res = await apiConfirmInvited(this.$route.query.token);

        if (get(res, 'data.account') === 'account-confirmed') {
          this.msg = 'general.signUpThx';
        } else {
          this.msg = 'general.confirmationFail';
        }
      } catch (err) {
        this.msg = 'general.confirmationFail';
      }
      this.isConfirming = false;
    },
    goToSignIn() {
      this.$router.push({ name: SIGN_IN_ROUTE });
    },
  },
};
</script>
