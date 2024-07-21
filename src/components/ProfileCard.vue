<script>
    export default {
    name: "ProfileCard"
    }
</script>

<template>
    <div class="w-40 rounded-lg shadow">
        <div class="bg-blue-600 p-8 rounded-t-lg">
            <img class="w-24 h-24 rounded-full" src="../assets/artistry-net-logo-11.jpg" alt="profile picture" />
        </div>
        <div class="py-3">
            <h3 class="text-center text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Artistry Net</h3>
            <div class="flex flex-wrap gap-1 justify-center">
                <span class="bg-blue-600 text-white text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">Graphic Designer</span>
                <span class="bg-red-600 text-white text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">Web Developer</span>
            </div>
        </div>
    </div>
</template>