import { defineStore } from 'pinia'

export const useCounterStore = defineStore('auth', {
  state: () => ({
    userLevel: null,
    token: null
  }),
  actions: {
    setUserLevel(level) {
      this.userLevel = level;
    },
    setToken(token) {
      this.token = token;
    }
  },
  getters: {
    getUserLevel() {
      return this.userLevel;
    },
    getToken() {
      return this.token;
    }
  }
})
