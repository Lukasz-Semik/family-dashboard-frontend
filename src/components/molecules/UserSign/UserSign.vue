<template>
  <div>
    <HomeCardWrapper>
      <Card>
        <Title
          tag="h2"
          data-test="user-sign-title"
          :translation-path="titleTranslationPath"
          is-orange
          is-small
          is-uppercased
          is-centered
        />
      </Card>
    </HomeCardWrapper>

    <HomeCardWrapper>
      <Card is-hoverable>
        <slot />
      </Card>
    </HomeCardWrapper>
  </div>
</template>

<script>
import HomeCardWrapper from '@/components/atoms/Wrappers/HomeCardWrapper/HomeCardWrapper.vue';
import Card from '@/components/atoms/Card/Card.vue';
import Title from '@/components/atoms/Title/Title.vue';

export default {
  components: {
    HomeCardWrapper,
    Card,
    Title,
  },
  props: {
    titleTranslationPath: {
      type: String,
      required: true,
    },
  },
};
</script>
