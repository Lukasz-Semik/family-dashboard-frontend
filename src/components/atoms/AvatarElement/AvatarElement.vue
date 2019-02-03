<template>
  <div :class="[$style['avatar']]">
    <div :class="[$style['photo']]">
      <Avatar :username="userName" :size="70" background-color="#ec9130" color="#efe"/>
    </div>

    <p :class="[$style['text']]">{{ userName }}</p>

    <p
      v-if="isFamilyHead"
      :class="[$style['text'], $style['text--is-small']]"
    >({{ $t('dashboard.family.familyHead') }})</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Avatar from 'vue-avatar';

import { currentUser } from '@/store/currentUser/getters';

export default {
  components: {
    Avatar,
  },
  computed: {
    ...mapGetters({ currentUser }),
    userName() {
      const { firstName, lastName } = this.currentUser;

      return `${firstName} ${lastName}`;
    },
    isFamilyHead() {
      return this.currentUser.isFamilyHead;
    },
  },
};
</script>

<style lang="scss" module src="./AvatarElement.scss" />
