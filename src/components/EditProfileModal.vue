<script>
import axios from "../axios";
import { decodeToken } from "../utilities/JwtHelper";
import { mapMutations } from "vuex";

export default {
  name: "EditProfileModal",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      imageUrlFile: null,
      profilePhoto: null,
      bannerPhoto: null,
      bio: "",
      userId: "",
      message: "",
    };
  },
  async mounted() {
    await this.fetchUserDetailsForEdit();
  },
  methods: {
    ...mapMutations(["setUser"]),
    closeModal() {
      this.$emit("close");
    },
    async fetchUserDetailsForEdit() {
      try {
        const token = sessionStorage.getItem("authToken");
        const decodedToken = decodeToken(token);
        const userId =
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ];

        const response = await axios.get(`/account/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { profilePhoto, bannerPhoto, bio } = response.data;
        this.profilePhoto = profilePhoto || null;
        this.bannerPhoto = bannerPhoto || null;
        this.bio = bio || "";
        this.userId = userId;
      } catch (error) {
        console.error("Error fetching user details for edit:", error);
      }
    },
    handleFileUpload(event, type) {
      const file = event.target.files[0];
      if (type === "profile") {
        this.imageUrlFile = file;
      } else if (type === "banner") {
        this.bannerPhoto = file;
      }
    },
    async submitForm() {
      try {
        const token = sessionStorage.getItem("authToken");
        const formData = new FormData();

        if (this.imageUrlFile) {
          formData.append("profilePhoto", this.imageUrlFile);
        }
        if (this.bannerPhoto) {
          formData.append("bannerPhoto", this.bannerPhoto);
        }
        formData.append("bio", this.bio);

        const response = await axios.post(
          `/account/updateProfile?userId=${this.userId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);

        // Fetch updated user details
        const updatedUserResponse = await axios.get(`/account/${this.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const updatedUser = updatedUserResponse.data;

        sessionStorage.setItem("userData", JSON.stringify(updatedUser));

        // Update Vuex state
        this.setUser(updatedUser);

        this.closeModal();

        this.message = "Profile updated successfully";
      } catch (error) {
        console.error("Error updating profile:", error.response?.data || error);
      }
    },
  },
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-96">
      <h2 class="text-lg font-bold text-blue-600 mb-4">Edit Profile</h2>
      <form @submit.prevent="submitForm">
        <div class="my-3">
          <label
            for="profilePhoto"
            class="block text-md font-medium leading-6 text-gray-900 mb-1"
            >Update your profile photo:</label
          >
          <div
            class="flex bg-white rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md ps-3 py-1"
          >
            <input
              id="profilePhoto"
              class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              type="file"
              @change="(event) => handleFileUpload(event, 'profile')"
            />
          </div>
        </div>

        <div class="my-3">
          <label
            for="bannerPhoto"
            class="block text-md font-medium leading-6 text-gray-900 mb-1"
            >Add a new banner image:</label
          >
          <div
            class="flex bg-white rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md ps-3 py-1"
          >
            <input
              id="bannerPhoto"
              class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              type="file"
              @change="(event) => handleFileUpload(event, 'banner')"
            />
          </div>
        </div>

        <div
          class="my-6 flex bg-white rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
        >
          <textarea
            id="bio"
            class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
            v-model="bio"
          ></textarea>
        </div>

        <div class="flex justify-end">
          <button
            type="button"
            class="mr-2 py-2 px-4 bg-gray-300 text-gray-800 rounded"
            @click="closeModal"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="py-2 px-4 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
        <p v-if="message" class="text-red-500">{{ message }}</p>
      </form>
    </div>
  </div>
</template>
