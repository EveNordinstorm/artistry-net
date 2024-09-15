<script>
import axios from "../axios";

export default {
  name: "Product",
  props: {
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
  computed: {
    formattedPrice() {
      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(this.price);
    },
  },
  methods: {
    navigateToProfile(username) {
      this.$router.push({ name: "VisitProfile", params: { username } });
    },
  },
};
</script>

<template>
  <div
    class="w-[50px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5 my-5"
  >
    <div class="flex" @click="navigateToProfile(username)">
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
    <p class="pt-3 text-2xl font-bold text-blue-900">{{ formattedPrice }}</p>
    <button
      class="mt-3 text-lg uppercase bg-gradient-to-br from-red-400 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
    >
      Shop Now
    </button>
  </div>
</template>
