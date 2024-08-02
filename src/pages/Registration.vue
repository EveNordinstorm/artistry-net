<script>
import axios from 'axios';

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        profilePhoto: '',
        bio: ''
      },
      message: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost:5000/api/account/register', this.form);
        this.message = response.data.message;
      } catch (error) {
        this.message = 'Registration failed: ' + (error.response.data.message || error.message);
      }
    }
  }
};
</script>

<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="form.username" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="form.password" required>
      </div>
      <div>
        <label for="profilePhoto">Profile Photo URL:</label>
        <input type="text" id="profilePhoto" v-model="form.profilePhoto">
      </div>
      <div>
        <label for="bio">Bio:</label>
        <textarea id="bio" v-model="form.bio"></textarea>
      </div>
      <button type="submit">Register</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
}
</style>

