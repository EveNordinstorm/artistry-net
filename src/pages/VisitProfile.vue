<script>
import { mapGetters } from "vuex";
import ProfileBanner from "../components/ProfileBanner.vue";
import Timeline from "../components/Timeline.vue";
import Post from "../components/Post.vue";
import SharedPost from "../components/SharedPost.vue";
import Product from "../components/Product.vue";
import axios from "../axios";

export default {
  name: "VisitProfile",
  components: {
    ProfileBanner,
    Timeline,
    Post,
    SharedPost,
    Product,
  },
  data() {
    return {
      visitedUser: null,
      userPosts: [],
      products: [],
      isLoading: true,
      error: null,
    };
  },
  computed: {
    ...mapGetters(["user"]),
    bio() {
      return this.visitedUser.bio ? this.visitedUser.bio : "";
    },
  },
  async created() {
    await this.fetchVisitedUserAndPosts();
    await this.fetchProducts();
  },
  methods: {
    constructAbsoluteUrl(relativePath) {
      if (!relativePath.startsWith("http") && relativePath.startsWith("/")) {
        return `${import.meta.env.VITE_API_BASE_URL}${relativePath}`;
      }
      return relativePath;
    },
    async fetchVisitedUserAndPosts() {
      const username = this.$route.params.username;

      if (!username) {
        this.error = "Username is missing.";
        this.isLoading = false;
        return;
      }

      try {
        const userIdResponse = await axios.get(
          `/account/getUserIdByUsername/${username}`
        );
        const userId = userIdResponse.data.Id;

        if (!userId) {
          throw new Error("User ID not found.");
        }

        const userResponse = await axios.get(`/account/${userId}`);
        this.visitedUser = userResponse.data || {};

        if (this.visitedUser.id) {
          await this.fetchUserPosts(this.visitedUser.id);
        } else {
          throw new Error("User not found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        this.error =
          error.response?.status === 404
            ? "User not found."
            : "Error fetching user data.";
        this.isLoading = false;
      }
    },
    async fetchUserPosts(userId) {
      try {
        const [postsResponse, sharesResponse] = await Promise.all([
          axios.get(`/posts/user/${userId}`),
          axios.get(`/shares/user/${userId}`),
        ]);

        const posts = postsResponse.data.map((post) => ({
          type: "post",
          data: {
            ...post,
            profilePhoto: this.constructAbsoluteUrl(post.profilePhoto),
            imageUrl: this.constructAbsoluteUrl(post.imageUrl),
            postDateTime: post.postDateTime
              ? new Date(post.postDateTime).toISOString()
              : "",
          },
          date: new Date(post.postDateTime),
        }));

        const shares = sharesResponse.data.map((share) => ({
          type: "share",
          data: {
            ...share,
            sharer: {
              username: share.sharer?.username || "Unknown",
              profilePhoto: this.constructAbsoluteUrl(
                share.sharer?.profilePhoto
              ),
            },
            postDetails: {
              ...share.originalPost,
              profilePhoto: this.constructAbsoluteUrl(
                share.originalPost?.profilePhoto
              ),
              imageUrl: this.constructAbsoluteUrl(share.originalPost?.imageUrl),
              username: share.originalPost?.username || "Unknown",
              description:
                share.originalPost?.description || "No description available",
              postDateTime: share.originalPost?.postDateTime
                ? new Date(share.originalPost?.postDateTime).toISOString()
                : "",
            },
          },
          date: new Date(share.shareDateTime),
          shareDateTime: new Date(share.shareDateTime).toISOString(),
        }));

        this.userPosts = [...posts, ...shares].sort((a, b) => b.date - a.date);
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching posts:", error);
        this.error = "Error fetching posts or shares.";
        this.isLoading = false;
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get("/products");
        this.products = response.data.map((product) => ({
          ...product,
          profilePhoto: `${import.meta.env.VITE_API_BASE_URL}${
            product.profilePhoto
          }`,
          imageUrl: `${import.meta.env.VITE_API_BASE_URL}${product.imageUrl}`,
        }));
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching products:", error);
        this.error = "Error fetching products.";
        this.isLoading = false;
      }
    },
  },
};
</script>

<template>
  <ProfileBanner />

  <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
    <ul
      class="flex flex-wrap -mb-px text-sm font-bold text-center text-xl"
      id="default-styled-tab"
      data-tabs-toggle="#default-styled-tab-content"
      data-tabs-active-classes="text-blue-800 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-400 border-blue-800 dark:border-blue-400"
      data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300"
      role="tablist"
    >
      <li class="me-2" role="presentation">
        <button
          class="inline-block p-4 border-b-2 rounded-t-lg"
          id="profile-styled-tab"
          data-tabs-target="#styled-profile"
          type="button"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
        >
          Profile
        </button>
      </li>
      <li class="me-2" role="presentation">
        <button
          class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
          id="products-styled-tab"
          data-tabs-target="#styled-products"
          type="button"
          role="tab"
          aria-controls="products"
          aria-selected="false"
        >
          Products
        </button>
      </li>
      <li class="me-2" role="presentation">
        <button
          class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
          id="posts-styled-tab"
          data-tabs-target="#styled-posts"
          type="button"
          role="tab"
          aria-controls="posts"
          aria-selected="false"
        >
          Posts
        </button>
      </li>
    </ul>
  </div>
  <div id="default-styled-tab-content">
    <div
      class="hidden"
      id="styled-profile"
      role="tabpanel"
      aria-labelledby="profile-tab"
    >
      <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Bio</h3>
        <p class="text-base font-normal dark:text-gray-400 py-3">{{ bio }}</p>
      </div>
      <Timeline />
    </div>

    <div
      class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
      id="styled-products"
      role="tabpanel"
      aria-labelledby="products-tab"
    >
      <div v-for="product in products" :key="product.id">
        <Product
          :userId="product.userId"
          :username="product.username"
          :profilePhoto="product.profilePhoto"
          :title="product.title"
          :imageUrl="product.imageUrl"
          :price="product.price"
          :productId="product.id"
        />
      </div>
    </div>

    <div
      class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
      id="styled-posts"
      role="tabpanel"
      aria-labelledby="posts-tab"
    >
      <div v-if="isLoading" class="loading-indicator">Loading...</div>

      <div v-else>
        <div v-for="item in userPosts" :key="item.data.id">
          <Post
            v-if="item.type === 'post'"
            :username="item.data.username"
            :profilePhoto="item.data.profilePhoto"
            :postDateTime="item.data.postDateTime"
            :description="item.data.description"
            :imageUrl="item.data.imageUrl"
            :postId="item.data.id"
          />

          <SharedPost
            v-else-if="item.type === 'share'"
            :shareUsername="item.data.sharer.username"
            :shareUserPhoto="item.data.sharer.profilePhoto"
            :shareDateTime="item.date"
            :originalPostUsername="item.data.postDetails.username"
            :originalPostProfilePhoto="item.data.postDetails.profilePhoto"
            :originalPostDateTime="item.data.postDetails.postDateTime"
            :originalPostDescription="item.data.postDetails.description"
            :originalPostImageUrl="item.data.postDetails.imageUrl"
            :postId="item.data.postDetails.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>
