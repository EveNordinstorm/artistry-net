<script setup>
import { ref } from 'vue';
import NavBar from './components/NavBar.vue';
import LeftBar from './components/LeftBar.vue';

const leftBarOpen = ref(false);

const toggleLeftbar = () => {
  leftBarOpen.value = !leftBarOpen.value;
};
</script>

<template>
  <NavBar @toggle-leftbar="toggleLeftbar" />
    <LeftBar :open="leftBarOpen" @update:open="val => leftBarOpen.value = val" />
    <div class="content-container">
      <router-view></router-view>
    </div>
    
</template> 


<style scoped>

/* MAIN CONTENT BREAKPOINTS */

.content-container {
    padding-top: 3rem;
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
    padding-top: 6rem;
    margin-left: 18rem;
    margin-right: 18rem;
  }
}
</style>
