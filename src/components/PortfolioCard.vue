<script>
    export default {
    name: "PortfolioCard"
    }
</script>

<template>
    <h2 class="text-2xl pt-20 pb-5">Explore Portfolios</h2>
    
    <div>
        <div class="flex">
            <div class="bg-blue-800 w-40 py-8">
                <img class="w-20 h-20 rounded-full" src="../assets/artistry-net-logo-11.jpg" alt="profile picture" />
            </div>
            <img class="w-40 h-40 object-cover" src="../assets/pure-julia-n2qG8L1nRn4-unsplash.jpg" />
            <img class="w-40 h-40 object-cover" src="../assets/jonathan-borba-o15lOC7SJKs-unsplash-crop.jpg" />
        </div>
        <div class="bg-red-800 p-3">
            <h3 class="text-2xl font-semibold text-white dark:text-white">Artistry Net</h3>
            
        </div>
    </div>
</template>