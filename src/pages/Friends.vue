<script>
import Friend from "../components/Friend.vue";
import axios from "../axios";
import { decodeToken } from "../utilities/JwtHelper";

export default {
  components: {
    Friend,
  },
  data() {
    return {
      activeTab: "following",
      followingList: [],
      followersList: [],
      error: null,
      isLoading: true,
    };
  },
  async mounted() {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken && decodedToken.userId) {
        await this.fetchFollowersAndFollowing(decodedToken.userId);
      } else {
        this.error = "User ID not found in token.";
        this.isLoading = false;
      }
    } else {
      this.error = "User is not authenticated.";
      this.isLoading = false;
    }
  },
  methods: {
    isFollowing(username) {
      const followingUser = this.followingList.find(
        (friend) => friend.username === username
      );
      return !!followingUser;
    },
    async fetchFollowersAndFollowing(userId) {
      try {
        const followersResponse = await axios.get(
          `/followers/${userId}/followersData`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
            },
          }
        );
        this.followersList = followersResponse.data;

        const followingResponse = await axios.get(
          `/followers/${userId}/followingData`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
            },
          }
        );
        this.followingList = followingResponse.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          if (error.response.data.message.includes("No followers found")) {
            this.followersList = [];
          }
          if (error.response.data.message.includes("No following found")) {
            this.followingList = [];
          }
        } else {
          console.error("Error fetching followers and following data", error);
          this.error = "Error fetching followers and following data.";
        }
      } finally {
        this.isLoading = false;
      }
    },

    updateFollowList(followedId, isFollowing) {
      if (this.activeTab === "following" && !isFollowing) {
        this.followingList = this.followingList.filter(
          (friend) => friend.id !== followedId
        );
      }
    },
    constructAbsoluteUrl(url) {
      if (!url) {
        return "";
      }
      const baseUrl = process.env.VUE_APP_API_URL || "https://localhost:5000";
      return url.startsWith("http") ? url : `${baseUrl}${url}`;
    },
    getTabClass(isActive) {
      return [
        "inline-block p-4 border-b-2 rounded-t-lg",
        isActive
          ? "text-blue-800 dark:text-blue-400 border-blue-800 dark:border-blue-400"
          : "text-gray-500 hover:text-gray-600 border-gray-100 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:border-gray-700",
      ];
    },
  },
};
</script>

<template>
  <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
    <ul
      class="flex flex-wrap -mb-px text-sm font-bold text-center text-xl"
      id="default-styled-tab"
      role="tablist"
    >
      <li class="me-2" role="presentation">
        <button
          @click="activeTab = 'following'"
          :class="[getTabClass(activeTab === 'following')]"
          type="button"
          role="tab"
          aria-controls="styled-following"
          :aria-selected="activeTab === 'following'"
        >
          Following
        </button>
      </li>

      <li class="me-2" role="presentation">
        <button
          @click="activeTab = 'followers'"
          :class="[getTabClass(activeTab === 'followers')]"
          type="button"
          role="tab"
          aria-controls="styled-followers"
          :aria-selected="activeTab === 'followers'"
        >
          Followers
        </button>
      </li>
    </ul>
  </div>

  <!-- Following Tab -->
  <div
    v-if="activeTab === 'following'"
    role="tabpanel"
    aria-labelledby="following-tab"
  >
    <div v-if="followingList.length === 0">
      <p>No users found that you're following.</p>
    </div>
    <div v-else>
      <Friend
        v-for="friend in followingList"
        :key="friend.id"
        :followedId="friend.id"
        :username="friend.username"
        :profilePhoto="constructAbsoluteUrl(friend.profilePhoto)"
        :isFollowing="isFollowing(friend.username)"
      />
    </div>
  </div>

  <!-- Followers Tab -->
  <div
    v-if="activeTab === 'followers'"
    role="tabpanel"
    aria-labelledby="followers-tab"
  >
    <div v-if="followersList.length === 0">
      <p>No followers found.</p>
    </div>
    <div v-else>
      <Friend
        v-for="friend in followersList"
        :key="friend.id"
        :followedId="friend.id"
        :username="friend.username"
        :profilePhoto="constructAbsoluteUrl(friend.profilePhoto)"
        :isFollowing="isFollowing(friend.username)"
      />
    </div>
  </div>
</template>
