
<template>
  <div class="py-1">
  </div>
  <div class="card">
    <div class="card-body">
      <form @submit.prevent="createPost()">
        <div class="form-group">
          <label for="body">What's on our mind?</label>
          <input type="text"
                 class="form-control bg-light"
                 name="body"
                 placeholder=""
                 v-model="editable.body"
                 required
          >
        </div>
        <div class="form-group">
          <label for="title">Img Url</label>
          <input type="text"
                 class="form-control bg-light"
                 name="imgUrl"
                 placeholder=""
                 v-model="editable.imgUrl"
                 required
          >
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary text-white mt-2">
            Post
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { postsService } from '../services/PostsService'
import Pop from '../utils/Pop'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async createPost() {
        try {
          await postsService.createPost(editable.value)
          editable.value = ({})
          Pop.toast('very Nice', 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }

}
</script>

<style>

</style>
