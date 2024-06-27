<script>
    export default {
        name: "RightBar"
    }
</script>

<template>
    <div class="fixed right-0 w-96 bg-white shadow-md">
    <button
      data-drawer-target="separator-sidebar"
      data-drawer-toggle="separator-sidebar"
      aria-controls="separator-sidebar"
      type="button"
      class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      <span class="sr-only">Open right bar</span>
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

    <div id="separator-sidebar" aria-label="Sidebar">
      <div class="container z-20 mt-24">
        <div class="item shadow-md rounded-lg p-4 mb-7">
          <span>Suggestions For You</span>
          <div class="flex items-center justify-between my-4">
            <div class="flex items-center gap-5 relative">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                class="w-10 h-10 rounded-full object-cover"
              />
              <span>Jane Doe</span>
            </div>
            <div className="flex items-center gap-2">
              <button class="py-1 px-3 text-white bg-blue-900 rounded-full cursor-pointer">Follow</button>
              <button class="py-1 px-3 text-white bg-red-800 rounded-full cursor-pointer">Dismiss</button>
            </div>
          </div>
        </div>
        <div className="item shadow-md rounded-lg p-4 mb-7">
          <span>Latest Activities</span>
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                class="w-10 h-10 rounded-full object-cover"
              />
              <p class="w-52">
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                class="w-10 h-10 rounded-full object-cover"
              />
              <p class="w-52">
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                class="w-10 h-10 rounded-full object-cover"
              />
              <p class="w-52">
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                class="w-10 h-10 rounded-full object-cover"
              />
              <p class="w-52">
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="item shadow-md rounded-lg p-4 mb-7">
          <span>Online Friends</span>
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                class="w-10 h-10 rounded-full object-cover"
              />
              <div className="online w-4 h-4 rounded-full bg-lime-500 absolute top-0 left-7"></div>
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                class="w-10 h-10 rounded-full object-cover"
              />
              <div className="online w-4 h-4 rounded-full bg-lime-500 absolute top-0 left-7"></div>
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                class="w-10 h-10 rounded-full object-cover"
              />
              <div className="online w-4 h-4 rounded-full bg-lime-500 absolute top-0 left-7"></div>
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                class="w-10 h-10 rounded-full object-cover"
              />
              <div className="online w-4 h-4 rounded-full bg-lime-500 absolute top-0 left-7"></div>
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                class="w-10 h-10 rounded-full object-cover"
              />
              <div className="online w-4 h-4 rounded-full bg-lime-500 absolute top-0 left-7"></div>
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                class="w-10 h-10 rounded-full object-cover"
              />
              <div className="online w-4 h-4 rounded-full bg-lime-500 absolute top-0 left-7"></div>
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                class="w-10 h-10 rounded-full object-cover"
              />
              <div className="online w-4 h-4 rounded-full bg-lime-500 absolute top-0 left-7"></div>
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                class="w-10 h-10 rounded-full object-cover"
              />
              <div className="online w-4 h-4 rounded-full bg-lime-500 absolute top-0 left-7"></div>
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                class="w-10 h-10 rounded-full object-cover"
              />
              <div className="online w-4 h-4 rounded-full bg-lime-500 absolute top-0 left-7"></div>
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                class="w-10 h-10 rounded-full object-cover"
              />
              <div className="online w-4 h-4 rounded-full bg-lime-500 absolute top-0 left-7"></div>
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                class="w-10 h-10 rounded-full object-cover"
              />
              <div className="online w-4 h-4 rounded-full bg-lime-500 absolute top-0 left-7"></div>
              <span>Jane Doe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  
</template>
