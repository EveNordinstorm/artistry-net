<script>
    export default {
    name: "ProfileBanner"
    }
</script>

<template>
    <div class="flex">
        <div class="p-5">
            <img class="w-40 rounded-full" src="../assets/artistry-net-logo-11.jpg" alt="profile picture" />
        </div>
        <img class="w-full h-36 object-cover" src="../assets/david-pisnoy-46juD4zY1XA-unsplash.jpg" alt="banner image" />
    </div>
    <div class="bg-red-600 p-5 flex justify-between mb-10">
        <h1 class="text-white font-bold text-3xl">Artistry Net</h1>
        <div>
            <button class="font-bold bg-white hover:bg-blue-700 hover:text-white rounded px-3 mx-2" href="/friends">2K<BR />Following</button>
            <button class="font-bold bg-white hover:bg-blue-700 hover:text-white rounded px-3 mx-2" href="/friends">20K<BR />Followers</button>
        </div>
    </div>
</template>