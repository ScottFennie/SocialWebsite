<template>
  <div class="card">
    <img :src="ad.tall" alt="ad">
  </div>
</template>

<script>
export default {
  props: {
    ad: {
      type: Object,
      required: true
    }
  }

}
</script>

<style>

</style>
