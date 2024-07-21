<script>
import PortfolioCard from '../components/PortfolioCard.vue';
import ProfileCard from '../components/ProfileCard.vue';

export default {
  name: "Explore",
  components: {
    ProfileCard,
    PortfolioCard
  }
}
</script>

<template>
  
  <img src="../assets/explore.jpg" />

  <h2 class="text-2xl pt-20 pb-5">Explore Profiles</h2>
  <ProfileCard />

  <h2 class="text-2xl pt-20 pb-5">Explore Portfolios</h2>
  <PortfolioCard />

  <h2 class="text-2xl pt-20 pb-5">Explore Artwork</h2>

  <div class="flex items-center justify-center py-4 md:py-8 flex-wrap pt-5">
    <button type="button" class="text-white bg-red-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800">All categories</button>
    <button type="button" class="text-white bg-blue-600 hover:bg-red-800 dark:bg-gray-900 dark:hover:border-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Graphic Design</button>
    <button type="button" class="text-white bg-blue-600 hover:bg-red-800 dark:bg-gray-900 dark:hover:border-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Illustration</button>
    <button type="button" class="text-white bg-blue-600 hover:bg-red-800 dark:bg-gray-900 dark:hover:border-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Web Design</button>
    <button type="button" class="text-white bg-blue-600 hover:bg-red-800 dark:bg-gray-900 dark:hover:border-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Product Design</button>
</div>

<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div class="grid gap-4">
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" alt="">
        </div>
    </div>
    <div class="grid gap-4">
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" alt="">
        </div>
    </div>
    <div class="grid gap-4">
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" alt="">
        </div>
    </div>
    <div class="grid gap-4">
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg" alt="">
        </div>
    </div>
</div>

</template>