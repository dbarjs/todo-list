<template>
  <v-card
    width="320"
    min-width="300"
    transition="scroll-y-transition"
    elevation="1"
  >
    <v-btn v-if="!isFocused" color="primary" block @click="setIsFocused(true)">
      Add new frame...
    </v-btn>
    <v-text-field
      v-show="isFocused"
      ref="titleTextField"
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
        :disabled="loading"
        :loading="loading"
        @click="create"
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
