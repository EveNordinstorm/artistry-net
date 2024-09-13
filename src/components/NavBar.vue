<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      dropdownOpen: false,
      isLoading: true,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "user"]),
    username() {
      return this.user.username || "Unknown User";
    },
    email() {
      return this.user.email || "unknown@example.com";
    },
    profilePhoto() {
      const profilePhotoPath =
        this.user.profilePhoto || "../assets/artistry-net-logo-11.jpg";
      return `${import.meta.env.VITE_API_BASE_URL}${profilePhotoPath}`;
    },
  },
  mounted() {
    this.fetchUserData().then(() => {
      this.isLoading = false;
    });
  },
  methods: {
    ...mapActions(["logout"]),
    async fetchUserData() {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
          this.$store.commit("setLoginState", false);
          return;
        }

        const userData = JSON.parse(sessionStorage.getItem("userData"));

        if (userData) {
          this.$store.dispatch("login", {
            token,
            username: userData.username,
            email: userData.email,
            profilePhoto: userData.profilePhoto,
          });
        } else {
          this.$store.commit("setLoginState", false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        this.$store.commit("setLoginState", false);
      }
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    goToLogin() {
      this.$router.push("/login");
    },
    async logout() {
      try {
        await this.$store.dispatch("logout");
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("userData");
        this.$router.push("/");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },
  },
};
</script>

<template>
  <header class="antialiased">
    <nav
      class="bg-red-600 fixed z-50 w-full border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800"
    >
      <div class="flex flex-wrap justify-between items-center">
        <div class="flex justify-start items-center">
          <button
            @click="$emit('toggle-leftbar')"
            id="toggleLeftbar"
            class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-900 focus:bg-gray-300 dark:focus:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <svg
              class="w-[18px] h-[18px] text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
            <span class="sr-only">Toggle sidebar</span>
          </button>
          <a href="/" class="flex mr-4">
            <img
              src="../assets/Artistry-Net-logo-05.png"
              class="mr-3 h-14"
              alt="Artistry Net Logo"
            />
          </a>
        </div>

        <div class="flex items-center ml-auto space-x-2">
          <!-- Dark Mode Button -->
          <button
            type="button"
            class="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-900 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 250.25 249.15"
            >
              <path
                class="cls-1"
                d="m0,111.85c.47-2.49,1.05-4.97,1.39-7.49,1.57-11.68,4.89-22.86,9.68-33.6,9.73-21.82,24.73-39.25,44.33-52.77C67.06,9.95,79.79,4.11,93.46.33c3.62-1,7.26.33,9.26,3.26,2.1,3.05,2.11,6.57-.38,9.74-5.92,7.53-10.84,15.61-14.16,24.62-5.93,16.05-7.76,32.53-4.86,49.44,3.92,22.87,14.77,41.87,32.5,56.76,13.96,11.73,30.16,18.73,48.3,20.97,25.71,3.18,48.82-3.3,69.4-18.98,1.49-1.13,2.94-2.35,4.56-3.26,3.12-1.75,6.35-1.63,9.18.55,2.78,2.14,3.53,5.09,2.65,8.52-8.66,33.89-27.57,60.28-57.46,78.65-16.7,10.26-34.88,16.3-54.35,18.03C71.87,254.51,15.91,209.49,2.97,149.5c-1.13-5.23-1.65-10.6-2.48-15.9-.07-.42-.32-.81-.49-1.21,0-6.84,0-13.69,0-20.53Z"
              />
            </svg>
          </button>

          <!-- Login Button -->
          <button
            v-if="!isLoggedIn"
            type="button"
            class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5"
            @click="goToLogin"
          >
            <span class="sr-only">Login</span>
            Login
          </button>

          <!-- User Profile Button -->
          <button
            v-else
            type="button"
            class="text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            @click="toggleDropdown"
            aria-expanded="dropdownOpen"
            aria-controls="dropdown"
          >
            <span class="sr-only">Open user menu</span>
            <img
              class="w-10 h-10 object-cover rounded-full"
              :src="profilePhoto"
              alt="profile photo"
            />
          </button>

          <!-- Dropdown Menu -->
          <div
            v-if="dropdownOpen"
            class="absolute right-0 z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
            id="dropdown"
          >
            <div class="py-3 px-4">
              <span
                class="block text-sm font-semibold text-gray-900 dark:text-white"
                >{{ username }}</span
              >
              <span
                class="block text-sm text-gray-500 truncate dark:text-gray-400"
                >{{ email }}</span
              >
            </div>
            <ul class="py-1 text-gray-500 dark:text-gray-400">
              <li>
                <a
                  href="/profile"
                  class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  My profile
                </a>
              </li>
              <li>
                <a
                  href="/likes"
                  class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    class="mr-2 w-4 h-4 text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path
                      d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z"
                    />
                  </svg>
                  My likes
                </a>
              </li>
              <li>
                <a
                  href="/saved"
                  class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    class="mr-2 w-4 h-4 text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="m1.56 6.245 8 3.924a1 1 0 0 0 .88 0l8-3.924a1 1 0 0 0 0-1.8l-8-4a1 1 0 0 0-.88 0l-8 4a1 1 0 0 0 0 1.8ZM10 14.55l-7.62-3.737a1 1 0 0 0-.88 1.8l8 4a1 1 0 0 0 .88 0l8-4a1 1 0 0 0-.88-1.8L10 14.551ZM18.44 13.45l-6.41 3.205a1 1 0 0 0 .88 1.8l8-4a1 1 0 0 0 .88-1.8l-1.77-.885Z"
                    />
                  </svg>
                  My saved
                </a>
              </li>
              <li>
                <a
                  href="/profile/settings"
                  class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="/logout"
                  class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
