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
          <button class="btn btn-light" data-bs-target="#prof-modal" data-bs-toggle="modal">
            Edit
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <Modal id="prof-modal">
        <template #modal-title>
          Edit you Profile
        </template>
        <template #modal-body>
          <form @submit.prevent="updateAccount()">
            <input type="text" v-model="account.coverImg">
            <input type="text" v-model="account.name">
            <input type="text" v-model="account.picture">
            <button class="btn btn-success ms-1">
              Submit
            </button>
          </form>
        </template>
      </Modal>
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
import { accountService } from '../services/AccountService'
export default {
  setup() {
    const account = computed(() => AppState.account)
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
      account,
      profile: computed(() => AppState.profile),
      posts: computed(() => AppState.posts),
      ads: computed(() => AppState.ads),

      async updateAccount() {
        try {
          await accountService.editAccount(account.value)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
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
