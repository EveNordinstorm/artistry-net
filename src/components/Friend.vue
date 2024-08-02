<script>
export default {
  name: "Friend",
  props: {
            username: String,
            profilePhoto: String,
        }
}
</script>

<template>
    <div class="rounded bg-gray-200 mb-4 p-2">
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <img class="w-14 h-14 rounded-full" :src="profilePhoto" alt="profile picture" />
                <p class="pl-5 pt-2 text-2xl font-bold">Username</p>
            </div>
            <button type="button" class="text-white bg-gradient-to-br from-red-400 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-3 py-1 text-center me-5">Following</button>
        </div>
    </div>
</template>