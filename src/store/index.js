import { createStore } from "vuex";
import axios from "../axios";

const store = createStore({
  state() {
    return {
      isLoggedIn: !!sessionStorage.getItem("authToken"),
      token: sessionStorage.getItem("authToken"),
      user: JSON.parse(sessionStorage.getItem("userData")) || {
        userName: "",
        profilePhoto: "",
        bannerPhoto: null,
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
        userName: "",
        profilePhoto: "",
        bannerPhoto: "",
        email: "",
        bio: "",
      };
    },
    setFollowing(state, { userName, isFollowing }) {
      state.followingStates[userName] = isFollowing;
      sessionStorage.setItem(
        "followingStates",
        JSON.stringify(state.followingStates)
      );
    },
    setFollowerCounts(state, { userName, counts }) {
      state.followerCounts = { ...state.followerCounts, [userName]: counts };
    },
    updateFollowerCounts(state, { userName, type }) {
      if (!state.followerCounts[userName]) {
        state.followerCounts[userName] = {
          followersCount: 0,
          followingCount: 0,
        };
      }
      if (type === "increment") {
        state.followerCounts[userName].followersCount += 1;
      } else if (type === "decrement") {
        state.followerCounts[userName].followersCount -= 1;
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
        Object.keys(parsedStates).forEach((userName) => {
          commit("setFollowing", {
            userName,
            isFollowing: parsedStates[userName],
          });
        });
      }
    },
    setFollowing({ commit }, payload) {
      commit("setFollowing", payload);
    },
    setFollowerCounts({ commit }, { userName, counts }) {
      commit("setFollowerCounts", { userName, counts });
    },
    updateFollowerCounts({ commit }, { userName, type }) {
      commit("updateFollowerCounts", { userName, type });
    },
    async fetchFollowerCounts({ commit, state }, userName) {
      const token = state.token;
      if (!token) {
        console.error("Token is missing.");
        return;
      }

      try {
        const response = await axios.get(`/followers/${userName}/counts`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        commit("setFollowerCounts", { userName, counts: response.data });
      } catch (error) {
        console.error("Error fetching follower counts:", error);
      }
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    user: (state) => state.user,
    token: (state) => state.token,
    getFollowerCounts: (state) => (userName) => {
      return (
        state.followerCounts[userName] || {
          followersCount: 0,
          followingCount: 0,
        }
      );
    },
    isFollowing: (state) => (userName) => {
      return state.followingStates[userName] || false;
    },
  },
});

export default store;
