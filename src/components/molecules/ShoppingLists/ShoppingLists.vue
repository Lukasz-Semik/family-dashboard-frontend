<template>
  <div>
    <ul v-if="sortedShoppingLists.length > 0">
      <ListHeader>
        <ColMain>{{ $t('general.title') }}</ColMain>
        <ColSecondary>{{ $t('general.createdBy' ) }}</ColSecondary>
        <ColSecondary>{{ $t('general.deadlineItems') }}</ColSecondary>
      </ListHeader>

      <ListItem v-for="shoppingList in sortedShoppingLists" :key="shoppingList.id">
        <ColMain>
          <TitleText>
            <Link
              :to="getRoute(shoppingList.id)"
              :translated-text="shoppingList.title"
              :is-crossed="shoppingList.isDone"
              is-black
            />
          </TitleText>

          <div>
            <ButtonElement
              translation-path="general.remove"
              has-gray-theme
              is-small
              is-inline
              is-hovered-red
              @onClick="onRemove(shoppingList.id)"
            />
          </div>
        </ColMain>

        <ColSecondary>
          <AvatarElement
            :size="35"
            :provided-user-name="getUserName(shoppingList)"
            is-flex
            has-black-text
          />
        </ColSecondary>

        <ColSecondary>{{ getDeadlineQty(shoppingList.id) }}</ColSecondary>
      </ListItem>
    </ul>
    <div v-else>
      <TextElement
        translation-path="shoppingLists.noShoppingLists"
        is-bold
        is-green
        has-centered-text
        is-big
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';

import { apiDeleteShoppingList } from '@/api';
import { SHOPPING_LIST_ROUTE } from '@/constants/routesNames';
import { getShoppingLists } from '@/store/shoppingLists/actions';
import { sortedShoppingLists, shoppingListById } from '@/store/shoppingLists/getters';
import { showToast } from '@/store/toast/actions';
import { getDate } from '@/helpers/date';

import AvatarElement from '@/components/atoms/AvatarElement/AvatarElement.vue';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';
import Link from '@/components/atoms/Link/Link.vue';
import TextElement from '@/components/atoms/TextElement/TextElement.vue';
import ListHeader from '@/components/atoms/ItemsList/ListHeader.vue';
import ListItem from '@/components/atoms/ItemsList/ListItem.vue';
import ColMain from '@/components/atoms/ItemsList/ColMain.vue';
import ColSecondary from '@/components/atoms/ItemsList/ColSecondary.vue';
import TitleText from '@/components/atoms/ItemsList/TitleText.vue';

export default {
  components: {
    AvatarElement,
    ButtonElement,
    TextElement,
    Link,
    ListHeader,
    ListItem,
    ColMain,
    ColSecondary,
    TitleText,
  },
  computed: {
    ...mapGetters({ sortedShoppingLists, shoppingListById }),
  },
  created() {
    this.getShoppingLists();
  },
  methods: {
    ...mapActions({ getShoppingLists, showToast }),
    getUserName(shoppingList) {
      return `${shoppingList.author.firstName} ${shoppingList.author.lastName}`;
    },
    getDeadlineQty(id) {
      const { deadline, items } = this.shoppingListById(id);

      return `${getDate(deadline)} / ${items.length}`;
    },
    async onRemove(id) {
      const response = await apiDeleteShoppingList(id);

      if (response.status === 200) {
        this.getShoppingLists();
      }
    },
    getRoute(id) {
      return { name: SHOPPING_LIST_ROUTE, params: { shoppingListId: id } };
    },
  },
};
</script>
