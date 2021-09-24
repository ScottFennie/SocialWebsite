<template>
  <div class="header-bar container-fluid px-0">
    <div class="row">
      <div class="col-12 bg-dark py-2">
        <h1> top bar</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8" v-for="p in posts" :key="p.id">
        <div v-if="account.id">
        </div>
        <Post :post="p" />
      </div>
      <div class="col-md-4">
        <h3>ads here</h3>
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
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        await postsService.getPosts()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
