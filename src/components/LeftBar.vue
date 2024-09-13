<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:open"]);

const toggleLeftbar = () => {
  emit("update:open", !props.open);
};
</script>

<template>
  <button
    @click="toggleLeftbar"
    type="button"
    class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
  >
    <span class="sr-only">Open left bar</span>
    <svg
      class="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      ></path>
    </svg>
  </button>

  <aside
    :class="{ '-translate-x-full': !props.open, 'translate-x-0': props.open }"
    class="leftbar-container fixed w-64 shadow-md transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Leftbar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li>
          <a
            href="/"
            class="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group"
          >
            <svg
              class="flex-shrink-0 w-5 h-5 text-blue-900 transition duration-75 dark:text-gray-400 group-hover:text-blue-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 408 385"
            >
              <path
                d="M401.77,194.88c-2.3,6.88-5.67,12.95-12.61,16.2c-8.46,3.96-16.49,3.13-23.97-2.44c-1.64-1.22-3.1-2.71-4.55-4.17
                     c-48.35-48.34-96.7-96.68-145.05-145.03c-8.22-8.22-15.02-8.24-23.2-0.06c-48.62,48.61-97.24,97.23-145.87,145.84
                     c-8.96,8.95-19.18,10.76-29.03,5.19c-11.54-6.51-14.86-22.17-6.91-32.79c1.31-1.74,2.8-3.37,4.34-4.91
                     c48.61-48.63,97.23-97.25,145.86-145.85c24.76-24.75,61.55-24.78,86.28-0.1c13.03,13.01,26.04,26.04,39.07,39.05
                     c0.97,0.97,1.99,1.89,3.66,3.47c0-7.92-0.01-15.05,0-22.19c0.01-7.15,2.13-13.48,7.65-18.27c7.19-6.25,15.47-7.56,24.1-3.84
                     c9.37,4.04,13.62,11.84,13.66,21.85c0.1,20.99,0.11,41.98-0.05,62.96c-0.03,3.61,0.96,6.16,3.57,8.73
                     c17.24,16.99,34.24,34.22,51.45,51.25c5.09,5.04,9.81,10.18,11.6,17.36C401.77,189.73,401.77,192.3,401.77,194.88z"
              />
              <path
                d="M240.75,376.47c0-33.74,0-67.03,0-100.56c-24.63,0-48.91,0-73.66,0c0,33.54,0,66.93,0,100.56
                     c-1.44,0.1-2.44,0.22-3.43,0.22c-20.21,0.01-40.42,0.1-60.64-0.02c-21.82-0.13-38.18-14.06-41.64-35.31
                     c-0.39-2.39-0.37-4.87-0.38-7.31c-0.02-30.64,0.04-61.28-0.08-91.92c-0.02-4.86,1.55-8.58,4.98-12
                     c42.84-42.73,85.61-85.53,128.41-128.3c6.8-6.8,12.47-6.82,19.23-0.07c42.8,42.77,85.57,85.58,128.41,128.31
                     c3.4,3.4,5.07,7.08,5.05,11.97c-0.13,31.28,0.03,62.57-0.11,93.85c-0.09,20.04-14.21,36.67-33.83,40.22
                     c-2.52,0.45-5.12,0.56-7.69,0.56c-20.47,0.04-40.94,0.03-61.41,0.02C243.09,376.68,242.22,376.57,240.75,376.47z"
              />
            </svg>
            <span class="ms-3">Feed</span>
          </a>
        </li>
        <li>
          <a
            href="/market"
            class="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group"
          >
            <svg
              class="flex-shrink-0 w-5 h-5 text-blue-900 transition duration-75 dark:text-gray-400 group-hover:text-blue-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 311.64 335.44"
            >
              <path
                class="cls-1"
                d="m203.27,155.49c-23.47,32.18-71.03,32.04-95.42.75-6.85,8.53-15.17,15.05-25.36,19.11C46.34,189.76,5.6,165.66.58,127.03c-1.76-13.54.73-26.54,4.02-39.52,4.98-19.66,9.9-39.34,14.82-59.02C23.82,10.87,37.57.02,55.74.02c66.76-.02,133.52-.03,200.28,0,17.42,0,31.36,10.54,35.67,27.36,6.15,23.98,12.37,47.97,17.81,72.12,4.8,21.32,1.92,41.46-12.77,58.71-24.66,28.98-67.52,28.57-91.77-.79-.54-.65-1.11-1.27-1.69-1.93Z"
              />
              <path
                class="cls-1"
                d="m203.63,335.41c0-19.88,0-39.33,0-58.78,0-15.59-9.53-25.07-25.21-25.07-15.47,0-30.95-.02-46.42,0-14.34.02-24.2,9.87-24.21,24.19-.02,19.71,0,39.42,0,59.42-.99.08-1.93.22-2.87.22-18.72.01-37.44.07-56.16,0-20.98-.08-36.75-15.71-36.8-36.58-.08-36.06-.02-72.12-.02-108.18v-2.23c.89.42,1.53.65,2.08,1.01,29.93,19.36,60.19,18.71,90.63,1.37,2.52-1.43,4-1.43,6.52.04,31.03,18.15,61.72,17.08,92.23-1.86,31.71,19.54,63.62,20.27,95.82-.4.09.88.25,1.79.25,2.7.01,35.81.07,71.62-.01,107.43-.05,20.98-15.71,36.62-36.67,36.71-19.58.08-39.15.02-59.15.02Z"
              />
            </svg>
            <span class="ms-3">Market</span>
          </a>
        </li>
      </ul>
      <ul
        class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700"
      >
        <li>
          <a
            href="/friends"
            class="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group"
          >
            <svg
              class="w-5 h-5 text-blue-900 transition duration-75 dark:text-gray-400 group-hover:text-blue-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 71.06 50.78"
            >
              <path
                class="cls-1"
                d="m21.97,50.78c-6.57,0-13.15,0-19.72,0-1.68,0-2.25-.56-2.25-2.21,0-3.14,0-6.28,0-9.42.01-6.16,4.07-10.94,10.14-11.94.64-.11,1.31-.11,1.97-.11,6.6,0,13.2,0,19.79,0,6.91,0,12.08,5.17,12.09,12.09,0,3.12,0,6.23,0,9.35,0,1.65-.59,2.25-2.23,2.25-6.6,0-13.2,0-19.79,0Z"
              />
              <path
                class="cls-1"
                d="m33.82,11.9c-.04,6.56-5.31,11.8-11.86,11.78-6.56-.02-11.87-5.37-11.82-11.92C10.19,5.25,15.55-.04,22.06,0c6.53.04,11.8,5.38,11.76,11.9Z"
              />
              <path
                class="cls-1"
                d="m47.14,50.78c.55-3.53.26-13.7-.51-16.63.72-.1,1.43-.27,2.13-.27,4.67-.03,9.35-.05,14.02,0,4.48.04,8.15,3.69,8.24,8.17.05,2.16.02,4.33.02,6.5,0,1.68-.56,2.24-2.22,2.24-3.26,0-6.52,0-9.78,0-3.7,0-7.4,0-11.1,0h-.8Z"
              />
              <path
                class="cls-1"
                d="m55.81,13.55c4.66,0,8.47,3.77,8.49,8.41.02,4.67-3.82,8.52-8.48,8.51-4.63,0-8.45-3.83-8.45-8.47,0-4.65,3.79-8.45,8.44-8.46Z"
              />
            </svg>
            <span class="ms-3">Friends</span>
          </a>
        </li>
        <li>
          <a
            href="/profile"
            class="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group"
          >
            <svg
              class="flex-shrink-0 w-5 h-5 text-blue-900 transition duration-75 dark:text-gray-400 group-hover:text-blue-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 386 422.5"
            >
              <path
                d="M32.8,402.9c-6.7-3.1-8.4-8.4-8.3-15.4c1.3-68.8,53.8-129.9,121.5-141c8.4-1.4,17.1-2,25.7-2.2c15.2-0.3,30.4-0.5,45.6,0
		c57.7,2.1,99.9,29.5,127.6,79.7c10.9,19.7,15.6,41.3,16.6,63.8c0.3,7-1.8,12.1-8.3,15.1C246.4,402.9,139.6,402.9,32.8,402.9z"
              />
              <path
                d="M192.9,221.7c-55.7,0-101.1-45.6-101-101.3C92.1,64.8,137.5,19.6,193,19.6c55.8,0,101.1,45.5,101,101.3
		C293.9,176.5,248.5,221.8,192.9,221.7z"
              />
            </svg>
            <span class="ms-3">Profile</span>
          </a>
        </li>
        <li>
          <a
            href="/saved"
            class="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group"
          >
            <svg
              class="flex-shrink-0 w-5 h-5 text-blue-900 transition duration-75 dark:text-gray-400 group-hover:text-blue-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 170 172"
            >
              <path
                d="M36.98,6.7c32.11,0,64.22,0,96.33,0c0.5,0.17,1,0.35,1.51,0.49c6.1,1.68,9.98,6.95,9.98,13.63c0.01,44.96,0,89.93,0,134.89
                     c0,0.57,0.07,1.15-0.05,1.7c-0.29,1.35-0.48,2.77-1.05,4c-1.42,3.1-4.6,4.6-7.83,3.55c-1.71-0.56-3.4-1.53-4.78-2.7
                     c-13.4-11.32-26.74-22.72-40.1-34.09c-3.65-3.11-7.7-3.12-11.33-0.03c-9.96,8.45-19.9,16.91-29.85,25.35
                     c-3.82,3.24-7.55,6.59-11.5,9.65c-5.61,4.33-11.8,1.91-12.99-4.93c-0.12-0.71-0.12-1.44-0.12-2.16c-0.01-45.17-0.01-90.34,0-135.51
                     c0-5.92,3.65-10.96,9.26-12.95C35.29,7.29,36.14,6.99,36.98,6.7z"
              />
            </svg>
            <span class="ms-3">Saved</span>
          </a>
        </li>
        <li>
          <a
            href="/likes"
            class="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group"
          >
            <svg
              class="flex-shrink-0 w-5 h-5 text-blue-900 transition duration-75 dark:text-gray-400 group-hover:text-blue-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path
                d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z"
              />
            </svg>
            <span class="ms-3">Likes</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
/* LEFTBAR BREAKPOINTS */

.leftbar-container {
  padding-top: 1.5rem;
}

@media only screen and (min-width: 600px) {
  .leftbar-container {
    padding-top: 4.5rem;
  }
}
</style>
