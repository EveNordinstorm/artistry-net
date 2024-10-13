<script>
import axios from "../axios";
import { mapActions } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      form: {
        userName: "",
        email: "",
        password: "",
        bio: "",
      },
      profilePhotoFile: null,
      message: "",
    };
  },
  methods: {
    ...mapActions(["login"]),
    handleFileUpload(event) {
      this.profilePhotoFile = event.target.files[0];
    },
    async register() {
      try {
        const formData = new FormData();
        formData.append("userName", this.form.userName);
        formData.append("email", this.form.email);
        formData.append("password", this.form.password);
        formData.append("bio", this.form.bio);
        if (this.profilePhotoFile) {
          formData.append("profilePhoto", this.profilePhotoFile);
        }

        const response = await axios.post("/account/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        this.message = response.data.message || "Registration successful";

        // Automatically log in the user
        try {
          const loginResponse = await axios.post("/account/login", {
            userName: this.form.userName,
            password: this.form.password,
          });
          const userData = {
            token: loginResponse.data.token,
            userName: loginResponse.data.userName,
            email: loginResponse.data.email,
            profilePhoto: loginResponse.data.profilePhoto,
            bannerPhoto: loginResponse.data.bannerPhoto,
            bio: loginResponse.data.bio,
          };

          sessionStorage.setItem("authToken", userData.token);
          sessionStorage.setItem("userData", JSON.stringify(userData));

          await this.login(userData);
          this.$router.push("/");
        } catch (loginError) {
          this.message =
            "Login failed: " +
            (loginError.response?.data?.message || loginError.message);
        }
      } catch (error) {
        this.message =
          "Registration failed: " +
          (error.response?.data?.message || error.message);
      }
    },
  },
};
</script>

<template>
  <div class="register">
    <h2 class="font-bold text-2xl text-center text-blue-700 mb-5">Register</h2>
    <form @submit.prevent="register">
      <div class="my-3">
        <label
          for="userName"
          class="text-black dark:text-white block text-md font-medium leading-6 text-gray-900"
          >UserName:</label
        >
        <div
          class="flex rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
        >
          <input
            class="text-black dark:text-white block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
            type="text"
            id="userName"
            v-model="form.userName"
            required
          />
        </div>
      </div>
      <div class="my-3">
        <label
          for="email"
          class="text-black dark:text-white block text-md font-medium leading-6 text-gray-900"
          >Email:</label
        >
        <div
          class="flex rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
        >
          <input
            class="text-black dark:text-white block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
            type="email"
            id="email"
            v-model="form.email"
            required
          />
        </div>
      </div>
      <div class="my-3">
        <label
          for="password"
          class="text-black dark:text-white block text-md font-medium leading-6 text-gray-900"
          >Password:</label
        >
        <div
          class="flex rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
        >
          <input
            class="text-black dark:text-white block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
            type="password"
            id="password"
            v-model="form.password"
            required
          />
        </div>
      </div>
      <div class="my-3">
        <label
          for="profilePhoto"
          class="text-black dark:text-white block text-md font-medium leading-6 text-gray-900"
          >Profile Photo:</label
        >
        <div
          class="flex rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md ps-3 py-1"
        >
          <input
            class="text-black dark:text-white block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
            type="file"
            id="profilePhoto"
            @change="handleFileUpload"
          />
        </div>
      </div>
      <div class="my-3">
        <label
          for="bio"
          class="text-black dark:text-white block text-md font-medium leading-6 text-gray-900"
          >Bio:</label
        >
        <div
          class="flex rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
        >
          <textarea
            class="text-black dark:text-white block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
            id="bio"
            v-model="form.bio"
          ></textarea>
        </div>
      </div>
      <div class="flex justify-center">
        <button
          class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center my-4"
          type="submit"
        >
          Register
        </button>
      </div>
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
