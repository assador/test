<template>
  <div v-if="users.length" class="users-container">
    <div class="users-captions">
      <div
        v-for="field in Object.keys(usersProperties)"
        :key="field"
      >
        <span>{{ usersProperties[field] ? usersProperties[field] : field }}</span>
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
      <div><span>Действия</span></div>
    </div>
    <div class="users-search">
      <div
        v-for="field in Object.keys(usersProperties)"
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
      <div></div>
    </div>
    <dl
      class="users-list"
      v-for="user in users"
      :key="'user_' + user.id"
    >
      <div
        v-for="field in Object.keys(usersProperties)"
        :key="field"
      >
        <dt>{{ usersProperties[field] }}</dt>
        <dd>
          <router-link
            v-if="field === 'name'"
            :to="`users/${user.id}`"
          >
            {{ user[field] }}
          </router-link>
          <a
            v-else-if="field === 'email'"
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
      <div>
        <dt>Действия</dt>
        <dd>
          <button>Удалить</button>
        </dd>
      </div>
    </dl>
  </div>
  <div v-else>
    Пользователей не найдено.
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
      usersProperties: {
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
