<script>
import VisitProfileBanner from "../components/VisitProfileBanner.vue";
import Product from "../components/Product.vue";
import Post from "../components/Post.vue";
import SharedPost from "../components/SharedPost.vue";
import axios from "../axios";

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
      username: "",
    };
  },
  computed: {
    bio() {
      return this.user?.bio || "No bio available";
    },
  },
  created() {
    this.username = this.$route.params.username;
    if (this.username) {
      this.fetchUserData(this.username);
      this.fetchUserPostsAndShares();
      this.fetchUserProducts();
    } else {
      this.error = "Username is not provided.";
      this.isLoading = false;
    }
  },
  methods: {
    async fetchUserData(username) {
      try {
        const response = await axios.get(
          `/account/getUserDetailsByUsername/${username}`
        );
        this.user = response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
        this.error = "Error fetching user data.";
      }
    },
    async fetchUserPostsAndShares() {
      const username = this.$route.params.username;
      if (!username) {
        this.error = "Username not provided.";
        this.isLoading = false;
        return;
      }
      try {
        const [postsResponse, sharesResponse] = await Promise.all([
          axios.get(`/posts/getPostsByUsername/${username}`),
          axios.get(`/shares/getSharesByUsername/${username}`),
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
                  imageUrl: this.constructAbsoluteUrl(
                    share.originalPost?.imageUrl
                  ),
                  username: share.originalPost?.username || "Unknown",
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
          `/products/getProductsByUsername/${this.username}`
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
      if (!url) {
        return "";
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
      :username="user.username"
      :profilePhoto="constructAbsoluteUrl(user.profilePhoto)"
    />

    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul class="flex flex-wrap -mb-px text-sm font-bold text-center text-xl">
        <li class="me-2">
          <button
            class="inline-block p-4 border-b-2 rounded-t-lg"
            :class="{ 'border-blue-800': activeTab === 'profile' }"
            @click="activeTab = 'profile'"
          >
            Profile
          </button>
        </li>
        <li class="me-2">
          <button
            class="inline-block p-4 border-b-2 rounded-t-lg"
            :class="{ 'border-blue-800': activeTab === 'products' }"
            @click="activeTab = 'products'"
          >
            Products
          </button>
        </li>
        <li class="me-2">
          <button
            class="inline-block p-4 border-b-2 rounded-t-lg"
            :class="{ 'border-blue-800': activeTab === 'posts' }"
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
              :username="product.username"
              :profilePhoto="constructAbsoluteUrl(product.profilePhoto)"
              :title="product.title"
              :imageUrl="constructAbsoluteUrl(product.imageUrl)"
              :price="product.price"
              :productId="product.id"
            />
          </div>
        </div>
        <div v-else>
          <p>No products available.</p>
        </div>
      </div>

      <!-- Posts Tab -->
      <div v-if="activeTab === 'posts'">
        <div v-if="userPosts.length">
          <div v-for="item in userPosts" :key="item.data.id">
            <Post
              v-if="item.type === 'post'"
              :userId="item.data.userId"
              :username="item.data.username"
              :profilePhoto="constructAbsoluteUrl(item.data.profilePhoto)"
              :imageUrl="constructAbsoluteUrl(item.data.imageUrl)"
              :description="item.data.description"
              :postId="item.data.id"
              :postDateTime="item.data.postDateTime"
            />
            <SharedPost
              v-else-if="item.type === 'share'"
              :shareUsername="item.data.sharer.username"
              :shareUserPhoto="
                constructAbsoluteUrl(item.data.sharer.profilePhoto)
              "
              :originalPostUsername="item.data.originalPost.username"
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
          <p>No posts or shares available.</p>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <p v-if="error">{{ error }}</p>
    <p v-else>Loading...</p>
  </div>
</template>
