<template>
  <div :class="[$style['wrapper']]">
    <TitleElement
      tag="h2"
      translation-path="family.familyTitle"
      :translation-values="{familyName: currentFamily.name}"
      is-black
    />

    <div
      v-if="currentUser.isFamilyHead"
      :class="[$style['button-wrapper']]"
    >
      <ButtonElement
        translation-path="family.addUser"
        has-blue-theme
        @onClick="showModal = true"
      />
    </div>

    <div
      v-for="member in familyMembers"
      :key="member"
      :class="[$style['avatar-wrapper']]"
    >
      <AvatarElement
        :size="60"
        :provided-user-name="member"
        is-flex
        has-black-text
        has-big-text
      />
    </div>

    <ModalElement
      v-if="showModal"
      :title-translation-path="`family.${isAddingExistingUser ? 'addUser' : 'inviteUser'}`"
      button-translation-path="family.addUser"
      @onClose="showModal = false"
      @onMainButtonClick="onAddUser"
    >
      <template slot="body">
        <div :class="[$style['form-wrapper']]">
          <div :class="[$style['toggle-form-button-wrapper']]">
            <ButtonElement
              translated-text="do zmiany"
              is-inline
              is-small
              has-gray-theme
              @onClick="onFormToggle"
            />
          </div>

          <InputElement
            v-if="isAddingExistingUser"
            name="email"
            placeholder-translation-path="forms.userSign.email.placeholder"
            label-translation-path="family.inviteExistingUserLabel"
            :value="email"
            is-required
            is-email-required
            @onChange="onChange"
          />

          <div v-else>
            <div :class="[$style['row']]">
              <InputElement
                name="email"
                placeholder-translation-path="forms.userSign.email.placeholder"
                label-translation-path="family.inviteNewUserLabel"
                :value="email"
                is-required
                is-email-required
                @onChange="onChange"
              />
            </div>

            <div :class="[$style['row']]">
              <InputElement
                name="firstName"
                placeholder-translation-path="forms.userSign.firstName.placeholder"
                label-translation-path="forms.userSign.firstName.label"
                :value="firstName"
                is-required
                @onChange="onChange"
              />
            </div>

            <div :class="[$style['row']]">
              <InputElement
                name="lastName"
                placeholder-translation-path="forms.userSign.lastName.placeholder"
                label-translation-path="forms.userSign.lastName.label"
                :value="lastName"
                is-required
                @onChange="onChange"
              />
            </div>

            <div :class="[$style['row']]">
              <DatePicker
                name="birthDate"
                :value="birthDate"
                placeholder-translation-path="forms.userSign.birthDate.placeholder"
                label-translation-path="forms.userSign.birthDate.label"
                :is-submission-failed="isSubmissionFailed"
                is-required
                has-centered-text
                @onChange="onChange"
              />
            </div>

            <div :class="[$style['row']]">
              <DropdownElement
                name="gender"
                :value="gender"
                placeholder-translation-path="forms.userSign.gender.placeholder"
                label-translation-path="forms.userSign.gender.label"
                :options="options"
                :is-submission-failed="isSubmissionFailed"
                is-required
                has-centered-text
                @onChange="onChange"
              />
            </div>
          </div>
        </div>
      </template>
    </ModalElement>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { apiAddExistingUser, apiInviteNewUser } from '@/api';
import { showToast } from '@/store/toast/actions';
import { getFamily } from '@/store/currentFamily/actions';
import { currentFamily } from '@/store/currentFamily/getters';
import { currentUser } from '@/store/currentUser/getters';
import { genderOptions } from '@/constants/forms';

import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';
import ModalElement from '@/components/atoms/ModalElement/ModalElement.vue';
import InputElement from '@/components/atoms/InputElement/InputElement.vue';
import AvatarElement from '@/components/atoms/AvatarElement/AvatarElement.vue';
import DatePicker from '@/components/atoms/DatePicker/DatePicker.vue';
import DropdownElement from '@/components/atoms/DropdownElement/DropdownElement.vue';

export default {
  components: {
    TitleElement,
    ButtonElement,
    ModalElement,
    InputElement,
    AvatarElement,
    DatePicker,
    DropdownElement,
  },
  data() {
    return {
      showModal: false,
      email: '',
      isAddingExistingUser: true,
      isSubmissionFailed: false,
      firstName: '',
      lastName: '',
      birthDate: null,
      gender: '',
      errors: {},
    };
  },
  computed: {
    ...mapGetters({ currentFamily, currentUser }),
    familyMembers() {
      const { users = [] } = this.currentFamily;

      return users.map(user => `${user.firstName} ${user.lastName}`);
    },
    options() {
      return genderOptions;
    },
  },
  created() {
    this.getFamily();
  },
  methods: {
    ...mapActions({ getFamily, showToast }),
    onFormToggle() {
      this.isAddingExistingUser = !this.isAddingExistingUser;
    },
    onChange(payload) {
      const { value, name } = payload;
      this[name] = value;
    },
    onAddUser() {
      if (this.isAddingExistingUser) {
        this.onExistingUserInvite();
      } else {
        this.onNewUserInvite();
      }
    },
    async onExistingUserInvite() {
      const response = await apiAddExistingUser(this.email);

      if (response.status === 200) {
        await this.getFamily();
        this.showToast({ text: 'family.userAdded' });
        this.showModal = false;
      }
    },
    async onNewUserInvite() {
      const { email, firstName, lastName, gender, birthDate } = this;
      const response = await apiInviteNewUser({ email, firstName, lastName, gender, birthDate });

      if (response.status === 200) {
        await this.getFamily();
        this.showToast({ text: 'family.userInvited' });
        this.showModal = false;
      }
    },
  },
};
</script>

<style lang="scss" module src="./FamilySettingsPage.scss" />
