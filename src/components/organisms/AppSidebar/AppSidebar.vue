<template>
  <div :class="[$style['app-sidebar']]">
    <div :class="[$style['title-wrapper']]">
      <TitleElement translation-path="general.appTitle" is-small has-centered-text/>
    </div>

    <div :class="[$style['avatar-wrapper']]">
      <AvatarElement/>
    </div>

    <div :class="[$style['sign-out-wrapper']]">
      <ButtonElement @onClick="signOut" translationPath="general.signOut"/>
    </div>
  </div>
</template>

<script>
import { goToUrl } from '@/utils/general';
import { removeLocalStorageItem } from '@/utils/localStorage';

import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import AvatarElement from '@/components/atoms/AvatarElement/AvatarElement.vue';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';

export default {
  components: {
    TitleElement,
    AvatarElement,
    ButtonElement,
  },
  methods: {
    signOut() {
      removeLocalStorageItem('_token');
      goToUrl('');
    },
  },
};
</script>


<style lang="scss" module src="./AppSidebar.scss" />
