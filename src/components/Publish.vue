<script>
export default {
  name: "Publish"
}
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="block w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <ul class="flex flex-wrap text-xl font-medium text-center p-3 text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
        <li class="me-2">
            <button id="post-tab" data-tabs-target="#post" type="button" role="tab" aria-controls="post" aria-selected="true" class="inline-block p-4 text-blue-600 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500">Post</button>
        </li>
        <li class="me-2">
            <button id="sell-tab" data-tabs-target="#sell" type="button" role="tab" aria-controls="sell" aria-selected="false" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300">Sell</button>
        </li>
        <li class="me-2">
            <button id="events-tab" data-tabs-target="#events" type="button" role="tab" aria-controls="events" aria-selected="false" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300">Events</button>
        </li>
    </ul>
    <div id="defaultTabContent">
        <div class="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="post" role="tabpanel" aria-labelledby="post-tab">
            <h2 class="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Create a Post</h2>
            <div class="sm:block md:flex">
                <div class="w-96">
                    <p class="mb-5 text-gray-500 dark:text-gray-400">
                    <ul class="list-disc text-xl ml-3">
                        <li>Share your thoughts</li>
                        <li>Engage with your audience</li>
                        <li>Update your followers</li>
                    </ul>
                    </p>
                    <button type="button" class="text-white bg-gradient-to-br from-red-400 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2">Post Something!</button>
                </div>
                <img class="w-96" src="../assets/post.jpg" />
            </div>
            
        </div>
        <div class="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="sell" role="tabpanel" aria-labelledby="sell-tab">
            <h2 class="mb-5 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">List a Product</h2>
            <div class="sm:block md:flex">
                <img class="w-96" src="../assets/product.jpg" />
            <div class="pl-5">
                <p class="text-xl mb-5 text-black dark:text-gray-400">Reach new clients and sell to your audience</p>
                <button type="button" class="text-white text-xl bg-gradient-to-br from-red-400 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Create a Listing</button>
            </div>
            </div>
            
            
        </div>
        <div class="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="events" role="tabpanel" aria-labelledby="events-tab">
            <h2 class="mb-5 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Promote an Event</h2>
            <div class="sm:block md:flex">
                <div class="w-96">
                <ul role="list" class="text-xl space-y-4 text-gray-500 dark:text-gray-400">
                <li class="flex space-x-2 rtl:space-x-reverse items-center">
                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>
                    <span class="leading-tight">Gallery Showing</span>
                </li>
                <li class="flex space-x-2 rtl:space-x-reverse items-center">
                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>
                    <span class="leading-tight">Workshops</span>
                </li>
                <li class="flex space-x-2 rtl:space-x-reverse items-center">
                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>
                    <span class="leading-tight">Film Premiere</span>
                </li>
                <li class="flex space-x-2 rtl:space-x-reverse items-center">
                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>
                    <span class="leading-tight">Book Launch</span>
                </li>
            </ul>
            <a href="/events" class="text-xl pb-3 inline-flex items-center font-bold text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-700 mt-5">
                Create an Event
                <svg class=" w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
            </a>
            </div>
            <img class="w-96 pl-5" src="../assets/event.jpg" />
            </div>
            
        </div>
    </div>
</div>
  </div>


</template>
