<template>
  <div>
    <div class="d-flex flex-column" v-if="account.id">
      <div class="porf text-center">
        <img :src="account.picture" alt="" height="40" width="40" class="mb-2 circleprof shadow">
        <h6 class="ms-2 text-center text-light">
          {{ account.name }}
        </h6>
      </div>
      <button class="btn selectable text-danger lighten-30" @click="logout" title="Logout">
        <i class="mdi mdi-account f-20"></i>
      </button>
    </div>
    <div v-else>
      <button class="btn selectable text-success lighten-30" @click="login">
        <b>
          Login
        </b>
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import Pop from '../utils/Pop'
export default {
  setup() {
    return {
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        const yes = await Pop.confirm('Do you really want to logout', '', 'warning')
        if (!yes) { return }
        AuthService.logout({ returnTo: window.location.origin })
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

</style>
