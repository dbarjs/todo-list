<template>
  <v-list-item
    v-if="todo"
    v-show="isVisible"
    class="pr-1 pl-3"
    transition="fade-transition"
  >
    <v-list-item-action class="mr-4">
      <v-checkbox v-model="isChecked" color="primary"></v-checkbox>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title
        v-show="!isEditing"
        :class="{ 'is-checked': isChecked }"
      >
        {{ todo.title }}
      </v-list-item-title>
      <v-text-field
        v-show="isEditing"
        ref="titleTextField"
        v-model="title"
        solo
        hide-details
        solo-inverted
        :loading="isLoading"
        append-icon="mdi-check"
        @keydown.esc="isEditing = false"
        @keydown.enter="updateTitle"
        @click:append="updateTitle"
      ></v-text-field>
    </v-list-item-content>
    <v-list-item-action class="flex-row align-center mr-1">
      <v-btn
        v-if="!isEditing"
        icon
        small
        transition="fade-transition"
        @click="isEditing = true"
      >
        <v-icon size="20">mdi-pencil-outline</v-icon>
      </v-btn>
      <v-btn icon small transition="fade-transition" @click="remove">
        <v-icon size="20">mdi-delete-outline</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  props: {
    todo: {
      default: null,
      type: [Object, null],
    },
  },
  data() {
    return {
      title: '',
      isChecked: false,
      isEditing: false,
      isLoading: false,
      isVisible: true,
    }
  },
  watch: {
    'todo.title': {
      immediate: true,
      deep: true,
      handler(title) {
        this.title = title
      },
    },
    'todo.open': {
      immediate: true,
      deep: true,
      handler(state) {
        this.isChecked = !state
      },
    },
    isEditing: {
      immediate: true,
      handler(state) {
        if (state) {
          setTimeout(() => {
            this.$refs.titleTextField.focus()
          }, 50)
        }
      },
    },
  },
  methods: {
    toggle(event) {
      if (
        !event.target.classList.contains('v-input--selection-controls__ripple')
      ) {
        this.isChecked = !this.isChecked
      }
    },
    async updateTitle() {
      if (this.title !== this.todo.title) {
        this.isLoading = true
        await this.$store.dispatch('frames/updateTodo', {
          ...this.todo,
          title: this.title,
        })
        this.isLoading = false
      }
      this.isEditing = false
    },
    async updateOpenState() {
      await this.$store.dispatch('frames/updateTodo', {
        ...this.todo,
        open: !this.isChecked,
      })
    },
    remove() {
      this.$store.dispatch('frames/removeTodo', this.todo)
      this.isVisible = false
    },
  },
}
</script>

<style>
.is-checked {
  opacity: 0.4;
  text-decoration: line-through;
}
</style>
