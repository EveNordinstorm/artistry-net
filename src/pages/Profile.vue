<script>
import { mapGetters, mapMutations } from 'vuex';
import ProfileBanner from '../components/ProfileBanner.vue';
import Timeline from '../components/Timeline.vue';
import Post from '../components/Post.vue';
import SharedPost from '../components/SharedPost.vue';
import axios from '../axios';

export default {
  name: "Profile",
  components: {
    ProfileBanner,
    Timeline,
    Post,
    SharedPost
  },
  data() {
    return {
      userPosts: [],
      isLoading: true,
      error: null
    };
  },
  computed: {
    ...mapGetters(['user']),
    bio() {
      return this.user.bio;
    }
  },
  created() {
    this.initUserAndFetchPosts();
  },
  methods: {
    ...mapMutations(['setUser']),
    constructAbsoluteUrl(relativePath) {
      if (!relativePath.startsWith('http') && relativePath.startsWith('/')) {
        return `${import.meta.env.VITE_API_BASE_URL}${relativePath}`;
      }
      return relativePath;
    },
    async initUserAndFetchPosts() {
    // Attempt to retrieve user data from session storage
    let userData;
    try {
      userData = JSON.parse(sessionStorage.getItem('userData'));
    } catch (error) {
      this.error = 'Error parsing user data from session storage.';
      this.isLoading = false;
      return;
    }

    // If user data exists, set it in the Vuex store
    if (userData) {
      this.setUser(userData);
    } else {
      this.error = 'User data is not available.';
      this.isLoading = false;
      return;
    }

    await this.fetchUserPosts();
  },
    async fetchUserPosts() {
  const token = sessionStorage.getItem('authToken');
  if (!token) {
    console.error('Auth token is missing.');
    this.error = 'Auth token is missing.';
    this.isLoading = false;
    return;
  }
  try {
    const [postsResponse, sharesResponse] = await Promise.all([
      axios.get('/posts/user', {
        headers: { Authorization: `Bearer ${token}` }
      }),
      axios.get('/shares/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
    ]);

    console.log('Posts response:', postsResponse.data);
    console.log('Shares response:', sharesResponse.data);

    const posts = postsResponse.data.map(post => ({
      type: 'post',
      data: {
        ...post,
        profilePhoto: this.constructAbsoluteUrl(post.profilePhoto),
        imageUrl: this.constructAbsoluteUrl(post.imageUrl),
        postDateTime: post.postDateTime ? new Date(post.postDateTime).toISOString() : ''
      },
      date: new Date(post.postDateTime)
    }));

    const shares = sharesResponse.data.map(share => {
      if (!share || !share.id) {
        console.warn('Share data is missing or invalid:', share);
        return null;
      }
      return {
        type: 'share',
        data: {
          ...share,
          sharer: {
            username: share.sharer?.username || 'Unknown',
            profilePhoto: this.constructAbsoluteUrl(share.sharer?.profilePhoto)
          },
          postDetails: {
            ...share.originalPost,
            profilePhoto: this.constructAbsoluteUrl(share.originalPost?.profilePhoto),
            imageUrl: this.constructAbsoluteUrl(share.originalPost?.imageUrl),
            username: share.originalPost?.username || 'Unknown',
            description: share.originalPost?.description || 'No description available',
            postDateTime: share.originalPost?.postDateTime ? new Date(share.originalPost?.postDateTime).toISOString() : ''
          }
        },
        date: new Date(share.shareDateTime),
        shareDateTime: new Date(share.shareDateTime).toISOString()
      };
    }).filter(share => share !== null);

    this.userPosts = [...posts, ...shares].sort((a, b) => b.date - a.date);
    console.log('Combined user posts:', this.userPosts);
    this.isLoading = false;
  } catch (error) {
    console.error('Error fetching user posts or shares:', error);
    this.error = 'Error fetching posts or shares.';
    this.isLoading = false;
  }
}
  }
};
</script>

<template>

<ProfileBanner />

<div class="mb-4 border-b border-gray-200 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px text-sm font-bold text-center text-xl" id="default-styled-tab" data-tabs-toggle="#default-styled-tab-content" data-tabs-active-classes="text-blue-800 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-400 border-blue-800 dark:border-blue-400" data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300" role="tablist">
        <li class="me-2" role="presentation">
            <button class="inline-block p-4 border-b-2 rounded-t-lg" id="profile-styled-tab" data-tabs-target="#styled-profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
        </li>
        <li class="me-2" role="presentation">
            <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="products-styled-tab" data-tabs-target="#styled-products" type="button" role="tab" aria-controls="products" aria-selected="false">Products</button>
        </li>
        <li class="me-2" role="presentation">
            <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="posts-styled-tab" data-tabs-target="#styled-posts" type="button" role="tab" aria-controls="posts" aria-selected="false">Posts</button>
        </li>
    </ul>
</div>
<div id="default-styled-tab-content">
    <div class="hidden" id="styled-profile" role="tabpanel" aria-labelledby="profile-tab">
      <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Bio</h3>  
      <p class="text-base font-normal dark:text-gray-400 py-3">{{ bio }}</p>
      </div>
      <Timeline />
    </div>

    
<div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-products" role="tabpanel" aria-labelledby="products-tab">
  <div class="flex items-center justify-center py-4 md:py-8 flex-wrap pt-5">
    <button type="button" class="text-white bg-red-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800">All categories</button>
    <button type="button" class="text-white bg-blue-600 hover:bg-red-800 dark:bg-gray-900 dark:hover:border-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Graphic Design</button>
    <button type="button" class="text-white bg-blue-600 hover:bg-red-800 dark:bg-gray-900 dark:hover:border-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Illustration</button>
    <button type="button" class="text-white bg-blue-600 hover:bg-red-800 dark:bg-gray-900 dark:hover:border-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Web Design</button>
    <button type="button" class="text-white bg-blue-600 hover:bg-red-800 dark:bg-gray-900 dark:hover:border-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Product Design</button>
  </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div class="grid gap-4">
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" alt="">
        </div>
    </div>
    <div class="grid gap-4">
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" alt="">
        </div>
    </div>
    <div class="grid gap-4">
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" alt="">
        </div>
    </div>
    <div class="grid gap-4">
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg" alt="">
        </div>
    </div>
  </div>
</div>


    <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-posts" role="tabpanel" aria-labelledby="posts-tab">
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