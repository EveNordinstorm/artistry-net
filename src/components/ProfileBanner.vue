<script>
import { mapGetters, mapActions } from "vuex";
import axios from "../axios";

export default {
  name: "ProfileBanner",
  computed: {
    ...mapGetters(["user", "getFollowerCounts"]),
    username() {
      return this.user.username || "Unknown User";
    },
    profilePhoto() {
      const profilePhotoPath =
        this.user.profilePhoto || "../assets/artistry-net-logo-11.jpg";
      return `${import.meta.env.VITE_API_BASE_URL}${profilePhotoPath}`;
    },
    followingCount() {
      const counts = this.getFollowerCounts(this.username);
      return counts.followingCount || 0;
    },
    followersCount() {
      const counts = this.getFollowerCounts(this.username);
      return counts.followersCount || 0;
    },
  },
  created() {
    this.fetchFollowerCounts(this.username);
  },
  methods: {
    ...mapActions(["fetchFollowerCounts"]),
    async fetchFollowerCounts(username) {
      const token =
        this.$store.state.token || sessionStorage.getItem("authToken");
      if (!token) {
        console.error("Token is missing.");
        return;
      }

      try {
        const response = await axios.get(`/followers/${username}/counts`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.$store.commit("setFollowerCounts", {
          username: username,
          counts: response.data,
        });
      } catch (error) {
        console.error("Error fetching follower counts:", error);
      }
    },
  },
};
</script>

<template>
  <div class="relative">
    <img
      class="w-full h-56 object-cover"
      src="../assets/david-pisnoy-46juD4zY1XA-unsplash.jpg"
      alt="banner image"
    />

    <div class="absolute top-4 left-4">
      <img
        class="w-48 h-48 object-cover rounded-full ms-5"
        :src="profilePhoto"
        alt="profile picture"
      />
    </div>

    <div class="absolute top-4 right-0 left-0 flex justify-end p-4">
      <button
        type="button"
        class="py-2.5 px-5 text-md font-bold text-white bg-red-600 rounded-lg hover:bg-white hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Edit Profile
      </button>
    </div>
  </div>
  <div class="bg-red-600 p-5 flex justify-between mb-10">
    <h1 class="text-white font-bold text-3xl">{{ username }}</h1>
    <div class="text-white text-center">
      <a href="/friends">
        <p class="text-2xl font-medium">{{ followingCount }}</p>
        <p class="font-medium">Following</p>
      </a>
      <a href="/friends">
        <p class="text-2xl font-medium">{{ followersCount }}</p>
        <p class="font-medium">Followers</p>
      </a>
    </div>
  </div>
</template>
