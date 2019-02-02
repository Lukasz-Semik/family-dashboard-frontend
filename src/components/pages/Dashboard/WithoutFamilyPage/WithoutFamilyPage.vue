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
            :value="isPristine ? currentUser.lastName : currentFamilyName"
            label-translation-path="dashboard.familyName"
            @onChange="onFamilyNameChange"
            is-required
            has-centered-text
          />
        </div>

        <div :class="[$style['button-wrapper']]">
          <ButtonElement
            @onClick="createFamily"
            translationPath="dashboard.createFamily"
            has-blue-theme
          />
        </div>
      </div>
    </CardElement>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { isEmpty } from 'lodash';

import { currentUser } from '@/store/currentUser/getters';
import { createFamily } from '@/store/currentFamily/actions';

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
  data() {
    return {
      currentFamilyName: '',
      isPristine: true,
    };
  },
  computed: {
    ...mapGetters({ currentUser }),
  },
  methods: {
    onFamilyNameChange(payload) {
      this.currentFamilyName = payload.value;

      if (this.isPristine) this.isPristine = false;
    },
    async createFamily() {
      if (isEmpty(this.currentFamilyName)) return;

      await this.createFamily(this.currentFamilyName);
    },
    ...mapActions({ createFamily }),
  },
};
</script>

<style lang="scss" module src="./WithoutFamilyPage.scss" />
