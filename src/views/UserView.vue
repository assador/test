<template>
  <div v-if="user" class="page-container">
    <header class="users-header">
      <h1>{{ user.name }}</h1>
      <div>Страница пользователя</div>
    </header>
    <main class="users-body">
      <div class="user-card">
        <dl
          v-for="field in Object.keys(userProperties)"
          :key="field"
        >
          <dt>{{ userProperties[field] }}</dt>
          <dd>
            <dl v-if="field === 'address' && user[field]">
              <div
                v-for="field in Object.keys(userAddress)"
                :key="field"
              >
                <dt>{{ userAddress[field] }}</dt>
                <dd>
                  <div v-if="field === 'geo' && user.address[field]">
                    широта: {{ user.address[field].lat }},
                    долгота: {{ user.address[field].lng }}
                  </div>
                  <div v-else>{{ user.address[field] }}</div>
                </dd>
              </div>
            </dl>
            <dl v-else-if="field === 'company' && user[field]">
              <div
                v-for="field in Object.keys(userCompany)"
                :key="field"
              >
                <dt>{{ userCompany[field] }}</dt>
                <dd>{{ user.company[field] }}</dd>
              </div>
            </dl>
            <a
              v-else-if="field === 'email'"
              :href="'mailto:' + user[field]"
            >
              {{ user[field] }}
            </a>
            <a
              v-else-if="field === 'website' && user[field]"
              :href="(user[field].includes('://') ? '' : '//') + user[field]"
            >
              {{ user[field] }}
            </a>
            <div v-else>
              {{ user[field] }}
            </div>
          </dd>
        </dl>
      </div>
    </main>
    <footer>
      
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { User } from '@/store/types';

export default defineComponent({
  data() {
    return {
      userProperties: {
        phone: 'Телефон',
        email: 'e-mail',
        website: 'Сайт',
        address: 'Адрес',
        company: 'Компания',
      },
      userAddress: {
        city: 'Город',
        street: 'Улица',
        suite: 'Дом',
        zipcode: 'Индекс',
        geo: 'Координаты'
      },
      userCompany: {
        name: 'Название',
        bs: 'Род деятельности',
        catchPhrase: 'Слоган',
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
