<template>
  <div :class="[$style['avatar'], classNames]">
    <div :class="[$style['photo']]">
      <Avatar
        data-test="avatar"
        :username="userName"
        :size="size"
        background-color="#ec9130"
        color="#efe"
      />
    </div>

    <p data-test="avatar-label" :class="[$style['text'], textClassNames]">{{ userName }}</p>

    <p
      v-if="isFamilyHead"
      :class="[$style['text'], $style['is-small']]"
    >({{ $t('dashboard.family.familyHead') }})</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Avatar from 'vue-avatar';
import { isEmpty } from 'lodash';

import { currentUser } from '@/store/currentUser/getters';

export default {
  components: {
    Avatar,
  },
  props: {
    providedUserName: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: 70,
    },
    isFlex: {
      type: Boolean,
      default: false,
    },
    hasBlackText: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({ currentUser }),
    userName() {
      const { firstName, lastName } = this.currentUser;

      return !isEmpty(this.providedUserName) ? this.providedUserName : `${firstName} ${lastName}`;
    },
    isFamilyHead() {
      return isEmpty(this.providedUserName) && this.currentUser.isFamilyHead;
    },
    classNames() {
      const { $style, isFlex, hasBlackText } = this;

      return {
        [$style['is-flex']]: isFlex,
      };
    },
    textClassNames() {
      const { $style, isFlex, hasBlackText } = this;

      return {
        [$style['is-black']]: hasBlackText,
      };
    },
  },
};
</script>

<style lang="scss" module src="./AvatarElement.scss" />
