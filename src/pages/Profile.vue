<script>
import { mapGetters, mapMutations } from "vuex";
import ProfileBanner from "../components/ProfileBanner.vue";
import Product from "../components/Product.vue";
import Post from "../components/Post.vue";
import SharedPost from "../components/SharedPost.vue";
import axios from "../axios";

export default {
  name: "Profile",
  components: {
    ProfileBanner,
    Product,
    Post,
    SharedPost,
  },
  data() {
    return {
      currentUser: null,
      products: [],
      userPosts: [],
      isLoading: true,
      error: null,
    };
  },
  computed: {
    ...mapGetters(["user"]),
    bio() {
      return this.user.bio;
    },
  },
  created() {
    this.initUserAndFetchPosts();
    this.fetchUserProducts();
  },
  methods: {
    ...mapMutations(["setUser"]),
    constructAbsoluteUrl(relativePath) {
      if (!relativePath.startsWith("http") && relativePath.startsWith("/")) {
        return `${import.meta.env.VITE_API_BASE_URL}${relativePath}`;
      }
      return relativePath;
    },
    async initUserAndFetchPosts() {
      let userData;
      try {
        userData = JSON.parse(sessionStorage.getItem("userData"));
      } catch (error) {
        this.error = "Error parsing user data from session storage.";
        this.isLoading = false;
        return;
      }

      if (userData) {
        this.setUser(userData);
        await this.$store.dispatch("fetchFollowerCounts", userData.userName);
      } else {
        this.error = "User data is not available.";
        this.isLoading = false;
        return;
      }

      await this.fetchUserPosts();
    },
    async fetchUserPosts() {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        console.error("Auth token is missing.");
        this.error = "Auth token is missing.";
        this.isLoading = false;
        return;
      }
      try {
        const [postsResponse, sharesResponse] = await Promise.all([
          axios.get("/posts/user", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("/shares/user", {
            headers: { Authorization: `Bearer ${token}` },
          }),
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
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching user posts or shares:", error);
        this.error = "Error fetching posts or shares.";
        this.isLoading = false;
      }
    },
    async fetchUserProducts() {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        console.error("Auth token is missing.");
        this.error = "Auth token is missing.";
        this.isLoading = false;
        return;
      }
      try {
        const productsResponse = await axios.get("/products/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.products = productsResponse.data.map((product) => ({
          ...product,
          profilePhoto: this.constructAbsoluteUrl(product.profilePhoto),
          imageUrl: this.constructAbsoluteUrl(product.imageUrl),
        }));
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching user products:", error);
        this.error = "Error fetching products.";
        this.isLoading = false;
      }
    },
    handleProductDeleted(productId) {
      this.products = this.products.filter((item) => item.id !== productId);
    },
    handlePostDeleted(postId) {
      this.userPosts = this.userPosts.filter((item) => {
        if (item.type === "share") {
          return item.data.postDetails.id !== postId;
        } else {
          return item.data.id !== postId;
        }
      });
    },
    handleShareRemoved(postId) {
      this.userPosts = this.userPosts.filter(
        (item) =>
          !(item.type === "share" && item.data.postDetails.id === postId)
      );
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
    </div>

    <div
      class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
      id="styled-products"
      role="tabpanel"
      aria-labelledby="products-tab"
    >
      <div v-if="products.length">
        <div v-for="product in products" :key="product.id">
          <Product
            :userId="product.userId"
            :userName="product.userName"
            :profilePhoto="product.profilePhoto"
            :title="product.title"
            :imageUrl="product.imageUrl"
            :price="product.price"
            :productId="product.id"
            :canDelete="
              currentUser && product.userName === currentUser.userName
            "
            @productDeleted="handleProductDeleted"
          />
        </div>
      </div>
      <div v-else>
        <p>No products available.</p>
      </div>
    </div>

    <div
      class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
      id="styled-posts"
      role="tabpanel"
      aria-labelledby="posts-tab"
    >
      <div v-if="userPosts.length">
        <div v-for="item in userPosts" :key="item.data.id">
          <Post
            v-if="item.type === 'post'"
            :userName="item.data.userName"
            :profilePhoto="item.data.profilePhoto"
            :postDateTime="item.data.postDateTime"
            :description="item.data.description"
            :imageUrl="item.data.imageUrl"
            :postId="item.data.id"
            :canDelete="
              currentUser && item.data.userName === currentUser.userName
            "
            @postDeleted="handlePostDeleted"
            @shareRemoved="handleShareRemoved"
          />

          <SharedPost
            v-else-if="item.type === 'share'"
            :shareUserName="item.data.sharer.userName"
            :shareUserPhoto="item.data.sharer.profilePhoto"
            :shareDateTime="item.shareDateTime"
            :originalPostUserName="item.data.postDetails.userName"
            :originalPostProfilePhoto="item.data.postDetails.profilePhoto"
            :originalPostDateTime="item.data.postDetails.postDateTime"
            :originalPostDescription="item.data.postDetails.description"
            :originalPostImageUrl="item.data.postDetails.imageUrl"
            :originalPostId="item.data.postDetails.id"
            @postDeleted="removePost(item.data.postDetails.id)"
            @shareRemoved="removeShare(item.data.id)"
          />
        </div>
      </div>
      <div v-else>
        <p>No posts or shares yet.</p>
      </div>
    </div>
  </div>
</template>
