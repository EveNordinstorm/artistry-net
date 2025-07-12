<script setup>
import { ref } from "vue";
import NavBar from "./components/NavBar.vue";
import LeftBar from "./components/LeftBar.vue";

const leftBarOpen = ref(false);

const toggleLeftbar = () => {
  leftBarOpen.value = !leftBarOpen.value;
};
</script>

<template>
  <div class="pb-5">
    <NavBar @toggle-leftbar="toggleLeftbar" />
    <LeftBar
      :open="leftBarOpen"
      @update:open="(val) => (leftBarOpen.value = val)"
    />
    <div class="content-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
}

/* CONTENT CONTAINER BREAKPOINTS */
.content-container {
  padding-top: 6rem;
  margin-left: 2rem;
  margin-right: 2rem;
}

@media only screen and (min-width: 600px) {
  .content-container {
    padding-top: 6rem;
    margin-left: 18rem;
    margin-right: 0rem;
  }
}

@media only screen and (min-width: 768px) {
  .content-container {
    padding-top: 6rem;
    margin-left: 18rem;
    margin-right: 2rem;
  }
}

@media only screen and (min-width: 992px) {
  .content-container {
    padding-top: 1.5rem;
    margin-left: 18rem;
    margin-right: 18rem;
  }
}
</style>
