<template>
  <div :class="[$style['content-wrapper']]">
    <CardElement is-hoverable>
      <div :class="[$style['family-creator-wrapper']]">
        <div :class="[$style['family-creator-row']]">
          <TitleElement
            :translationValues="{userName: currentUser.firstName}"
            translationPath="dashboard.welcome"
            tag="h2"
            has-centered-text
          />
        </div>

        <div :class="[$style['family-creator-row']]">
          <TextElement translationPath="dashboard.welcomeNote" is-medium has-centered-text/>
        </div>

        <div :class="[$style['family-creator-row']]">
          <InputElement
            name="familyName"
            type="text"
            :value="currentUser.lastName"
            label-translation-path="dashboard.familyName"
            is-required
            has-centered-text
          />
        </div>

        <div :class="[$style['button-wrapper']]">
          <ButtonElement translationPath="dashboard.createFamily" has-blue-theme/>
        </div>
      </div>
    </CardElement>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { currentUser } from '@/store/currentUser/getters';

import CardElement from '@/components/atoms/CardElement/CardElement.vue';
import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import TextElement from '@/components/atoms/TextElement/TextElement.vue';
import InputElement from '@/components/atoms/InputElement/InputElement.vue';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';

export default {
  components: {
    CardElement,
    TitleElement,
    TextElement,
    InputElement,
    ButtonElement,
  },
  computed: {
    ...mapGetters({ currentUser }),
  },
};
</script>

<style lang="scss" module src="./WithoutFamilyPage.scss" />
