<template>
  <div class="users-container">
    <div class="users-captions">
      <div
        v-for="field in Object.keys(usersProperties)"
        :key="field"
      >
        <span v-if="field !== 'avatar'">
          {{ usersProperties[field] ? usersProperties[field] : field }}
        </span>
        <a
          v-if="field !== 'avatar'"
          class="sort-link"
          href="javascript:void(0)"
          title="Сортировать по возрастанию"
          @click="e => sortUsers(e.target, field, false)"
        >↓</a>
        <a
          v-if="field !== 'avatar'"
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
          v-if="field !== 'avatar'"
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
      <div>
        <button @click="$router.push('/users/add')">Добавить</button>
      </div>
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
            v-if="
              field === 'avatar' ||
              field === 'first_name'
              || field === 'last_name'
            "
            :to="`/users/${user.id}`"
          >
            <img
              v-if="field === 'avatar'"
              class="user-avatar"
              :src="user[field]"
              :alt="
                (user.first_name ? user.first_name : '') + ' ' + 
                (user.last_name ? user.last_name : '')
              "
            />
            <span v-else>
              {{ user[field] }}
            </span>
          </router-link>
          <a
            v-else-if="field === 'email'"
            :href="'mailto:' + user[field]"
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
          <button @click="$store.dispatch('deleteUser', user.id)">
            Удалить
          </button>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { User } from '@/store/types';

export default defineComponent({
  props: {
    users: {
      type: Array as PropType<Array<User>>,
      default() {return [];},
    },
  },
  data() {
    return {
      usersProperties: {
        avatar: 'Аватар',
        first_name: 'Имя',
        last_name: 'Фамилия',
        email: 'e-mail',
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
