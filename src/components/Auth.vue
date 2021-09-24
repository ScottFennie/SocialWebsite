<template>
  <div>
    <div class="d-flex flex-column" v-if="account.id">
      <h6 class="text-center text-light">
        {{ account.name }}
      </h6>
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

<style>

</style>
