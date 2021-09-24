
<template>
  <div>
    <h1 class="text-center">
      Create A Post
    </h1>
  </div>
  <form @submit.prevent="createPost()">
    <div class="form-group">
      <label for="body">Body</label>
      <input type="text"
             class="form-control bg-light"
             name="body"
             placeholder="post body"
             v-model="editable.body"
             required
      >
    </div>
    <div class="form-group">
      <label for="title">Img Url</label>
      <input type="text"
             class="form-control bg-light"
             name="imgUrl"
             placeholder="Img Url...."
             v-model="editable.imgUrl"
             required
      >
    </div>
  </form>
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
