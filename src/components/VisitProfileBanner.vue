<script>
export default {
  name: "VisitProfileBanner",
  props: {
    username: { type: String, required: true },
    profilePhoto: {
      type: String,
      default: "../assets/artistry-net-logo-11.jpg",
    },
  },
};
</script>

<template>
  <div>
    <div class="relative">
      <img
        class="w-full h-56 object-cover"
        src="../assets/david-pisnoy-46juD4zY1XA-unsplash.jpg"
        alt="banner image"
      />

      <div class="absolute top-4 left-4">
        <img
          class="w-48 h-48 object-cover rounded-full ms-5"
          :src="profilePhoto || '../assets/artistry-net-logo-11.jpg'"
          alt="profile picture"
        />
      </div>
    </div>
    <div class="bg-red-600 p-5 flex justify-between mb-10">
      <h1 class="text-white font-bold text-3xl">{{ username }}</h1>
      <a href="#">
        <button
          class="bg-white hover:bg-blue-700 hover:text-white rounded-full px-8 m-2"
        >
          Follow
        </button>
      </a>
      <div>
        <a href="/friends">
          <button
            class="bg-white hover:bg-blue-700 hover:text-white rounded-full px-8 m-2"
          >
            <p class="text-2xl font-medium">2000</p>
            <p class="font-medium">Following</p>
          </button>
        </a>
        <a href="/friends">
          <button
            class="bg-white hover:bg-blue-700 hover:text-white rounded-full px-8 mx-2"
          >
            <p class="text-2xl font-medium">20K</p>
            <p class="font-medium">Followers</p>
          </button>
        </a>
      </div>
    </div>
  </div>
</template>
