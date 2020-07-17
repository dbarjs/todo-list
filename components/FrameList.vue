<template>
  <v-container class="frame-list mx-0 full-width">
    <frame v-for="frame in frames" :key="frame.id" :frame="frame"></frame>
    <empty-frame></empty-frame>
  </v-container>
</template>

<script>
import Frame from '../components/Frame.vue'
import EmptyFrame from '../components/EmptyFrame.vue'
export default {
  components: {
    EmptyFrame,
    Frame,
  },
  computed: {
    frames() {
      return this.$store.getters['frames/getFrames']
    },
  },
}
</script>

<style>
.frame-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

@media (min-width: 360px) {
  .frame-list {
    flex-direction: row;
    overflow-x: auto;
    min-width: 100%;
  }
}
</style>
