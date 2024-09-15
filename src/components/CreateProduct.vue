<script>
import axios from "../axios";

export default {
  name: "CreateProduct",
  data() {
    return {
      title: "",
      imageUrlFile: "",
      price: "",
      message: "",
    };
  },
  methods: {
    handleFileUpload(event) {
      this.imageUrlFile = event.target.files[0];
    },
    async createProduct() {
      try {
        const formattedPrice = parseFloat(this.price).toFixed(2);

        const formData = new FormData();
        formData.append("Title", this.title);
        formData.append("ImageUrl", this.imageUrlFile);
        formData.append("Price", formattedPrice);

        const response = await axios.post("/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          this.message = "Product listing created successfully";
          this.$emit("productCreated");
        } else {
          this.message = "Failed to create product listing";
        }
      } catch (error) {
        console.error("Error creating product listing:", error);
        this.message =
          "Error creating product listing: " +
          (error.response?.data?.message || error.message);
      }
    },
  },
};
</script>

<template>
  <div class="bg-blue-200 p-5 rounded">
    <div class="my-3">
      <label class="block text-xl font-bold leading-6 text-blue-600 mb-3"
        >List a Product</label
      >
      <div
        class="flex bg-white rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
      >
        <textarea
          class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
          v-model="title"
          placeholder="Title"
        ></textarea>
      </div>
    </div>
    <div class="my-3">
      <label
        for="profilePhoto"
        class="block text-md font-medium leading-6 text-gray-900 mb-1"
        >Product Image:</label
      >
      <div
        class="flex bg-white rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md ps-3 py-1"
      >
        <input
          class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
          type="file"
          @change="handleFileUpload"
        />
      </div>
    </div>
    <div class="my-3 mt-5">
      <label class="block text-md font-medium leading-6 text-gray-900 mb-1"
        >Price (in £):</label
      >
      <input
        type="number"
        step="0.01"
        class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
        v-model="price"
        placeholder="Price"
      />
    </div>
    <button
      @click="createProduct"
      class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center mt-2"
    >
      Create Listing
    </button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>
