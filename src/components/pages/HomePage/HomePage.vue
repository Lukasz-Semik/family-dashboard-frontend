<template>
  <div>
    <div :class="[$style['title-wrapper']]">
      <Title translationPath="general.appTitle"></Title>
    </div>

    <div :class="[$style['links-wrapper']]">
      <Link :to="signInRoute" translationPath="general.signIn"/>
      <Link :to="signUpRoute" translationPath="general.signUp"/>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import Title from '@/components/atoms/Title/Title.vue';
import Link from '@/components/atoms/Link/Link.vue';
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from '@/constants/routesNames';

export default {
  data() {
    return {
      signInRoute: { name: SIGN_IN_ROUTE },
      signUpRoute: { name: SIGN_UP_ROUTE },
    };
  },
  components: {
    Title,
    Link,
  },
};
</script>

<style lang="scss" module src="./HomePage.scss" />
