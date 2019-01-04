<template>
  <UserSign titleTranslationPath="general.signIn">
    <div :class="[$style['form-wrapper']]">
      <SignInForm/>
    </div>
  </UserSign>
</template>

<script>
import UserSign from '@/components/molecules/UserSign/UserSign.vue';
import SignInForm from '@/components/organisms/SignInForm/SignInForm';

export default {
  components: {
    UserSign,
    SignInForm,
  },
};
</script>

<style lang="scss" module src="./SignInPage.scss" />
