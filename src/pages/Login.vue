<script>
import axios from "../axios";
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      form: {
        userName: "",
        password: "",
      },
      message: "",
    };
  },
  methods: {
    ...mapActions(["login"]),
    async handleLogin() {
      try {
        const response = await axios.post("/account/login", this.form);

        const userData = {
          token: response.data.token,
          userName: response.data.userName,
          email: response.data.email,
          profilePhoto: response.data.profilePhoto,
          bannerPhoto: response.data.bannerPhoto,
          bio: response.data.bio,
        };
        sessionStorage.setItem("authToken", userData.token);
        sessionStorage.setItem("userData", JSON.stringify(userData));

        await this.login(userData);
        this.message = "Login successful";
        this.$router.push("/");
      } catch (error) {
        this.message =
          "Login failed: " + (error.response?.data?.message || error.message);
      }
    },
  },
};
</script>

<template>
  <div class="login">
    <h2
      class="font-bold text-2xl text-center text-blue-700 dark:text-blue-300 mb-5"
    >
      Login
    </h2>
    <form @submit.prevent="handleLogin">
      <div class="my-3">
        <label
          for="userName"
          class="dark:text-white block text-md font-medium leading-6 text-gray-900"
          >Username:</label
        >
        <div
          class="flex rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
        >
          <input
            class="dark:text-white block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
            type="text"
            id="userName"
            placeholder="Enter your one-word username"
            v-model="form.userName"
            required
          />
        </div>
      </div>
      <div class="my-3">
        <label
          for="password"
          class="dark:text-white block text-md font-medium leading-6 text-gray-900"
          >Password:</label
        >
        <div
          class="flex rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
        >
          <input
            class="dark:text-white block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
            type="password"
            id="password"
            placeholder="Enter password"
            v-model="form.password"
            required
          />
        </div>
      </div>
      <div class="flex justify-center">
        <button
          class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center my-4"
          type="submit"
        >
          Login
        </button>
      </div>
    </form>

    <p v-if="message">{{ message }}</p>
    <p class="text-black dark:text-white text-lg text-center">
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
