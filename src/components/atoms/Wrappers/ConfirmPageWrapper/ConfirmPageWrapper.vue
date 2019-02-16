<template>
  <div :class="[$style['confirm-wrapper']]">
    <div :class="[$style['app-title-wrapper']]">
      <TitleElement translation-path="general.appTitle"/>
    </div>

    <div :class="[$style['message-wrapper']]">
      <slot/>
    </div>

    <ButtonElement
      :is-disabled="isConfirming"
      translation-path="general.signIn"
      has-blue-theme
      @onClick="$emit('onClick')"
    />
  </div>
</template>

<script>
import { get } from 'lodash';

import { apiConfirmAccount } from '@/api';
import { SIGN_IN_ROUTE } from '@/constants/routesNames';

import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';
import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';

export default {
  components: {
    ButtonElement,
    TitleElement,
  },
  props: {
    isConfirming: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" module src="./ConfirmPageWrapper.scss" />
