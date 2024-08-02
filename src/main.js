import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import Home from "./pages/Home.vue";
import Profile from "./pages/Profile.vue";
import Explore from "./pages/Explore.vue";
import Events from "./pages/Events.vue";
import Market from "./pages/Market.vue";
import Auction from "./pages/Auction.vue";
import Saved from "./pages/Saved.vue";
import Groups from "./pages/Groups.vue";
import Friends from "./pages/Friends.vue";
import Messages from "./pages/Messages.vue";
import Register from "./pages/Registration.vue";
import Login from "./pages/Login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/profile", component: Profile },
    { path: "/explore", component: Explore },
    { path: "/events", component: Events },
    { path: "/market", component: Market },
    { path: "/auction", component: Auction },
    { path: "/saved", component: Saved },
    { path: "/groups", component: Groups },
    { path: "/friends", component: Friends },
    { path: "/messages", component: Messages },
    { path: "/register", component: Register },
    { path: "/login", component: Login },
  ],
});

const app = createApp(App);

app.use(router);

app.mount("#app");
