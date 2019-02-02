<template>
  <div :class="[$style['app-sidebar']]">
    <div :class="[$style['title-wrapper']]">
      <TitleElement
        translation-path="general.appTitle"
        is-small
        has-centered-text
      />
    </div>
  </div>
</template>

<script>
import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';

export default {
  components: {
    TitleElement,
  },
};
</script>


<style lang="scss" module src="./AppSidebar.scss" />
