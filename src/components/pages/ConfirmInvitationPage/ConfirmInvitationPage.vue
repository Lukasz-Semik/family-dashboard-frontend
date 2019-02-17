<template>
  <ConfirmPageWrapper
    :is-confirming="isConfirming"
    :button-translation-path="buttonText"
    @onClick="onClick"
  >
    <TitleElement
      tag="h2"
      :translation-path="msg"
      has-centered-text
      is-black
    />

    <div
      v-if="!isConfirmed"
      :class="[$style['password-wrapper']]"
    >
      <InputElement
        type="password"
        name="password"
        :value="password"
        label-translation-path="forms.userSign.password.label"
        placeholder-translation-path="forms.userSign.password.placeholder"
        :is-submission-failed="isSubmissionFailed"
        is-required
        is-transparent
        has-centered-text
        @onChange="onChange"
      />
    </div>
  </ConfirmPageWrapper>
</template>

<script>
import { get, isEmpty } from 'lodash';
import { mapActions } from 'vuex';

import { apiConfirmInvited } from '@/api';
import { showToast } from '@/store/toast/actions';
import { SIGN_IN_ROUTE } from '@/constants/routesNames';

import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import ConfirmPageWrapper from '@/components/atoms/Wrappers/ConfirmPageWrapper/ConfirmPageWrapper.vue';
import InputElement from '@/components/atoms/InputElement/InputElement.vue';

export default {
  components: {
    TitleElement,
    ConfirmPageWrapper,
    InputElement,
  },
  data() {
    return {
      msg: 'general.haveBeenInvited',
      isConfirming: false,
      isSubmissionFailed: false,
      isConfirmed: false,
      password: '',
    };
  },
  computed: {
    buttonText() {
      return this.isConfirmed ? 'general.signIn' : 'general.confirm';
    },
  },
  methods: {
    ...mapActions({ showToast }),
    onClick() {
      if (!this.isConfirmed) {
        this.confirmAccount();
      } else {
        this.goToSignIn();
      }
    },
    async confirmAccount() {
      this.isConfirming = true;
      this.isSubmissionFailed = false;

      if (isEmpty(this.password)) {
        this.isSubmissionFailed = true;
        return;
      }

      this.mgs = 'general.underConfirmation';

      const response = await apiConfirmInvited(this.$route.query.token, this.password);

      if (get(response, 'status') === 200) {
        this.showToast({ text: 'general.accountConfirmed' });
        this.isConfirming = false;
        this.isConfirmed = true;
        this.msg = 'general.signUpThx';
      }
    },
    goToSignIn() {
      this.$router.push({ name: SIGN_IN_ROUTE });
    },
    onChange(payload) {
      this.password = payload.value;
    },
  },
};
</script>

<style lang="scss" module src="./ConfirmInvitationPage.scss" />
