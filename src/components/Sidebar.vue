<template>
  <div class="bg-dark d-flex justify-content-between flex-column">
    <div class="main-section">
      <router-link :to="{name: 'Home'}" class="selectable">
        <h1 class="text-light ms-3 my-2">
          test
        </h1>
      </router-link>
    </div>
    <div class="lower-section">
      <Auth />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

</style>
