<template>
  <div class="">
    <div class="card my-3">
      <div class="card-body">
        <div class="creator d-flex">
          <img :src="post.creator.picture" alt="" height="40" class="circleprof shadow">
          <h5 class=" mt-2 ms-3 card-title">
            {{ post.creator.name }}
          </h5>
        </div>
        <p class=" mt-3 card-text">
          {{ post.body }}
        </p>
        <p class="card-text">
          <small class="text-muted">4hrs ago</small>
        </p>
      </div>
      <img :src="post.imgUrl" class="card-img-bottom" alt="...">
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  props: {
    post: {
      type: Object,
      required: true
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
</style>
