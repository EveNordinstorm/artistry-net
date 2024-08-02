<script>
import FeaturedEvent from '../components/FeaturedEvent.vue';
import Event from '../components/Event.vue';

export default {
  name: "Events",
  components: {
    FeaturedEvent,
    Event
  }
}
</script>

<template>
  <img src="../assets/events.jpg" />

  <h2 class="text-2xl mb-3 mt-10">Featured Events</h2>
  <div class="sm:block lg:flex">
    <div class="block m-2">
      <FeaturedEvent />
      <FeaturedEvent />
      <FeaturedEvent />
    </div>
    <div id="datepicker-inline" inline-datepicker data-date="07/1/2024"></div>
  </div>

  <div class="bg-red-600 rounded p-5">
    <h3 class="text-white text-3xl font-medium">Hosting Your Own Event?</h3>
    <div class="flex justify-between mt-3">
      <p class="text-white text-xl">List your event here for people to join!</p>
      <button type="button" class="text-white bg-gradient-to-br from-red-400 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2">Create an Event</button>
    </div>
  </div>

  <h2 class="text-2xl mb-3 mt-10">Browse Events</h2>

  <div>
    <Event />
    <Event />
    <Event />
    <Event />
    <Event />
  </div>
  
</template>