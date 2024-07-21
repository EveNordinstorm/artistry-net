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
    <LeftBar :open.sync="leftBarOpen" />
    <div class="sm:ml-64 p-8 pt-20">
      <router-view></router-view>
    </div>
    
</template> 

<style scoped>

</style>
