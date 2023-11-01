import { defineStore } from 'pinia';

export const userStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessLevel: null
  }),
  actions: {
    login(data) {
      return this.user = data;
    }
  },
  getters: {
    getUserData() {
      return this.user;
    }
  }
})