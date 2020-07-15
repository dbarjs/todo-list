<template>
  <div>
    <frame v-for="frame in frames" :key="frame.id" :frame-id="frame.id"></frame>
    <empty-frame></empty-frame>
  </div>
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
