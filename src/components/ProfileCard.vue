<script>
    export default {
    name: "ProfileCard"
    }
</script>

<template>
<h2 class="text-2xl pt-20 pb-5">Explore Profiles</h2>

    <div>
        <div class="bg-blue-800 w-40 py-8">
            <img class="w-20 h-20 rounded-full" src="../assets/artistry-net-logo-11.jpg" alt="profile picture" />
        </div>
        <div>
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Artistry Net</h3>
            <div class="block">
                <span class="bg-blue-600 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">Graphic Designer</span>
                <span class="bg-red-600 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">Web Developer</span>
            </div>
        </div>
    </div>
</template>