<script>
import { mapState, mapActions } from "vuex";
import axios from "../axios";
import EditProfileModal from "../components/EditProfileModal.vue";

export default {
  name: "ProfileBanner",
  components: {
    EditProfileModal,
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  computed: {
    ...mapState(["user", "followerCounts"]),
    userName() {
      return this.user.userName || "Unknown User";
    },
    profilePhoto() {
      const profilePhotoPath =
        this.user.profilePhoto || "/images/profiles/artistry-net-logo-11.jpg";
      return `${import.meta.env.VITE_API_BASE_URL}${profilePhotoPath}`;
    },
    bannerPhoto() {
      if (this.user.bannerPhoto && this.user.bannerPhoto !== "null") {
        return `${import.meta.env.VITE_API_BASE_URL}/${this.user.bannerPhoto}`;
      }
      return `${
        import.meta.env.VITE_API_BASE_URL
      }/images/banners/david-pisnoy-46juD4zY1XA-unsplash.jpg`;
    },
    followingCount() {
      return this.followerCounts[this.userName]?.followingCount || 0;
    },
    followersCount() {
      return this.followerCounts[this.userName]?.followersCount || 0;
    },
  },
  created() {
    this.fetchUserCounts();
  },
  methods: {
    ...mapActions(["setFollowerCounts"]),
    async fetchUserCounts() {
      const token = sessionStorage.getItem("authToken");

      if (!token) {
        console.error("Token is missing.");
        return;
      }

      try {
        const response = await axios.get(`/followers/${this.userName}/counts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.setFollowerCounts({
          userName: this.userName,
          counts: response.data,
        });
      } catch (error) {
        console.error("Error fetching follower counts:", error);
      }
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    updateUser(updatedUser) {
      this.$store.commit("setUser", updatedUser);
    },
  },
};
</script>

<template>
  <div class="relative">
    <img
      class="w-full h-56 object-cover"
      :src="bannerPhoto"
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
        @click="openModal"
        type="button"
        class="py-2.5 px-5 text-md font-bold text-white rounded-lg bg-blue-700 text-white hover:bg-gray-700"
      >
        Edit Profile
      </button>
    </div>

    <EditProfileModal
      :isOpen="isModalOpen"
      :user="user"
      @close="closeModal"
      @updateUser="updateUser"
    />
  </div>
  <div class="bg-red-600 p-5 flex justify-between mb-10">
    <h1 class="text-white font-bold text-3xl break-all">{{ userName }}</h1>
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
