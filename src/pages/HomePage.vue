<template>
  <div class="header-bar container-fluid px-0">
    <div class="row sticky-top">
      <div class="col-12 bg-dark py-3 d-flex justify-content-end">
        <div class="">
          <!-- the searchbar is below -->
          <form class="d-flex pe-2">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <div v-if="account.id">
          <PostForm />
        </div>
        <Post :post="p" v-for="p in posts" :key="p.id" />
      </div>
      <div class="col-md-4">
        <Ads :ad="a" v-for="a in ads" :key="a.id" />
      </div>
    </div>
  </div>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { postsService } from '../services/PostsService'
import { AppState } from '../AppState'
import { adsService } from '../services/AdsService'
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        await postsService.getPosts()
        await adsService.getAds()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      ads: computed(() => AppState.ads)

    }
  }
}
</script>

<style scoped lang="scss">

</style>
