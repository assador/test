<template>
  <div class="page-container">
    <header class="users-header">
      <h1>Добавить пользователя</h1>
    </header>
    <main class="users-body">
      <div class="user-card">
        <form
          @submit.prevent="$store.dispatch('addUser', user)"
        >
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
                    <div v-if="field === 'geo'">
                      широта:
                      <input
                        name="lat"
                        type="number"
                        @input="e => {
                          if(!user.address) user.address = {};
                          if(!user.address.geo) user.address.geo = {};
                          user.address.geo.lat = e.target.value;
                        }"
                      />,
                      долгота:
                      <input
                        name="lat"
                        type="number"
                        @input="e => {
                          if(!user.address) user.address = {};
                          if(!user.address.geo) user.address.geo = {};
                          user.address.geo.lng = e.target.value;
                        }"
                      />
                    </div>
                    <div v-else>
                      <input
                        :name="field"
                        type="text"
                        @input="e => {
                          if(!user.address) user.address = {};
                          user.address[field] = e.target.value;
                        }"
                      />
                    </div>
                  </dd>
                </div>
              </dl>
              <dl v-else-if="field === 'company'">
                <div
                  v-for="field in Object.keys(userCompany)"
                  :key="field"
                >
                  <dt>{{ userCompany[field] }}</dt>
                  <dd>
                    <input
                      :name="field"
                      type="text"
                      @input="e => {
                        if(!user.company) user.company = {};
                        user.company[field] = e.target.value;
                      }"
                    />
                  </dd>
                </div>
              </dl>
              <div v-else>
                <input
                  :name="field"
                  :type="
                    field === 'email' ? 'email' :
                    field === 'phone' ? 'tel' :
                    field === 'website' ? 'url' :
                    'text'
                  "
                  @input="e => user[field] = e.target.value"
                />
              </div>
            </dd>
          </dl>
          <div>
            <button type="submit">Добавить пользователя</button>
          </div>
        </form>
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
      user: {} as User,
      userProperties: {
        name: 'Имя',
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
});
</script>
