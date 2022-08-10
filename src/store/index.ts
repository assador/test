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
      axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => commit('getUsers', response.data))
        .catch(error => alert(error))
      ;
    },
    getUser({commit}, id: number) {
      axios.get('https://jsonplaceholder.typicode.com/users/' + id)
        .then(response => {commit('getUser', response.data)})
        .catch(error => alert(error))
      ;
    },
    deleteUser({commit}, id: number) {
      axios.delete('https://jsonplaceholder.typicode.com/users/' + id)
        .then(() => commit('deleteUser', id))
        .catch(error => alert(error))
      ;
    },
    addUser({commit, dispatch}, user: User) {
      dispatch('getUsers')
        .then(() =>
          axios.post('https://jsonplaceholder.typicode.com/users/' + user.id)
        )
        .then(() => commit('addUser', user))
        .catch(error => alert(error))
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
