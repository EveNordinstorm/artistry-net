<script>
import axios from "../axios";

export default {
  name: "Product",
  props: {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      user: null,
      error: null,
    };
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await axios.get(`/account/${this.userId}`);
        this.user = response.data;
        console.log("User data fetched successfully:", this.user);
      } catch (error) {
        console.error("Error fetching user data from backend:", error);
        this.error = "Error fetching user data.";
      }
    },
    async navigateToProfile() {
      try {
        this.$router.push({
          name: "VisitProfile",
          params: { userId: this.userId },
        });
      } catch (error) {
        console.error("Error navigating to profile:", error);
      }
    },
  },
  mounted() {
    this.fetchUserData();
  },
};
</script>

<template>
  <div
    class="w-[50px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5 my-5"
  >
    <div class="flex" @click="navigateToProfile">
      <img
        class="w-14 h-14 object-cover rounded-full"
        :src="profilePhoto"
        alt="profile picture"
      />
      <span class="pl-5 pt-2 text-3xl font-bold">{{ username }}</span>
    </div>
    <p class="pt-3 text-xl">{{ title }}</p>
    <img
      class="w-96 h-96 object-cover mt-5"
      :src="imageUrl"
      alt="product photo"
    />
    <p class="pt-3 text-xl">{{ price }}</p>
  </div>
</template>
