<template>
  <div v-if="users.length" class="users-container">
    <div class="users-captions">
      <div
        v-for="field in Object.keys(users[0])"
        :key="field"
      >
        <span>{{ usersPropertiesNames[field] ? usersPropertiesNames[field] : field }}</span>
        <a
          class="sort-link"
          href="javascript:void(0)"
          title="Сортировать по возрастанию"
          @click="e => sortUsers(e.target, field, false)"
        >↓</a>
        <a
          class="sort-link"
          href="javascript:void(0)"
          title="Сортировать по убыванию"
          @click="e => sortUsers(e.target, field, true)"
        >↑</a>
      </div>
    </div>
    <div class="users-search">
      <div
        v-for="field in Object.keys(users[0])"
        :key="field"
      >
        <input
          v-if="field !== 'show'"
          type="text"
          placeholder="Фильтровать по значению"
          title="Фильтровать по значению"
          @input="
            e => $store.dispatch(
              'filterUsers', {property: field, substring: e.target.value}
            )
          "
        />
      </div>
    </div>
    <dl
      class="users-list"
      v-for="user in users"
      :key="'user_' + user.id"
    >
      <div
        v-for="field in Object.keys(user)"
        :key="field"
      >
        <dt>{{ usersPropertiesNames[field] }}</dt>
        <dd>
          <a
            v-if="field === 'email'"
            :href="'mailto:' + user[field]"
          >
            {{ user[field] }}
          </a>
          <a
            v-else-if="field === 'website'"
            :href="(user[field].includes('://') ? '' : '//') + user[field]"
          >
            {{ user[field] }}
          </a>
          <span v-else>
            {{ user[field] }}
          </span>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { UserProcessed } from '@/store/types';


export default defineComponent({
  props: {
    users: {
      type: Array as PropType<Array<UserProcessed>>,
      default() {return [];},
    },
  },
  data() {
    return {
      usersPropertiesNames: {
        name: 'Имя',
        email: 'e-mail',
        city: 'Город',
        phone: 'Телефон',
        website: 'Сайт',
      },
    };
  },
  methods: {
    sortUsers(link: HTMLElement, property: string, reverse: boolean): void {
      this.$store.dispatch('sortUsers', {property: property, reverse: reverse})
        .then(() => {
          document.querySelectorAll('.sort-link').forEach(
            link => link.classList.remove('active')
          );
          link.classList.add('active');
        });
    },
  },
});
</script>
