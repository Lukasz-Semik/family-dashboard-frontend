<template>
  <div>
    <ButtonElement translation-path="shoppingLists.create" has-blue-theme @onClick="onSubmit"/>

    <div :class="[$style['wrapper']]">
      <div :class="[$style['field']]">
        <InputElement
          name="title"
          :value="title"
          label-translation-path="shoppingLists.shoppingListTitle"
          placeholder-translation-path="shoppingLists.shoppingListTitlePlaceholder"
          :is-submission-failed="isSubmissionFailed"
          is-transparent
          is-required
          @onChange="onChange"
        />
      </div>

      <div :class="[$style['field']]">
        <DatePicker
          name="deadline"
          :value="deadline"
          label-translation-path="shoppingLists.shoppingListDeadline"
          placeholder-translation-path="shoppingLists.shoppingListDeadlinePlaceholder"
          :is-submission-failed="isSubmissionFailed"
          is-transparent
          @onChange="onChange"
        />
      </div>
    </div>

    <div :class="[$style['wrapper']]">
      <div :class="[$style['field']]">
        <InputElement
          name="item"
          :value="item"
          label-translation-path="shoppingLists.item"
          placeholder-translation-path="shoppingLists.itemPlaceholder"
          :is-submission-failed="isSubmissionFailed"
          is-transparent
          @onChange="onChange"
        />
      </div>

      <div :class="[$style['field']]">
        <ButtonElement
          translation-path="shoppingLists.addItem"
          has-gray-theme
          @onClick="onAddItem"
        />
      </div>
    </div>

    <ul>
      <ErrorMsg v-if="hasEmptyListError || hasExistingItemError" :translationPath="itemsError"/>

      <li :class="[$style['item']]" :key="item.id" v-for="item in items">
        <TextElement :translated-text="item.name" is-black is-medium/>
        <ButtonElement
          translation-path="general.remove"
          has-gray-theme
          is-small
          is-inline
          is-hovered-red
          @onClick="onRemove(item.id)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import uuid from 'uuid/v1';
import { isEmpty, find } from 'lodash';

import { apiCreteShoppingList } from '@/api';
import ErrorMsg from '@/components/atoms/ErrorMsg/ErrorMsg.vue';
import InputElement from '@/components/atoms/InputElement/InputElement.vue';
import DatePicker from '@/components/atoms/DatePicker/DatePicker.vue';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';
import TextElement from '@/components/atoms/TextElement/TextElement.vue';

export default {
  components: {
    ErrorMsg,
    InputElement,
    DatePicker,
    ButtonElement,
    TextElement,
  },
  data() {
    return {
      title: '',
      item: '',
      deadline: null,
      items: [],
      hasEmptyListError: false,
      hasExistingItemError: false,
      isSubmissionFailed: false,
    };
  },
  computed: {
    itemsError() {
      if (this.hasExistingItemError) {
        return 'errors.itemExist';
      }

      if (this.hasEmptyListError) {
        return 'errors.emptyList';
      }
    },
  },
  methods: {
    onChange(payload) {
      const { value, name } = payload;

      this[name] = value;
    },
    onAddItem() {
      this.hasExistingItemError = false;

      if (isEmpty(this.item)) return;

      if (!isEmpty(find(this.items, item => item.name === this.item))) {
        this.hasExistingItemError = true;
        return;
      }

      this.items.push({
        name: this.item,
        isDone: false,
        deadline: this.deadline,
        id: uuid(),
      });

      this.hasEmptyListError = false;

      this.item = '';
    },
    onRemove(id) {
      const filteredItems = this.items.filter(item => item.id !== id);
      this.items = filteredItems;
    },
    async onSubmit() {
      this.isSubmissionFailed = false;

      const { title, deadline, items } = this;
      let isValid = true;

      if (isEmpty(title)) {
        this.isSubmissionFailed = true;
        isValid = false;
      }

      if (isEmpty(items)) {
        this.hasEmptyListError = true;
        isValid = false;
      }

      if (!isValid) return;

      const response = await apiCreteShoppingList({ title, deadline, items });

      if (response.status === 200) {
        Object.assign(this, {
          title: '',
          item: '',
          deadline: null,
          items: [],
          hasEmptyListError: false,
          isSubmissionFailed: false,
        });

        this.$emit('finishCreating');
      }
    },
  },
};
</script>

<style lang="scss" module src="./CreateShoppingListForm.scss" />
