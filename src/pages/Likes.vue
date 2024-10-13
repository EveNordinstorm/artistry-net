<script>
import axios from "../axios";
import Post from "../components/Post.vue";

export default {
  name: "Likes",
  components: {
    Post,
  },
  data() {
    return {
      likedPosts: [],
    };
  },
  methods: {
    constructAbsoluteUrl(relativePath) {
      if (!relativePath.startsWith("http") && relativePath.startsWith("/")) {
        return `${import.meta.env.VITE_API_BASE_URL}${relativePath}`;
      }
      return relativePath;
    },
    async fetchLikedPosts() {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        console.error("Auth token is missing.");
        return;
      }
      try {
        const response = await axios.get("/likes/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.likedPosts = response.data
          .map((post) => ({
            ...post,
            profilePhoto: this.constructAbsoluteUrl(post.profilePhoto),
            imageUrl: this.constructAbsoluteUrl(post.imageUrl),
            postDateTime: post.postDateTime
              ? new Date(post.postDateTime).toISOString()
              : "",
          }))
          .sort((a, b) => new Date(b.postDateTime) - new Date(a.postDateTime)); // Sort by date
      } catch (error) {
        console.error("Error fetching liked posts:", error);
      }
    },
  },
  mounted() {
    this.fetchLikedPosts();
  },
};
</script>

<template>
  <img src="../assets/likes.jpg" />

  <div v-if="likedPosts.length">
    <Post
      v-for="post in likedPosts"
      :key="post.id"
      :userName="post.userName"
      :profilePhoto="post.profilePhoto"
      :postDateTime="post.postDateTime"
      :description="post.description"
      :imageUrl="post.imageUrl"
      :postId="post.id"
      :canDelete="false"
    />
  </div>
  <p v-else class="dark:text-white mt-5 text-center">
    You haven't liked any posts yet.
  </p>
</template>
