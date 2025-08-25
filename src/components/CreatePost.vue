<script>
import axios from "../axios";

export default {
  name: "CreatePost",
  data() {
    return {
      description: "",
      imageUrlFile: null,
      message: "",
    };
  },
  methods: {
    handleFileUpload(event) {
      this.imageUrlFile = event.target.files[0];
    },
    async createPost() {
      try {
        const formData = new FormData();
        formData.append("description", this.description);
        if (this.imageUrlFile) {
          formData.append("ImageUrl", this.imageUrlFile);
        }

        const response = await axios.post("/posts", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          this.message = "Post created successfully";

          const createdPostResponse = await axios.get(
            `/posts/${response.data.id}`
          );
          const createdPostData = createdPostResponse.data;
          this.$emit("postCreated", {
            id: createdPostData.id,
            userName: createdPostData.userName,
            description: createdPostData.description,
            profilePhoto: `${import.meta.env.VITE_API_BASE_URL}${
              createdPostData.profilePhoto
            }`,
            imageUrl: `${import.meta.env.VITE_API_BASE_URL}${
              createdPostData.imageUrl
            }`,
            postDateTime: createdPostData.postDateTime,
          });

          this.description = "";
          this.imageUrlFile = null;
        } else {
          this.message = "Failed to create post";
        }
      } catch (error) {
        console.error("Error creating post:", error);
        this.message =
          "Error creating post: " +
          (error.response?.data?.message || error.message);
      }
    },
  },
};
</script>

<template>
  <div class="bg-white dark:bg-blue-800 rounded-lg p-5 m-2">
    <div class="my-3">
      <label
        class="block text-xl font-bold leading-6 text-blue-800 dark:text-white mb-3"
        >Create a Post</label
      >
      <div
        class="flex bg-white dark:bg-blue-900 rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
      >
        <textarea
          class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-white focus:ring-0 sm:text-sm sm:leading-6"
          v-model="description"
          placeholder="What's on your mind?"
        ></textarea>
      </div>
    </div>
    <div class="my-3">
      <label
        for="imageUrl"
        class="block text-md font-medium leading-6 text-gray-900 dark:text-white mb-1"
        >Add an optional image</label
      >
      <div
        class="flex bg-white dark:bg-blue-900 rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md ps-3 py-1"
      >
        <input
          class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-white focus:ring-0 sm:text-sm sm:leading-6"
          type="file"
          @change="handleFileUpload"
        />
      </div>
    </div>
    <div class="flex justify-end">
      <button
        @click="createPost"
        class="text-white font-bold bg-gradient-to-r from-red-400 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-md px-5 py-2.5 text-center mt-2"
      >
        Publish Post
      </button>
    </div>

    <p v-if="message">{{ message }}</p>
  </div>
</template>
