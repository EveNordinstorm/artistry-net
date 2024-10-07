<script>
import axios from "../axios";

export default {
  name: "Product",
  props: {
    userName: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productId: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    canDelete: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      user: null,
      showConfirm: false,
    };
  },
  computed: {
    formattedPrice() {
      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(this.price);
    },
  },
  methods: {
    navigateToProfile(userName) {
      this.$router.push({ name: "VisitProfile", params: { userName } });
    },
    // Confirm delete
    confirmDelete() {
      this.showConfirm = true;
    },

    // Delete product
    async deleteProduct() {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        console.error("Auth token is missing.");
        return;
      }
      try {
        const response = await axios.delete(`/products/${this.productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          this.$emit("productDeleted", this.productId);
          this.showConfirm = false;
        } else {
          console.error("Failed to delete the product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
  },
};
</script>

<template>
  <div
    class="w-[50px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5 my-5"
  >
    <div class="flex" @click="navigateToProfile(userName)">
      <img
        class="w-14 h-14 object-cover rounded-full"
        :src="profilePhoto"
        alt="profile picture"
      />
      <span class="pl-5 pt-2 text-3xl font-bold">{{ userName }}</span>
    </div>
    <p class="pt-3 text-xl">{{ title }}</p>
    <img
      class="w-96 h-96 object-cover mt-5"
      :src="imageUrl"
      alt="product photo"
    />
    <p class="pt-3 text-2xl font-bold text-blue-900">{{ formattedPrice }}</p>
    <button
      class="mt-3 text-lg uppercase bg-gradient-to-br from-red-400 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
    >
      Shop Now
    </button>
    <!-- Delete Button -->
    <button
      v-if="canDelete"
      @click="confirmDelete"
      class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm text-center px-4 py-2.5"
    >
      Delete
    </button>

    <!-- Confirmation Popup -->
    <div
      v-if="showConfirm"
      class="fixed inset-0 flex items-center justify-center z-50"
    >
      <div
        class="bg-white p-4 border rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700"
      >
        <p class="text-gray-700 dark:text-gray-300">
          Are you sure you want to delete this product?
        </p>
        <div class="mt-4 flex justify-end">
          <button
            @click="deleteProduct"
            class="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
          >
            Delete
          </button>
          <button
            @click="showConfirm = false"
            class="text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg ml-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
