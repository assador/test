<template>
  <div v-if="users.length" class="users-container">
    <div>
      <div>
        <span>Имя</span>
        <a
          class="sort-link"
          href="javascript:void(0)"
          @click="e => sortUsers(e.target, 'name', false)"
        >↓</a>
        <a
          class="sort-link"
          href="javascript:void(0)"
          @click="e => sortUsers(e.target, 'name', true)"
        >↑</a>
      </div>
      <div>
        <span>e-mail</span>
        <a
          class="sort-link"
          href="javascript:void(0)"
          @click="e => sortUsers(e.target, 'email', false)"
        >↓</a>
        <a
          class="sort-link"
          href="javascript:void(0)"
          @click="e => sortUsers(e.target, 'email', true)"
        >↑</a>
      </div>
      <div>
        <span>Город</span>
        <a
          class="sort-link"
          href="javascript:void(0)"
          @click="e => sortUsers(e.target, 'city', false)"
        >↓</a>
        <a
          class="sort-link"
          href="javascript:void(0)"
          @click="e => sortUsers(e.target, 'city', true)"
        >↑</a>
      </div>
      <div>
        <span>Телефон</span>
        <a
          class="sort-link"
          href="javascript:void(0)"
          @click="e => sortUsers(e.target, 'phone', false)"
        >↓</a>
        <a
          class="sort-link"
          href="javascript:void(0)"
          @click="e => sortUsers(e.target, 'phone', true)"
        >↑</a>
      </div>
      <div>
        <span>Сайт</span>
        <a
          class="sort-link"
          href="javascript:void(0)"
          @click="e => sortUsers(e.target, 'website', false)"
        >↓</a>
        <a
          class="sort-link"
          href="javascript:void(0)"
          @click="e => sortUsers(e.target, 'website', true)"
        >↑</a>
      </div>
    </div>
    <dl
      class="users-list"
      v-for="user in users"
      :key="'user_' + user.id"
    >
      <div>
        <dt>Имя</dt>
        <dd>{{ user.name }}</dd>
        <dd>
        </dd>
      </div>
      <div>
        <dt>e-mail</dt>
        <dd><a :href="'mailto:' + user.email">{{ user.email }}</a></dd>
      </div>
      <div>
        <dt>Город</dt>
        <dd>{{ user.city }}</dd>
      </div>
      <div>
        <dt>Телефон</dt>
        <dd>{{ user.phone }}</dd>
      </div>
      <div>
        <dt>Сайт</dt>
        <dd>
          <a :href="(user.website.includes('://') ? '' : '//') + user.website">
            {{ user.website }}
          </a>
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
