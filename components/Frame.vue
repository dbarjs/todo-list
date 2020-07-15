<template>
  <v-card v-if="frame" class="mx-auto" width="320">
    <v-card-title>{{ frame.title }}</v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    frameId: {
      default: '',
      type: String,
    },
  },
  computed: {
    frame() {
      if (this.frameId) {
        return this.$store.getters['frames/getFrameById'](this.frameId)
      } else {
        return null
      }
    },
  },
}
</script>
