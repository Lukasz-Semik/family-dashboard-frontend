<template>
  <div>
    <HomeCardWrapper>
      <Card>
        <Title translationPath="general.signIn" isOrange isSmall isUppercased isCentered></Title>
      </Card>
    </HomeCardWrapper>

    <HomeCardWrapper>
      <Card isHoverable>
        <div :class="[$style['form-wrapper']]">
          <SignInForm/>
        </div>
      </Card>
    </HomeCardWrapper>
  </div>
</template>

<script>
import HomeCardWrapper from '@/components/atoms/Wrappers/HomeCardWrapper/HomeCardWrapper.vue';
import Card from '@/components/atoms/Card/Card.vue';
import Title from '@/components/atoms/Title/Title.vue';
import SignInForm from '@/components/organisms/SignInForm/SignInForm';

export default {
  components: {
    HomeCardWrapper,
    Card,
    Title,
    SignInForm,
  },
};
</script>

<style lang="scss" module src="./SignInPage.scss" />
