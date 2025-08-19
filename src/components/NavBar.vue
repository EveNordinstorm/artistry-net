<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      dropdownOpen: false,
      isLoading: true,
      isDarkMode: false,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "user"]),
    userName() {
      return this.user.userName || "Unknown User";
    },
    email() {
      return this.user.email || "unknown@example.com";
    },
    profilePhoto() {
      const profilePhotoPath =
        this.user.profilePhoto || "images/profiles/artistry-net-logo-11.jpg";
      return `${import.meta.env.VITE_API_BASE_URL}${profilePhotoPath}`;
    },
  },
  mounted() {
    this.fetchUserData().then(() => {
      this.isLoading = false;
    });
    this.isDarkMode = localStorage.getItem("theme") === "dark";
    if (this.isDarkMode) {
      document.documentElement.classList.add("dark");
    }
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
            userName: userData.userName,
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

    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    },
  },
};
</script>

<template>
  <header class="antialiased">
    <nav class="fixed z-50 w-full border-gray-200 px-4 lg:px-6 py-2.5">
      <div class="flex flex-wrap justify-between">
        <div class="flex justify-start items-center">
          <button
            @click="$emit('toggle-leftbar')"
            id="toggleLeftbar"
            class="p-2 mr-2 text-red rounded-lg cursor-pointer lg:hidden hover:text-white hover:bg-red-800 dark:hover:bg-blue-800 focus:bg-gray-300 dark:focus:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <svg
              class="w-[18px] h-[18px] dark:text-white"
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
              src="../assets/Artistry-net_logo-red.png"
              class="mr-3 h-28 dark:hidden"
              alt="Artistry Net Logo Light"
            />
            <img
              src="../assets/Artistry-net_logo-blue.png"
              class="mr-3 h-28 hidden dark:block"
              alt="Artistry Net Logo Dark"
            />
          </a>
        </div>

        <div class="flex items-start mt-3 ml-auto space-x-2">
          <!-- Dark Mode Button -->
          <button
            @click="toggleDarkMode"
            type="button"
            class="p-2.5 bg-blue-600 rounded-lg hover:bg-blue-900 focus:ring-2 focus:ring-blue-800"
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
            class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5"
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
            class="dropdown-menu absolute right-0 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
            id="dropdown"
          >
            <div class="py-3 px-4">
              <span
                class="block text-sm font-semibold text-gray-900 dark:text-white"
                >{{ userName }}</span
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
                  My saved
                </a>
              </li>
              <li>
                <a
                  @click="logout"
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

<style scoped>
.dropdown-menu {
  margin-top: 50px;
}
</style>
