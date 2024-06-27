<script>
    export default {
        name: "LeftBar"
    }
</script>

<template>
   <button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
      <span class="sr-only">Open left bar</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
      </svg>
   </button>
 
 <aside id="separator-sidebar" class="fixed w-64 shadow-md transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800">
       <ul class="space-y-2 font-medium">
          <li>
             <a href="#" class="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group">
                <svg class="w-5 h-5 text-blue-900 transition duration-75 dark:text-gray-400 group-hover:text-blue-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 71.06 50.78">
                  <path class="cls-1" d="m21.97,50.78c-6.57,0-13.15,0-19.72,0-1.68,0-2.25-.56-2.25-2.21,0-3.14,0-6.28,0-9.42.01-6.16,4.07-10.94,10.14-11.94.64-.11,1.31-.11,1.97-.11,6.6,0,13.2,0,19.79,0,6.91,0,12.08,5.17,12.09,12.09,0,3.12,0,6.23,0,9.35,0,1.65-.59,2.25-2.23,2.25-6.6,0-13.2,0-19.79,0Z"/>
                  <path class="cls-1" d="m33.82,11.9c-.04,6.56-5.31,11.8-11.86,11.78-6.56-.02-11.87-5.37-11.82-11.92C10.19,5.25,15.55-.04,22.06,0c6.53.04,11.8,5.38,11.76,11.9Z"/>
                  <path class="cls-1" d="m47.14,50.78c.55-3.53.26-13.7-.51-16.63.72-.1,1.43-.27,2.13-.27,4.67-.03,9.35-.05,14.02,0,4.48.04,8.15,3.69,8.24,8.17.05,2.16.02,4.33.02,6.5,0,1.68-.56,2.24-2.22,2.24-3.26,0-6.52,0-9.78,0-3.7,0-7.4,0-11.1,0h-.8Z"/>
                  <path class="cls-1" d="m55.81,13.55c4.66,0,8.47,3.77,8.49,8.41.02,4.67-3.82,8.52-8.48,8.51-4.63,0-8.45-3.83-8.45-8.47,0-4.65,3.79-8.45,8.44-8.46Z"/>
                </svg>
                <span class="ms-3">Friends</span>
             </a>
          </li>
          <li>
             <a href="#" class="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group">
                <svg class="flex-shrink-0 w-5 h-5 text-blue-900 transition duration-75 dark:text-gray-400 group-hover:text-blue-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 408.95 346.75">
                  <path class="cls-1" d="m0,237.99c.99-3.36,1.88-6.75,2.99-10.06,8.26-24.57,29.31-40,56.06-40.8,10.33-.31,20.67-.05,31.45-.05-.9,3.18-2.03,5.9-2.42,8.73-1.01,7.36-2.35,14.75-2.41,22.14-.25,33.79-.17,67.58-.07,101.37.03,8.99.53,17.99.83,27.32-4.99,0-10.81,0-16.62,0-10.38,0-20.77-.31-31.13.07-17.66.66-32.95-9.52-37.6-26.96-.18-.69-.71-1.29-1.08-1.93,0-26.61,0-53.23,0-79.84Z"/>
                  <path class="cls-2" d="m204,346.65c-26.88,0-53.76,0-80.64,0-9.79,0-14.04-4.27-14.05-14.08,0-38.72-.08-77.44.02-116.16.08-28.98,18.18-51.85,46.31-58.51,4.22-1,8.68-1.35,13.03-1.37,23.82-.13,47.64-.2,71.45-.03,28.64.21,51.57,18.6,57.96,46.48,1.03,4.48,1.33,9.22,1.34,13.84.1,38.72.07,77.44.05,116.16,0,9.27-4.39,13.66-13.65,13.67-27.28.02-54.56,0-81.83,0Z"/>
                  <path class="cls-1" d="m204.61,0c38.84.14,70.9,31.86,70.72,70.5-.19,40.35-31.93,71.35-71.14,71.29-39.37-.06-70.89-32.25-70.78-71.3C133.52,31.69,165.67-.14,204.61,0Z"/>
                  <path class="cls-1" d="m318.48,186.47c14.58.63,28.84-.05,42.66,2.13,26.94,4.25,47.03,28.35,47.53,55.68.41,22.21.31,44.44.07,66.66-.2,18.72-13.22,34.09-31.35,35.17-18.54,1.11-37.21.24-54.93.24.26-10.55.71-21.13.74-31.72.1-31,0-62.01.05-93.01.02-11.09-.79-22.04-4.51-32.61-.17-.47-.12-1.02-.27-2.55Z"/>
                  <path class="cls-1" d="m26.7,119.18c-.08-29.13,23.77-52.97,53.04-53,29.14-.04,52.78,23.37,53.04,52.54.26,29.22-23.8,53.53-52.98,53.54-29.14,0-53.01-23.85-53.09-53.07Z"/>
                  <path class="cls-1" d="m382.09,119.57c-.67,29.6-24.7,53.26-53.48,52.67-29.57-.61-53.18-24.83-52.57-53.93.63-29.65,24.78-52.86,54.21-52.1,29.01.74,52.47,24.9,51.83,53.37Z"/>
                </svg>
                <span class="ms-3">Groups</span>
                
             </a>
          </li>
          <li>
             <a href="#" class="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group">
                <svg class="flex-shrink-0 w-5 h-5 text-blue-900 transition duration-75 dark:text-gray-400 group-hover:text-blue-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                   <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Messages</span>
                <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-white">3</span>
             </a>
          </li>
       </ul>
       <ul class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
          <li>
             <a href="#" class="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group">
                <svg class="flex-shrink-0 w-5 h-5 text-blue-900 transition duration-75 dark:text-gray-400 group-hover:text-blue-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 311.64 335.44">
                  <path class="cls-1" d="m203.27,155.49c-23.47,32.18-71.03,32.04-95.42.75-6.85,8.53-15.17,15.05-25.36,19.11C46.34,189.76,5.6,165.66.58,127.03c-1.76-13.54.73-26.54,4.02-39.52,4.98-19.66,9.9-39.34,14.82-59.02C23.82,10.87,37.57.02,55.74.02c66.76-.02,133.52-.03,200.28,0,17.42,0,31.36,10.54,35.67,27.36,6.15,23.98,12.37,47.97,17.81,72.12,4.8,21.32,1.92,41.46-12.77,58.71-24.66,28.98-67.52,28.57-91.77-.79-.54-.65-1.11-1.27-1.69-1.93Z"/>
                  <path class="cls-1" d="m203.63,335.41c0-19.88,0-39.33,0-58.78,0-15.59-9.53-25.07-25.21-25.07-15.47,0-30.95-.02-46.42,0-14.34.02-24.2,9.87-24.21,24.19-.02,19.71,0,39.42,0,59.42-.99.08-1.93.22-2.87.22-18.72.01-37.44.07-56.16,0-20.98-.08-36.75-15.71-36.8-36.58-.08-36.06-.02-72.12-.02-108.18v-2.23c.89.42,1.53.65,2.08,1.01,29.93,19.36,60.19,18.71,90.63,1.37,2.52-1.43,4-1.43,6.52.04,31.03,18.15,61.72,17.08,92.23-1.86,31.71,19.54,63.62,20.27,95.82-.4.09.88.25,1.79.25,2.7.01,35.81.07,71.62-.01,107.43-.05,20.98-15.71,36.62-36.67,36.71-19.58.08-39.15.02-59.15.02Z"/>
                </svg>
                <span class="ms-3">Marketplace</span>
             </a>
          </li>
          <li>
             <a href="#" class="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group">
                <svg class="flex-shrink-0 w-5 h-5 text-blue-900 transition duration-75 dark:text-gray-400 group-hover:text-blue-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 98.34 99.71">
                  <path class="cls-1" d="m24.2,0h2.54c2.97.94,4.13,3.03,3.93,6.06-.1,1.48-.02,2.97-.02,4.47h36.9c0-1.81-.01-3.55,0-5.3.02-2.42,1.07-4.15,3.4-5.01.1-.04.18-.15.27-.22.91,0,1.82,0,2.73,0,.4.15.82.26,1.21.46,1.98,1,2.83,2.66,2.82,4.82,0,1.74,0,3.48,0,5.31.35,0,.61,0,.86,0,3.09,0,6.18-.03,9.27,0,5.97.06,10.24,4.36,10.24,10.29,0,22.85,0,45.7,0,68.55,0,5.93-4.33,10.27-10.24,10.28-25.95,0-51.9,0-77.85,0-.9,0-1.83-.09-2.7-.31C3.02,98.26,0,94.32,0,89.53,0,66.61,0,43.7,0,20.79c0-.29,0-.58.02-.88.25-4.75,4.21-8.87,8.96-9.23,1.62-.12,3.25-.08,4.87-.09,2.11-.01,4.21,0,6.42,0,0-.75,0-1.43,0-2.1,0-1.23-.02-2.47.01-3.7C20.35,2.2,21.89.78,24.2,0Zm62.89,34.64H11.29v53.83h75.79v-53.83Z"/>
                  <path class="cls-1" d="m49.42,40.68c1.26.04,2.23.83,2.87,2.12,1.16,2.35,2.36,4.68,3.5,7.04.31.64.65.96,1.42,1.05,2.58.31,5.14.74,7.71,1.11,1.46.21,2.62.85,3.1,2.3.48,1.43,0,2.66-1.07,3.69-1.91,1.85-3.79,3.74-5.72,5.58-.49.46-.58.88-.46,1.53.49,2.64.9,5.3,1.36,7.95.24,1.37-.14,2.53-1.23,3.37-1.13.87-2.4.92-3.67.27-2.39-1.23-4.79-2.45-7.15-3.74-.69-.38-1.2-.34-1.86.02-2.25,1.22-4.54,2.36-6.8,3.56-1.31.7-2.61.86-3.85-.03-1.27-.9-1.6-2.18-1.31-3.69.48-2.61.87-5.24,1.35-7.85.11-.59-.04-.95-.46-1.35-1.95-1.86-3.86-3.76-5.79-5.65-1.04-1.01-1.49-2.22-1.05-3.62.45-1.41,1.55-2.1,2.97-2.33.93-.15,1.86-.28,2.79-.41,1.83-.27,3.67-.51,5.49-.82.3-.05.66-.37.81-.66,1.24-2.42,2.44-4.86,3.66-7.28.76-1.5,1.77-2.18,3.4-2.17Z"/>
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Events</span>
                <span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-blue-800 bg-blue-300 rounded-full dark:bg-blue-900 dark:text-white">Pro</span>
             </a>
          </li>
          <li>
             <a href="#" class="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group">
                <svg class="flex-shrink-0 w-5 h-5 text-blue-900 transition duration-75 dark:text-gray-400 group-hover:text-blue-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 375.44 220.51">
                  <path class="cls-1" d="m375.44,178.46c-2.63,4.26-4.64,9.11-8.02,12.66-7.21,7.57-17.46,9.01-26.92,4.39-5.36-2.61-10.48-5.71-15.66-8.67-15.98-9.13-31.92-18.32-47.93-27.4-2-1.13-2.95-2.27-2.94-4.77.11-29.82.09-59.63.02-89.45,0-2.1.64-3.22,2.48-4.27,20.2-11.57,40.48-23.01,60.46-34.97,15.25-9.13,34.28-1.24,37.87,15.35.06.28.43.49.65.74v136.39Z"/>
                  <path class="cls-1" d="m126.78.03c28.1,0,56.19-.07,84.29.02,21.12.07,37.2,12.77,41.47,32.68.71,3.31.92,6.79.92,10.19.06,44.96.08,89.91.02,134.87-.03,21.69-13.59,38.31-34.28,42.12-2.86.53-5.83.58-8.76.58-55.83.03-111.66.05-167.48.01-21.04-.01-37.17-12.27-41.81-31.86-.83-3.52-1.09-7.25-1.09-10.88C-.02,132.8,0,87.84.01,42.89.02,17.71,17.59.1,42.85.04c27.97-.07,55.95-.01,83.93-.01Z"/>
                </svg>
                <span class="ms-3">Watch</span>
             </a>
          </li>

       </ul>
    </div>
 </aside>
</template>

