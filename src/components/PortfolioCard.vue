<script>
    export default {
    name: "PortfolioCard"
    }
</script>

<template>
    <div class="container rounded-lg shadow">
        <div class="sm:block lg:flex">
            <div class="logo-bg bg-blue-600 p-8 flex justify-center items-center">
                <img class="logo rounded-full" src="../assets/artistry-net-logo-11.jpg" alt="profile picture" />
            </div>
            <img class="img" src="../assets/pure-julia-n2qG8L1nRn4-unsplash.jpg" />
            <img class="img img-corner" src="../assets/jonathan-borba-o15lOC7SJKs-unsplash-crop.jpg" />
        </div>
        <div class="name-bg bg-red-600 rounded-b-lg p-3">
            <h3 class="text-2xl font-semibold text-white dark:text-white">Artistry Net</h3> 
        </div>
    </div>
</template>

<style scoped>

.logo {
    width: 150px;
    height: 150px;
}

.container {
    width: 300px;
  }

.logo-bg {
    width: 300px;
    border-radius: 0.5rem 0.5rem 0 0;
}

.img {
    object-fit: cover;
    width: 300px;
    height: 300px;
}

.name-bg {
    width: 300px;
}

@media only screen and (min-width: 1025px) {
    .container {
        width: 900px;
    }

    .name-bg {
        width: 900px;
    }

    .logo-bg {
        border-radius: 0.5rem 0 0 0;
    }

    .img-corner {
        border-radius: 0 0.5rem 0 0;
    }
}

</style>