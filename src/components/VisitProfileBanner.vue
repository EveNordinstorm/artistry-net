<script>
import { mapState, mapActions } from "vuex";
import axios from "../axios";
import { decodeToken } from "../utilities/JwtHelper";

export default {
  name: "VisitProfileBanner",
  props: {
    userName: { type: String, required: true },
    profilePhoto: {
      type: String,
    },
    bannerPhoto: {
      type: String,
    },
  },
  computed: {
    ...mapState(["followerCounts"]),
    followingCount() {
      return this.followerCounts[this.userName]?.followingCount || 0;
    },
    followersCount() {
      return this.followerCounts[this.userName]?.followersCount || 0;
    },
    isFollowing() {
      return this.$store.getters.isFollowing(this.userName);
    },
  },
  created() {
    this.fetchUserCounts();
  },
  methods: {
    ...mapActions(["setFollowing", "setFollowerCounts"]),
    async toggleFollow() {
      try {
        const token = sessionStorage.getItem("authToken");
        const decodedToken = decodeToken(token);

        if (!decodedToken || !decodedToken.userId) {
          throw new Error("User ID not found in token");
        }

        const response = await axios.get(
          `/account/getUserDetailsByUserName/${this.userName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const followedId = response.data.id;

        if (this.following) {
          await axios.delete(`/followers/${followedId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.setFollowing({ userName: this.userName, isFollowing: false });
          this.$store.dispatch("updateFollowerCounts", {
            userName: this.userName,
            type: "decrement",
          });
        } else {
          const existingFollowResponse = await axios.get(
            `/followers/check?followerId=${decodedToken.userId}&followedId=${followedId}`
          );
          if (!existingFollowResponse.data.exists) {
            await axios.post(
              `/followers`,
              { followedID: followedId },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            this.setFollowing({ userName: this.userName, isFollowing: true });
            this.$store.dispatch("updateFollowerCounts", {
              userName: this.userName,
              type: "increment",
            });
          }
        }
        this.following = !this.following;
        this.$store.dispatch("setFollowing", {
          userName: this.userName,
          isFollowing: this.following,
        });
        sessionStorage.setItem(
          "followingStates",
          JSON.stringify(this.$store.state.followingStates)
        );
      } catch (error) {
        console.error("Error toggling follow status:", error);
      }
    },
    async fetchUserCounts() {
      try {
        const response = await axios.get(`/followers/${this.userName}/counts`, {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
        });
        this.setFollowerCounts({
          userName: this.userName,
          counts: response.data,
        });
      } catch (error) {
        console.error("Error fetching follow counts:", error);
      }
    },
  },
};
</script>

<template>
  <div>
    <div class="relative">
      <img
        class="w-full h-56 object-cover"
        :src="bannerPhoto"
        alt="banner image"
      />

      <div class="absolute top-4 left-4">
        <img
          class="w-48 h-48 object-cover rounded-full ms-5"
          :src="profilePhoto"
          alt="profile picture"
        />
      </div>
    </div>
    <div class="bg-red-600 p-5 flex justify-between mb-10">
      <div>
        <h1 class="text-white font-bold text-3xl">{{ userName }}</h1>

        <button
          class="mt-3 text-white text-xl bg-gradient-to-br from-red-400 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
          @click="toggleFollow"
        >
          {{ $store.getters.isFollowing(userName) ? "Following" : "Follow" }}
        </button>
      </div>

      <div class="text-white text-center">
        <div>
          <p class="text-2xl font-medium">{{ followingCount }}</p>
          <p class="font-medium">Following</p>
        </div>
        <div>
          <p class="text-2xl font-medium">{{ followersCount }}</p>
          <p class="font-medium">Followers</p>
        </div>
      </div>
    </div>
  </div>
</template>
