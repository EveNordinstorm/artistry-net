<script>
import CreatePost from "../components/CreatePost.vue";
import CreateProduct from "../components/CreateProduct.vue";

export default {
  name: "Publish",
  components: {
    CreatePost,
    CreateProduct,
  },
  data() {
    return {
      activeTab: "post",
    };
  },
  methods: {
    handlePostCreated(newPost) {
      this.$emit("postCreated", {
        id: newPost.id,
        userName: newPost.userName,
        description: newPost.description,
        profilePhoto: newPost.profilePhoto,
        imageUrl: newPost.imageUrl,
      });
    },
  },
};
</script>

<template>
  <div class="flex items-center justify-center bg-blue-600 rounded-xl">
    <div class="block w-full z-0 md:z-20">
      <ul
        class="flex flex-wrap text-xl font-medium text-center p-3 text-gray-500 border-b border-gray-200 rounded-t-lg bg-blue-600 dark:border-gray-700 dark:text-gray-400"
        id="defaultTab"
        role="tablist"
      >
        <li class="me-2">
          <button
            id="post-tab"
            type="button"
            role="tab"
            aria-controls="post"
            :aria-selected="activeTab === 'post'"
            @click="activeTab = 'post'"
            :class="[
              'inline-block py-4 px-6 rounded-ss-lg transition',
              activeTab === 'post'
                ? 'bg-white text-blue-600'
                : 'bg-blue-600 text-white hover:bg-blue-500',
            ]"
          >
            Post
          </button>
        </li>
        <li class="me-2">
          <button
            id="sell-tab"
            type="button"
            role="tab"
            aria-controls="sell"
            :aria-selected="activeTab === 'sell'"
            @click="activeTab = 'sell'"
            :class="[
              'inline-block py-4 px-6 transition',
              activeTab === 'sell'
                ? 'bg-white text-blue-600'
                : 'bg-blue-600 text-white hover:bg-blue-500',
            ]"
          >
            Sell
          </button>
        </li>
      </ul>
      <div id="defaultTabContent">
        <div
          :class="{ hidden: activeTab !== 'post', block: activeTab === 'post' }"
          id="post"
          role="tabpanel"
          aria-labelledby="post-tab"
        >
          <CreatePost @postCreated="handlePostCreated" />
        </div>
        <div
          :class="{ hidden: activeTab !== 'sell', block: activeTab === 'sell' }"
          id="sell"
          role="tabpanel"
          aria-labelledby="sell-tab"
        >
          <CreateProduct />
        </div>
      </div>
    </div>
  </div>
</template>
