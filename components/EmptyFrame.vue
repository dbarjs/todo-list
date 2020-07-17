<template>
  <v-card width="320" min-width="300" transition="scroll-y-transition">
    <v-btn v-if="!isFocused" block @click="setIsFocused(true)"
      >Add new frame...</v-btn
    >
    <v-text-field
      ref="titleTextField"
      v-show="isFocused"
      v-model="title"
      solo
      label="Enter frame title..."
      hide-details
      solo-inverted
      class="px-2 pt-2"
      @keydown.esc="setIsFocused(false)"
      @keydown.enter="create"
    ></v-text-field>
    <v-card-actions v-show="isFocused">
      <v-btn
        color="success"
        @click="create"
        :disabled="loading"
        :loading="loading"
        >Add Frame</v-btn
      >
      <v-btn text @click="setIsFocused(false)">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      isFocused: false,
      loading: false,
    }
  },
  methods: {
    setIsFocused(state = true) {
      this.isFocused = !!state

      if (this.isFocused) {
        setTimeout(() => {
          this.$refs.titleTextField.focus()
        }, 100)
      }
    },
    async create() {
      this.loading = true
      const frame = await this.$store.dispatch('frames/createFrame', this.title)
      if (frame.id) {
        this.loading = false
        this.isFocused = false
        this.title = ''
      }
    },
  },
}
</script>
