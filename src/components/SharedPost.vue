<script>
import Post from "./Post.vue";

export default {
  name: "SharedPost",
  components: { Post },
  props: {
    shareUsername: { type: String, required: true },
    shareUserPhoto: { type: String, required: true },
    shareDateTime: { type: String, required: true },
    originalPostUsername: { type: String, required: true },
    originalPostProfilePhoto: { type: String, required: true },
    originalPostDateTime: { type: String, required: true },
    originalPostDescription: { type: String, required: true },
    originalPostImageUrl: { type: String, required: true },
    postId: { type: Number, required: true },
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
    navigateToProfile(isSharer) {
      const username = isSharer
        ? this.shareUsername
        : this.originalPostUsername;
      this.$router.push({ name: "VisitProfile", params: { username } });
    },
  },
};
</script>

<template>
  <div
    class="w-[50px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5 my-5"
  >
    <div class="flex" @click="navigateToProfile(true)">
      <img
        :src="shareUserPhoto"
        class="w-14 h-14 object-cover rounded-full"
        alt="Profile photo"
      />
      <span class="pl-5 pt-2 text-3xl font-bold">{{ shareUsername }}</span>
    </div>
    <p class="text-right font-bold">
      Shared this post on <br />
      {{ formattedShareDateTime }}
    </p>
    <Post
      :username="originalPostUsername"
      :profilePhoto="originalPostProfilePhoto"
      :postDateTime="originalPostDateTime"
      :description="originalPostDescription"
      :imageUrl="originalPostImageUrl"
      :postId="postId"
      @click="navigateToProfile(false)"
    />
  </div>
</template>

<style scoped></style>
