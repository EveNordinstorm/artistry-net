<script>
import VisitProfileBanner from "../components/VisitProfileBanner.vue";
import Product from "../components/Product.vue";
import Post from "../components/Post.vue";
import SharedPost from "../components/SharedPost.vue";
import axios from "../axios";
import { mapGetters } from "vuex";

export default {
  name: "VisitProfile",
  components: {
    VisitProfileBanner,
    Product,
    Post,
    SharedPost,
  },
  data() {
    return {
      activeTab: "profile",
      products: [],
      userPosts: [],
      isLoading: true,
      error: null,
      user: null,
      userName: "",
      currentUser: JSON.parse(sessionStorage.getItem("userData")) || null,
    };
  },
  computed: {
    ...mapGetters(["isFollowing"]),
    bio() {
      return this.user?.bio || "No bio available";
    },
    authToken() {
      return this.currentUser?.token;
    },
  },
  created() {
    this.userName = this.$route.params.userName;
    if (this.userName) {
      this.fetchUserData(this.userName);
      this.fetchUserPostsAndShares();
      this.fetchUserProducts();
    } else {
      this.error = "UserName is not provided.";
      this.isLoading = false;
    }
  },
  methods: {
    async fetchUserData(userName) {
      try {
        const response = await axios.get(
          `/account/getUserDetailsByUserName/${userName}`
        );
        this.user = response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
        this.error = "Error fetching user data.";
      }
    },
    async fetchUserPostsAndShares() {
      const userName = this.$route.params.userName;
      if (!userName) {
        this.error = "UserName not provided.";
        this.isLoading = false;
        return;
      }
      try {
        const [postsResponse, sharesResponse] = await Promise.all([
          axios.get(`/posts/getPostsByUserName/${userName}`),
          axios.get(`/shares/getSharesByUserName/${userName}`),
        ]);

        const posts = postsResponse.data.map((post) => ({
          type: "post",
          data: {
            ...post,
            profilePhoto: this.constructAbsoluteUrl(post.profilePhoto),
            imageUrl: this.constructAbsoluteUrl(post.imageUrl),
            postDateTime: post.postDateTime,
          },
          date: new Date(post.postDateTime),
        }));

        const shares = sharesResponse.data
          .map((share) => {
            if (!share || !share.id) {
              console.warn("Share data is missing or invalid:", share);
              return null;
            }
            return {
              type: "share",
              data: {
                ...share,
                sharer: {
                  userName: share.sharer?.userName || "Unknown",
                  profilePhoto: this.constructAbsoluteUrl(
                    share.sharer?.profilePhoto
                  ),
                },
                postDetails: {
                  ...share.originalPost,
                  profilePhoto: this.constructAbsoluteUrl(
                    share.originalPost?.profilePhoto
                  ),
                  imageUrl: this.constructAbsoluteUrl(
                    share.originalPost?.imageUrl
                  ),
                  userName: share.originalPost?.userName || "Unknown",
                  description:
                    share.originalPost?.description ||
                    "No description available",
                  postDateTime: share.originalPost?.postDateTime
                    ? new Date(share.originalPost?.postDateTime).toISOString()
                    : "",
                },
              },
              date: new Date(share.shareDateTime),
              shareDateTime: new Date(share.shareDateTime).toISOString(),
            };
          })
          .filter((share) => share !== null);

        this.userPosts = [...posts, ...shares].sort((a, b) => b.date - a.date);
      } catch (error) {
        console.error("Error fetching posts and shares:", error);
        this.error = "Error fetching posts and shares.";
      } finally {
        this.isLoading = false;
      }
    },
    async fetchUserProducts() {
      try {
        const response = await axios.get(
          `/products/getProductsByUserName/${this.userName}`
        );
        this.products = response.data.map((product) => ({
          ...product,
          profilePhoto: this.constructAbsoluteUrl(product.profilePhoto),
          imageUrl: this.constructAbsoluteUrl(product.imageUrl),
        }));
      } catch (error) {
        console.error("Error fetching products:", error);
        this.error = "Error fetching products.";
      }
    },
    constructAbsoluteUrl(url) {
      if (!url || url === "null" || url === "") {
        return `${
          import.meta.env.VITE_API_BASE_URL
        }/images/banners/david-pisnoy-46juD4zY1XA-unsplash.jpg`;
      }

      const baseUrl = process.env.VUE_APP_API_URL || "https://localhost:5000";
      return url.startsWith("http") ? url : `${baseUrl}${url}`;
    },
  },
};
</script>

