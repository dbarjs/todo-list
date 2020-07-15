<template>
  <v-layout column justify-center align-center>
    <frame-list></frame-list>
  </v-layout>
</template>

<script>
import FrameList from '../components/FrameList.vue'
export default {
  components: {
    FrameList,
  },
  created() {
    this.$store.dispatch('frames/fetchFrames')
  },
}
</script>
