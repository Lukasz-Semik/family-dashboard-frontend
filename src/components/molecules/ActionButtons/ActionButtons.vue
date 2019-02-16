<template>
  <div :class="[$style['wrapper']]">
    <ButtonElement
      :translation-path="editTranslationPath"
      is-hovered-green
      has-gray-theme
      is-inline
      is-small
      @onClick="$emit('openModal')"
    />

    <ButtonElement
      :translation-path="doneTranslationPath"
      is-hovered-green
      has-gray-theme
      is-inline
      is-small
      @onClick="$emit('toggleDone')"
    />

    <ButtonElement
      :translation-path="removeTranslationPath"
      is-hovered-green
      has-gray-theme
      is-inline
      is-small
      @onClick="$emit('remove')"
    />
  </div>
</template>

<script>
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';

export default {
  components: {
    ButtonElement,
  },
  props: {
    editTranslationPath: {
      type: String,
      required: true,
    },
    doneTranslationPath: {
      type: String,
      required: true,
    },
    removeTranslationPath: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" module src="./ActionButtons.scss" />
