<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ProfileBanner',
  computed: {
    ...mapGetters(['user']),
    username() {
      return this.user.username || 'Unknown User';
    },
    profilePhoto() {
      const profilePhotoPath = this.user.profilePhoto || '../assets/artistry-net-logo-11.jpg';
      return `${import.meta.env.VITE_API_BASE_URL}${profilePhotoPath}`;
    }
  }
};
</script>

<template>
    <div class="flex">
        <div class="p-5">
            <img class="w-60 h-48 object-cover rounded-full" :src="profilePhoto" alt="profile picture" />
        </div>
        <img class="w-full h-56 object-cover" src="../assets/david-pisnoy-46juD4zY1XA-unsplash.jpg" alt="banner image" />
    </div>
    <div class="bg-red-600 p-5 flex justify-between mb-10">
        <h1 class="text-white font-bold text-3xl">{{ username }}</h1>
        <div>
            <a href="/friends">
                <button class="bg-white hover:bg-blue-700 hover:text-white rounded-full px-8 m-2">
                    <p class="text-2xl font-medium">2000</p>
                    <p class="font-medium">Following</p>
                </button>
            </a>
            <a href="/friends">
                <button class="bg-white hover:bg-blue-700 hover:text-white rounded-full px-8 mx-2">
                    <p class="text-2xl font-medium">20K</p>
                    <p class="font-medium">Followers</p>
                </button>
            </a>
        </div>
    </div>
</template>