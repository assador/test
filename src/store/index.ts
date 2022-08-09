import { createStore } from 'vuex';
import axios from 'axios';
import { User } from '@/store/types';

const store = createStore({
  state: {
    users: [] as Array<User>,
    usersSort: {
      property: 'id',
      reverse: false,
    },
    filters: {} as Record<string, string>,
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    sortUsers(state, payload) {
      state.usersSort.property = payload.property;
      state.usersSort.reverse = payload.reverse;
    },
    filterUsers(state, payload) {
      state.filters[
        payload.property as keyof typeof state.filters
      ] = (payload.substring as string);
    },
  },
  actions: {
    async setUsers({commit}) {
      await axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          commit('setUsers', response.data);
        })
      ;
    },
    sortUsers({commit}, payload) {
      commit('sortUsers', payload);
    },
    filterUsers({commit}, payload) {
      commit('filterUsers', payload);
    },
  },
});

export default store;
