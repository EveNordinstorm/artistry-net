<script setup>
import NavBar from './components/NavBar.vue';
import LeftBar from './components/LeftBar.vue';
</script>

<template>
  <NavBar />
    <LeftBar />
    <router-view></router-view>
</template> 

<style scoped>

</style>
