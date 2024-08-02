<script>
import Friend from '../components/Friend.vue';
import SuggestedFriend from '../components/SuggestedFriend.vue';

export default {
  name: "Friends",
  components: {
    Friend,
    SuggestedFriend
  }
}
</script>

<template>
    

  <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px text-sm font-bold text-center text-xl" id="default-styled-tab" data-tabs-toggle="#default-styled-tab-content" data-tabs-active-classes="text-blue-800 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-400 border-blue-800 dark:border-blue-400" data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300" role="tablist">
        <li class="me-2" role="presentation">
            <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="following-styled-tab" data-tabs-target="#styled-following" type="button" role="tab" aria-controls="following" aria-selected="false">Following</button>
        </li>
        <li class="me-2" role="presentation">
            <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="followers-styled-tab" data-tabs-target="#styled-followers" type="button" role="tab" aria-controls="followers" aria-selected="false">Followers</button>
        </li>
    </ul>
</div>
<div id="default-styled-tab-content">
    <div class="hidden" id="styled-following" role="tabpanel" aria-labelledby="following-tab">
        <div class="rounded bg-gray-200 mb-10 p-4">
            <h2 class="text-2xl pb-5 pl-2">Suggested For You</h2>
            <div class="sm:block lg:flex p-3 gap-4">
                <SuggestedFriend />
                <SuggestedFriend />
                <SuggestedFriend />
                <SuggestedFriend />
            </div>
        </div>

      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
    </div>
</div>
<div id="default-styled-tab-content">
    <div class="hidden" id="styled-followers" role="tabpanel" aria-labelledby="followers-tab">
        <Friend />
        <Friend />
        <Friend />
        <Friend />
    </div>
</div>
</template>