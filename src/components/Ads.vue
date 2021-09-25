<template>
  <div class="card shadow my-4">
    <img :src="ad.tall" alt="ad" class="rounded">
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
