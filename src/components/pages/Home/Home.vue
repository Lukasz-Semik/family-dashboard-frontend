<template>
  <div>
    <div :class="[$style['title-wrapper']]">
      <Title translation-path="general.appTitle" />
    </div>

    <div :class="[$style['links-wrapper']]">
      <Link
        :to="signInRoute"
        translation-path="general.signIn"
      />
      <Link
        :to="signUpRoute"
        translation-path="general.signUp"
      />
    </div>

    <Transition
      :leave-active-class="$style['toggle-view-leave-active']"
      :leave-class="$style['toggle-view-leave']"
      :enter-active-class="$style['toggle-view-enter-active']"
      :enter-class="$style['toggle-view-enter']"
      mode="out-in"
    >
      <RouterView />
    </Transition>
  </div>
</template>

<script>
import Title from '@/components/atoms/Title/Title.vue';
import Link from '@/components/atoms/Link/Link.vue';
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from '@/constants/routesNames';

export default {
  components: {
    Title,
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

<style lang="scss" module src="./Home.scss" />
