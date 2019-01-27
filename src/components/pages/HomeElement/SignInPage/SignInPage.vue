<template>
  <UserSign title-translation-path="general.signIn">
    <div :class="[$style['form-wrapper']]">
      <SignInForm/>
    </div>
  </UserSign>
</template>

<script>
import { DASHBOARD_ROUTE } from '@/constants/routesNames';
import { checkIsSignedIn } from '@/helpers/currentUser';

import UserSign from '@/components/molecules/UserSign/UserSign.vue';
import SignInForm from '@/components/organisms/SignInForm/SignInForm.vue';

export default {
  components: {
    UserSign,
    SignInForm,
  },
  async created() {
    if (await this.checkIsSignedIn()) {
      this.$router.push({ name: DASHBOARD_ROUTE });
    }
  },
  methods: {
    checkIsSignedIn,
  },
};
</script>

<style lang="scss" module src="./SignInPage.scss" />
