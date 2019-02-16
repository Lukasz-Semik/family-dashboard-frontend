<template>
  <div :class="[$style['wrapper']]">
    <TitleElement
      tag="h2"
      translation-path="family.familyTitle"
      :translationValues="{familyName: currentFamily.name}"
      is-black
    />

    <div :class="[$style['button-wrapper']]">
      <ButtonElement translation-path="family.addUser" @onClick="showModal = true" has-blue-theme/>
    </div>

    <div :class="[$style['avatar-wrapper']]" :key="member" v-for="member in familyMembers">
      <AvatarElement :size="60" :provided-user-name="member" is-flex has-black-text has-big-text/>
    </div>

    <ModalElement
      v-if="showModal"
      titleTranslationPath="family.addUser"
      buttonTranslationPath="family.addUser"
      @onClose="showModal = false"
      @onMainButtonClick="onExistingUserInvite"
    >
      <template slot="body">
        <div :class="[$style['form-wrapper']]">
          <ButtonElement
            @onClick="onFormToggle"
            translated-text="do zmiany"
            is-inline
            is-small
            has-gray-theme
          />
          <InputElement
            v-if="isAddingExistingUser"
            name="email"
            placeholderTranslationPath="family.inviteExistinUserPlaceholder"
            labelTranslationPath="family.inviteExistinUserLabel"
            :value="email"
            @onChange="onChange"
            is-required
            is-email-required
          />
        </div>
      </template>
    </ModalElement>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { apiAddExistingUser } from '@/api';
import { showToast } from '@/store/toast/actions';
import { getFamily } from '@/store/currentFamily/actions';
import { currentFamily } from '@/store/currentFamily/getters';

import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';
import ModalElement from '@/components/atoms/ModalElement/ModalElement.vue';
import InputElement from '@/components/atoms/InputElement/InputElement.vue';
import AvatarElement from '@/components/atoms/AvatarElement/AvatarElement.vue';

export default {
  components: {
    TitleElement,
    ButtonElement,
    ModalElement,
    InputElement,
    AvatarElement,
  },
  created() {
    this.getFamily();
  },
  data() {
    return {
      showModal: false,
      email: '',
      isAddingExistingUser: true,
    };
  },
  computed: {
    ...mapGetters({ currentFamily }),
    familyMembers() {
      const { users = [] } = this.currentFamily;

      return users.map(user => `${user.firstName} ${user.lastName}`);
    },
  },
  methods: {
    ...mapActions({ getFamily, showToast }),
    onFormToggle() {
      this.isAddingExistingUser = !this.isAddingExistingUser;

      this.email = '';
    },
    onChange(payload) {
      const { value, name } = payload;
      this[name] = value;
    },
    async onExistingUserInvite() {
      const response = await apiAddExistingUser(this.email);

      if (response.status === 200) {
        this.showToast({ text: 'family.userAdded' });
        this.showModal = false;
      }
    },
  },
};
</script>

<style lang="scss" module src="./FamilySettingsPage.scss" />
