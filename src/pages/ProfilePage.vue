<template>
  <div class="container-fluid px-0">
    <div class="row sticky-top shadow-sm">
      <div class="col-12 bg-grad bg-white py-3 d-flex justify-content-between">
        <router-link class="" :to="{ name: 'Home' }">
          <div class="icon d-flex align-items-center ">
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="35"
                 height="35"
                 fill="currentColor"
                 class=" ps-1 pb-1 bi bi-bootstrap text-white"
                 viewBox="0 0 16 16"
            >
              <path d="M5.062 12h3.475c1.804 0 2.888-.908 2.888-2.396 0-1.102-.761-1.916-1.904-2.034v-.1c.832-.14 1.482-.93 1.482-1.816 0-1.3-.955-2.11-2.542-2.11H5.062V12zm1.313-4.875V4.658h1.78c.973 0 1.542.457 1.542 1.237 0 .802-.604 1.23-1.764 1.23H6.375zm0 3.762V8.162h1.822c1.236 0 1.887.463 1.887 1.348 0 .896-.627 1.377-1.811 1.377H6.375z" />
              <path d="M0 4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4zm4-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3H4z" />
            </svg>
            <h2 class="ps-2 text-white">
              Social Net
            </h2>
          </div>
        </router-link>
        <div class="">
        </div>
      </div>
    </div>
    <div class="row back-img" :style="{backgroundImage: `url(${profile.coverImg})`}">
      <div class="col-8">
        <div class="row">
          <div class="col-6">
            <div class="prof-text pt-5 ms-1">
              <img :src="profile.picture" alt="" class="circleprofpost">
              <h2 class=" text-white mt-2">
                {{ profile.name }}
              </h2>
            </div>
          </div>
          <div class="col-6 d-flex align-items-center">
            <div class="bio text-white pt-5" v-if="profile.bio !== ''">
              <h6>
                Bio:
              </h6>
              <p>{{ profile.bio }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4 d-flex justify-content-between">
        <div class="pt-2 info text-white">
          <h5 v-if="profile.github !== ''">
            Github: {{ profile.github }}
          </h5>
          <h5 v-if="profile.linkedin !== ''">
            LinkedIn: {{ profile.linkedin }}
          </h5>
          <h5 v-if="profile.email !== ''">
            Email: {{ profile.email }}
          </h5>
        </div>
        <div class="bot-right mb-2 pt-2">
          <button class="btn btn-light" data-bs-target="#prof-modal" data-bs-toggle="modal" v-if="account.id === profile.id">
            Edit
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <Modal id="prof-modal">
        <template #modal-title>
          Edit Your Profile
        </template>
        <template #modal-body>
          <form class="form-group" @submit.prevent="updateAccount()">
            <div class="pb-2 d-flex flex-column">
              <label for="" class="form-label">Cover Image Url</label>
              <input class="form-control" type="text" v-model="account.coverImg">
            </div>
            <div class="pb-2 d-flex flex-column ">
              <label for="" class="form-label">Username</label>
              <input class="form-control" type="text" v-model="account.name">
            </div>
            <div class="pb-2 d-flex flex-column">
              <label for="" class="form-label">Profile Pic</label>
              <input class="form-control" type="text" v-model="account.picture">
            </div>
            <div class="pb-2 d-flex flex-column">
              <label for="" class="form-label">Bio</label>
              <input class="form-control" type="text" v-model="account.bio">
            </div>
            <div class="pb-2 d-flex flex-column">
              <label for="" class="form-label">email</label>
              <input class="form-control" type="text" v-model="account.email">
            </div>
            <div class="pb-2 d-flex flex-column">
              <label for="" class="form-label">GitHub</label>
              <input class="form-control" type="text" v-model="account.github">
            </div>
            <div class="pb-2 d-flex flex-column">
              <label for="" class="form-label">LinkedIn</label>
              <input class="form-control" type="text" v-model="account.linkedin">
            </div>
            <div class="pb-2">
              <button class="btn btn-primary ms-1">
                Submit
              </button>
            </div>
          </form>
        </template>
      </Modal>
      <div class="col-md-8">
        <Post :post="p" v-for="p in posts" :key="p.id" />
        <div class="row pb-3">
          <div class="col-6 text-center">
            <div class="button" @click="getPostsPageMinus()">
              <button class="btn btn-primary text-white">
                Newer
              </button>
            </div>
          </div>
          <div class="col-6 text-center">
            <div class="button">
              <button class="btn btn-primary text-white" @click="getPostsPagePlus()">
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
    async function getPostsById() {
      try {
        await profileService.getPostsById(route.params.id)
      } catch (error) {
        Pop.toast('error get posts by id', error)
      }
    }
    watchEffect(async() => {
      if (route) {
        await adsService.getAds()
        await profileService.getProfileById(route.params.id)
        getPostsById()
      }
    })
    return {
      account,
      profile: computed(() => AppState.profile),
      posts: computed(() => AppState.posts),
      ads: computed(() => AppState.ads),
      currentpage: computed(() => AppState.currentpage),
      totalpages: computed(() => AppState.totalpages),

      async getPostsPagePlus() {
        try {
          if (this.currentpage < this.totalpages) {
            await profileService.getPostsById(route.params.id, this.currentpage += 1)
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async getPostsPageMinus() {
        try {
          if (this.currentpage > 1) {
            await profileService.getPostsById(route.params.id, this.currentpage -= 1)
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },

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
  background-size: cover;
}
.bg-grad{
background-color: #8EC5FC;
background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
background-color: rgba(0, 0, 0, 0.5);
    background-blend-mode: multiply;
}
.circleprof {
  border-top-left-radius: 50% 50%;
  border-top-right-radius: 50% 50%;
  border-bottom-right-radius: 50% 50%;
  border-bottom-left-radius: 50% 50%;
}
.circleprofpost {
  border-top-left-radius: 50% 50%;
  border-top-right-radius: 50% 50%;
  border-bottom-right-radius: 50% 50%;
  border-bottom-left-radius: 50% 50%;
  height: 5rem;
  width: 5rem;
  border: 3px solid #ffffff;
}

</style>
