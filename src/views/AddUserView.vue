<template>
  <div class="page-container">
    <header class="users-header">
      <h1>Добавить пользователя</h1>
    </header>
    <main class="users-body">
      <div class="user-card">
        <div class="user-card-summary">
          <form
            @submit.prevent="$store.dispatch('addUser', user)"
          >
            <dl
              v-for="field in Object.keys(userProperties)"
              :key="field"
            >
              <dt>{{ userProperties[field] }}</dt>
              <dd>
                <div v-if="field === 'avatar'">
                  <input
                    :name="field"
                    type="file"
                    @change="e => uploadAvatar(e)"
                  />
                </div>
                <div v-else>
                  <input
                    :name="field"
                    :type="field === 'email' ? 'email' : 'text'"
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
      user: {} as User,
      userProperties: {
        avatar: 'Аватар',
        first_name: 'Имя',
        last_name: 'Фамилия',
        email: 'e-mail',
      },
    };
  },
  methods: {
    uploadAvatar(event: Event): void {
      event.preventDefault();
      const data = new FormData();
      data.append('avatarFile', (event.target as HTMLInputElement).files![0]);
      /*
       * Не знаю, как в реальном API будет реализована загрузка аватарки.
       * Может быть, аватарка сначала будет посылаться на сервер, который
       * в ответ отдаёт её URL, который, в свою очередь, дальше, по сабмиту,
       * будет уже поститься как поле нового юзера. А может быть, аватарка
       * будет слаться сразу с другими данным. Пока тут ставлю заглушку:
       */
      this.user.avatar = 'https://test.com/test.jpg';
    },
  },
});
</script>
