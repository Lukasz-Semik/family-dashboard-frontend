<template>
  <UserSign titleTranslationPath="general.signIn">
    <div :class="[$style['form-wrapper']]">
      <SignInForm/>
    </div>
  </UserSign>
</template>

<script>
import { mapActions } from 'vuex';

import { DASHBOARD_ROUTE } from '@/constants/routesNames';
import { checkIsSignedIn } from '@/store/currentUser/actions';

import UserSign from '@/components/molecules/UserSign/UserSign.vue';
import SignInForm from '@/components/organisms/SignInForm/SignInForm';

export default {
  methods: {
    ...mapActions({ checkIsSignedIn }),
  },
  async created() {
    if (await this.checkIsSignedIn()) {
      this.$router.push({ name: DASHBOARD_ROUTE });
    }
  },
  components: {
    UserSign,
    SignInForm,
  },
};
</script>

<style lang="scss" module src="./SignInPage.scss" />
