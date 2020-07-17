<template>
  <v-layout column justify-start align-start class="fill-height">
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
