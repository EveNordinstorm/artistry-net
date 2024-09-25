import { createStore } from "vuex";
import axios from "../axios";

const store = createStore({
  state() {
    return {
      isLoggedIn: !!sessionStorage.getItem("authToken"),
      token: sessionStorage.getItem("authToken"),
      user: JSON.parse(sessionStorage.getItem("userData")) || {
        username: "",
        profilePhoto: "",
        email: "",
        bio: "",
      },
      followerCounts: {},
      followingStates: {},
      followerCounts: {},
    };
  },
  mutations: {
    setLoginState(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    setUser(state, user) {
      state.user = { ...user };
    },
    setToken(state, token) {
      state.token = token;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.user = {
        username: "",
        profilePhoto: "",
        email: "",
        bio: "",
      };
    },
    setFollowing(state, { username, isFollowing }) {
      state.followingStates[username] = isFollowing;
      sessionStorage.setItem(
        "followingStates",
        JSON.stringify(state.followingStates)
      );
    },
    setFollowerCounts(state, { username, counts }) {
      state.followerCounts = { ...state.followerCounts, [username]: counts };
    },
    updateFollowerCounts(state, { username, type }) {
      if (!state.followerCounts[username]) {
        state.followerCounts[username] = {
          followersCount: 0,
          followingCount: 0,
        };
      }
      if (type === "increment") {
        state.followerCounts[username].followersCount += 1;
      } else if (type === "decrement") {
        state.followerCounts[username].followersCount -= 1;
      }
    },
  },
  actions: {
    login({ commit }, user) {
      commit("setLoginState", true);
      commit("setUser", user);
      commit("setToken", user.token);
    },
    logout({ commit }) {
      commit("logout");
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("userData");
    },
    initializeFollowingStates({ commit }) {
      const savedStates = sessionStorage.getItem("followingStates");
      if (savedStates) {
        const parsedStates = JSON.parse(savedStates);
        Object.keys(parsedStates).forEach((username) => {
          commit("setFollowing", {
            username,
            isFollowing: parsedStates[username],
          });
        });
      }
    },
    setFollowing({ commit }, payload) {
      commit("setFollowing", payload);
    },
    setFollowerCounts({ commit }, { username, counts }) {
      commit("setFollowerCounts", { username, counts });
    },
    updateFollowerCounts({ commit }, { username, type }) {
      commit("updateFollowerCounts", { username, type });
    },
    async fetchFollowerCounts({ commit, state }, username) {
      const token = state.token;
      if (!token) {
        console.error("Token is missing.");
        return;
      }

      try {
        const response = await axios.get(`/account/${username}/counts`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        commit("setFollowerCounts", { username, counts: response.data });
      } catch (error) {
        console.error("Error fetching follower counts:", error);
      }
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    user: (state) => state.user,
    token: (state) => state.token,
    getFollowerCounts: (state) => (username) => {
      return (
        state.followerCounts[username] || {
          followersCount: 0,
          followingCount: 0,
        }
      );
    },
    isFollowing: (state) => (username) => {
      return state.followingStates[username] || false;
    },
  },
});

export default store;
