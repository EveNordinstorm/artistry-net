<script>
import Publish from '../components/Publish.vue';
import Post from '../components/Post.vue';

export default {
  name: "Home",
  components: {
    Publish,
    Post
  }
}
</script>

<template>
  <div class="container">
    <Publish />
    <Post />
  </div>
  
</template>
