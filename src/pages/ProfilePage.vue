<template>
  <div class="">
    <img :src="profile.coverImg" alt="">
    <Post :post="p" v-for="p in posts" :key="p.id" />
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { postsService } from '../services/PostsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { profileService } from '../services/ProfileService'
export default {
  setup() {
    const route = useRoute()
    async function getPosts() {
      try {
        await postsService.getPosts({ creatorId: route.params.id })
      } catch (error) {
        Pop.toast('error get posts by id', error)
      }
    }
    watchEffect(async() => {
      if (route.params.id) {
        await profileService.getProfileById(route.params.id)
        getPosts()
      }
    })
    return {
      profile: computed(() => AppState.profile),
      posts: computed(() => AppState.posts)
    }
  }
}

</script>

<style lang="scss">
.back-img{
max-height: 20vh;
}

</style>
