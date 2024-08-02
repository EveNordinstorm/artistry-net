<script>
export default {
  name: "Board"
}
</script>

<template>
    <div class="flex bg-gray-200 rounded p-2 mb-4 mx-4">
        <div class="mr-4">
            <div class="flex">
            <img class="w-24 h-24 object-cover m-2" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" /> 
            <img class="w-24 h-24 object-cover m-2" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" /> 
        </div>
        <div class="flex">
            <img class="w-24 h-24 object-cover m-2" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" /> 
            <img class="w-24 h-24 object-cover m-2" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" /> 
        </div>
        </div>
        

        <div class=" p-3">
            <h3 class="text-xl font-bold">Favourite Products</h3>
            <p class="mt-4">28 Saved</p>
        </div>
        
    </div>
</template>