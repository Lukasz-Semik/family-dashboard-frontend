<template>
  <div :class="[$style['content-wrapper']]">
    <CardElement is-hoverable>
      <div :class="[$style['family-creator-wrapper']]">
        <div :class="[$style['family-creator-row']]">
          <TitleElement
            :translation-values="{userName: currentUser.firstName}"
            translation-path="dashboard.welcome"
            tag="h2"
            has-centered-text
          />
        </div>

        <div :class="[$style['family-creator-row']]">
          <TextElement
            translation-path="dashboard.welcomeNote"
            is-medium
            has-centered-text
          />
        </div>

        <div :class="[$style['family-creator-row']]">
          <InputElement
            name="familyName"
            type="text"
            :value="isPristine ? currentUser.lastName : currentFamilyName"
            label-translation-path="dashboard.familyName"
            is-required
            has-centered-text
            @onChange="onFamilyNameChange"
          />
        </div>

        <div :class="[$style['button-wrapper']]">
          <ButtonElement
            translation-path="dashboard.createFamily"
            has-blue-theme
            @onClick="createNewFamily"
          />
        </div>
      </div>
    </CardElement>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { isEmpty, get } from 'lodash';

import { apiCreateFamily } from '@/api';
import { currentUser } from '@/store/currentUser/getters';
import { getCurrentUser } from '@/store/currentUser/actions';

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
    async createNewFamily() {
      if (isEmpty(this.currentFamilyName)) return;

      const response = await apiCreateFamily(this.currentFamilyName);

      if (get(response, 'status') === 200) {
        this.getCurrentUser();
      }
    },
    ...mapActions({ getCurrentUser }),
  },
};
</script>

<style lang="scss" module src="./WithoutFamilyPage.scss" />
