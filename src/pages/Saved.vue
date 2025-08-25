<script>
import axios from "../axios";
import Post from "../components/Post.vue";

export default {
  name: "Saves",
  components: {
    Post,
  },
  data() {
    return {
      savedPosts: [],
      message: "",
    };
  },
  methods: {
    constructAbsoluteUrl(relativePath) {
      if (!relativePath.startsWith("http") && relativePath.startsWith("/")) {
        return `${import.meta.env.VITE_API_BASE_URL}${relativePath}`;
      }
      return relativePath;
    },
    async fetchSavedPosts() {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        this.message = "Create an account to save posts."; // Message for no token
        return;
      }
      try {
        const response = await axios.get("/saves/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.savedPosts = response.data
          .map((post) => ({
            ...post,
            profilePhoto: this.constructAbsoluteUrl(post.profilePhoto),
            imageUrl: this.constructAbsoluteUrl(post.imageUrl),
            postDateTime: post.postDateTime
              ? new Date(post.postDateTime).toISOString()
              : "",
          }))
          .sort((a, b) => new Date(b.postDateTime) - new Date(a.postDateTime));

        // Set message if no saved posts are found
        if (this.savedPosts.length === 0) {
          this.message = "You haven't saved any posts yet.";
        } else {
          this.message = ""; // Clear message if posts are found
        }
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
    },
  },
  mounted() {
    this.fetchSavedPosts();
  },
};
</script>

<template>
  <img src="../assets/saved.png" />

  <div v-if="savedPosts.length">
    <Post
      v-for="post in savedPosts"
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
    {{ message }}
  </p>
</template>
