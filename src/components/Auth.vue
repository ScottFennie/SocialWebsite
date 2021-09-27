<template>
  <div>
    <div class="d-flex flex-column" v-if="account.id">
      <div class="porf text-center">
        <img :src="account.picture" alt="" height="40" width="40" class="mb-3 circleprofside shadow">
        <h2 class="ms-2 text-center text-primary">
          {{ account.name }} <i class="mdi mdi-school f-14" v-if="account.graduated === true"></i>
        </h2>
        <h6 class=" py-1 text-primary">
          <i class="mdi mdi-github f-20"></i>
          Github
        </h6>
        <h6 class="ms-2 py-1 text-primary">
          <i class="mdi mdi-linkedin f-20"></i>
          LinkedIn
        </h6>
        <h6 class="ms-1 py-1 text-primary">
          <i class="mdi mdi-file f-20"></i>
          Resume
        </h6>
      </div>
      <button class="btn selectable text-danger lighten-30" @click="logout" title="Logout">
        <i class="mdi mdi-account f-20"></i>
      </button>
    </div>
    <div v-else class="text-center">
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
.circleprofside {
  border-top-left-radius: 50% 50%;
  border-top-right-radius: 50% 50%;
  border-bottom-right-radius: 50% 50%;
  border-bottom-left-radius: 50% 50%;
  height: 12rem;
  width: 12rem;
  border: 2px solid #ADD8E6;
}

</style>
