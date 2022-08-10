import { createStore } from 'vuex';
import axios from 'axios';
import { User } from '@/store/types';

const store = createStore({
  state: {
    users: [] as Array<User>,
    user: {} as User,
    usersSort: {
      property: 'id',
      reverse: false,
    },
    filters: {} as Record<string, string>,
  },
  mutations: {
    getUsers(state, users) {
      state.users = users;
    },
    getUser(state, user) {
      state.user = user;
    },
    deleteUser(state, id: number) {
      const user = state.users.find((u: User) => u.id === id);
      if (user) state.users.splice(state.users.indexOf(user), 1);
    },
    addUser(state, user: User) {
      state.users.push(user);
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
    getUsers({commit}) {
      axios.get('https://reqres.in/api/users')
        .then(response => {
          console.log(response);
          commit('getUsers', response.data.data);
        }, error => console.log(error))
      ;
    },
    getUser({commit}, id: number) {
      axios.get('https://reqres.in/api/users/' + id)
        .then(response => {
          console.log(response);
          commit('getUser', response.data.data);
        }, error => console.log(error))
      ;
    },
    deleteUser({commit}, id: number) {
      axios.delete('https://reqres.in/api/users/' + id)
        .then(response => {
          console.log(response);
          commit('deleteUser', id);
        }, error => console.log(error))
      ;
    },
    addUser({dispatch}, user: User) {
      axios.post('https://reqres.in/api/users', user)
        .then(response => {
          console.log(response);
          dispatch('getUsers');
        }, error => console.log(error))
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
