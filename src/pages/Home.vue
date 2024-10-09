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
      currentUser: null,
      postsAndShares: [],
      isLoading: true,
      error: null,
    };
  },
  async created() {
    try {
      await this.fetchPostsAndShares();
    } catch (error) {
      console.error("Error during component creation:", error);
      this.error = "Error initializing component.";
      this.isLoading = false;
    }
  },
  methods: {
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
              userName: share.sharer?.userName || "Unknown",
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
              userName: share.originalPost?.userName || "Unknown",
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
    handlePostCreated(newPost) {
      const post = {
        type: "post",
        data: {
          id: newPost.id,
          userName: newPost.userName,
          description: newPost.description,
          profilePhoto: newPost.profilePhoto,
          imageUrl: newPost.imageUrl,
          postDateTime: new Date().toISOString(),
        },
        date: new Date(),
      };
      this.postsAndShares.unshift(post);
    },
    handlePostDeleted(postId) {
      this.postsAndShares = this.postsAndShares.filter((item) => {
        if (item.type === "share") {
          return item.data.postDetails.id !== postId;
        } else {
          return item.data.id !== postId;
        }
      });
    },
    handleShareCreated(newShare) {
      const share = {
        type: "share",
        data: {
          id: newShare.id,
          sharer: {
            userName: newShare.sharer.userName,
            profilePhoto: newShare.sharer.profilePhoto,
          },
          postDetails: {
            id: newShare.postDetails.id,
            userName: newShare.postDetails.userName,
            description: newShare.postDetails.description,
            profilePhoto: newShare.postDetails.profilePhoto,
            imageUrl: newShare.postDetails.imageUrl,
            postDateTime: newShare.postDetails.postDateTime,
          },
          shareDateTime: new Date(newShare.shareDateTime).toISOString(),
        },
        date: new Date(newShare.shareDateTime).toISOString(),
      };
      this.postsAndShares.unshift(share);
    },
    handleShareRemoved(postId) {
      this.postsAndShares = this.postsAndShares.filter(
        (item) =>
          !(item.type === "share" && item.data.postDetails.id === postId)
      );
    },
  },
  mounted() {
    const authToken = sessionStorage.getItem("authToken");
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (authToken && userData?.userName) {
      this.currentUser = {
        token: authToken,
        userName: userData.userName,
      };
    }
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
        :postId="item.data.id"
        :userName="item.data.userName"
        :profilePhoto="item.data.profilePhoto"
        :postDateTime="item.data.postDateTime"
        :description="item.data.description"
        :imageUrl="item.data.imageUrl"
        :canDelete="currentUser && item.data.userName === currentUser.userName"
        @postDeleted="handlePostDeleted"
        @shareCreated="handleShareCreated"
        @shareRemoved="handleShareRemoved"
      />
      <SharedPost
        v-else-if="item.type === 'share'"
        :shareId="item.data.id"
        :originalPostId="item.data.postDetails.id"
        :shareUserName="item.data.sharer.userName"
        :shareUserPhoto="item.data.sharer.profilePhoto"
        :shareDateTime="item.data.shareDateTime"
        :originalPostUserName="item.data.postDetails.userName"
        :originalPostProfilePhoto="item.data.postDetails.profilePhoto"
        :originalPostDateTime="item.data.postDetails.postDateTime"
        :originalPostDescription="item.data.postDetails.description"
        :originalPostImageUrl="item.data.postDetails.imageUrl"
        :canDelete="currentUser && item.data.userName === currentUser.userName"
        @postDeleted="handlePostDeleted"
        @shareCreated="handleShareCreated"
        @shareRemoved="handleShareRemoved"
      />
    </div>
  </div>
</template>
