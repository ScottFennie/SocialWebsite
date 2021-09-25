<template>
  <div class="bg-white d-flex justify-content-between flex-column">
    <div class="main-section">
      <router-link :to="{name: 'Home'}" class="selectable">
        <h1 class=" text-center ms-3 my-2">
          Home
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
