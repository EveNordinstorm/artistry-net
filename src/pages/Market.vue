<script>
import Product from "../components/Product.vue";
import axios from "../axios";

export default {
  name: "Market",
  components: {
    Product,
  },
  data() {
    return {
      products: [],
      isLoading: true,
      error: null,
    };
  },
  async created() {
    await this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get("/products");
        this.products = response.data
          .map((product) => ({
            ...product,
            profilePhoto: `${import.meta.env.VITE_API_BASE_URL}${
              product.profilePhoto
            }`,
            imageUrl: `${import.meta.env.VITE_API_BASE_URL}${product.imageUrl}`,
          }))
          .sort((a, b) => b.id - a.id);

        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching products:", error);
        this.error = "Error fetching products.";
        this.isLoading = false;
      }
    },
    handleProductDeleted(productId) {
      this.products = this.products.filter((item) => item.id !== productId);
    },
  },
  mounted() {
    const authToken = sessionStorage.getItem("authToken");
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (authToken && userData?.userName) {
      this.currentUser = {
        token: authToken,
        userName: userData.userName,
      };
    }
  },
};
</script>

<template>
  <img src="../assets/market.png" />

  <div v-for="product in products" :key="product.id">
    <Product
      :userId="product.userId"
      :userName="product.userName"
      :profilePhoto="product.profilePhoto"
      :title="product.title"
      :imageUrl="product.imageUrl"
      :price="product.price"
      :productId="product.id"
      :canDelete="currentUser && product.userName === currentUser.userName"
      @productDeleted="handleProductDeleted"
    />
  </div>
</template>
