<template>
  <v-container class="frame-list mx-0 full-width">
    <draggable
      :list="frameList"
      class="d-flex flex-column flex-md-row"
      ghost-class="ghost"
      handle=".handle"
      @change="onChange"
    >
      <frame
        v-for="frame in frameList"
        :key="frame.id"
        :frame-id="frame.id"
      ></frame>
    </draggable>
    <empty-frame></empty-frame>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
import Frame from '../components/Frame.vue'
import EmptyFrame from '../components/EmptyFrame.vue'
export default {
  components: {
    draggable,
    EmptyFrame,
    Frame,
  },
  data() {
    return {
      frameList: [],
    }
  },
  computed: {
    frames() {
      return this.$store.getters['frames/getFrames']
    },
  },
  watch: {
    frames: {
      immediate: true,
      handler(frames) {
        const frameList = [...frames]
        frameList.sort((a, b) => (a.order > b.order ? 1 : -1))
        this.frameList = frameList
      },
    },
  },
  methods: {
    onChange({ moved }) {
      const maxFrameIndex = Math.max(moved.oldIndex, moved.newIndex)
      const framesToUpdate = this.frameList.filter(
        (todo, index) => maxFrameIndex >= index,
      )
      this.updateOrderOfFrames(framesToUpdate)
    },
    updateOrderOfFrames(frames) {
      frames.forEach((frame, index) => {
        this.$store.dispatch('frames/updateFrame', {
          ...frame,
          order: index,
        })
      })
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

.ghost {
  opacity: 0.4;
}

@media (min-width: 360px) {
  .frame-list {
    flex-direction: row;
    overflow-x: auto;
    min-width: 100%;
  }
}
</style>
