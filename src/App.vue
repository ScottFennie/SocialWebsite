<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <Sidebar class="col-lg-2 shadow-md" />
        <div class="col-lg-10 viewport">
          <router-view />
        </div>
      </div>
    </div>
  </main>
  <!-- <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by CodeWorks
    </div>
  </footer> -->
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.viewport{
  height: 100vh;
  overflow-y: auto;
}

</style>
