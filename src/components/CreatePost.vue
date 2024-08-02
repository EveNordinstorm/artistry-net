<script>
export default {
  data() {
    return {
      description: '',
      imageUrl: '',
      userId: ''
    };
  },
  methods: {
    async createPost() {
      try {
        const response = await fetch('http://localhost:5000/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            profilePhoto: this.profilePhoto, 
            description: this.description,
            imageUrl: this.imageUrl,
            userId: this.userId
          })
        });

        if (response.ok) {
          alert('Post created successfully');
        } else {
          alert('Failed to create post');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
};
</script>

<template>
  <div>
    <textarea v-model="description" placeholder="What's on your mind?"></textarea>
    <input v-model="imageUrl" placeholder="Image URL" />
    <button @click="createPost">Post</button>
  </div>
</template>
