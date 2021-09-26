<template>
  <div class="">
    <div class="card my-3 shadow">
      <div class="card-body">
        <div class="space-it d-flex justify-content-between">
          <div class="profile">
            <router-link :to="{name: 'Profile', params: {id: post.creatorId}}" class="selectable">
              <div class="creator d-flex">
                <img :src="post.creator.picture" alt="" height="40" class="circleprof shadow">
                <h5 class=" mt-2 ms-3 card-title">
                  {{ post.creator.name }}
                </h5>
              </div>
            </router-link>
          </div>
          <div class="delete">
            <div class="" v-if="account.id == post.creatorId">
              <i class="mdi mdi-close text-danger f-18 selectable" @click="deletePost()"></i>
            </div>
          </div>
        </div>
        <p class=" mt-3 card-text">
          {{ post.body }}
        </p>
        <p class="card-text">
          <small class="text-muted">4hrs ago</small>
        </p>
      </div>
      <img :src="post.imgUrl" class="card-img-bottom" alt="...">
      <div class="pe-2 py-1 d-flex justify-content-end">
        <h5 class="pe-1">
          {{ post.likes.length }}
        </h5>
        <div class="unliked" v-if="post.likeIds.includes(account.id)">
          <i class="mdi mdi-heart f-16 selectable" @click="likePost()"></i>
        </div>
        <div class="unliked" v-else>
          <i class="mdi mdi-heart-outline f-16 selectable" @click="likePost()"></i>
        </div>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import Pop from '../utils/Pop'
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async likePost() {
        try {
          await postsService.likePost(props.post.id)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async deletePost() {
        try {
          await postsService.deletePost(props.post.id)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }

}
</script>

<style lang="scss">
.circleprof {
  border-top-left-radius: 50% 50%;
  border-top-right-radius: 50% 50%;
  border-bottom-right-radius: 50% 50%;
  border-bottom-left-radius: 50% 50%;
}
.c-height{
  max-height: 30vh;
}

</style>
