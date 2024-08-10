<script>
import Publish from '../components/Publish.vue';
import Post from '../components/Post.vue';
import axios from '../axios';

export default {
  name: "Home",
  components: {
    Publish,
    Post
  },
  data() {
    return {
      posts: []
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get('https://localhost:5000/api/posts');
        this.posts = response.data;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
  }
}
</script>

<template>
    <Publish />
    <div v-if="posts.length > 0">
      <Post
        v-for="post in posts"
        :key="post.id"
        :username="post.username"
        :profilePhoto="post.profilePhoto"
        :postDateTime="post.postDateTime"
        :description="post.description"
        :imageUrl="post.imageUrl"
      />
    </div>
    <p v-else>No posts available.</p>
</template>
