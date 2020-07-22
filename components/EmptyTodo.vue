<template>
  <v-card width="100%" transition="scroll-y-transition">
    <v-btn v-if="!isFocused" block @click="setIsFocused(true)">
      Add new todo...
    </v-btn>
    <v-text-field
      v-show="isFocused"
      ref="titleTextField"
      v-model="title"
      solo
      label="Enter todo title..."
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
      >
        Add Todo
      </v-btn>
      <v-btn text @click="setIsFocused(false)">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    frame: {
      default: null,
      type: [Object, null],
    },
  },
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
        }, 50)
      }
    },
    async create() {
      if (this.title) {
        this.loading = true
        const todo = await this.$store.dispatch('frames/createTodo', {
          frame: this.frame,
          title: this.title,
        })
        if (todo?.id) {
          this.loading = false
          this.isFocused = false
          this.title = ''
        }
      }
    },
  },
}
</script>
