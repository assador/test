<template>
  <div class="page-container">
    <header class="users-header">
      <h1>Список пользователей</h1>
    </header>
    <main class="users-body">
      <users-component :users="usersPaged" />
    </main>
    <footer>
      <a
        v-for="page in usersPagesCount"
        :key="'page_' + page"
        :class="'paginator-link' + (page === usersPage ? ' active' : '')"
        href="javascript:void(0)"
        @click="usersPage = page"
      >
        {{ page }}
      </a>
      <div v-if="!usersProcessed.length">
        Пользователей не найдено.
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { User, UserProcessed } from '@/store/types';
import UsersComponent from '@/components/UsersComponent.vue';

export default defineComponent({
  components: {
    UsersComponent,
  },
  data() {
    return {
      usersPage: 1,
      usersOnPageCount: 5,
    };
  },
  computed: {
    usersProcessed(): Array<UserProcessed> {
      const users: Array<UserProcessed> = [];
      this.$store.state.users.map((user: User) => {
        let show = true;
        for (const field in user) {
          if (
            this.$store.state.filters[field] &&
            !user[field as keyof typeof user]!.toString().includes(
              this.$store.state.filters[field]
            )
          ) {
            show = false;
          }
        }
        if (show) {
          users.push({
            id: user.id,
            name: user.name || '',
            email: user.email || '',
            city: !user.address ? '' : user.address.city || '',
            phone: user.phone || '',
            website: user.website || '',
          });
        }
      });
      users.sort((a: UserProcessed, b: UserProcessed) => {
        if (
          a[this.$store.state.usersSort.property as keyof typeof a]! <
          b[this.$store.state.usersSort.property as keyof typeof b]!
        ) {
          return this.$store.state.usersSort.reverse ? 1 : -1;
        }
        if (
          a[this.$store.state.usersSort.property as keyof typeof a]! >
          b[this.$store.state.usersSort.property as keyof typeof b]!
        ) {
          return this.$store.state.usersSort.reverse ? -1 : 1;
        }
        return 0;
      });
      return users;
    },
    usersPagesCount(): number {
      return Math.ceil(
        this.usersProcessed.length / this.usersOnPageCount
      );
    },
    usersPaged(): Array<UserProcessed> {
      const users: Array<UserProcessed> = [];
      for (let i = 0; i < this.usersProcessed.length; i++) {
        if (
          i >= this.usersOnPageCount * (this.usersPage - 1) &&
          i < this.usersOnPageCount * this.usersPage
        ) {
          users.push(this.usersProcessed[i]);
        }
      }
      return users;
    },
  },
  mounted() {
    this.$store.dispatch('getUsers');
  },
});
</script>