<template>
  <div v-if="user">
    <VisitProfileBanner
      :userName="user.userName"
      :profilePhoto="constructAbsoluteUrl(user.profilePhoto)"
      :bannerPhoto="constructAbsoluteUrl(user.bannerPhoto)"
      :isFollowing="isFollowing(user.userName)"
    />

    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul class="flex flex-wrap -mb-px text-sm font-bold text-center text-xl">
        <li class="me-2">
          <button
            class="text-blue-800 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-400 inline-block p-4 border-b-2 rounded-t-lg"
            :class="{
              'border-blue-800 dark:border-blue-400': activeTab === 'profile',
            }"
            @click="activeTab = 'profile'"
          >
            Profile
          </button>
        </li>
        <li class="me-2">
          <button
            class="text-blue-800 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-400 inline-block p-4 border-b-2 rounded-t-lg"
            :class="{
              'border-blue-800 dark:border-blue-400': activeTab === 'products',
            }"
            @click="activeTab = 'products'"
          >
            Products
          </button>
        </li>
        <li class="me-2">
          <button
            class="text-blue-800 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-400 inline-block p-4 border-b-2 rounded-t-lg"
            :class="{
              'border-blue-800 dark:border-blue-400': activeTab === 'posts',
            }"
            @click="activeTab = 'posts'"
          >
            Posts
          </button>
        </li>
      </ul>
    </div>

    <div>
      <!-- Profile Tab -->
      <div
        v-if="activeTab === 'profile'"
        class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Bio</h3>
        <p class="text-base font-normal dark:text-gray-400 py-3">{{ bio }}</p>
      </div>

      <!-- Products Tab -->
      <div v-if="activeTab === 'products'">
        <div v-if="products.length">
          <div v-for="product in products" :key="product.id">
            <Product
              :userId="product.userId"
              :userName="product.userName"
              :profilePhoto="constructAbsoluteUrl(product.profilePhoto)"
              :title="product.title"
              :imageUrl="constructAbsoluteUrl(product.imageUrl)"
              :price="product.price"
              :productId="product.id"
            />
          </div>
        </div>
        <div v-else>
          <p class="text-black dark:text-white">No products available.</p>
        </div>
      </div>

      <!-- Posts Tab -->
      <div v-if="activeTab === 'posts'">
        <div v-if="userPosts.length">
          <div v-for="item in userPosts" :key="item.data.id">
            <Post
              v-if="item.type === 'post'"
              :userId="item.data.userId"
              :userName="item.data.userName"
              :profilePhoto="constructAbsoluteUrl(item.data.profilePhoto)"
              :imageUrl="constructAbsoluteUrl(item.data.imageUrl)"
              :description="item.data.description"
              :postId="item.data.id"
              :postDateTime="item.data.postDateTime"
            />
            <SharedPost
              v-else-if="item.type === 'share'"
              :shareUserName="item.data.sharer.userName"
              :shareUserPhoto="
                constructAbsoluteUrl(item.data.sharer.profilePhoto)
              "
              :originalPostUserName="item.data.originalPost.userName"
              :originalPostProfilePhoto="
                constructAbsoluteUrl(item.data.originalPost.profilePhoto)
              "
              :originalPostImageUrl="
                constructAbsoluteUrl(item.data.originalPost.imageUrl)
              "
              :originalPostDescription="item.data.originalPost.description"
              :originalPostId="item.data.originalPost.id"
              :originalPostDateTime="item.data.originalPost.postDateTime"
              :shareDateTime="item.shareDateTime"
            />
          </div>
        </div>
        <div v-else>
          <p class="text-black dark:text-white">No posts or shares yet.</p>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <p v-if="error" class="text-black dark:text-white">{{ error }}</p>
    <p v-else class="text-black dark:text-white">Loading...</p>
  </div>
</template>
