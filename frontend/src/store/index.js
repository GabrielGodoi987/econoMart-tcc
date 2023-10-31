import { defineStore } from 'pinia';
import axios from 'axios';
import { Notify } from 'quasar';


export const userStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessLevel: null
  }),

  getters: {
    getUserData() {
      return this.user;
    }
  },
  actions: {
    login(email, password) {
      axios.post('http://localhost:3333/login', {
        email: email,
        password: password
      }).then((res) => {
        const data = res.data.data
        Notify.create({
          type: 'positive',
          message: 'usuário encontrado com sucesso',
          color: 'green',
          timeout: 1000
        })
        return this.user = data;
      }).catch((err) => {
        return err
      });
    }
  }
})