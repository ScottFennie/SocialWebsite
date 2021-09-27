<template>
  <div class="header-bar container-fluid px-0">
    <div class="row sticky-top shadow-sm">
      <div class="col-12 bg-grad bg-white py-3 d-flex justify-content-between">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg"
               width="35"
               height="35"
               fill="currentColor"
               class=" ps-1 bi bi-bootstrap text-white"
               viewBox="0 0 16 16"
          >
            <path d="M5.062 12h3.475c1.804 0 2.888-.908 2.888-2.396 0-1.102-.761-1.916-1.904-2.034v-.1c.832-.14 1.482-.93 1.482-1.816 0-1.3-.955-2.11-2.542-2.11H5.062V12zm1.313-4.875V4.658h1.78c.973 0 1.542.457 1.542 1.237 0 .802-.604 1.23-1.764 1.23H6.375zm0 3.762V8.162h1.822c1.236 0 1.887.463 1.887 1.348 0 .896-.627 1.377-1.811 1.377H6.375z" />
            <path d="M0 4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4zm4-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3H4z" />
          </svg>
        </div>
        <div class="">
          <PostFinder />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <div v-if="account.id">
          <PostForm />
        </div>
        <Post :post="p" v-for="p in posts" :key="p.id" />
        <div class="row pb-3">
          <div class="col-6 text-center">
            <div class="button" @click="getPostsPageMinus()">
              <button class="btn btn-primary">
                Newer
              </button>
            </div>
          </div>
          <div class="col-6 text-center">
            <div class="button">
              <button class="btn btn-primary" @click="getPostsPagePlus()">
                Older
              </button>
            </div>
          </div>
        </div>
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
      ads: computed(() => AppState.ads),
      currentpage: computed(() => AppState.currentpage),
      totalpages: computed(() => AppState.totalpages),

      async getPostsPagePlus() {
        try {
          if (this.currentpage < this.totalpages) {
            await postsService.getPosts({}, this.currentpage += 1)
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async getPostsPageMinus() {
        try {
          if (this.currentpage > 1) {
            await postsService.getPosts({}, this.currentpage -= 1)
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }

    }
  }
}
</script>

<style scoped lang="scss">

.bg-grad{
background-color: #8EC5FC;
background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
}

</style>
