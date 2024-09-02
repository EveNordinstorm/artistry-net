<script>
import Publish from '../components/Publish.vue';
import Post from '../components/Post.vue';
import axios from '../axios';

export default {
  name: 'Home',
  components: {
    Publish,
    Post
  },
  data() {
    return {
      posts: [],
      isLoading: true
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get('/posts');
        this.posts = response.data.map(post => ({
          ...post,
          profilePhoto: `${import.meta.env.VITE_API_BASE_URL}${post.profilePhoto}`,
          imageUrl: `${import.meta.env.VITE_API_BASE_URL}${post.imageUrl}`
        }));
        this.isLoading = false;
      } catch (error) {
        console.error('Error fetching posts:', error);
        this.isLoading = false;
      }
    },
    handlePostCreated() {
      this.fetchPosts();
    }
  }
}
</script>

<template>
    <Publish @postCreated="handlePostCreated" />
    <div v-if="isLoading">Loading...</div>
  <div v-else>
    <Post v-for="post in posts" :key="post.id" :postId="post.id" :username="post.username" :profilePhoto="post.profilePhoto" :postDateTime="post.postDateTime" :description="post.description" :imageUrl="post.imageUrl" />
  </div>
</template>
