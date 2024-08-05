import { createStore } from "vuex";

const store = createStore({
  state() {
    const token = sessionStorage.getItem("authToken");
    const user = JSON.parse(sessionStorage.getItem("userData")) || {
      username: "",
      profilePhoto: "",
      email: "",
    };

    return {
      isLoggedIn: !!token,
      token: token || null,
      user: user,
    };
  },
  mutations: {
    setLoginState(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    setUser(state, user) {
      state.user = user;
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
      };
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
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    user: (state) => state.user,
    token: (state) => state.token,
  },
});

export default store;
