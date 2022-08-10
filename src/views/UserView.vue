<template>
  <div v-if="user" class="page-container">
    <header class="users-header">
      <h1>
        {{ user.first_name }}
        {{ user.last_name }}
      </h1>
      <div>Страница пользователя</div>
    </header>
    <main class="users-body">
      <div class="user-card">
        <img
          v-if="user.avatar"
          class="user-avatar"
          :src="user.avatar"
          :alt="
            (user.first_name ? user.first_name : '') + ' ' + 
            (user.last_name ? user.last_name : '')
          "
        />
        <div class="user-card-summary">
          <dl
            v-for="field in Object.keys(userProperties)"
            :key="field"
          >
            <dt>{{ userProperties[field] }}</dt>
            <dd>
              <a
                v-if="field === 'email'"
                :href="'mailto:' + user[field]"
              >
                {{ user[field] }}
              </a>
              <div v-else>
                {{ user[field] }}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { User } from '@/store/types';

export default defineComponent({
  data() {
    return {
      userProperties: {
        email: 'e-mail',
      },
    };
  },
  mounted() {
    this.$store.dispatch('getUser', this.$attrs.id);
  },
  computed: {
    user(): User {
      return this.$store.state.user;
    },
/*
    user(): User {
      return this.$store.state.users.find(
        (u: User) => u.id === Number(this.$attrs.id)
      );
    },
*/
  },
});
</script>
