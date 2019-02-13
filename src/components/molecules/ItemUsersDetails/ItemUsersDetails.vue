<template>
  <div :class="[$style['row']]">
    <div :class="[$style['col']]">
      <template v-if="Boolean(authorName)">
        <TextElement translationPath="general.createdBy" is-bold is-green/>
        <div :class="[$style['avatar-wrapper']]">
          <AvatarElement :size="40" :providedUserName="authorName" is-flex has-black-text/>
        </div>
        <TextElement :translatedText="createdAt" is-small is-bold/>
      </template>
    </div>

    <div :class="[$style['col']]">
      <template v-if="Boolean(updaterName)">
        <TextElement translationPath="general.updatedBy" is-bold is-green/>
        <div :class="[$style['avatar-wrapper']]">
          <AvatarElement :size="40" :providedUserName="updaterName" is-flex has-black-text/>
        </div>
        <TextElement :translatedText="updatedAt" is-small is-bold/>
      </template>
    </div>

    <div :class="[$style['col']]">
      <template v-if="Boolean(execturoName)">
        <TextElement translationPath="general.doneBy" is-bold is-green/>
        <div :class="[$style['avatar-wrapper']]">
          <AvatarElement :size="40" :providedUserName="execturoName" is-flex has-black-text/>
        </div>
        <TextElement :translatedText="updatedAt" is-small is-bold/>
      </template>
    </div>
  </div>
</template>

<script>
import AvatarElement from '@/components/atoms/AvatarElement/AvatarElement.vue';
import TextElement from '@/components/atoms/TextElement/TextElement.vue';

export default {
  components: {
    AvatarElement,
    TextElement,
  },
  props: {
    authorName: {
      type: String,
      default: '',
    },
    createdAt: {
      type: String,
      default: '',
    },
    updaterName: {
      type: String,
      default: '',
    },
    updatedAt: {
      type: String,
      default: '',
    },
    execturoName: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" module src="./ItemUsersDetails.scss" />
