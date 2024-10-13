import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import Home from "./pages/Home.vue";
import Profile from "./pages/Profile.vue";
import VisitProfile from "./pages/VisitProfile.vue";
import Market from "./pages/Market.vue";
import Likes from "./pages/Likes.vue";
import Saved from "./pages/Saved.vue";
import Friends from "./pages/Friends.vue";
import Register from "./pages/Registration.vue";
import Login from "./pages/Login.vue";
import store from "./store/index";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/profile", component: Profile },
    {
      path: "/profile/:userName",
      name: "VisitProfile",
      component: VisitProfile,
      props: true,
    },
    { path: "/market", component: Market },
    { path: "/likes", component: Likes },
    { path: "/saved", component: Saved },
    { path: "/friends", component: Friends },
    { path: "/register", component: Register },
    { path: "/login", component: Login },
  ],
});

const app = createApp(App);

app.use(store);
app.use(router);

store.dispatch("initializeFollowingStates");

const token = sessionStorage.getItem("authToken");
const userData = sessionStorage.getItem("userData");

if (token && userData) {
  try {
    const parsedUserData = JSON.parse(userData);
    store.dispatch("login", {
      token,
      userName: parsedUserData.userName,
      email: parsedUserData.email,
      profilePhoto: parsedUserData.profilePhoto,
    });
  } catch (error) {
    console.error("Failed to parse user data:", error);
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userData");
  }
}

app.mount("#app");
