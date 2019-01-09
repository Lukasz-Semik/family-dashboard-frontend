<template>
  <div>
    <HomeCardWrapper>
      <CardElement>
        <TitleElement
          tag="h2"
          data-test="user-sign-title"
          :translation-path="titleTranslationPath"
          is-orange
          is-small
          is-uppercased
          is-centered
        />
      </CardElement>
    </HomeCardWrapper>

    <HomeCardWrapper>
      <CardElement is-hoverable>
        <slot/>
      </CardElement>
    </HomeCardWrapper>
  </div>
</template>

<script>
import HomeCardWrapper from '@/components/atoms/Wrappers/HomeCardWrapper/HomeCardWrapper.vue';
import CardElement from '@/components/atoms/CardElement/CardElement.vue';
import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';

export default {
  components: {
    HomeCardWrapper,
    CardElement,
    TitleElement,
  },
  props: {
    titleTranslationPath: {
      type: String,
      required: true,
    },
  },
};
</script>
