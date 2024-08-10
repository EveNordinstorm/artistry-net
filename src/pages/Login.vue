<script>
import axios from '../axios';
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      message: ''
    };
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      try {
        const response = await axios.post('/account/login', this.form);
        
        const userData = {
          token: response.data.token,
          username: response.data.username,
          email: response.data.email,
          profilePhoto: response.data.profilePhoto
        };
        console.log('User data:', userData);
        sessionStorage.setItem('authToken', userData.token);
        sessionStorage.setItem('userData', JSON.stringify(userData));

        await this.login(userData);
        this.message = 'Login successful';
        this.$router.push('/');
      } catch (error) {
        this.message = 'Login failed: ' + (error.response?.data?.message || error.message);
      }
    }
  }
};
</script>

<template>
  <div class="login">
    <h2 class="font-bold text-2xl text-center text-blue-700 mb-5">Login</h2>
      <form @submit.prevent="handleLogin">
      <div class="my-3">
        <label for="username" class="block text-md font-medium leading-6 text-gray-900">Username:</label>
        <div class="flex rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
        <input class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6" type="text" id="username" v-model="form.username" required />
      </div>
      </div>
      <div class="my-3">
        <label for="password" class="block text-md font-medium leading-6 text-gray-900">Password:</label>
        <div class="flex rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
        <input class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6" type="password" id="password" v-model="form.password" required />
      </div>
      </div>
      <div class="flex justify-center">
      <button class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center my-4" type="submit">Login</button>
      </div>
    </form>
    
    
    <p v-if="message">{{ message }}</p>
    <p class="text-lg text-center">
      Not a member yet?
    </p>
    <p class="font-bold text-xl underline text-blue-600 text-center">
      <router-link to="/register">Sign up here</router-link>
    </p>
  </div>
</template>
  
  <style scoped>
  .login {
    max-width: 400px;
    margin: 0 auto;
  }
  </style>
  