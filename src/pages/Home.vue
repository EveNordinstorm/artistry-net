<script>
import Publish from "../components/Publish.vue";
import Post from "../components/Post.vue";
import SharedPost from "../components/SharedPost.vue";
import axios from "../axios";

export default {
  name: "Home",
  components: {
    Publish,
    Post,
    SharedPost,
  },
  data() {
    return {
      user: null,
      postsAndShares: [],
      isLoading: true,
      error: null,
    };
  },
  async created() {
    try {
      await this.fetchUserData();
      await this.fetchPostsAndShares();
    } catch (error) {
      console.error("Error during component creation:", error);
      this.error = "Error initializing component.";
      this.isLoading = false;
    }
  },
  methods: {
    async fetchUserId(username) {
      try {
        const response = await axios.get(
          `/users/getUserIdByUsername/${username}`
        );
        return response.data.id;
      } catch (error) {
        console.error("Error fetching user ID from backend:", error);
        this.error = "Error fetching user ID.";
        return null;
      }
    },
    async fetchUserData() {
      try {
        const userId = await this.fetchUserId(this.username);

        if (userId) {
          console.log("Fetching user data from backend");
          const response = await axios.get(`/users/account/${userId}`);
          this.user = response.data;
          console.log("User data fetched successfully:", this.user);
        } else {
          console.error("User ID is null or undefined.");
        }
      } catch (error) {
        console.error("Error fetching user data from backend:", error);
        this.error = "Error fetching user data.";
      }
    },
    async fetchPostsAndShares() {
      try {
        const [postsResponse, sharesResponse] = await Promise.all([
          axios.get("/posts"),
          axios.get("/shares"),
        ]);

        const posts = postsResponse.data.map((post) => ({
          type: "post",
          data: {
            ...post,
            profilePhoto: `${import.meta.env.VITE_API_BASE_URL}${
              post.profilePhoto
            }`,
            imageUrl: `${import.meta.env.VITE_API_BASE_URL}${post.imageUrl}`,
            postDateTime: post.postDateTime
              ? new Date(post.postDateTime).toISOString()
              : "",
          },
          date: new Date(post.postDateTime),
        }));

        const shares = sharesResponse.data.map((share) => ({
          type: "share",
          data: {
            ...share,
            sharer: {
              username: share.sharer?.username || "Unknown",
              profilePhoto: `${import.meta.env.VITE_API_BASE_URL}${
                share.sharer?.profilePhoto
              }`,
            },
            postDetails: {
              ...share.originalPost,
              profilePhoto: `${import.meta.env.VITE_API_BASE_URL}${
                share.originalPost?.profilePhoto
              }`,
              imageUrl: `${import.meta.env.VITE_API_BASE_URL}${
                share.originalPost?.imageUrl
              }`,
              username: share.originalPost?.username || "Unknown",
              description:
                share.originalPost?.description || "No description available",
              postDateTime: share.originalPost?.postDateTime
                ? new Date(share.originalPost?.postDateTime).toISOString()
                : "",
            },
          },
          date: new Date(share.shareDateTime),
          shareDateTime: new Date(share.shareDateTime).toISOString(),
        }));

        this.postsAndShares = [...posts, ...shares].sort(
          (a, b) => b.date - a.date
        );
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching posts or shares:", error);
        this.error = "Error fetching posts or shares.";
        this.isLoading = false;
      }
    },
    handlePostCreated() {
      this.fetchPostsAndShares();
    },
  },
};
</script>

<template>
  <Publish @postCreated="handlePostCreated" />
  <div v-if="isLoading">Loading...</div>
  <div v-else>
    <div v-for="item in postsAndShares" :key="item.data.id">
      <Post
        v-if="item.type === 'post'"
        :userId="user.id"
        :postId="item.data.id"
        :username="item.data.username"
        :profilePhoto="item.data.profilePhoto"
        :postDateTime="item.data.postDateTime"
        :description="item.data.description"
        :imageUrl="item.data.imageUrl"
      />
      <SharedPost
        v-else-if="item.type === 'share'"
        :shareUsername="item.data.sharer.username"
        :shareUserPhoto="item.data.sharer.profilePhoto"
        :shareDateTime="item.shareDateTime"
        :originalPostUsername="item.data.postDetails.username"
        :originalPostProfilePhoto="item.data.postDetails.profilePhoto"
        :originalPostDateTime="item.data.postDetails.postDateTime"
        :originalPostDescription="item.data.postDetails.description"
        :originalPostImageUrl="item.data.postDetails.imageUrl"
        :postId="item.data.postDetails.id"
      />
    </div>
  </div>
</template>
