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
  <div class="flex items-center justify-center">
    <div
      class="block w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <ul
        class="flex flex-wrap text-xl font-medium text-center p-3 text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
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
            class="inline-block p-4 text-blue-600 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500"
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
            class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          >
            Sell
          </button>
        </li>
      </ul>
      <div id="defaultTabContent">
        <div
          :class="{ hidden: activeTab !== 'post', block: activeTab === 'post' }"
          class="bg-white rounded-lg dark:bg-gray-800"
          id="post"
          role="tabpanel"
          aria-labelledby="post-tab"
        >
          <CreatePost @postCreated="handlePostCreated" />
        </div>
        <div
          :class="{ hidden: activeTab !== 'sell', block: activeTab === 'sell' }"
          class="bg-white rounded-lg dark:bg-gray-800"
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
