<template>
  <div class="container-fluid px-0">
    <div class="row sticky-top">
      <div class="col-12 bg-dark py-2">
        <h1> top bar</h1>
      </div>
    </div>
    <div class="row back-img" :style="{backgroundImage: `url(${profile.coverImg})`}">
      <div class="col-12" v-if="account.id === profile.id">
        <div class="bot-right">
          <button class="btn btn-light">
            Edit
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <Post :post="p" v-for="p in posts" :key="p.id" />
      </div>
      <div class="col-md-4">
        <Ads :ad="a" v-for="a in ads" :key="a.id" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { postsService } from '../services/PostsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { profileService } from '../services/ProfileService'
import { adsService } from '../services/AdsService'
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
      if (route) {
        await adsService.getAds()
        await profileService.getProfileById(route.params.id)
        getPosts()
      }
    })
    return {
      profile: computed(() => AppState.profile),
      posts: computed(() => AppState.posts),
      ads: computed(() => AppState.ads),
      account: computed(() => AppState.account)
    }
  }
}

</script>

<style lang="scss">
.back-img{
height: 30vh;
  background-position: center center;
}

</style>
