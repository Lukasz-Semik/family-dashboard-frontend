<template>
  <div>
    <div :class="[$style['title-wrapper']]">
      <TitleElement translation-path="general.appTitle"/>
    </div>

    <div :class="[$style['links-wrapper']]">
      <Link :to="signInRoute" translation-path="general.signIn"/>
      <Link :to="signUpRoute" translation-path="general.signUp"/>
    </div>

    <Transition
      :leave-active-class="$style['toggle-view-leave-active']"
      :leave-class="$style['toggle-view-leave']"
      :enter-active-class="$style['toggle-view-enter-active']"
      :enter-class="$style['toggle-view-enter']"
      mode="out-in"
    >
      <RouterView/>
    </Transition>
  </div>
</template>

<script>
import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import Link from '@/components/atoms/Link/Link.vue';
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from '@/constants/routesNames';

export default {
  components: {
    TitleElement,
    Link,
  },
  data() {
    return {
      signInRoute: { name: SIGN_IN_ROUTE },
      signUpRoute: { name: SIGN_UP_ROUTE },
    };
  },
};
</script>

<style lang="scss" module src="./HomeElement.scss" />
