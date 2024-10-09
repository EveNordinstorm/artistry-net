<script>
import Post from "./Post.vue";
import axios from "../axios";

export default {
  name: "SharedPost",
  components: { Post },
  props: {
    shareId: { type: Number, required: true },
    shareUserName: { type: String, required: true },
    shareUserPhoto: { type: String, required: true },
    shareDateTime: { type: String, required: true },
    originalPostUserName: { type: String, required: true },
    originalPostProfilePhoto: { type: String, required: true },
    originalPostDateTime: { type: String, required: true },
    originalPostDescription: { type: String, required: true },
    originalPostImageUrl: { type: String, required: true },
    originalPostId: { type: Number },
  },
  data() {
    return {
      showConfirm: false,
    };
  },
  computed: {
    formattedShareDateTime() {
      if (!this.shareDateTime) return "Invalid Date";
      const date = new Date(this.shareDateTime);
      if (isNaN(date.getTime())) return "Invalid Date";
      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
    },
  },
  methods: {
    navigateToProfile(userName) {
      const storedUser = JSON.parse(sessionStorage.getItem("userData"));
      if (storedUser && storedUser.userName === userName) {
        this.$router.push({ path: "/profile" });
      } else {
        this.$router.push({ name: "VisitProfile", params: { userName } });
      }
    },
  },
};
</script>

<template>
  <div
    class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5 my-5"
  >
    <div class="flex" @click="navigateToProfile(shareUserName)">
      <img
        :src="shareUserPhoto"
        class="w-14 h-14 object-cover rounded-full"
        alt="Profile photo"
      />
      <span class="pl-5 pt-2 text-3xl font-bold break-all">{{
        shareUserName
      }}</span>
    </div>
    <p class="text-right font-bold">
      Shared this post on <br />
      {{ formattedShareDateTime }}
    </p>
    <Post
      :userName="originalPostUserName"
      :profilePhoto="originalPostProfilePhoto"
      :postDateTime="originalPostDateTime"
      :description="originalPostDescription"
      :imageUrl="originalPostImageUrl"
      :postId="originalPostId"
    />
  </div>
</template>
