<template>
  <div class="searchbar">
    <form class="d-flex pe-2" @submit.prevent="findPosts()">
      <input v-model="query"
             class="form-control me-2"
             name="search"
             type="text"
             placeholder="Search"
             aria-label="Search"
      >
      <button class="btn btn-light" type="submit">
        Search
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { postsService } from '../services/PostsService'
export default {
  setup() {
    const query = ref('')

    return {
      query,
      async findPosts() {
        try {
          await postsService.findPosts(query.value)
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
