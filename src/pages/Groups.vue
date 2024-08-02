<script>
import Group from '../components/Group.vue';

export default {
  name: "Groups",
  components: {
    Group
  }
}
</script>

<template>
  <div class="bg-gray-200 rounded p-5 w-full">
    <h2 class="text-2xl pb-5 pl-2">Suggested For You</h2>
    <div class="grid md:grid-cols-0 lg:grid-cols-2">
      <Group />
      <Group />
      <Group />
      <Group />
    </div>
  </div>
  

  <h2 class="text-3xl pt-20 pb-5">Your Groups</h2>
  <div class="grid md:grid-cols-0 lg:grid-cols-2">
      <Group />
      <Group />
      <Group />
      <Group />
      <Group />
      <Group />
      <Group />
      <Group />
    </div>
</template>