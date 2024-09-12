<script>
import axios from "../axios";

export default {
  name: "Post",
  props: {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      required: true,
    },
    postDateTime: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    postId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      liked: false,
      shared: false,
      saved: false,
      showCommentsSection: false,
      comments: [],
      newComment: "",
      user: null,
      error: null,
    };
  },
  computed: {
    formattedDateTime() {
      if (!this.postDateTime) return "Invalid Date";
      const date = new Date(this.postDateTime);
      if (isNaN(date.getTime())) return "Invalid Date";
      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
    },
  },
  methods: {
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
    async navigateToProfile(username) {
      try {
        const response = await axios.get(`/api/users/${username}`);
        const userId = response.data.userId;

        this.$router.push({ name: "VisitProfile", params: { userId } });
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    },
    async toggleLike() {
      try {
        if (this.liked) {
          const response = await axios.delete(`/likes/${this.postId}`);
          if (response.status === 200) {
            this.liked = false;
          } else {
            console.error("Failed to remove like");
          }
        } else {
          const response = await axios.post(`/likes`, { postId: this.postId });
          if (response.status === 200) {
            this.liked = true;
          } else {
            console.error("Failed to add like");
          }
        }
      } catch (error) {
        console.error("Error toggling like:", error);
      }
    },
    async fetchLikeStatus() {
      try {
        const response = await axios.get(`/likes/${this.postId}`);
        this.liked = response.data.isLikedByUser;
      } catch (error) {
        console.error("Error fetching like status:", error);
      }
    },
    async toggleShare() {
      try {
        if (this.shared) {
          const response = await axios.delete(`/shares/${this.postId}`);
          if (response.status === 200) {
            this.shared = false;
            alert("Post unshared");
          } else {
            console.error("Failed to unshare the post");
          }
        } else {
          const response = await axios.post(`/shares`, { postId: this.postId });
          if (response.status === 200) {
            this.shared = true;
            alert("Post shared");
          } else {
            console.error("Failed to share the post");
          }
        }
      } catch (error) {
        console.error("Error toggling share:", error);
      }
    },
    async fetchShareStatus() {
      try {
        const response = await axios.get(`/shares/${this.postId}`);
        this.shared = response.data.isSharedByUser;
      } catch (error) {
        console.error("Error fetching share status:", error);
      }
    },
    toggleSave() {
      this.saved = !this.saved;
      alert(`Post ${this.saved ? "saved" : "unsaved"}`);
    },
    toggleCommentsSection() {
      this.showCommentsSection = !this.showCommentsSection;
    },
    async fetchComments() {
      try {
        const response = await axios.get(`/posts/${this.postId}/comments`);
        this.comments = response.data;
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    },
    async addComment() {
      try {
        const response = await axios.post(`/posts/${this.postId}/comments`, {
          commentText: this.newComment,
        });

        if (response.status === 200) {
          this.newComment = "";
          this.fetchComments();
        } else {
          console.error("Failed to add comment");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
  mounted() {
    this.fetchUserData();
    this.fetchComments();
    this.fetchLikeStatus();
    this.fetchShareStatus();
  },
};
</script>

<template>
  <div
    class="w-[50px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5 my-5"
  >
    <div class="flex" @click="navigateToProfile">
      <img
        class="w-14 h-14 object-cover rounded-full"
        :src="profilePhoto"
        alt="profile picture"
      />
      <span class="pl-5 pt-2 text-3xl font-bold">{{ username }}</span>
    </div>
    <p class="text-right font-bold">{{ formattedDateTime }}</p>
    <p class="pt-3">{{ description }}</p>
    <img class="w-96 h-96 object-cover mt-5" :src="imageUrl" alt="post photo" />

    <div class="mt-4">
      <button
        @click="toggleLike"
        :class="
          liked ? 'bg-red-600' : 'bg-gradient-to-br from-red-400 to-blue-500'
        "
        class="text-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        <svg
          class="flex-shrink-0 w-5 h-5 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 426.5 374"
        >
          <path
            d="M8.72,136.82c0-6.12,0-12.24,0-18.36c0.24-1.42,0.57-2.82,0.72-4.25c2.24-22.09,9.19-42.45,21.73-60.9 C56.58,15.94,103.28-2.42,147.26,8c25.23,5.98,44.96,20.47,61.13,40.27c1.55,1.9,3.04,3.86,4.55,5.79c0.65-0.54,0.89-0.68,1.05-0.88c1.32-1.67,2.58-3.39,3.94-5.02c27.91-33.6,63.04-49.23,106.68-40.82c42.1,8.12,70.13,34.05,84.57,73.7c15.97,43.84,9.14,85.54-16.07,124.47c-13.99,21.6-31.12,40.6-50.2,57.63c-37.43,33.39-75.4,66.15-113.29,99.02c-10.75,9.32-22.69,8.9-33.89-0.72c-29.16-25.06-58.34-50.1-87.33-75.36C84,264.82,60.32,242.8,40.88,216.7c-12.65-16.98-22.8-35.29-27.85-56.02C11.12,152.84,10.13,144.78,8.72,136.82z"
          />
        </svg>
      </button>

      <button
        @click="toggleCommentsSection"
        :class="
          showCommentsSection
            ? 'bg-blue-600'
            : 'bg-gradient-to-br from-red-400 to-blue-500'
        "
        class="text-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        <svg
          class="flex-shrink-0 w-5 h-5 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 367 366"
        >
          <path
            d="M359.94,182.88c-0.47,85.56-62.63,159.42-146.78,173.61c-41.32,6.97-80.27,0.04-116.82-20.4c-2.04-1.14-3.69-1.29-5.9-0.48 c-20.02,7.39-40.1,14.6-60.13,21.97c-6.82,2.51-13.08,2.12-18.38-3.14c-5.43-5.38-5.78-11.72-3.21-18.69 c7.35-19.9,14.49-39.88,21.82-59.79c0.86-2.32,0.72-4.09-0.5-6.24C-26.61,169.68,26.12,43.42,137.17,13.08 C236.56-14.08,339.1,51,356.43,152.39C358.15,162.46,358.8,172.71,359.94,182.88z"
          />
        </svg>
      </button>

      <button
        @click="toggleShare"
        :class="
          shared ? 'bg-blue-600' : 'bg-gradient-to-br from-red-400 to-blue-500'
        "
        class="text-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        <svg
          class="flex-shrink-0 w-5 h-5 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 397 397"
        >
          <path
            d="M6.5,149c0-3.25,0-6.5,0-9.75c0.21-0.45,0.51-0.88,0.6-1.35c3.06-14.58,11.85-23.79,26.05-28.02 c10.28-3.06,20.54-6.19,30.81-9.27c95.69-28.7,191.39-57.39,287.07-86.11c8.44-2.53,16.81-5.33,25.21-8c2,0,4,0,6,0 c3.73,1.77,6.47,4.53,8.25,8.25c0,2,0,4,0,6c-0.45,1-1.02,1.95-1.33,2.99c-25.56,85.18-51.11,170.36-76.65,255.54 c-8.49,28.31-16.99,56.63-25.48,84.94c-3.58,11.93-11.09,20.18-22.9,24.37c-2.09,0.74-4.26,1.27-6.39,1.9c-3.25,0-6.5,0-9.75,0 c-0.33-0.17-0.64-0.42-1-0.5c-15.39-3.13-24.66-12.57-28.9-27.51c-13.21-46.54-26.56-93.03-39.77-139.57 c-0.69-2.45-1.83-3.59-4.32-4.3c-47.24-13.41-94.45-26.92-141.67-40.42c-7.7-2.2-14.41-6.24-18.66-12.98 C10.57,160.27,8.85,154.44,6.5,149z"
          />
        </svg>
      </button>

      <button
        @click="toggleSave"
        class="text-white bg-gradient-to-br from-red-400 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        <svg
          class="flex-shrink-0 w-5 h-5 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 135 170"
        >
          <path
            d="M19.48,5.7c32.11,0,64.22,0,96.33,0c0.5,0.17,1,0.35,1.51,0.49c6.1,1.68,9.98,6.95,9.98,13.63c0.01,44.96,0,89.93,0,134.89 c0,0.57,0.07,1.15-0.05,1.7c-0.29,1.35-0.48,2.77-1.05,4c-1.42,3.1-4.6,4.6-7.83,3.55c-1.71-0.56-3.4-1.53-4.78-2.7 c-13.4-11.32-26.74-22.72-40.1-34.09c-3.65-3.11-7.7-3.12-11.33-0.03c-9.96,8.45-19.9,16.91-29.85,25.35 c-3.82,3.24-7.55,6.59-11.5,9.65c-5.61,4.33-11.8,1.91-12.99-4.93c-0.12-0.71-0.12-1.44-0.12-2.16c-0.01-45.17-0.01-90.34,0-135.51 c0-5.92,3.65-10.96,9.26-12.95C17.79,6.29,18.64,5.99,19.48,5.7z"
          />
        </svg>
      </button>

      <div
        v-if="showCommentsSection"
        class="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700"
      >
        <div
          v-if="comments.length === 0"
          class="text-gray-500 dark:text-gray-400 my-4"
        >
          No comments yet
        </div>
        <div v-else class="max-h-64 overflow-y-auto mb-4">
          <ul>
            <li
              v-for="comment in comments"
              :key="comment.id"
              class="border-b border-gray-200 dark:border-gray-700 pb-2 mb-2"
            >
              <!-- <img class="w-10 h-10 rounded-full" :src="comment.profilePhoto" alt="commenter profile picture" /> -->
              <div class="flex pl-4">
                <p class="font-semibold">{{ comment.username }}:</p>
                <p class="pl-2">{{ comment.commentText }}</p>
              </div>
            </li>
          </ul>
        </div>
        <form @submit.prevent="addComment" class="flex">
          <input
            v-model="newComment"
            type="text"
            placeholder="Add a comment..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            class="ml-2 text-white bg-blue-600 hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
