import { defineStore } from 'pinia';

export const userStore = defineStore('auth', {
  state: () => ({
    user: null,
    userImage: null,
    accessLevel: null
  }),
  actions: {
    userImage(image){
       return this.image = image;
    },
    login(data) {
      return this.user = data;
    }
  },
  getters: {
    getUserData() {
      return this.user;
    },
    getUserImage(){
      return this.userImage;
    }
  }
})