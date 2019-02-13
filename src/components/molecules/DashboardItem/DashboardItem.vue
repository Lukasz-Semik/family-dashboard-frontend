<template>
  <div :class="[$style['item-wrapper']]">
    <CardElement is-hoverable>
      <div :class="[$style['item-inner-wrapper']]">
        <div :class="[$style['header-group']]">
          <img
            :src="photoSrc"
            :alt="$t(itemTitle)"
          >

          <TitleElement
            tag="h2"
            :translation-path="itemTitle"
            is-orange
            has-centered-text
          />
        </div>

        <div :class="[$style['items-description']]">
          <TextElement
            :translation-path="itemDescription"
            is-medium
            has-centered-text
          />
        </div>

        <div :class="[$style['items-counter']]">
          <TextElement
            translation-path="dashboard.allItems"
            :translation-values="{quantity: allItemsQty}"
            is-bold
            has-centered-text
          />
        </div>

        <div :class="[$style['items-counter']]">
          <TextElement
            translation-path="dashboard.notDoneItems"
            :translation-values="{quantity: notDoneItemsQty}"
            is-bold
            has-centered-text
          />
        </div>

        <div :class="[$style['link-wrapper']]">
          <Link
            :to="destinationRoute"
            translation-path="dashboard.nav.goThere"
            is-x-big
          />
        </div>
      </div>
    </CardElement>
  </div>
</template>

<script>
import CardElement from '@/components/atoms/CardElement/CardElement.vue';
import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import TextElement from '@/components/atoms/TextElement/TextElement.vue';
import Link from '@/components/atoms/Link/Link.vue';

export default {
  components: {
    CardElement,
    TitleElement,
    TextElement,
    Link,
  },
  props: {
    itemTitle: {
      type: String,
      required: true,
    },
    itemDescription: {
      type: String,
      required: true,
    },
    photoSrc: {
      type: String,
      required: true,
    },
    allItemsQty: {
      type: Number,
      default: 0,
    },
    notDoneItemsQty: {
      type: Number,
      default: 0,
    },
    destinationRoute: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" module src="./DashboardItem.scss" />
