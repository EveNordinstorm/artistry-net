<script>
import { mapGetters, mapActions } from "vuex";
import axios from "../axios";
import { decodeToken } from "../utilities/JwtHelper";

export default {
  name: "Friend",
  props: {
    followedId: String,
    username: { type: String, required: true },
    profilePhoto: { type: String, required: true },
  },
  computed: {
    // Use Vuex to get the follow state globally
    ...mapGetters(["isFollowing"]),
    isFollowingState() {
      return this.isFollowing(this.username);
    },
  },
  created() {
    this.fetchFollowStatus();
  },
  methods: {
    // Use Vuex actions to update the follow state globally
    ...mapActions(["setFollowing", "updateFollowerCounts"]),
    async fetchFollowStatus() {
      const token = sessionStorage.getItem("authToken");
      const decodedToken = decodeToken(token);

      if (!decodedToken || !decodedToken.userId) {
        console.error("User ID not found in token");
        return;
      }

      try {
        const response = await axios.get(
          `/followers/check?followerId=${decodedToken.userId}&followedId=${this.followedId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Update Vuex store instead of local state
        this.setFollowing({
          username: this.username,
          isFollowing: response.data.exists,
        });
      } catch (error) {
        console.error("Error fetching follow status:", error);
      }
    },

    async toggleFollow() {
      const token = sessionStorage.getItem("authToken");
      const decodedToken = decodeToken(token);

      if (!decodedToken || !decodedToken.userId) {
        console.error("User ID not found in token");
        return;
      }

      const followedId = this.followedId;

      try {
        if (this.isFollowingState) {
          // Unfollow
          await axios.delete(`/followers/${followedId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.setFollowing({ username: this.username, isFollowing: false });
          this.updateFollowerCounts({
            username: this.username,
            type: "decrement",
          });
        } else {
          // Follow
          await axios.post(
            `/followers`,
            { followedID: followedId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          this.setFollowing({ username: this.username, isFollowing: true });
          this.updateFollowerCounts({
            username: this.username,
            type: "increment",
          });
        }
      } catch (error) {
        console.error("Error toggling follow status:", error);
      }
    },

    navigateToProfile() {
      this.$router.push({
        name: "VisitProfile",
        params: { username: this.username },
      });
    },
  },
};
</script>

<template>
  <div class="rounded bg-gray-200 mb-4 p-2">
    <div class="flex items-center justify-between">
      <div class="flex items-center" @click="navigateToProfile">
        <img
          class="w-14 h-14 rounded-full"
          :src="profilePhoto"
          alt="profile picture"
        />
        <p class="pl-5 pt-2 text-2xl font-bold">{{ username }}</p>
      </div>
      <button
        @click="toggleFollow"
        type="button"
        class="text-white bg-gradient-to-br from-red-400 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-3 py-1 text-center me-5"
      >
        {{ isFollowingState ? "Following" : "Follow" }}
      </button>
    </div>
  </div>
</template>
