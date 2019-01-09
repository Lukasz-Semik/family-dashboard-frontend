<template>
  <UserSign title-translation-path="general.signUp">
    <div :class="[$style['form-wrapper']]">
      <SignUpForm/>
    </div>
  </UserSign>
</template>

<script>
import UserSign from '@/components/molecules/UserSign/UserSign.vue';
import SignUpForm from '@/components/organisms/SignUpForm/SignUpForm.vue';

export default {
  components: {
    UserSign,
    SignUpForm,
  },
};
</script>

<style lang="scss" module src="./SignUpPage.scss" />
