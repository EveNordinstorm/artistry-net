<script>
    export default {
    name: "PortfolioCard"
    }
</script>

<template>
    <div class="rounded-lg shadow sm:w-40 lg:w-96">
        <div class="sm:block lg:flex">
            <div class="bg-blue-600 rounded-t-lg p-8 w-40">
                <img class="w-24 h-24 rounded-full" src="../assets/artistry-net-logo-11.jpg" alt="profile picture" />
            </div>
            <img class="w-40 h-36 object-cover" src="../assets/pure-julia-n2qG8L1nRn4-unsplash.jpg" />
            
            <img class="w-40 h-36 object-cover" src="../assets/jonathan-borba-o15lOC7SJKs-unsplash-crop.jpg" />
        </div>
        <div class="bg-red-600 rounded-b-lg p-3">
            <h3 class="text-2xl font-semibold text-white dark:text-white">Artistry Net</h3> 
        </div>
    </div>
</template>