<script>
import axios from 'axios';

export default {
  name: "Login",
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
    async login() {
      try {
        const response = await axios.post('http://localhost:5000/api/account/login', this.form);
        // Assuming the response contains a token or user details
        localStorage.setItem('token', response.data.token);
        this.message = 'Login successful';
        // Redirect or navigate to the dashboard
        this.$router.push('/dashboard');
      } catch (error) {
        this.message = 'Login failed: ' + (error.response.data.message || error.message);
      }
    }
  }
};
</script>

<template>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="form.username" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="form.password" required>
        </div>
        <button type="submit">Login</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <style scoped>
  .login {
    max-width: 400px;
    margin: 0 auto;
  }
  </style>
  