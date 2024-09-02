<script>
import Post from './Post.vue';

export default {
  name: 'SharedPost',
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
      if (!this.shareDateTime) return 'Invalid Date';
      const date = new Date(this.shareDateTime);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(date);
    },
  },
};
</script>

<template>
  <div class="shared-post">
    <div class="shared-by">
      <img :src="shareUserPhoto" class="w-10 h-10 rounded-full" alt="User photo" />
      <span>{{ shareUsername }} shared this post on {{ formattedShareDateTime }}</span>
    </div>
    <div class="original-post-details">
      <img :src="originalPostProfilePhoto" class="w-10 h-10 rounded-full" alt="Original User photo" />
      <span>{{ originalPostUsername }}</span>
    </div>
    <Post
      :username="originalPostUsername"
      :profilePhoto="originalPostProfilePhoto"
      :postDateTime="originalPostDateTime"
      :description="originalPostDescription"
      :imageUrl="originalPostImageUrl"
      :postId="postId"
    />
  </div>
</template>

<style scoped>
.shared-post {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
}
.shared-by {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.shared-by img {
  margin-right: 10px;
}
</style>