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
            <dl v-if="field === 'address'">
              <div
                v-for="field in Object.keys(userAddress)"
                :key="field"
              >
                <dt>{{ userAddress[field] }}</dt>
                <dd>
                  <span v-if="field === 'geo'">
                    широта: {{ user.address[field].lat }},
                    долгота: {{ user.address[field].lng }}
                  </span>
                  <span v-else>{{ user.address[field] }}</span>
                </dd>
              </div>
            </dl>
            <dl v-else-if="field === 'company'">
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
              v-else-if="field === 'website'"
              :href="(user[field].includes('://') ? '' : '//') + user[field]"
            >
              {{ user[field] }}
            </a>
            <span v-else>
              {{ user[field] }}
            </span>
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
        bs: 'Деятельность',
        catchPhrase: 'Слоган',
      },
    };
  },
  computed: {
    user(): User {
      return this.$store.state.users.find((u: User) => u.id === Number(this.$attrs.id));
    },
  },
});
</script>
