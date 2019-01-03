<template>
  <div>
    <div :class="[$style['title-wrapper']]">
      <Title translationPath="general.appTitle"></Title>
    </div>

    <div :class="[$style['card-wrapper']]">
      <Card>
        <Title translationPath="general.signIn" isOrange isSmall isUppercased isCentered></Title>
      </Card>
    </div>

    <div :class="[$style['card-wrapper']]">
      <Card isHoverable>
        <div :class="[$style['form-wrapper']]">
          <SignInForm/>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Title from '@/components/atoms/Title/Title.vue';
import Card from '@/components/atoms/Card/Card.vue';
import SignInForm from '@/components/organisms/SignInForm/SignInForm';

export default {
  components: {
    Title,
    Card,
    SignInForm,
  },
};
</script>

<style lang="scss" module src="./SignInPage.scss" />
